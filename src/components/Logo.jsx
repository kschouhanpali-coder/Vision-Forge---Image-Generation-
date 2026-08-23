import React from 'react'

export function LogoIcon({ className = 'w-8 h-8', ...props }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Background Gradient */}
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="50%" stopColor="#2E1065" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Left Wing (Vision) - Cyan to Indigo */}
        <linearGradient id="wing-left" x1="20%" y1="20%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Right Wing (Forge) - Electric Purple to Rose */}
        <linearGradient id="wing-right" x1="80%" y1="20%" x2="30%" y2="90%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="40%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        {/* Forge Bridge Wing */}
        <linearGradient id="forge-bridge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        {/* Radial Ambient Glow */}
        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
        </radialGradient>

        {/* Shadow Filters */}
        <filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
        </filter>
        <filter id="core-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Squircle Base */}
      <rect width="100" height="100" rx="24" fill="url(#bg-grad)" />

      {/* Subtle Rim Light */}
      <rect
        x="0.75"
        y="0.75"
        width="98.5"
        height="98.5"
        rx="23.25"
        fill="none"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1.5"
      />

      {/* Ambient Center Glow */}
      <circle cx="50" cy="50" r="36" fill="url(#center-glow)" />

      {/* ── Geometric Interlocking "VF" Prism Mark ── */}
      <g filter="url(#icon-shadow)">
        {/* Left Wing (Vision 'V' Sweep) */}
        <path
          d="M 23 26 
             C 24 26, 32 36, 42 58 
             L 50 75 
             L 37 75 
             C 32 64, 21 42, 19 30 
             C 18 27, 20 26, 23 26 Z"
          fill="url(#wing-left)"
        />

        {/* Right Wing (Forge 'F' Blade) */}
        <path
          d="M 77 26 
             C 76 26, 68 36, 58 58 
             L 50 75 
             L 63 75 
             C 68 64, 79 42, 81 30 
             C 82 27, 80 26, 77 26 Z"
          fill="url(#wing-right)"
        />

        {/* Forge Intersecting Energy Bridge (Forms the 'F' bar + Prism Core) */}
        <path
          d="M 38 42 
             L 76 42 
             C 79 42, 80 46, 77 48 
             L 58 58 
             L 45 46 
             C 42 43, 40 42, 38 42 Z"
          fill="url(#forge-bridge)"
          opacity="0.9"
        />

        {/* Radiant Center Spark (The Forge Spark / Creation Point) */}
        <path
          d="M 50 32 
             C 50 43, 43 50, 32 50 
             C 43 50, 50 57, 50 68 
             C 50 57, 57 50, 68 50 
             C 57 50, 50 43, 50 32 Z"
          fill="#FFFFFF"
          filter="url(#core-glow)"
        />

        {/* Core Diamond Pivot */}
        <circle cx="50" cy="50" r="2.5" fill="#38BDF8" />
      </g>
    </svg>
  )
}

export function Logo({ className = '', iconSize = 'w-8 h-8', showText = true, textClassName = '' }) {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-brand">
        <LogoIcon className={`${iconSize} rounded-[24%] shadow-xl`} />
      </div>
      {showText && (
        <div className="flex items-center tracking-tight font-display text-[19px] font-bold">
          <span className="text-white">Vision</span>
          <span className="ml-1.5 bg-gradient-to-r from-brand-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Forge
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
