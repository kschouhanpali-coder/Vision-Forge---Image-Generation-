import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import { initDB } from './db.js'
import generateRoutes from './routes/generate.js'
import jobsRoutes from './routes/jobs.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 8000

// Initialize Database
initDB()

// Middleware
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static uploads folder
const uploadsDir = path.join(__dirname, '../uploads')
fs.mkdirSync(uploadsDir, { recursive: true })
app.use('/uploads', express.static(uploadsDir))

// API Routes
app.use('/generate', generateRoutes)
app.use('/', jobsRoutes)

// Production static frontend serving
const frontendDist = path.join(__dirname, '../frontend/dist')
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/generate') || req.path.startsWith('/jobs') || req.path.startsWith('/gallery') || req.path.startsWith('/uploads')) {
      return next()
    }
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ error: 'internal_server_error', message: err.message || 'Something went wrong.' })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Server listening on http://localhost:${PORT}`)
  console.log(`📡 API Health: http://localhost:${PORT}/health\n`)
})
