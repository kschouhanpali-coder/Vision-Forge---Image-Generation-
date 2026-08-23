import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Images, Zap, Key, X, Check, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { PromptInput } from './components/PromptInput'
import { StylePresets } from './components/StylePresets'
import { JobStatus } from './components/JobStatus'
import { ImageResult } from './components/ImageResult'
import { VideoResult } from './components/VideoResult'
import { Gallery } from './components/Gallery'
import { ErrorBanner } from './components/ErrorBanner'
import { Logo } from './components/Logo'
import { useJobPoller } from './hooks/useJobPoller'
import { generateImage, generateVideo, getTokenStatus, setApiToken } from './api/client'

// ── API Key Modal ─────────────────────────────────────────────────────────────
function ApiKeyModal({ isOpen, onClose, isConfigured, onTokenSaved }) {
  const [token, setToken] = useState('')
  const [saving, setSaving] = useState(false)

  if (!isOpen) return null

  const handleSave = async (e) => {
    e.preventDefault()
    if (!token.trim()) return
    setSaving(true)
    try {
      await setApiToken(token.trim())
      toast.success('Replicate API Token saved!')
      onTokenSaved()
      onClose()
    } catch (err) {
      toast.error(err.userMessage || 'Failed to save token.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass max-w-md w-full p-6 space-y-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
            <Key className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Replicate API Token</h3>
            <p className="text-xs text-white/40">
              {isConfigured ? '✅ Token active (FLUX.1 & SDXL 8K)' : '✨ Free AI Mode Active'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider font-semibold block mb-2">
              API Token (starts with r8_)
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="input-field text-sm"
            />
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 space-y-1.5">
            <p>💡 Free AI mode works automatically even without a token.</p>
            <p>
              To use official FLUX.1 & SVD, grab a token at{' '}
              <a
                href="https://replicate.com/account/api-tokens"
                target="_blank"
                rel="noreferrer"
                className="text-brand-300 underline inline-flex items-center gap-0.5 hover:text-brand-200"
              >
                replicate.com <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-sm"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!token.trim() || saving}
              className="btn-primary text-sm flex items-center gap-2"
            >
              {saving ? 'Saving...' : 'Save Token'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ── Generate Page ──────────────────────────────────────────────────────────────
function GeneratePage({ isConfigured }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const animateUrl = searchParams.get('animate')

  const [imageJobId, setImageJobId] = useState(null)
  const [videoJobId, setVideoJobId] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const { job: imageJob, isPolling: imagePolling } = useJobPoller(imageJobId)
  const { job: videoJob, isPolling: videoPolling } = useJobPoller(videoJobId)

  const isLoading = isSubmitting || imagePolling

  // Handle animate parameter if coming from Gallery
  useEffect(() => {
    if (animateUrl) {
      handleAnimate(animateUrl)
      setSearchParams({})
    }
  }, [animateUrl])

  const handleGenerate = async ({ prompt, negativePrompt, stylePreset, modelChoice, width, height }) => {
    setSubmitError(null)
    setImageJobId(null)
    setVideoJobId(null)
    setIsSubmitting(true)

    try {
      const data = await generateImage({
        prompt,
        negative_prompt: negativePrompt || null,
        style_preset: stylePreset || null,
        model_choice: modelChoice || 'flux-dev',
        width,
        height,
      })
      setImageJobId(data.job_id)
      toast.success('Ultra-HD generation started!')
    } catch (err) {
      setSubmitError({ message: err.userMessage, isRateLimit: err.isRateLimit })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnimate = async (sourceImageUrl) => {
    setVideoJobId(null)
    setIsAnimating(true)
    try {
      const data = await generateVideo({ source_image_url: sourceImageUrl })
      setVideoJobId(data.job_id)
      toast.success('Animation started!')
    } catch (err) {
      toast.error(err.userMessage || 'Failed to start animation.')
    } finally {
      setIsAnimating(false)
    }
  }

  const handleNewGeneration = () => {
    setImageJobId(null)
    setVideoJobId(null)
    setSubmitError(null)
  }

  const showResult = imageJob?.status === 'done' || imageJob?.status === 'failed'
  const showVideo = videoJob?.status === 'done' || videoJob?.status === 'failed'

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Hero header */}
      <div className="text-center pt-2 pb-2">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-300 bg-clip-text text-transparent inline-block pb-3 pt-1 leading-normal">
          Imagine Anything
        </h1>
      </div>

      {/* Error */}
      {submitError && (
        <ErrorBanner message={submitError.message} isRateLimit={submitError.isRateLimit} />
      )}

      {/* Input panel */}
      {!imageJobId && !videoJobId ? (
        <div className="glass p-6 space-y-4">
          <PromptInput onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
      ) : (
        <div className="glass p-6 space-y-6">
          {/* Image generation view */}
          {imageJobId && (
            <div>
              {!showResult ? (
                <JobStatus status={imageJob?.status || 'pending'} type="image" />
              ) : imageJob?.status === 'done' ? (
                <ImageResult
                  job={imageJob}
                  onAnimate={handleAnimate}
                  isAnimating={isAnimating || videoPolling}
                />
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="text-4xl">😞</div>
                  <p className="text-red-300 font-medium">Generation failed</p>
                  <p className="text-white/40 text-sm">{imageJob?.error_msg}</p>
                </div>
              )}
            </div>
          )}

          {/* Video result view */}
          {videoJobId && (
            <div className="border-t border-white/10 pt-6">
              {!showVideo ? (
                <JobStatus status={videoJob?.status || 'pending'} type="video" />
              ) : videoJob?.status === 'done' ? (
                <VideoResult job={videoJob} />
              ) : (
                <ErrorBanner message={videoJob?.error_msg || 'Video generation failed.'} />
              )}
            </div>
          )}

          {/* New generation CTA */}
          {(showResult || showVideo) && (
            <button
              id="new-generation-btn"
              onClick={handleNewGeneration}
              className="btn-secondary w-full text-sm py-2.5 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-300" />
              <span>← Create New Generation</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── App Shell ──────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)

  const checkStatus = async () => {
    try {
      const res = await getTokenStatus()
      setIsConfigured(res.configured)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        isConfigured={isConfigured}
        onTokenSaved={checkStatus}
      />

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-surface-900/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo iconSize="w-8 h-8" />
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isConfigured
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>{isConfigured ? 'FLUX 8K: Active' : 'API Key'}</span>
            </button>

            {/* Nav links */}
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname === '/'
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate</span>
              </Link>

              <Link
                to="/gallery"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname === '/gallery'
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Images className="w-4 h-4" />
                <span>Gallery</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content View with Instant Navigation */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
        <Routes>
          <Route
            path="/"
            element={<GeneratePage isConfigured={isConfigured} />}
          />
          <Route
            path="/gallery"
            element={
              <Gallery
                onAnimate={(imageUrl) => {
                  navigate(`/?animate=${encodeURIComponent(imageUrl)}`)
                }}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
