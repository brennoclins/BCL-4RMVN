export interface MidiNote {
  name: string;
  time: number;
  duration: number;
  velocity: number;
}

export interface MidiTrack {
  channel: number;
  program?: number;
  notes: MidiNote[];
}

export interface MidiData {
  tracks: MidiTrack[];
}

export interface InstrumentConfig {
  name: string;
  urls: Record<string, string>;
  baseUrl: string;
}

export type DrumKitType = 'acoustic' | 'cr78' | 'linn' | 'r8' | 'techno' | 'stark' | 'kit3' | 'kit8' | 'kpr77' | 'bongos';

export type MainInstrumentType = 'casio' | 'piano';

export type BassType = 'finger' | 'pick' | 'slap';

export type GuitarType = 'nylon' | 'electric';

export type BrassType = 'trumpet' | 'trombone' | 'sax';

export type SoundMode = 'samples' | 'digital';

export interface AudioData {
  name: string;
  duration: number;
}

export interface DetectedInstruments {
  instruments: Set<string>;
  channels: {
    bass: boolean;
    guitar: boolean;
    brass: boolean;
  };
}