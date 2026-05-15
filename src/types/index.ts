export interface MidiNote {
  name: string;
  midi: number;
  time: number;
  duration: number;
  velocity: number;
}

export interface MidiTrack {
  channel: number;
  program?: number;
  name: string;
  notes: MidiNote[];
  muted: boolean;
}

export interface MidiData {
  tracks: MidiTrack[];
  name: string;
  bpm: number;
  timeSignature: number[];
}

export interface InstrumentConfig {
  name: string;
  urls: Record<string, string>;
  baseUrl: string;
}

export type DrumKitType =
  | 'acoustic'
  | 'cr78'
  | 'linn'
  | 'r8'
  | 'techno'
  | 'stark'
  | 'kit3'
  | 'kit8'
  | 'kpr77'
  | 'bongos';

export type MainInstrumentType = 'casio' | 'piano';

export type BassType = 'finger' | 'pick' | 'slap';

export type GuitarType = 'nylon' | 'electric';

export type BrassType = 'trumpet' | 'trombone' | 'sax';

export type StringsType = 'strings' | 'pizzicato';

export type SynthType = 'lead' | 'pad';

export type OrganType = 'church' | 'electric';

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

export interface TrackMuteState {
  [trackIndex: number]: boolean;
}

export interface InstrumentSelections {
  drumKit: DrumKitType;
  mainInstrument: MainInstrumentType;
  bass: BassType;
  guitar: GuitarType;
  brass: BrassType;
  strings: StringsType;
  synth: SynthType;
  organ: OrganType;
}
