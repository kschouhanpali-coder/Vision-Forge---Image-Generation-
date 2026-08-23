import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Clapperboard, ExternalLink, Check } from 'lucide-react'

export function ImageResult({ job, onAnimate, isAnimating }) {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    try {
      const res = await fetch(job.output_url)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `aigen-${job.job_id}.png`
      a.click()
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2000)
    } catch {
      window.open(job.output_url, '_blank')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-4"
    >
      {/* Image */}
      <div className="relative group rounded-2xl overflow-hidden shadow-glass bg-black/30 flex items-center justify-center min-h-[300px]">
        <img
          src={job.output_url}
          alt={job.prompt || 'Generated image'}
          className="w-full max-h-[520px] object-contain rounded-2xl"
          style={{ imageRendering: 'auto' }}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center gap-1.5 text-sm"
            title="Download image"
          >
            {downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            {downloaded ? 'Saved!' : 'Download'}
          </button>
          <a
            href={job.output_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-1.5 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </a>
        </div>
      </div>

      {/* Prompt caption */}
      {job.prompt && (
        <p className="text-sm text-white/50 italic leading-relaxed line-clamp-2">
          "{job.prompt}"
          {job.style_preset && (
            <span className="ml-2 not-italic badge bg-brand-500/20 text-brand-300 border-brand-500/30 text-[10px]">
              {job.style_preset}
            </span>
          )}
        </p>
      )}

      {/* Animate button */}
      <motion.button
        id="animate-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onAnimate(job.output_url)}
        disabled={isAnimating}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
      >
        {isAnimating ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating animation...
          </>
        ) : (
          <>
            <Clapperboard className="w-5 h-5" />
            🎬 Animate this image
          </>
        )}
      </motion.button>
    </motion.div>
  )
}
