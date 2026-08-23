import { Sparkles, Zap, TriangleAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ErrorBanner({ message, isRateLimit = false }) {
  if (!message) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className={`flex items-start gap-3 p-4 rounded-xl border ${
          isRateLimit
            ? 'bg-orange-500/10 border-orange-500/30 text-orange-200'
            : 'bg-red-500/10 border-red-500/30 text-red-200'
        }`}
      >
        <TriangleAlert className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          {isRateLimit && (
            <p className="font-semibold text-orange-100 text-sm mb-0.5">Daily limit reached</p>
          )}
          <p className="text-sm leading-relaxed opacity-90">{message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
