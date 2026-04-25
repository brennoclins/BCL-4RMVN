import { useState, useCallback } from 'react'
import { toneService } from '@/services/toneService'

export function useTone() {
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const start = useCallback(async () => {
    if (isReady) return
    setIsLoading(true)
    try {
      await toneService.start()
      setIsReady(true)
    } finally {
      setIsLoading(false)
    }
  }, [isReady])

  const stop = useCallback(() => {
    toneService.stopAll()
  }, [])

  const setTempo = useCallback((bpm: number) => {
    toneService.setTempo(bpm)
  }, [])

  return {
    isReady,
    isLoading,
    start,
    stop,
    setTempo,
  }
}