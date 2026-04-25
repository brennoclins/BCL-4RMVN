import { useState, useEffect } from 'react';
import { Nav } from '../components/layout';
import { useMidiPlayer } from '../hooks/useMidiPlayer';
import {
  PlayerContainer,
  HWLogoSection,
  HWScreen,
  HWControls,
  HWPads,
  HWKeysButtons,
  HWTransport,
  HWVolumeSection,
} from '../components/midi-player';
import type { DrumKitType, MainInstrumentType, BassType, GuitarType, BrassType } from '../types';

export function MidiPlayerPage() {
  const {
    status,
    fileName,
    isPlaying,
    progress,
    formattedTime,
    formattedDuration,
    detectedInstruments,
    loadFile,
    play,
    pause,
    stop,
  } = useMidiPlayer();

  const [soundMode, setSoundMode] = useState<'samples' | 'digital'>('samples');
  const [drumKit, setDrumKit] = useState<DrumKitType>('acoustic');
  const [mainInstrument, setMainInstrument] = useState<MainInstrumentType>('casio');
  const [bass, setBass] = useState<BassType>('finger');
  const [guitar, setGuitar] = useState<GuitarType>('nylon');
  const [brass, setBrass] = useState<BrassType>('trumpet');

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

  const handlePlayPause = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const instruments = Array.from(detectedInstruments.instruments);

  const getStatusText = () => {
    switch (status) {
      case 'idle':
        return 'Select Midi File';
      case 'loading':
        return 'Loading...';
      case 'ready':
        return fileName || 'Ready';
      case 'playing':
        return 'Playing...';
      case 'paused':
        return 'Paused';
      case 'error':
        return 'Error loading file';
      default:
        return 'Select Midi File';
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
        <PlayerContainer>
          <div style={{ gridArea: 'logo' }}>
            <HWLogoSection />
          </div>

          <div style={{ gridArea: 'screen' }}>
            <HWScreen
              modeValue={soundMode === 'samples' ? 'SAMPLES' : 'DIGITAL'}
              status={getStatusText()}
              statusVariant={getStatusVariant()}
              duration={formattedDuration}
            />
          </div>

          <div style={{ gridArea: 'controls' }}>
            <HWControls
              soundMode={soundMode}
              onSoundModeChange={setSoundMode}
              drumKit={drumKit}
              onDrumKitChange={setDrumKit}
              mainInstrument={mainInstrument}
              onMainInstrumentChange={setMainInstrument}
              bass={bass}
              onBassChange={setBass}
              guitar={guitar}
              onGuitarChange={setGuitar}
              brass={brass}
              onBrassChange={setBrass}
              showBass={detectedInstruments.channels.bass}
              showGuitar={detectedInstruments.channels.guitar}
              showBrass={detectedInstruments.channels.brass}
            />
          </div>

          <div style={{ gridArea: 'pads' }}>
            <HWPads instruments={instruments} onFileSelect={loadFile} />
          </div>

          <div style={{ gridArea: 'keys' }}>
            <HWKeysButtons />
          </div>

          <div style={{ gridArea: 'transport' }}>
            <HWTransport
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onStop={stop}
              disabled={status === 'idle' || status === 'loading'}
            />
          </div>

          <div style={{ gridArea: 'volume' }}>
            <HWVolumeSection progress={progress} currentTime={formattedTime} />
          </div>
        </PlayerContainer>
      </main>
    </div>
  );
}
