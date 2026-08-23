import { motion } from 'framer-motion'

const STATUS_MESSAGES = {
  pending: 'Queued — waiting for a worker...',
  processing: 'Generating your image...',
}

const TIPS = [
  'Try adding "golden hour lighting" for warm, dramatic results.',
  'Specific details like "Canon 5D, f/1.8, bokeh" make images more photorealistic.',
  '"Trending on ArtStation" often improves art quality.',
  'Use a style preset to instantly transform the aesthetic.',
  'Negative prompts like "blurry, low quality" sharpen outputs.',
]

export function JobStatus({ status, type = 'image' }) {
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)]
  const label = STATUS_MESSAGES[status] || `Status: ${status}`

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Animated orb */}
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 opacity-30"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 opacity-50"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.2 }}
        />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center shadow-brand">
          <motion.span
            className="text-2xl"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          >
            {type === 'video' ? '🎬' : '✨'}
          </motion.span>
        </div>
      </div>

      {/* Label */}
      <div className="text-center space-y-1">
        <p className="font-semibold text-white text-base">{label}</p>
        <p className="text-xs text-white/40">Polling every 2 seconds</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-brand-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Tip */}
      <div className="glass px-4 py-3 max-w-sm text-center">
        <p className="text-xs text-white/40 mb-1">💡 Pro Tip</p>
        <p className="text-sm text-white/70">{tip}</p>
      </div>
    </div>
  )
}
