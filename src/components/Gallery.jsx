import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageIcon, Film, RefreshCw, Clock, Trash2, Download, ExternalLink, X, Clapperboard, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { getGallery, deleteGalleryItem, clearAllGallery } from '../api/client'

function TimeAgo({ date }) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000)
  if (diff < 60) return <span>{diff}s ago</span>
  if (diff < 3600) return <span>{Math.floor(diff / 60)}m ago</span>
  if (diff < 86400) return <span>{Math.floor(diff / 3600)}h ago</span>
  return <span>{Math.floor(diff / 86400)}d ago</span>
}

// ── Full-Resolution Lightbox Modal ─────────────────────────────────────────────
function LightboxModal({ item, onClose, onDelete, onAnimate }) {
  if (!item) return null

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = item.output_url
    a.download = `visionforge-${item.type}-${item.job_id}.${item.type === 'video' ? 'mp4' : 'png'}`
    a.target = '_blank'
    a.click()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative max-w-4xl w-full max-h-[90vh] glass p-4 md:p-6 flex flex-col gap-4 overflow-hidden"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`badge text-xs ${
                item.type === 'video'
                  ? 'bg-purple-500/30 text-purple-200 border-purple-500/40'
                  : 'bg-brand-500/30 text-brand-200 border-brand-400/40'
              }`}
            >
              {item.type === 'video' ? <Film className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
              {item.type}
            </span>
            {item.style_preset && (
              <span className="badge bg-white/10 text-white/80 border-white/20 text-xs">
                {item.style_preset}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview (High Resolution, Non-blurry) */}
        <div className="flex-1 min-h-[300px] max-h-[60vh] flex items-center justify-center bg-black/40 rounded-xl overflow-hidden">
          {item.type === 'video' ? (
            <video
              src={item.output_url}
              controls
              autoPlay
              loop
              className="max-h-[58vh] w-auto max-w-full rounded-lg object-contain"
            />
          ) : (
            <img
              src={item.output_url}
              alt={item.prompt || 'Generated preview'}
              className="max-h-[58vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              style={{ imageRendering: 'auto' }}
            />
          )}
        </div>

        {/* Prompt info & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="space-y-0.5 max-w-xl">
            <p className="text-sm text-white/90 font-medium line-clamp-2">
              {item.prompt || '(no prompt description)'}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              <span>Created <TimeAgo date={item.created_at} /></span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>

            {item.type === 'image' && onAnimate && (
              <button
                onClick={() => {
                  onAnimate(item.output_url)
                  onClose()
                }}
                className="btn-primary text-xs flex items-center gap-1.5 py-2 px-3 bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Clapperboard className="w-3.5 h-3.5" />
                Animate
              </button>
            )}

            <button
              onClick={() => {
                onDelete(item.job_id)
                onClose()
              }}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Gallery Card ───────────────────────────────────────────────────────────────
function GalleryCard({ item, onClick, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.25 }}
      className="glass-hover group overflow-hidden rounded-2xl relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Media thumbnail */}
      <div className="relative aspect-square bg-surface-800 overflow-hidden">
        {item.type === 'video' ? (
          <video
            src={item.output_url}
            autoPlay={hovered}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.output_url}
            alt={item.prompt || 'Generated item'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span
            className={`badge text-[10px] ${
              item.type === 'video'
                ? 'bg-purple-500/40 text-purple-200 border-purple-500/50 backdrop-blur-md'
                : 'bg-brand-500/40 text-brand-200 border-brand-400/50 backdrop-blur-md'
            }`}
          >
            {item.type === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
            {item.type}
          </span>

          {/* Delete quick button on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item.job_id)
            }}
            title="Delete this image"
            className="pointer-events-auto p-1.5 rounded-lg bg-black/60 hover:bg-red-500 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover preview CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
          <span className="text-[11px] text-white/80 font-medium">Click to view full size ↗</span>
        </div>
      </div>

      {/* Caption */}
      <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
        <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-normal">
          {item.prompt || '(No prompt text)'}
        </p>
        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-white/35">
          <span className="truncate">{item.style_preset || 'Default'}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <TimeAgo date={item.created_at} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Gallery Page ─────────────────────────────────────────────────────────
export function Gallery({ onAnimate }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getGallery(48)
      setItems(data.items)
      setTotal(data.total)
    } catch (err) {
      setError(err.userMessage || 'Failed to load gallery.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (jobId) => {
    try {
      await deleteGalleryItem(jobId)
      setItems((prev) => prev.filter((i) => i.job_id !== jobId))
      setTotal((prev) => Math.max(0, prev - 1))
      toast.success('Removed from gallery.')
    } catch (err) {
      toast.error(err.userMessage || 'Failed to delete item.')
    }
  }

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all images from the gallery?')) return
    try {
      await clearAllGallery()
      setItems([])
      setTotal(0)
      toast.success('Gallery cleared.')
    } catch (err) {
      toast.error(err.userMessage || 'Failed to clear gallery.')
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="space-y-6">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <LightboxModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onDelete={handleDelete}
            onAnimate={onAnimate}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <span>Creations Gallery</span>
            {total > 0 && (
              <span className="badge bg-brand-500/20 text-brand-300 border-brand-500/30 text-xs">
                {total}
              </span>
            )}
          </h2>
          <p className="text-sm text-white/40 mt-0.5">
            Click any creation to view in crystal-clear full resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Gallery
            </button>
          )}

          <button
            onClick={load}
            disabled={loading}
            className="btn-secondary flex items-center gap-1.5 text-xs py-1.5"
            id="gallery-refresh-btn"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden space-y-2 p-2">
              <div className="skeleton aspect-square rounded-xl" />
              <div className="skeleton h-3 rounded w-3/4 mx-2" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-12 text-red-400 text-sm">{error}</div>
      )}

      {/* Empty */}
      {!loading && !error && items.length === 0 && (
        <div className="text-center py-20 glass rounded-2xl space-y-3">
          <div className="text-5xl">🎨</div>
          <p className="text-white/70 font-semibold text-lg">No creations yet</p>
          <p className="text-white/40 text-sm max-w-sm mx-auto">
            Head over to the Generate tab and type your first prompt to build your personal gallery!
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && items.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {items.map((item) => (
              <GalleryCard
                key={item.job_id}
                item={item}
                onClick={() => setSelectedItem(item)}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
