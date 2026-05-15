import { useState, useCallback, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import type { MidiData } from '../types';
import { getDuration, detectInstruments } from '../services/midiParser';
import { formatTime } from '../utils/helpers';

interface MidiPlayerState {
  midiData: MidiData | null;
  fileName: string | null;
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  detectedInstruments: {
    instruments: Set<string>;
    channels: { bass: boolean; guitar: boolean; brass: boolean };
  };
  status: 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error';
  error: string | null;
}

interface InstrumentSet {
  drums: Tone.Sampler | Tone.PolySynth;
  main: Tone.PolySynth;
  bass: Tone.MembraneSynth;
  guitar: Tone.PolySynth;
  brass: Tone.PolySynth;
  strings: Tone.PolySynth;
  synth: Tone.PolySynth;
}

let activeInstruments: (Tone.Sampler | Tone.PolySynth | Tone.MembraneSynth | null)[] = [];

export function useMidiPlayer() {
  const [state, setState] = useState<MidiPlayerState>({
    midiData: null,
    fileName: null,
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
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
  const instrumentSetRef = useRef<InstrumentSet | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      Tone.Transport.stop();
      Tone.Transport.cancel();

      activeInstruments.forEach((inst) => {
        if (inst) {
          try { inst.dispose(); } catch { /* ignore */ }
        }
      });
      activeInstruments = [];
      instrumentSetRef.current = null;
    };
  }, []);

  const clearPlayback = useCallback(() => {
    isPlayingRef.current = false;
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.Transport.position = 0;

    activeInstruments.forEach((inst) => {
      if (inst) {
        try { inst.dispose(); } catch { /* ignore */ }
      }
    });
    activeInstruments = [];
    instrumentSetRef.current = null;
  }, []);

  const pause = useCallback(() => {
    isPlayingRef.current = false;
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    Tone.Transport.pause();

    setState((prev) => ({
      ...prev,
      status: 'paused',
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  const loadFile = useCallback(async (file: File) => {
    clearPlayback();

    setState((prev) => ({ ...prev, status: 'loading', error: null }));

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

      setState({
        midiData,
        fileName: file.name,
        duration,
        detectedInstruments,
        status: 'ready',
        progress: 0,
        currentTime: 0,
        isPlaying: false,
        isPaused: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load MIDI file',
      }));
    }
  }, [clearPlayback]);

  const play = useCallback(async () => {
    const midiData = midiDataRef.current;
    if (!midiData || !midiData.tracks.length) {
      console.warn('useMidiPlayer.play: no midi data');
      return;
    }

    try {
      await Tone.start();
      console.log('Tone started');
    } catch (err) {
      console.error('Tone.start failed:', err);
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: 'Failed to start audio engine. Click anywhere and try again.',
      }));
      return;
    }

    clearPlayback();

    const instruments = createInstruments();
    instrumentSetRef.current = instruments;

    activeInstruments = [
      instruments.drums,
      instruments.main,
      instruments.bass,
      instruments.guitar,
      instruments.brass,
      instruments.strings,
      instruments.synth,
    ];

    try {
      await Tone.loaded();
      console.log('Tone loaded, samples ready');
    } catch (err) {
      console.error('Tone.loaded failed:', err);
    }

    setState((prev) => ({
      ...prev,
      midiData,
      status: 'playing',
      isPlaying: true,
      isPaused: false,
      currentTime: 0,
      progress: 0,
    }));

    isPlayingRef.current = true;
    startTimeRef.current = Date.now();

    for (const track of midiData.tracks) {
      for (const note of track.notes) {
        Tone.Transport.schedule((time) => {
          if (!isPlayingRef.current || !instrumentSetRef.current) return;
          const instrument = getInstrumentForTrack(track, instrumentSetRef.current);
          if (instrument) {
            instrument.triggerAttackRelease(note.name, note.duration, time, note.velocity);
          }
        }, note.time);
      }
    }

    Tone.Transport.start();
    console.log('Transport started, notes scheduled:', midiData.tracks.reduce((sum, t) => sum + t.notes.length, 0));

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
        pause();
      }
    }, 50);
  }, [clearPlayback, pause]);

  const stop = useCallback(() => {
    clearPlayback();

    setState((prev) => ({
      ...prev,
      status: 'ready',
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      progress: 0,
    }));
  }, [clearPlayback]);

  return {
    ...state,
    loadFile,
    play,
    pause,
    stop,
    formattedTime: formatTime(state.currentTime),
    formattedDuration: formatTime(state.duration),
  };
}

function createInstruments(): InstrumentSet {
  return {
    drums: new Tone.Sampler({
      urls: {
        C1: 'kick.mp3',
        D1: 'snare.mp3',
        'F#1': 'hihat.mp3',
        G1: 'tom1.mp3',
        A1: 'tom2.mp3',
        B1: 'tom3.mp3',
      },
      baseUrl: 'https://tonejs.github.io/audio/drum-samples/acoustic-kit/',
    }).toDestination(),
    main: new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.005, decay: 0.3, sustain: 0.1, release: 0.5 },
    }).toDestination(),
    bass: new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.3, sustain: 0.01, release: 0.3 },
    }).toDestination(),
    guitar: new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.3 },
    }).toDestination(),
    brass: new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 },
    }).toDestination(),
    strings: new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.3, decay: 0.2, sustain: 0.5, release: 0.8 },
    }).toDestination(),
    synth: new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 },
    }).toDestination(),
  };
}

function getInstrumentForTrack(
  track: { channel: number; program?: number },
  instrumentSet: InstrumentSet
): Tone.Sampler | Tone.PolySynth | Tone.MembraneSynth {
  if (track.channel === 9) return instrumentSet.drums;

  if (track.program !== undefined) {
    const prog = track.program;
    if (prog <= 7) return instrumentSet.main;
    if (prog >= 8 && prog <= 15) return instrumentSet.main;
    if (prog >= 16 && prog <= 23) return instrumentSet.main;
    if (prog >= 24 && prog <= 31) return instrumentSet.guitar;
    if (prog >= 32 && prog <= 39) return instrumentSet.bass;
    if (prog >= 40 && prog <= 55) return instrumentSet.strings;
    if (prog >= 56 && prog <= 63) return instrumentSet.brass;
    if (prog >= 64 && prog <= 71) return instrumentSet.main;
    if (prog >= 72 && prog <= 79) return instrumentSet.main;
    if (prog >= 80) return instrumentSet.synth;
  }

  return instrumentSet.main;
}
