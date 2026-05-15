import { useState, useCallback, useRef, useEffect } from 'react';
import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';
import type { MidiData, MidiTrack, TrackMuteState, InstrumentSelections } from '../types';
import { getDuration, detectInstruments, getTrackName } from '../services/midiParser';
import { formatTime } from '../utils/helpers';
import { toneService } from '../services/toneService';
import {
  drumKits,
  mainInstruments,
  bassInstruments,
  guitarInstruments,
  brassInstruments,
  stringsInstruments,
  synthInstruments,
  organInstruments,
} from '../services/instrumentConfigs';

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

type ToneInstrument = Tone.Sampler | Tone.PolySynth | Tone.MembraneSynth;

interface InstrumentMap {
  [channel: number]: ToneInstrument | null;
}

let activeInstruments: ToneInstrument[] = [];

function disposeInstruments() {
  activeInstruments.forEach((inst) => {
    try {
      inst.dispose();
    } catch {
      // ignore
    }
  });
  activeInstruments = [];
}

function createSampler(
  config: { urls: Record<string, string>; baseUrl: string } | null,
  fallbackType: 'triangle' | 'sawtooth' | 'square'
): ToneInstrument {
  if (config) {
    const sampler = new Tone.Sampler({
      urls: config.urls,
      baseUrl: config.baseUrl,
    }).toDestination();
    activeInstruments.push(sampler);
    return sampler;
  }

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: fallbackType },
    envelope: {
      attack: 0.005,
      decay: 0.3,
      sustain: 0.1,
      release: 0.5,
    },
  }).toDestination();
  activeInstruments.push(synth);
  return synth;
}

