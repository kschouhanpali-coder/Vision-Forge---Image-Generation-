# ✨ AI Image & Video Generation Tool (Node.js + React)

A full-stack web app that turns text prompts into AI-generated images (via **Stable Diffusion XL**) and animates them into short videos (via **Stable Video Diffusion**) — powered by [Replicate](https://replicate.com).

Built using **Node.js (Express)**, **SQLite**, and **React (Vite + Tailwind CSS)**. **No Docker, Postgres, or Celery required!**

---

## 🏗️ Architecture

```
┌─────────────────────────┐          ┌─────────────────────────┐
│     React Frontend      │  :3000   │     Express Backend     │  :8000
│  (Vite + Tailwind CSS)  │ ───────▶ │     (Node.js REST API)  │
└─────────────────────────┘          └────────────┬────────────┘
                                                  │
                                     ┌────────────┴────────────┐
                                     │  SQLite DB (jobs.db)    │
                                     │  Replicate API (SDXL)   │
                                     │  Local Uploads Storage  │
                                     └─────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

### 2. Setup

```bash
# 1. Install all dependencies (backend + frontend)
npm run install:all

# 2. Configure environment
cp .env.example .env
```

Open `.env` and set your Replicate API token:
```env
REPLICATE_API_TOKEN=r8_your_actual_token_here
PORT=8000
```
*(Get a free token at [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens))*

---

### 3. Run Development Server

```bash
npm run dev
```

This concurrently starts:
- 🚀 **Backend API**: `http://localhost:8000`
- 🎨 **Frontend UI**: `http://localhost:3000`

Visit **`http://localhost:3000`** in your browser!

---

## 📦 Production Build & Run

```bash
# 1. Build the frontend
npm run build

# 2. Start the production server
npm start
```
Your app will be served on `http://localhost:8000`.

---

## 🎨 Features & Presets

- **Image Generation**: Text-to-image with customizable dimensions & negative prompt
- **Video Animation**: 1-click "Animate this" to turn any generated image into an animated video
- **8 Style Presets**: 🎬 Cinematic, 🌸 Anime, 📦 Product Photo, 🖼️ Oil Painting, 🌆 Cyberpunk, 💧 Watercolor, 🕹️ Pixel Art, 📷 Photorealistic
- **Live Polling**: Real-time progress animation with tip rotation
- **Local Gallery**: Visual grid of all your creations with hover video playback and downloads
- **IP Rate Limiting**: Built-in daily generation limit (configurable in `.env`)
