import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { jobQueries } from '../db.js'
import { buildPrompt, generateImage, generateVideo, downloadAndSave, STYLE_PRESETS, getEffectiveToken, setRuntimeToken } from '../replicate.js'

const router = Router()

// ── Rate limit check ──────────────────────────────────────────────────────────
function getClientIP(req) {
  return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim()
}

function checkRateLimit(req, res) {
  const ip = getClientIP(req)
  const limit = parseInt(process.env.RATE_LIMIT_PER_DAY || '10')
  const used = jobQueries.countTodayByIP(ip)

  if (used >= limit) {
    res.status(429).json({
      error: 'rate_limit_exceeded',
      message: `You've reached the limit of ${limit} generations per day. Try again tomorrow.`,
      limit,
      used,
    })
    return false
  }
  return true
}

// ── POST /generate/image ──────────────────────────────────────────────────────
router.post('/image', async (req, res) => {
  const { prompt, negative_prompt, style_preset, model_choice = 'flux-dev', width = 1024, height = 1024 } = req.body

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'validation_error', message: 'Prompt is required.' })
  }
  if (prompt.length > 1000) {
    return res.status(400).json({ error: 'validation_error', message: 'Prompt must be under 1000 characters.' })
  }
  if (!checkRateLimit(req, res)) return

  const jobId = uuidv4()
  const ip = getClientIP(req)

  jobQueries.create({
    id: jobId,
    type: 'image',
    status: 'pending',
    prompt: prompt.trim(),
    negative_prompt: negative_prompt || null,
    style_preset: style_preset || null,
    width: Math.min(Math.max(parseInt(width) || 1024, 512), 2048),
    height: Math.min(Math.max(parseInt(height) || 1024, 512), 2048),
    source_image_url: null,
    ip_address: ip,
  })

  // Respond immediately, run generation in background
  res.status(202).json({ job_id: jobId, status: 'pending', message: 'Job enqueued.' })

  // Background generation (fire-and-forget)
  ;(async () => {
    try {
      jobQueries.updateStatus(jobId, 'processing')
      const fullPrompt = buildPrompt(prompt.trim(), style_preset)
      const remoteUrl = await generateImage({
        prompt: fullPrompt,
        negativePrompt: negative_prompt,
        modelChoice: model_choice,
        width,
        height,
      })
      const localUrl = await downloadAndSave(remoteUrl, jobId, 'image')
      jobQueries.updateStatus(jobId, 'done', localUrl)
      console.log(`✅ Image job ${jobId} done → ${localUrl}`)
    } catch (err) {
      console.error(`❌ Image job ${jobId} failed:`, err.message)
      jobQueries.updateStatus(jobId, 'failed', null, err.message)
    }
  })()
})

// ── POST /generate/video ──────────────────────────────────────────────────────
router.post('/video', async (req, res) => {
  const { source_image_url } = req.body

  if (!source_image_url || !source_image_url.trim()) {
    return res.status(400).json({ error: 'validation_error', message: 'source_image_url is required.' })
  }
  if (!checkRateLimit(req, res)) return

  const jobId = uuidv4()
  const ip = getClientIP(req)

  jobQueries.create({
    id: jobId,
    type: 'video',
    status: 'pending',
    prompt: null,
    negative_prompt: null,
    style_preset: null,
    width: null,
    height: null,
    source_image_url: source_image_url.trim(),
    ip_address: ip,
  })

  res.status(202).json({ job_id: jobId, status: 'pending', message: 'Video job enqueued.' })

  ;(async () => {
    try {
      jobQueries.updateStatus(jobId, 'processing')
      const remoteUrl = await generateVideo({ sourceImageUrl: source_image_url.trim() })
      const localUrl = await downloadAndSave(remoteUrl, jobId, 'video')
      jobQueries.updateStatus(jobId, 'done', localUrl)
      console.log(`✅ Video job ${jobId} done → ${localUrl}`)
    } catch (err) {
      console.error(`❌ Video job ${jobId} failed:`, err.message)
      jobQueries.updateStatus(jobId, 'failed', null, err.message)
    }
  })()
})

// ── GET /generate/presets ─────────────────────────────────────────────────────
router.get('/presets', (_req, res) => {
  res.json({ presets: Object.keys(STYLE_PRESETS) })
})

// ── GET /generate/token-status ────────────────────────────────────────────────
router.get('/token-status', (_req, res) => {
  const isSet = !!getEffectiveToken()
  res.json({ configured: isSet })
})

// ── POST /generate/set-token ──────────────────────────────────────────────────
router.post('/set-token', (req, res) => {
  const { token } = req.body
  if (token && typeof token === 'string') {
    setRuntimeToken(token.trim())
    return res.json({ success: true, message: 'Replicate token updated successfully.' })
  }
  return res.status(400).json({ error: 'invalid_token', message: 'Token string is required.' })
})

export default router
