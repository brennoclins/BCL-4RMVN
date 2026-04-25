import type { DrumKitType, MainInstrumentType, BassType, GuitarType, BrassType } from '@/types';
import {
  drumKits,
  mainInstruments,
  bassInstruments,
  guitarInstruments,
  brassInstruments,
} from '@/services/instrumentConfigs';

export interface ToneInstance {
  start: () => Promise<void>;
  Transport: typeof import('tone').Transport;
  now: () => number;
  Synth: typeof import('tone').Synth;
  PolySynth: typeof import('tone').PolySynth;
  Sampler: typeof import('tone').Sampler;
  MembraneSynth: typeof import('tone').MembraneSynth;
}

let instance: ToneInstance | null = null;

async function loadTone(): Promise<ToneInstance> {
  const Tone = await import('tone');
  return {
    start: () => Tone.start(),
    Transport: Tone.Transport,
    now: () => Tone.now(),
    Synth: Tone.Synth,
    PolySynth: Tone.PolySynth,
    Sampler: Tone.Sampler,
    MembraneSynth: Tone.MembraneSynth,
  };
}

export const toneService = {
  async init(): Promise<ToneInstance> {
    if (!instance) {
      instance = await loadTone();
    }
    return instance;
  },

  get(): ToneInstance | null {
    return instance;
  },

  async start(): Promise<void> {
    const t = await this.init();
    await t.start();
  },

  stopAll(): void {
    if (instance) {
      instance.Transport.stop();
      instance.Transport.cancel();
    }
  },

  setTempo(bpm: number): void {
    if (instance) {
      instance.Transport.bpm.value = bpm;
    }
  },
};

export function getInstrumentConfig(
  type: 'drums' | 'main' | 'bass' | 'guitar' | 'brass',
  variant: string
): { urls: Record<string, string>; baseUrl: string } | null {
  switch (type) {
    case 'drums':
      return drumKits[variant as DrumKitType] || null;
    case 'main':
      return mainInstruments[variant as MainInstrumentType] || null;
    case 'bass':
      return bassInstruments[variant as BassType] || null;
    case 'guitar':
      return guitarInstruments[variant as GuitarType] || null;
    case 'brass':
      return brassInstruments[variant as BrassType] || null;
    default:
      return null;
  }
}
