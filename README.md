<div align="center" id="top">

# ✨ Vision Forge

**Imagine Anything.**

An AI-powered image generation platform that transforms simple text prompts into stunning 8K visuals — instantly.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Netlify-9D4EDD?style=for-the-badge)](https://visions-forge.netlify.app)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Architecture](#️-architecture)
- [AI Engines](#-ai-engines)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [System Configuration](#-system-configuration)
- [Performance Metrics](#-performance-metrics)
- [Project Structure](#-project-structure)
- [Technologies Used](#️-technologies-used)
- [Security & Privacy](#-security--privacy)
- [Deployment](#️-deployment)
- [Best Use Cases](#-best-use-cases)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [Credits & Contact](#-credits--contact)

---

## 📋 Overview

**Vision Forge** lets users describe their vision in plain language and generate ultra-high-definition, crystal-clear images using state-of-the-art AI diffusion models. With curated style presets, multiple AI engines, and a personal creations gallery, it turns imagination into visual reality in seconds.

The platform routes each prompt through a **selectable diffusion engine**, with prompt enhancement and style presets layered on top so results stay consistent and high-fidelity.

---

## 🌐 Live Demo

<div align="center">

### 👉 [**Launch Vision Forge**](https://visions-forge.netlify.app)

*Runs live in your browser — no installation required.*

</div>

---

## ✨ Features

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
- **Job Status Polling** — live progress tracking while an image renders

</td>
</tr>
</table>

---

## 🏗️ Architecture

### Core Components

| Component | Description |
|---|---|
| **Prompt Input & Enhancement** | Captures the prompt and optionally refines it via AI |
| **Style Preset Selector** | Applies curated visual styles before generation |
| **Job Poller** | Tracks generation progress in real time |
| **Creations Gallery** | Stores and displays previously generated images |

### AI Integration

| Layer | Technology |
|---|---|
| **Primary Engine** | FLUX.1 Ultra |
| **Speed Engine** | FLUX.1 Schnell |
| **Alternate Engine** | SDXL Studio |
| **Framework** | React (Vite) frontend, Node.js/Express backend |

---

## ⚡ AI Engines

| Engine | Description |
|---|---|
| **FLUX.1 Ultra** ⭐ | 28-step studio fidelity — *recommended* |
| **FLUX.1 Schnell** | High speed, clean textures |
| **SDXL Studio** | Refined 40-step diffusion |

> Each engine trades off speed against fidelity — switch anytime from the generation panel.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- API credentials for your configured image-generation provider(s)
- Internet connection

### Installation

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

### Running the Application

Visit `http://localhost:3000` in your browser ✨

---

## 📖 Usage

### Generating an Image
1. Type a prompt, or click an **Instant Inspiration** starter
2. (Optional) Click **Enhance Quality** to refine your prompt
3. Pick a **style preset** and set your aspect ratio
4. Choose an **AI engine** and generate

### System Configuration
1. Open **Settings**
2. Add or update your image-generation API credentials
3. Save configuration for persistent access

### Creations Gallery
- Browse previously generated images in full resolution
- Revisit past prompts and settings
- Track in-progress jobs via live status polling

---

## 🔧 System Configuration

### FLUX.1 Ultra
The recommended engine for studio-quality output.
- **Benefits:** highest fidelity, 28-step diffusion
- **Best for:** final, polished visuals

### FLUX.1 Schnell
Optimized for speed without sacrificing texture quality.
- **Benefits:** fast turnaround, clean detail
- **Best for:** quick iteration and drafts

### SDXL Studio
A refined, higher-step diffusion alternative.
- **Benefits:** strong detail at 40 steps
- **Best for:** style-sensitive or complex compositions

---

## 📊 Performance Metrics

| Metric | Value |
|---|---|
| **AI Engines Available** | 3 |
| **Max Output Quality** | 8K |
| **Recommended Engine** | FLUX.1 Ultra |
| **Job Tracking** | Real-time polling |

---

## 📁 Project Structure

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

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js / Express |
| **Database** | Local JSON-based job store |
| **Deployment** | Netlify |

### Dependencies
```
react
vite
tailwindcss
express
dotenv
node-fetch
```

Install all dependencies:
```bash
npm install
```

---

## 🔒 Security & Privacy

- API keys are stored locally in the `.env` file
- The `.env` file should never be committed to version control
- Generated media is stored in the local `uploads/` directory
- Sensitive data is managed through environment variables

---

## ☁️ Deployment

### Netlify (Recommended)
1. Push your code to GitHub
2. Connect the repo to Netlify
3. Add required environment variables in the Netlify dashboard
4. Deploy automatically

### Traditional Server
```bash
npm run dev
```

---

## 💡 Best Use Cases

1. **Concept Art** — quickly visualize cinematic, anime, or fantasy scenes
2. **Product Visualization** — generate clean product photography-style renders
3. **Rapid Prototyping** — iterate on visual ideas with the fast Schnell engine
4. **High-Fidelity Finals** — produce polished, studio-quality output with FLUX.1 Ultra
5. **Style Exploration** — experiment across presets like Watercolor, Pixel Art, and Cyberpunk

---

## 🗺️ Roadmap

- [ ] Video generation support (VideoResult component groundwork already in place)
- [ ] Additional diffusion engine integrations
- [ ] User accounts and cloud-synced gallery
- [ ] Batch generation
- [ ] Upscaling and inpainting tools
- [ ] Mobile app support

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

---

## ❓ FAQ

**Which engine should I use by default?**
FLUX.1 Ultra is recommended for the best overall fidelity. Use FLUX.1 Schnell if you want faster iteration.

**Can I add my own style presets?**
Yes — presets live in the `components/StylePresets` module and can be extended.

**Where are my generated images stored?**
Locally in the `uploads/` directory, and viewable anytime in the Creations Gallery.

**Can I run this locally?**
Yes! Follow the installation steps above to run it on your own machine.

---

## 👤 Credits & Contact

<div align="center">

✨

### Built by [Your Name](https://github.com/your-username)

*"Imagine anything."*

</div>

<br/>

> 📬 **Get in touch** — reach out on [GitHub](https://github.com/your-username), [X / Twitter](https://twitter.com/your-username), or via [email](mailto:support@visionforge.dev).
>
> 🐛 **Found a bug?** [Open an issue](https://github.com/your-username/vision-forge/issues) with a detailed description and I'll take a look.
>
> 💡 **Have an idea for a new style or engine?** [Start a discussion](https://github.com/your-username/vision-forge/discussions) — I'd love to hear it.
>
> ⭐ **Finding Vision Forge useful?** A star on the repo helps others discover it too.

<br/>

Vision Forge is built on **React (Vite) + Tailwind CSS**, powered by **FLUX.1** and **SDXL** diffusion engines, deployed on **Netlify**.

<div align="center">

<br/>

<sub>⭐ If Vision Forge brought your ideas to life, consider giving it a star.</sub>

<br/>

**Version 1.0.0** · Status: ✅ Active & Maintained

<br/>

**[⬆ Back to top](#top)**

</div>
