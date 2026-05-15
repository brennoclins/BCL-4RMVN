import { useState, useEffect } from 'react';
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
    isLooping,
    bpm,
    volume,
    progress,
    formattedTime,
    formattedDuration,
    detectedInstruments,
    loadFile,
    play,
    pause,
    stop,
    setVolume,
    setDigital,
    toggleLoop,
    seek,
  } = useMidiPlayer();

  const [soundMode, setSoundMode] = useState<'samples' | 'digital'>('samples');
  const [drumKit, setDrumKit] = useState<DrumKitType>('acoustic');
  const [mainInstrument, setMainInstrument] = useState<MainInstrumentType>('casio');
  const [bass, setBass] = useState<BassType>('finger');
  const [guitar, setGuitar] = useState<GuitarType>('nylon');
  const [brass, setBrass] = useState<BrassType>('trumpet');

  useEffect(() => {
    setDigital(soundMode === 'digital');
  }, [soundMode, setDigital]);

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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stop();
    };
  }, [isPlaying, play, pause, stop]);

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
    <div className="flex items-center justify-center p-4 md:p-8">
      <PlayerContainer>
        <div className="col-start-1 row-start-1">
          <HWLogoSection />
        </div>

        <div className="col-start-2 row-start-1 col-span-2">
          <HWScreen
            modeValue={soundMode === 'samples' ? 'SAMPLES' : 'DIGITAL'}
            status={getStatusText()}
            statusVariant={getStatusVariant()}
            duration={formattedDuration}
            bpm={bpm}
            isLooping={isLooping}
          />
        </div>

        <div className="col-start-4 row-start-1 row-span-2">
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

        <div className="col-start-1 row-start-2 row-span-2">
          <HWPads instruments={instruments} onFileSelect={loadFile} />
        </div>

        <div className="col-start-4 row-start-3">
          <HWKeysButtons />
        </div>

        <div className="col-start-2 col-span-3 row-start-3">
          <HWTransport
            isPlaying={isPlaying}
            isLooping={isLooping}
            onPlayPause={handlePlayPause}
            onStop={stop}
            onToggleLoop={toggleLoop}
            disabled={status === 'idle' || status === 'loading'}
          />
        </div>

        <div className="col-span-3 row-start-4">
          <HWVolumeSection
            progress={progress}
            currentTime={formattedTime}
            volume={volume}
            onProgressClick={seek}
            onVolumeChange={setVolume}
          />
        </div>
      </PlayerContainer>
    </div>
  );
}
