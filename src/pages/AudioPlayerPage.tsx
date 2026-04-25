import { useEffect } from 'react';
import { Nav } from '@/components/layout';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import {
  AudioPlayerContainer,
  AudioLogoSection,
  AudioScreen,
  AudioPads,
  AudioTransport,
  AudioVolumeSection,
} from '@/components/audio-player';

export function AudioPlayerPage() {
  const {
    status,
    audioData,
    isPlaying,
    progress,
    formattedTime,
    formattedDuration,
    loadFile,
    play,
    pause,
    stop,
    seek,
  } = useAudioPlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (isPlaying) {
          pause();
        } else {
          play();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, play, pause]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'idle':
        return 'Select Audio File';
      case 'loading':
        return 'Loading...';
      case 'ready':
        return audioData?.name || 'Ready';
      case 'playing':
        return 'Playing...';
      case 'paused':
        return 'Paused';
      case 'error':
        return 'Error loading file';
      default:
        return 'Select Audio File';
    }
  };

  const getStatusVariant = () => {
    if (status === 'error') return 'error';
    if (status === 'ready' || status === 'playing' || status === 'paused') return 'ready';
    return 'default';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav variant="player" />

      <main className="flex-1 flex items-center justify-center p-8">
        <AudioPlayerContainer>
          <div style={{ gridArea: 'logo' }}>
            <AudioLogoSection />
          </div>

          <div style={{ gridArea: 'screen' }}>
            <AudioScreen
              status={getStatusText()}
              statusVariant={getStatusVariant()}
              duration={formattedDuration}
            />
          </div>

          <div style={{ gridArea: 'pads' }}>
            <AudioPads onFileSelect={loadFile} />
          </div>

          <div style={{ gridArea: 'transport' }}>
            <AudioTransport
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onStop={stop}
              disabled={status === 'idle' || status === 'loading'}
            />
          </div>

          <div style={{ gridArea: 'volume' }}>
            <AudioVolumeSection
              progress={progress}
              currentTime={formattedTime}
              onProgressClick={seek}
            />
          </div>
        </AudioPlayerContainer>
      </main>
    </div>
  );
}
