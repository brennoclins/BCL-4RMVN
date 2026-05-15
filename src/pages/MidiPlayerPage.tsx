import { useState, useEffect, useCallback } from 'react';
import { useMidiPlayer } from '../hooks/useMidiPlayer';
import {
  PlayerContainer,
  HWLogoSection,
  HWScreen,
  HWPads,
  HWTransport,
  HWVolumeSection,
  InstrumentPads,
} from '../components/midi-player';
import type {
  DrumKitType,
  MainInstrumentType,
  BassType,
  GuitarType,
  BrassType,
  StringsType,
  SynthType,
  OrganType,
} from '../types';

export function MidiPlayerPage() {
  const {
    status,
    fileName,
    midiData,
    isPlaying,
    progress,
    formattedTime,
    formattedDuration,
    detectedInstruments,
    loadFile,
    play,
    pause,
    stop,
    setTrackMute,
    setInstrumentSelections,
  } = useMidiPlayer();

  const [drumKit, setDrumKit] = useState<DrumKitType>('acoustic');
  const [mainInstrument, setMainInstrument] = useState<MainInstrumentType>('casio');
  const [bass, setBass] = useState<BassType>('finger');
  const [guitar, setGuitar] = useState<GuitarType>('nylon');
  const [brass, setBrass] = useState<BrassType>('trumpet');
  const [strings, setStrings] = useState<StringsType>('strings');
  const [synth, setSynth] = useState<SynthType>('lead');
  const [organ, setOrgan] = useState<OrganType>('church');

  const applyInstrumentChanges = useCallback(() => {
    setInstrumentSelections({
      drumKit,
      mainInstrument,
      bass,
      guitar,
      brass,
      strings,
      synth,
      organ,
    });
  }, [drumKit, mainInstrument, bass, guitar, brass, strings, synth, organ, setInstrumentSelections]);

  useEffect(() => {
    applyInstrumentChanges();
  }, [applyInstrumentChanges]);

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

  const trackList = midiData
    ? midiData.tracks.map((track, index) => ({
        index,
        name: track.name,
        channel: track.channel,
        muted: track.muted,
        noteCount: track.notes.length,
      }))
    : [];

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
            modeValue="SAMPLES"
            status={getStatusText()}
            statusVariant={getStatusVariant()}
            duration={formattedDuration}
          />
        </div>

        <div className="col-start-1 row-start-2 row-span-2">
          <HWPads
            tracks={trackList}
            onFileSelect={loadFile}
            onToggleMute={setTrackMute}
          />
        </div>

        <div className="col-start-2 col-span-3 row-start-3">
          <HWTransport
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onStop={stop}
            disabled={status === 'idle' || status === 'loading'}
          />
        </div>

        <div className="col-span-3 row-start-4">
          <HWVolumeSection progress={progress} currentTime={formattedTime} />
        </div>

        <div className="col-span-3 row-start-5">
          <InstrumentPads
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
            strings={strings}
            onStringsChange={setStrings}
            synth={synth}
            onSynthChange={setSynth}
            organ={organ}
            onOrganChange={setOrgan}
            showBass={detectedInstruments.channels.bass}
            showGuitar={detectedInstruments.channels.guitar}
            showBrass={detectedInstruments.channels.brass}
          />
        </div>
      </PlayerContainer>
    </div>
  );
}
