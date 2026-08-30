<div align="center">

# ✨ Vision Forge

**Imagine Anything.**

An AI-powered image generation platform that transforms simple text prompts into stunning 8K visuals — instantly.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_Now-9D4EDD?style=for-the-badge)](https://visions-forge.netlify.app)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

</div>

---

## 📖 Table of Contents

- [Overview](#️-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [AI Engines](#-ai-engines)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#️-getting-started)

---

## 🖼️ Overview

**Vision Forge** lets users describe their vision in plain language and generate ultra-high-definition, crystal-clear images using state-of-the-art AI diffusion models. With curated style presets, multiple AI engines, and a personal creations gallery, it turns imagination into visual reality in seconds.

---

## 🌐 Live Demo

<div align="center">

### 👉 [**Launch Vision Forge**](https://visions-forge.netlify.app)

*Runs live in your browser — no installation required.*

</div>

---

## 🚀 Features

<table>
<tr>
<td valign="top" width="50%">

### 🎨 Creation Tools
- **Instant Inspiration Prompts** — one-click starters (Cosmic Astronaut, Neon Cyberpunk, Enchanted Shrine, Luxury Watch, and more)
- **Style Presets** — Cinematic, Anime, Product Photo, Oil Painting, Cyberpunk, Watercolor, Pixel Art, Photorealistic
- **Prompt Enhancement** — "Enhance Quality" for AI-optimized prompt refinement
- **Custom Aspect Ratio & Canvas Dimensions**

</td>
<td valign="top" width="50%">

### 🖼️ Output & Management
- **Multiple AI Engines** — choose the model that fits your speed/fidelity needs
- **Ultra-HD Image Generation** — one-click generation of high-fidelity outputs
- **Creations Gallery** — view, revisit, and manage previously generated images in full resolution

</td>
</tr>
</table>

---

## ⚡ AI Engines

| Engine | Description |
|---|---|
| **FLUX.1 Ultra** ⭐ | 28-step studio fidelity — *recommended* |
| **FLUX.1 Schnell** | High speed, clean textures |
| **SDXL Studio** | Refined 40-step diffusion |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js / Express |
| **Database** | Local JSON-based job store |
| **Deployment** | Netlify |

---

## 📂 Project Structure

```bash
frontend/
├── src/
│   ├── api/               # API client
│   ├── components/        # UI components (Logo, PromptInput, StylePresets, ImageResult, VideoResult, JobStatus)
│   ├── hooks/              # Custom hooks (useJobPoller)
│   ├── styles/             # Global styles
│   ├── App.jsx
│   └── main.jsx
├── public/
└── index.html

server/                     # Backend API server
uploads/                    # Generated media storage
```

---

## ⚙️ Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/your-username/vision-forge.git
cd vision-forge
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

See `.env.example` for required variables.

**4. Run the development server**
```bash
npm run dev
```

**5. Open the app**

Visit [http://localhost:3000](http://localhost:3000) ✨
