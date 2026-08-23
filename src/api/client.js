import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

// Response interceptor — normalise errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const detail = err.response?.data?.detail
    if (typeof detail === 'object') {
      err.userMessage = detail.message || 'Something went wrong.'
      err.isRateLimit = detail.error === 'rate_limit_exceeded'
    } else if (typeof detail === 'string') {
      err.userMessage = detail
    } else {
      err.userMessage = err.message || 'Network error. Please try again.'
    }
    return Promise.reject(err)
  }
)

export const generateImage = (payload) =>
  api.post('/generate/image', payload).then((r) => r.data)

export const generateVideo = (payload) =>
  api.post('/generate/video', payload).then((r) => r.data)

export const getJob = (jobId) =>
  api.get(`/jobs/${jobId}`).then((r) => r.data)

export const getGallery = (limit = 20, offset = 0) =>
  api.get('/gallery', { params: { limit, offset } }).then((r) => r.data)

export const deleteGalleryItem = (jobId) =>
  api.delete(`/gallery/${jobId}`).then((r) => r.data)

export const clearAllGallery = () =>
  api.delete('/gallery').then((r) => r.data)

export const getPresets = () =>
  api.get('/generate/presets').then((r) => r.data)

export const getTokenStatus = () =>
  api.get('/generate/token-status').then((r) => r.data)

export const setApiToken = (token) =>
  api.post('/generate/set-token', { token }).then((r) => r.data)

export default api
