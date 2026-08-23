import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '../data')
const DB_FILE = path.join(DATA_DIR, 'jobs.json')

let jobs = []

function loadData() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8')
      jobs = JSON.parse(raw || '[]')
    } else {
      jobs = []
      fs.writeFileSync(DB_FILE, '[]', 'utf8')
    }
  } catch (err) {
    console.error('Error loading DB file, resetting:', err)
    jobs = []
  }
}

function saveData() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(jobs, null, 2), 'utf8')
  } catch (err) {
    console.error('Error saving DB file:', err)
  }
}

export function initDB() {
  loadData()
  console.log(`✅ Pure JS database initialised at ${DB_FILE} (${jobs.length} jobs loaded)`)
}

export const jobQueries = {
  create: (job) => {
    const now = new Date().toISOString()
    const newJob = {
      ...job,
      created_at: now,
      updated_at: now,
    }
    jobs.unshift(newJob)
    saveData()
    return newJob
  },

  getById: (id) => {
    return jobs.find((j) => j.id === id) || null
  },

  updateStatus: (id, status, outputUrl = null, errorMsg = null) => {
    const job = jobs.find((j) => j.id === id)
    if (job) {
      job.status = status
      if (outputUrl) job.output_url = outputUrl
      if (errorMsg) job.error_msg = errorMsg
      job.updated_at = new Date().toISOString()
      saveData()
    }
    return job
  },

  countTodayByIP: (ip) => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    return jobs.filter(
      (j) => j.ip_address === ip && j.status !== 'failed' && j.created_at >= oneDayAgo
    ).length
  },

  getGallery: (limit = 24, offset = 0) => {
    const doneJobs = jobs.filter((j) => j.status === 'done')
    return doneJobs.slice(offset, offset + limit)
  },

  countDone: () => {
    return jobs.filter((j) => j.status === 'done').length
  },

  delete: (id) => {
    const idx = jobs.findIndex((j) => j.id === id)
    if (idx !== -1) {
      const removed = jobs.splice(idx, 1)[0]
      saveData()
      // Try to clean up local file if present
      if (removed.output_url && removed.output_url.startsWith('/uploads/')) {
        try {
          const filePath = path.join(__dirname, '..', removed.output_url)
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        } catch (e) {
          console.warn('Could not delete local file:', e.message)
        }
      }
      return true
    }
    return false
  },

  clearGallery: () => {
    const toDelete = jobs.filter((j) => j.status === 'done')
    jobs = jobs.filter((j) => j.status !== 'done')
    saveData()
    // Cleanup files
    for (const item of toDelete) {
      if (item.output_url && item.output_url.startsWith('/uploads/')) {
        try {
          const filePath = path.join(__dirname, '..', item.output_url)
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        } catch (e) {
          // ignore
        }
      }
    }
    return toDelete.length
  },
}
