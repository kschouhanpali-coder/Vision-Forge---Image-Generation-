import { useState } from 'react'
import { ChevronDown, ChevronUp, Sparkles, Wand2, Sliders, Flame, Cpu } from 'lucide-react'
import { StylePresets } from './StylePresets'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const INSPIRATION_PROMPTS = [
  {
    label: '🌌 Cosmic Astronaut',
    prompt: 'Crystal clear 8k photograph of a lone astronaut in a pristine white suit exploring a vibrant bioluminescent alien planet with glowing crystalline plants, razor-sharp focus on helmet and suit textures, deep depth of field, sharp stars in sky, photorealistic masterpiece',
    preset: 'cinematic',
  },
  {
    label: '🏎️ Neon Cyberpunk',
    prompt: 'Crystal clear 8k photograph of a futuristic matte-black hypercar parked on a neon-lit Tokyo street, sharp reflections, crisp rain droplets on carbon fiber, ray-tracing, razor-sharp focus',
    preset: 'cyberpunk',
  },
  {
    label: '🌸 Enchanted Shrine',
    prompt: 'Crystal clear 8k anime art of an ancient Japanese shrine surrounded by blooming cherry blossoms and glowing spirit lanterns, razor-sharp crisp lineart, Studio Ufotable lighting, vivid colors',
    preset: 'anime',
  },
  {
    label: '💎 Luxury Watch',
    prompt: 'Commercial macro studio photography of a luxury Swiss chronograph watch, crystal clear sapphire glass, sharp legible golden numerals and mechanical gears, razor-sharp focus on brushed titanium bezel, 8k resolution',
    preset: 'product_photo',
  },
]

export function PromptInput({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [stylePreset, setStylePreset] = useState(null)
  const [modelChoice, setModelChoice] = useState('flux-dev')
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleEnhance = () => {
    if (!prompt.trim()) {
      toast('Type a few words first, then click Enhance ✨', { icon: '💡' })
      return
    }
    const enhancements = [
      'crystal clear, pin-sharp focus throughout, deep depth of field, 8k uhd, razor-sharp details, intricate surface textures, studio lighting, zero blur, masterpiece',
      'shot on Phase One 150MP camera, razor-sharp macro focus, pristine clarity, 8k resolution, photorealistic, crisp edges, zero blur',
      'extreme fine detail, ray-traced reflections, pin-sharp focus, 8k uhd, hyper-detailed, masterpiece composition, crisp lighting',
    ]
    const chosen = enhancements[Math.floor(Math.random() * enhancements.length)]
    setPrompt((prev) => `${prev.trim()}, ${chosen}`)
    toast.success('Enriched with Crystal-Clear 8K Sharpness!')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return
    onSubmit({
      prompt: prompt.trim(),
      negativePrompt,
      stylePreset,
      modelChoice,
      width,
      height,
    })
  }

  const sizeOptions = [
    { label: 'Square (1:1)', w: 1024, h: 1024, icon: '■' },
    { label: 'Landscape (16:9)', w: 1280, h: 720, icon: '▬' },
    { label: 'Portrait (9:16)', w: 720, h: 1280, icon: '▮' },
    { label: 'Classic (4:3)', w: 1024, h: 768, icon: '▰' },
  ]

  const modelOptions = [
    {
      id: 'flux-dev',
      name: '🌟 FLUX.1 Ultra',
      tag: 'Best Quality & Sharpness',
      desc: '28-step studio fidelity (Recommended)',
    },
    {
      id: 'flux-schnell',
      name: '⚡ FLUX.1 Schnell',
      tag: 'Fast Generation',
      desc: 'High speed, clean textures',
    },
    {
      id: 'sdxl',
      name: '📸 SDXL Studio',
      tag: 'Classic SDXL',
      desc: 'Refined 40-step diffusion',
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Top Inspiration Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-white/50 font-medium">
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Instant Inspiration Prompts
          </span>
          <span className="badge bg-brand-500/20 text-brand-300 border-brand-500/30 text-[10px]">
            ✨ FLUX.1 8K Engine
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {INSPIRATION_PROMPTS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setPrompt(item.prompt)
                setStylePreset(item.preset)
              }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-brand-500/20 border border-white/10 hover:border-brand-500/40 text-white/70 hover:text-brand-200 transition-all font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Prompt Textarea */}
      <div className="relative">
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your vision (e.g. Luxury Swiss chronograph watch on black marble, crisp sapphire crystal, macro studio lighting)..."
          rows={3}
          maxLength={1000}
          className="input-field pr-28 pb-11 text-base leading-relaxed"
          disabled={isLoading}
        />

        {/* Action bar inside textarea */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={handleEnhance}
            disabled={isLoading}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-brand-500/30 to-purple-500/30 hover:from-brand-500/50 hover:to-purple-500/50 border border-brand-400/40 text-brand-100 text-xs font-semibold transition-all hover:scale-105 shadow-sm"
            title="Auto-enhance your prompt with professional camera & lighting keywords"
          >
            <Wand2 className="w-3.5 h-3.5 text-brand-300" />
            <span>Enhance Quality ✨</span>
          </button>

          <span className="text-[11px] text-white/30 font-mono">
            {prompt.length}/1000
          </span>
        </div>
      </div>

      {/* Style Presets */}
      <StylePresets selected={stylePreset} onSelect={setStylePreset} />

      {/* Model Choice Selector */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-2">
          <Cpu className="w-3.5 h-3.5 text-brand-400" />
          AI Engine
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {modelOptions.map((m) => {
            const isSelected = modelChoice === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setModelChoice(m.id)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-brand-500/25 border-brand-400/80 shadow-[0_0_15px_rgba(98,112,249,0.3)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-white">{m.name}</span>
                  {isSelected && <span className="text-[10px] text-emerald-400 font-bold">Active</span>}
                </div>
                <p className="text-[10px] text-white/50 mt-0.5">{m.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Advanced Settings Accordion */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors py-1"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Aspect Ratio & Canvas Dimensions</span>
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-3 pt-3 pb-1"
            >
              {/* Aspect Ratio & Resolution */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sizeOptions.map((opt) => {
                  const isSelected = width === opt.w && height === opt.h
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setWidth(opt.w)
                        setHeight(opt.h)
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                        isSelected
                          ? 'bg-brand-500/30 border-brand-400 text-brand-100 shadow-[0_0_15px_rgba(98,112,249,0.3)]'
                          : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                      }`}
                    >
                      <div className="font-semibold text-white/90 flex items-center justify-between">
                        <span>{opt.label}</span>
                        <span className="text-sm opacity-50">{opt.icon}</span>
                      </div>
                      <div className="opacity-50 text-[10px] mt-0.5">{opt.w} × {opt.h}</div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <button
        id="generate-image-btn"
        type="submit"
        disabled={!prompt.trim() || isLoading}
        className="btn-primary w-full flex items-center justify-center gap-2.5 text-base py-3.5 shadow-brand"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Rendering Ultra-HD Image...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Generate Ultra-HD Image</span>
          </>
        )}
      </button>
    </form>
  )
}
