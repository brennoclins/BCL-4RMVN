import { useState, useCallback, useRef } from 'react';
import { formatTime } from '../utils/helpers';

interface AudioPlayerState {
  audioData: { name: string; duration: number } | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  status: 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error';
  error: string | null;
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    audioData: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    status: 'idle',
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearProgressInterval = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const loadFile = useCallback((file: File) => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }));

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener('loadedmetadata', () => {
        setState((prev) => ({
          ...prev,
          audioData: { name: file.name, duration: audio.duration },
          duration: audio.duration,
          status: 'ready',
        }));
      });

      audio.addEventListener('error', () => {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: 'Failed to load audio file',
        }));
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load audio',
      }));
    }
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return;

    const currentPause = state.status === 'paused';

    try {
      await audioRef.current.play();

      if (!currentPause) {
        audioRef.current.currentTime = 0;
      }

      setState((prev) => ({
        ...prev,
        status: 'playing',
        isPlaying: true,
      }));

      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration || 0;
          const progress = (currentTime / duration) * 100;

          setState((prev) => ({
            ...prev,
            currentTime,
            progress,
          }));
        }
      }, 50);
    } catch {
      setState((prev) => ({ ...prev, status: 'error', error: 'Playback failed' }));
    }
  }, [state.status]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    clearProgressInterval();

    setState((prev) => ({
      ...prev,
      status: 'paused',
      isPlaying: false,
    }));
  }, [clearProgressInterval]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    clearProgressInterval();

    setState((prev) => ({
      ...prev,
      status: 'ready',
      isPlaying: false,
      currentTime: 0,
      progress: 0,
    }));
  }, [clearProgressInterval]);

  const seek = useCallback((progress: number) => {
    if (audioRef.current) {
      const newTime = (progress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setState((prev) => ({
        ...prev,
        currentTime: newTime,
        progress,
      }));
    }
  }, []);

  return {
    ...state,
    loadFile,
    play,
    pause,
    stop,
    seek,
    formattedTime: formatTime(state.currentTime),
    formattedDuration: formatTime(state.duration),
  };
}
