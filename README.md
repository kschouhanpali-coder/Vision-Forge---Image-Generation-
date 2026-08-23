# ✨ Vision Forge

**Imagine Anything.** Vision Forge is an AI-powered image generation platform that transforms simple text prompts into stunning 8K visuals — instantly.

🔗 **Live Demo:** [https://visions-forge.netlify.app](https://visions-forge.netlify.app)

---

## 🖼️ Overview

Vision Forge lets users describe their vision in plain language and generate ultra-high-definition, crystal-clear images using state-of-the-art AI diffusion models. With curated style presets, multiple AI engines, and a personal creations gallery, it turns imagination into visual reality in seconds.

---

## 🚀 Features

- **Instant Inspiration Prompts** – One-click starter prompts (Cosmic Astronaut, Neon Cyberpunk, Enchanted Shrine, Luxury Watch, and more)
- **Multiple AI Engines**
  - ⚡ FLUX.1 Ultra – 28-step studio fidelity (Recommended)
  - 🚀 FLUX.1 Schnell – High speed, clean textures
  - 🎨 SDXL Studio – Refined 40-step diffusion
- **Style Presets** – Cinematic, Anime, Product Photo, Oil Painting, Cyberpunk, Watercolor, Pixel Art, Photorealistic
- **Prompt Enhancement** – "Enhance Quality" for AI-optimized prompt refinement
- **Custom Aspect Ratio & Canvas Dimensions**
- **Creations Gallery** – View, revisit, and manage previously generated images in full resolution
- **Ultra-HD Image Generation** – One-click generation of high-fidelity outputs

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js / Express
- **Database:** Local JSON-based job store
- **Deployment:** Netlify

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── api/            # API client
│   ├── components/     # UI components (Logo, PromptInput, StylePresets, ImageResult, VideoResult, JobStatus)
│   ├── hooks/           # Custom hooks (useJobPoller)
│   ├── styles/          # Global styles
│   ├── App.jsx
│   └── main.jsx
├── public/
└── index.html

server/                 # Backend API server
uploads/                 # Generated media storage
```

---

## ⚙️ Getting Started

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Run the development server
   ```bash
   npm run dev
   ```
5. Visit `http://localhost:3000`

---

## 🌐 Live Application

Try it now: **[visions-forge.netlify.app](https://visions-forge.netlify.app)**

---

## 📄 License

This project is open for personal and educational use. Please credit appropriately if reused.
