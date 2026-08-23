import { motion } from 'framer-motion'
import { Download, Play } from 'lucide-react'

export function VideoResult({ job }) {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = job.output_url
    a.download = `aigen-video-${job.job_id}.mp4`
    a.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-3"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-glass group">
        <video
          src={job.output_url}
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-2xl"
        />
        {/* Glow border */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500/30 pointer-events-none" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎬</span>
          <p className="text-sm font-medium text-white/80">Video ready!</p>
          <span className="badge-success">Done</span>
        </div>
        <button
          onClick={handleDownload}
          className="btn-secondary flex items-center gap-1.5 text-sm"
        >
          <Download className="w-4 h-4" />
          Download MP4
        </button>
      </div>
    </motion.div>
  )
}
