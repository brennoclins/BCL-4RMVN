import type { DrumKitType, MainInstrumentType, BassType, GuitarType, BrassType } from '@/types';

export interface DrumKitConfig {
  name: string;
  urls: Record<string, string>;
  baseUrl: string;
}

export interface InstrumentConfig {
  name: string;
  urls: Record<string, string>;
  baseUrl: string;
}

export const drumKits: Record<DrumKitType, DrumKitConfig> = {
  acoustic: {
    name: 'Acoustic',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
      G1: 'tom1.mp3',
      A1: 'tom2.mp3',
      B1: 'tom3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/acoustic-kit/',
  },
  cr78: {
    name: 'CR78',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
      G1: 'tom1.mp3',
      A1: 'tom2.mp3',
      B1: 'tom3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/CR78/',
  },
  linn: {
    name: 'LinnDrum',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
      G1: 'tom1.mp3',
      A1: 'tom2.mp3',
      B1: 'tom3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/LINN/',
  },
  r8: {
    name: 'R8',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
      G1: 'tom1.mp3',
      A1: 'tom2.mp3',
      B1: 'tom3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/R8/',
  },
  techno: {
    name: 'Techno',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
      G1: 'tom1.mp3',
      A1: 'tom2.mp3',
      B1: 'tom3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/Techno/',
  },
  stark: {
    name: 'Stark',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
      G1: 'tom1.mp3',
      A1: 'tom2.mp3',
      B1: 'tom3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/Stark/',
  },
  kit3: {
    name: 'Kit3',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/Kit3/',
  },
  kit8: {
    name: 'Kit8',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/Kit8/',
  },
  kpr77: {
    name: 'KPR77',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/KPR77/',
  },
  bongos: {
    name: 'Bongos',
    urls: {
      C1: 'kick.mp3',
      D1: 'snare.mp3',
      'F#1': 'hihat.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/drum-samples/Bongos/',
  },
};

export const mainInstruments: Record<MainInstrumentType, InstrumentConfig> = {
  casio: {
    name: 'Casio',
    urls: {
      C2: 'C2.mp3',
      E2: 'E2.mp3',
      G2: 'G2.mp3',
      C3: 'C2.mp3',
      A2: 'A2.mp3',
      C4: 'C2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  piano: {
    name: 'Piano',
    urls: {
      A0: 'A0.mp3',
      C1: 'C1.mp3',
      A2: 'A2.mp3',
      C4: 'C4.mp3',
      A4: 'A4.mp3',
      C5: 'C5.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  },
};

export const bassInstruments: Record<BassType, InstrumentConfig> = {
  finger: {
    name: 'Finger',
    urls: {
      C1: 'C1.mp3',
      A1: 'A1.mp3',
      C2: 'C2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  },
  pick: {
    name: 'Pick',
    urls: {
      C1: 'C1.mp3',
      A1: 'A1.mp3',
      C2: 'C2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  },
  slap: {
    name: 'Slap',
    urls: {
      C1: 'C1.mp3',
      A1: 'A1.mp3',
      C2: 'C2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  },
};

export const guitarInstruments: Record<GuitarType, InstrumentConfig> = {
  nylon: {
    name: 'Nylon',
    urls: {
      'F#2': 'Fs2.mp3',
      A2: 'A2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  electric: {
    name: 'Electric',
    urls: {
      E2: 'E2.mp3',
      A3: 'A3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
};

export const brassInstruments: Record<BrassType, InstrumentConfig> = {
  trumpet: {
    name: 'Trumpet',
    urls: {
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  trombone: {
    name: 'Trombone',
    urls: {
      C3: 'C3.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  sax: {
    name: 'Sax',
    urls: {
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
};
