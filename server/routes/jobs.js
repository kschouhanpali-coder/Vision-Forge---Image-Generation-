import { Router } from 'express'
import { jobQueries } from '../db.js'

const router = Router()

// ── GET /jobs/:id ─────────────────────────────────────────────────────────────
router.get('/jobs/:id', (req, res) => {
  const job = jobQueries.getById(req.params.id)
  if (!job) {
    return res.status(404).json({ error: 'not_found', message: `Job '${req.params.id}' not found.` })
  }
  res.json({
    job_id: job.id,
    type: job.type,
    status: job.status,
    prompt: job.prompt,
    style_preset: job.style_preset,
    output_url: job.output_url,
    error_msg: job.error_msg,
    created_at: job.created_at,
    updated_at: job.updated_at,
  })
})

// ── GET /gallery ──────────────────────────────────────────────────────────────
router.get('/gallery', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '24'), 100)
  const offset = parseInt(req.query.offset || '0')
  const items = jobQueries.getGallery(limit, offset)
  const total = jobQueries.countDone()
  res.json({
    items: items.map((j) => ({
      job_id: j.id,
      type: j.type,
      status: j.status,
      prompt: j.prompt,
      style_preset: j.style_preset,
      output_url: j.output_url,
      created_at: j.created_at,
    })),
    total,
  })
})

// ── DELETE /gallery/:id ───────────────────────────────────────────────────────
router.delete('/gallery/:id', (req, res) => {
  const success = jobQueries.delete(req.params.id)
  if (!success) {
    return res.status(404).json({ error: 'not_found', message: 'Item not found in gallery.' })
  }
  res.json({ success: true, message: 'Item deleted from gallery.' })
})

// ── DELETE /gallery (Clear All) ───────────────────────────────────────────────
router.delete('/gallery', (_req, res) => {
  const count = jobQueries.clearGallery()
  res.json({ success: true, message: `Cleared ${count} items from gallery.` })
})

// ── GET /health ───────────────────────────────────────────────────────────────
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() })
})

export default router
