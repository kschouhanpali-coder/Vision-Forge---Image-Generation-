import { motion } from 'framer-motion'
import { clsx } from 'clsx'

const PRESETS = [
  { id: 'cinematic',     label: '🎬 Cinematic',       description: 'Dramatic film lighting' },
  { id: 'anime',         label: '🌸 Anime',           description: 'Japanese animation style' },
  { id: 'product_photo', label: '📦 Product Photo',   description: 'Clean studio shot' },
  { id: 'oil_painting',  label: '🖼️ Oil Painting',    description: 'Classic painted texture' },
  { id: 'cyberpunk',     label: '🌆 Cyberpunk',       description: 'Neon futuristic city' },
  { id: 'watercolor',    label: '💧 Watercolor',      description: 'Soft artistic washes' },
  { id: 'pixel_art',     label: '🕹️ Pixel Art',       description: '8-bit retro style' },
  { id: 'photorealistic',label: '📷 Photorealistic',  description: 'Ultra detailed photo' },
]

export function StylePresets({ selected, onSelect }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Style Preset</p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = selected === preset.id
          return (
            <motion.button
              key={preset.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(isActive ? null : preset.id)}
              title={preset.description}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200',
                isActive
                  ? 'bg-brand-500/30 border-brand-400/60 text-brand-200 shadow-[0_0_16px_rgba(98,112,249,0.3)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white/90'
              )}
            >
              {preset.label}
            </motion.button>
          )
        })}
      </div>
      {selected && (
        <p className="text-xs text-brand-400/80">
          ✦ "{PRESETS.find(p => p.id === selected)?.description}" keywords will be appended to your prompt.
        </p>
      )}
    </div>
  )
}
