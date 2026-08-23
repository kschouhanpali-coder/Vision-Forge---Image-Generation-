import { useState, useEffect, useRef, useCallback } from 'react'
import { getJob } from '../api/client'

const POLL_INTERVAL_MS = 2000
const TERMINAL_STATUSES = new Set(['done', 'failed'])

/**
 * useJobPoller — polls GET /jobs/:jobId every 2s until done or failed.
 *
 * @param {string|null} jobId  — set to null to stop polling
 * @returns {{ job, isPolling, error }}
 */
export function useJobPoller(jobId) {
  const [job, setJob] = useState(null)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState(null)
  const timerRef = useRef(null)
  const activeJobId = useRef(null)

  const stopPolling = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsPolling(false)
  }, [])

  const poll = useCallback(async (id) => {
    try {
      const data = await getJob(id)
      // Ignore stale responses if jobId has changed
      if (activeJobId.current !== id) return

      setJob(data)

      if (TERMINAL_STATUSES.has(data.status)) {
        stopPolling()
      }
    } catch (err) {
      if (activeJobId.current !== id) return
      setError(err.userMessage || 'Failed to fetch job status.')
      stopPolling()
    }
  }, [stopPolling])

  useEffect(() => {
    // Reset when jobId changes
    stopPolling()
    setJob(null)
    setError(null)

    if (!jobId) return

    activeJobId.current = jobId
    setIsPolling(true)

    // Poll immediately then every POLL_INTERVAL_MS
    poll(jobId)
    timerRef.current = setInterval(() => poll(jobId), POLL_INTERVAL_MS)

    return () => stopPolling()
  }, [jobId, poll, stopPolling])

  return { job, isPolling, error }
}