function buildInstrumentMap(
  tracks: MidiTrack[],
  selections: InstrumentSelections
): InstrumentMap {
  const map: InstrumentMap = {};

  for (const track of tracks) {
    if (track.muted) {
      map[track.channel] = null;
      continue;
    }

    if (track.channel === 9) {
      const config = drumKits[selections.drumKit] || drumKits.acoustic;
      map[9] = new Tone.Sampler({
        urls: config.urls,
        baseUrl: config.baseUrl,
      }).toDestination();
      activeInstruments.push(map[9] as ToneInstrument);
      continue;
    }

    const prog = track.program ?? 0;

    if (prog >= 16 && prog <= 23) {
      const config = organInstruments[selections.organ] || organInstruments.church;
      map[track.channel] = createSampler(config, 'triangle');
    } else if (prog >= 24 && prog <= 31) {
      const config = guitarInstruments[selections.guitar] || guitarInstruments.nylon;
      map[track.channel] = createSampler(config, 'sawtooth');
    } else if (prog >= 32 && prog <= 39) {
      const config = bassInstruments[selections.bass] || bassInstruments.finger;
      map[track.channel] = createSampler(config, 'square');
    } else if (prog >= 40 && prog <= 55) {
      const config = stringsInstruments[selections.strings] || stringsInstruments.strings;
      map[track.channel] = createSampler(config, 'sawtooth');
    } else if (prog >= 56 && prog <= 63) {
      const config = brassInstruments[selections.brass] || brassInstruments.trumpet;
      map[track.channel] = createSampler(config, 'square');
    } else if (prog >= 80 && prog <= 95) {
      const config = synthInstruments[selections.synth] || synthInstruments.lead;
      map[track.channel] = createSampler(config, 'square');
    } else {
      const config = mainInstruments[selections.mainInstrument] || mainInstruments.casio;
      map[track.channel] = createSampler(config, 'triangle');
    }
  }

  return map;
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
    detectedInstruments: {
      instruments: new Set(),
      channels: { bass: false, guitar: false, brass: false },
    },
    status: 'idle',
    error: null,
  });

  const selectionsRef = useRef<InstrumentSelections>({
    drumKit: 'acoustic',
    mainInstrument: 'casio',
    bass: 'finger',
    guitar: 'nylon',
    brass: 'trumpet',
    strings: 'strings',
    synth: 'lead',
    organ: 'church',
  });

  const muteRef = useRef<TrackMuteState>({});
  const durationRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const isScheduledRef = useRef(false);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
      disposeInstruments();
    };
  }, []);

  const updateProgress = useCallback(() => {
    const elapsed = Tone.Transport.seconds;
    const dur = durationRef.current;
    const progress = dur > 0 ? Math.min((elapsed / dur) * 100, 100) : 0;

    setState((prev) => ({
      ...prev,
      currentTime: elapsed,
      progress,
    }));

    if (elapsed >= dur && dur > 0) {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      isScheduledRef.current = false;
      setState((prev) => ({
        ...prev,
        status: 'ready',
        isPlaying: false,
        isPaused: false,
        currentTime: 0,
        progress: 0,
      }));
      return;
    }

    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, []);

  const loadFile = useCallback(async (file: File) => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }));

    Tone.Transport.stop();
    Tone.Transport.cancel();
    isScheduledRef.current = false;
    disposeInstruments();

    try {
      const arrayBuffer = await file.arrayBuffer();
      const midi = new Midi(arrayBuffer);

      const midiData: MidiData = {
        name: midi.name || file.name,
        bpm: midi.header.tempos.length > 0 ? midi.header.tempos[0].bpm : 120,
        timeSignature: midi.header.timeSignatures.length > 0
          ? midi.header.timeSignatures[0].timeSignature
          : [4, 4],
        tracks: midi.tracks.map((track, index) => ({
          channel: track.channel,
          program: (track as { program?: number }).program,
          name: getTrackName(
            { channel: track.channel, program: (track as { program?: number }).program },
            index
          ),
          notes: track.notes.map((note) => ({
            name: note.name,
            midi: note.midi,
            time: note.time,
            duration: note.duration,
            velocity: note.velocity,
          })),
          muted: false,
        })),
      };

      const duration = getDuration(midiData);
      const detectedInstruments = detectInstruments(midiData);

      durationRef.current = duration;

      Tone.Transport.bpm.value = midiData.bpm;

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

  const scheduleNotes = useCallback(
    (midiData: MidiData, startTime: number) => {
      const selections = selectionsRef.current;
      const instrumentMap = buildInstrumentMap(midiData.tracks, selections);

      for (let i = 0; i < midiData.tracks.length; i++) {
        const track = midiData.tracks[i];
        const isMuted = muteRef.current[i] ?? false;

        if (isMuted || track.notes.length === 0) continue;

        const instrument = instrumentMap[track.channel];
        if (!instrument) continue;

        for (const note of track.notes) {
          if (note.time + note.duration <= startTime) continue;

          const scheduledTime = note.time - startTime;

          Tone.Transport.schedule((time) => {
            if (instrument instanceof Tone.Sampler) {
              instrument.triggerAttackRelease(note.name, note.duration, time, note.velocity);
            } else if (instrument instanceof Tone.PolySynth || instrument instanceof Tone.MembraneSynth) {
              instrument.triggerAttackRelease(note.name, note.duration, time, note.velocity);
            }
          }, scheduledTime);
        }
      }
    },
    []
  );

  const play = useCallback(async () => {
    if (!state.midiData || !state.midiData.tracks.length) return;

    await toneService.start();

    if (state.isPaused) {
      const pausedAt = state.currentTime;
      Tone.Transport.position = pausedAt;
      isScheduledRef.current = false;
    } else {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      Tone.Transport.position = 0;
      isScheduledRef.current = false;
    }

    if (!isScheduledRef.current) {
      const startPos = state.isPaused ? state.currentTime : 0;
      scheduleNotes(state.midiData, startPos);
      isScheduledRef.current = true;
    }

    Tone.Transport.start();

    setState((prev) => ({
      ...prev,
      status: 'playing',
      isPlaying: true,
      isPaused: false,
    }));

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, [state.midiData, state.isPaused, state.currentTime, scheduleNotes, updateProgress]);

  const pause = useCallback(() => {
    Tone.Transport.pause();

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    setState((prev) => ({
      ...prev,
      status: 'paused',
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  const stop = useCallback(() => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    isScheduledRef.current = false;
    disposeInstruments();

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
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

  const setTrackMute = useCallback((trackIndex: number, muted: boolean) => {
    muteRef.current = { ...muteRef.current, [trackIndex]: muted };

    setState((prev) => {
      if (!prev.midiData) return prev;
      const newTracks = prev.midiData.tracks.map((t, i) =>
        i === trackIndex ? { ...t, muted } : t
      );
      return {
        ...prev,
        midiData: { ...prev.midiData, tracks: newTracks },
      };
    });
  }, []);

  const setInstrumentSelections = useCallback((selections: Partial<InstrumentSelections>) => {
    selectionsRef.current = { ...selectionsRef.current, ...selections };
  }, []);

  return {
    ...state,
    loadFile,
    play,
    pause,
    stop,
    setTrackMute,
    setInstrumentSelections,
    formattedTime: formatTime(state.currentTime),
    formattedDuration: formatTime(state.duration),
  };
}
