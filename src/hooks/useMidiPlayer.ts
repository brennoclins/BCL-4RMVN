import { useState, useCallback, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import type { MidiData } from '../types';
import { getDuration, detectInstruments } from '../services/midiParser';
import { formatTime } from '../utils/helpers';
import { toneService, getInstrumentConfig } from '../services/toneService';

interface MidiPlayerState {
  midiData: MidiData | null;
  fileName: string | null;
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  bpm: number;
  isLooping: boolean;
  isDigital: boolean;
  detectedInstruments: {
    instruments: Set<string>;
    channels: { bass: boolean; guitar: boolean; brass: boolean };
  };
  status: 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error';
  error: string | null;
}

export function useMidiPlayer() {
  const [state, setState] = useState<MidiPlayerState>({
    midiData: null,
    fileName: null,
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    volume: 0,
    bpm: 120,
    isLooping: false,
    isDigital: false,
    detectedInstruments: {
      instruments: new Set(),
      channels: { bass: false, guitar: false, brass: false },
    },
    status: 'idle',
    error: null,
  });

  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const midiDataRef = useRef<MidiData | null>(null);
  const pauseRef = useRef<() => void>(() => {});
  const volumeRef = useRef<number>(0);
  const isLoopingRef = useRef(false);
  const instrumentSetRef = useRef<InstrumentSet | null>(null);

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      const tone = toneService.get();
      if (tone) {
        tone.Transport.stop();
        tone.Transport.cancel();
      }

      if (instrumentSetRef.current) {
        Object.values(instrumentSetRef.current).forEach((inst) => {
          if (inst) {
            try { inst.dispose(); } catch { /* ignore */ }
          }
        });
        instrumentSetRef.current = null;
      }
    };
  }, []);

  const pause = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    const tone = toneService.get();
    if (tone) {
      tone.Transport.stop();
      tone.Transport.cancel();
    }

    setState((prev) => ({
      ...prev,
      status: 'paused',
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  pauseRef.current = pause;

  const loadFile = useCallback(async (file: File) => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    toneService.stopAll();

    try {
      const arrayBuffer = await file.arrayBuffer();
      const midi = new Midi(arrayBuffer);

      const midiData: MidiData = {
        tracks: midi.tracks.map((track) => ({
          channel: track.channel,
          program: (track as { program?: number }).program,
          notes: track.notes.map((note) => ({
            name: note.name,
            time: note.time,
            duration: note.duration,
            velocity: note.velocity,
          })),
        })),
      };

      const duration = getDuration(midiData);
      const detectedInstruments = detectInstruments(midiData);

      midiDataRef.current = midiData;
      durationRef.current = duration;

      setState((prev) => ({
        ...prev,
        midiData,
        fileName: file.name,
        duration,
        detectedInstruments,
        status: 'ready',
        progress: 0,
        currentTime: 0,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load MIDI file',
      }));
    }
  }, []);

  const play = useCallback(async () => {
    const data = midiDataRef.current;
    if (!data || !data.tracks.length) return;

    await toneService.start();
    toneService.stopAll();

    setState((prev) => ({
      ...prev,
      status: 'playing',
      isPlaying: true,
      isPaused: false,
    }));

    const tone = await toneService.init();
    const instrumentSet = createInstruments(tone, 'acoustic', 'casio', state.isDigital);
    instrumentSetRef.current = instrumentSet;

    if (!state.isDigital) {
      try {
        await Tone.loaded();
      } catch {
        // If samples fail to load, continue anyway (fallback to synth)
      }
    }

    startTimeRef.current = Date.now();

    for (const track of data.tracks) {
      for (const note of track.notes) {
        tone.Transport.schedule((time) => {
          const instrument = getInstrumentForTrack(track, instrumentSet);
          if (instrument && typeof instrument.triggerAttackRelease === 'function') {
            instrument.triggerAttackRelease(note.name, note.duration, time, note.velocity);
          }
        }, note.time);
      }
    }

    tone.Transport.start();

    progressInterval.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const dur = durationRef.current;
      const progress = dur > 0 ? Math.min((elapsed / dur) * 100, 100) : 0;

      setState((prev) => ({
        ...prev,
        currentTime: elapsed,
        progress,
      }));

      if (dur > 0 && elapsed >= dur) {
        if (isLoopingRef.current) {
          pauseRef.current();
          play();
        } else {
          pauseRef.current();
        }
      }
    }, 50);
  }, [state.isDigital]);

  const stop = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    toneService.stopAll();

    if (instrumentSetRef.current) {
      Object.values(instrumentSetRef.current).forEach((inst) => {
        if (inst) {
          try { inst.dispose(); } catch { /* ignore */ }
        }
      });
      instrumentSetRef.current = null;
    }

    setState((prev) => ({
      ...prev,
      status: 'ready',
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      progress: 0,
    }));
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(-60, Math.min(0, vol));
    volumeRef.current = clamped;

    const tone = toneService.get();
    if (tone) {
      Tone.Destination.volume.value = clamped;
    }

    setState((prev) => ({ ...prev, volume: clamped }));
  }, []);

  const setBpm = useCallback((bpm: number) => {
    const clamped = Math.max(20, Math.min(300, bpm));

    const tone = toneService.get();
    if (tone) {
      tone.Transport.bpm.value = clamped;
    }

    setState((prev) => ({ ...prev, bpm: clamped }));
  }, []);

  const toggleLoop = useCallback(() => {
    setState((prev) => {
      const newLoop = !prev.isLooping;
      isLoopingRef.current = newLoop;
      return { ...prev, isLooping: newLoop };
    });
  }, []);

  const toggleDigital = useCallback(() => {
    setState((prev) => ({ ...prev, isDigital: !prev.isDigital }));
  }, []);

  const seek = useCallback((progress: number) => {
    const dur = durationRef.current;
    if (dur <= 0) return;

    const targetTime = (progress / 100) * dur;
    const tone = toneService.get();
    if (!tone) return;

    const wasPlaying = state.isPlaying;

    tone.Transport.stop();
    tone.Transport.cancel();

    startTimeRef.current = Date.now() - targetTime * 1000;

    const data = midiDataRef.current;
    if (!data) return;

    const instrumentSet = createInstruments(tone, 'acoustic', 'casio', state.isDigital);
    instrumentSetRef.current = instrumentSet;

    for (const track of data.tracks) {
      for (const note of track.notes) {
        if (note.time >= targetTime) {
          tone.Transport.schedule((time) => {
            const instrument = getInstrumentForTrack(track, instrumentSet);
            if (instrument && typeof instrument.triggerAttackRelease === 'function') {
              instrument.triggerAttackRelease(note.name, note.duration, time, note.velocity);
            }
          }, note.time);
        }
      }
    }

    if (wasPlaying) {
      tone.Transport.start();
    } else {
      tone.Transport.position = targetTime;
    }

    setState((prev) => ({
      ...prev,
      currentTime: targetTime,
      progress,
    }));
  }, [state.isPlaying, state.isDigital]);

  return {
    ...state,
    loadFile,
    play,
    pause,
    stop,
    setVolume,
    setBpm,
    toggleLoop,
    toggleDigital,
    seek,
    formattedTime: formatTime(state.currentTime),
    formattedDuration: formatTime(state.duration),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Instrument = any;

interface InstrumentSet {
  drums: Instrument;
  main: Instrument;
  bass: Instrument;
  guitar: Instrument;
  brass: Instrument;
  strings: Instrument;
  synth: Instrument;
}

function createInstruments(
  tone: Awaited<ReturnType<typeof toneService.init>>,
  drumKit: string,
  mainInstrument: string,
  digital = false
): InstrumentSet {
  if (digital) {
    return {
      drums: new tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 6,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2 },
      }).toDestination(),
      main: new tone.PolySynth(tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.3, sustain: 0.1, release: 0.5 },
      }).toDestination(),
      bass: new tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 6,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.3, sustain: 0.01, release: 0.3 },
      }).toDestination(),
      guitar: new tone.PolySynth(tone.Synth, {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.3 },
      }).toDestination(),
      brass: new tone.PolySynth(tone.Synth, {
        oscillator: { type: 'square' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 },
      }).toDestination(),
      strings: new tone.PolySynth(tone.Synth, {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.3, decay: 0.2, sustain: 0.5, release: 0.8 },
      }).toDestination(),
      synth: new tone.PolySynth(tone.Synth, {
        oscillator: { type: 'square' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 },
      }).toDestination(),
    };
  }

  const drumConfig = getInstrumentConfig('drums', drumKit);
  const mainConfig = getInstrumentConfig('main', mainInstrument);

  return {
    drums: drumConfig
      ? new tone.Sampler({
          urls: drumConfig.urls,
          baseUrl: drumConfig.baseUrl,
        }).toDestination()
      : new tone.MembraneSynth({
          pitchDecay: 0.05,
          octaves: 6,
          oscillator: { type: 'sine' },
          envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2 },
        }).toDestination(),
    main: mainConfig
      ? new tone.Sampler({
          urls: mainConfig.urls,
          baseUrl: mainConfig.baseUrl,
        }).toDestination()
      : new tone.PolySynth(tone.Synth, {
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.005, decay: 0.3, sustain: 0.1, release: 0.5 },
        }).toDestination(),
    bass: new tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'square' },
      envelope: { attack: 0.001, decay: 0.3, sustain: 0.01, release: 0.3 },
    }).toDestination(),
    guitar: new tone.PolySynth(tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.3 },
    }).toDestination(),
    brass: new tone.PolySynth(tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 },
    }).toDestination(),
    strings: new tone.PolySynth(tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.3 },
    }).toDestination(),
    synth: new tone.PolySynth(tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 },
    }).toDestination(),
  };
}

function getInstrumentForTrack(
  track: { channel: number; program?: number },
  instrumentSet: InstrumentSet
): Instrument {
  if (track.channel === 9) return instrumentSet.drums;

  if (track.program !== undefined) {
    const prog = track.program;
    if (prog <= 7) return instrumentSet.main;
    if (prog >= 24 && prog <= 31) return instrumentSet.guitar || instrumentSet.main;
    if (prog >= 32 && prog <= 39) return instrumentSet.bass || instrumentSet.main;
    if (prog >= 40 && prog <= 55) return instrumentSet.strings || instrumentSet.main;
    if (prog >= 56 && prog <= 63) return instrumentSet.brass || instrumentSet.main;
    if (prog >= 80) return instrumentSet.synth || instrumentSet.main;
  }

  return instrumentSet.main;
}
