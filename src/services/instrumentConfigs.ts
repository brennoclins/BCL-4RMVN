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

export interface InstrumentConfig {
  name: string;
  urls: Record<string, string>;
  baseUrl: string;
}

export const drumKits: Record<DrumKitType, InstrumentConfig> = {
  acoustic: {
    name: 'Acoustic',
    urls: {
      C1: 'kick.mp3',
      'C#1': 'kick.mp3',
      D1: 'snare.mp3',
      'D#1': 'snare.mp3',
      'F#1': 'hihat.mp3',
      G1: 'tom1.mp3',
      'G#1': 'tom1.mp3',
      A1: 'tom2.mp3',
      'A#1': 'tom2.mp3',
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
      'D#2': 'Ds2.mp3',
      'F#2': 'Fs2.mp3',
      A2: 'A2.mp3',
      C3: 'C3.mp3',
      'D#3': 'Ds3.mp3',
      'F#3': 'Fs3.mp3',
      A3: 'A3.mp3',
      C4: 'C4.mp3',
      'D#4': 'Ds4.mp3',
      'F#4': 'Fs4.mp3',
      A4: 'A4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  piano: {
    name: 'Piano',
    urls: {
      A0: 'A0.mp3',
      C1: 'C1.mp3',
      'D#1': 'Ds1.mp3',
      'F#1': 'Fs1.mp3',
      A1: 'A1.mp3',
      C2: 'C2.mp3',
      'D#2': 'Ds2.mp3',
      'F#2': 'Fs2.mp3',
      A2: 'A2.mp3',
      C3: 'C3.mp3',
      'D#3': 'Ds3.mp3',
      'F#3': 'Fs3.mp3',
      A3: 'A3.mp3',
      C4: 'C4.mp3',
      'D#4': 'Ds4.mp3',
      'F#4': 'Fs4.mp3',
      A4: 'A4.mp3',
      C5: 'C5.mp3',
      'D#5': 'Ds5.mp3',
      'F#5': 'Fs5.mp3',
      A5: 'A5.mp3',
      C6: 'C6.mp3',
      'D#6': 'Ds6.mp3',
      'F#6': 'Fs6.mp3',
      A6: 'A6.mp3',
      C7: 'C7.mp3',
      'D#7': 'Ds7.mp3',
      'F#7': 'Fs7.mp3',
      A7: 'A7.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  },
};

export const bassInstruments: Record<BassType, InstrumentConfig> = {
  finger: {
    name: 'Finger',
    urls: {
      A1: 'A1.mp3',
      A2: 'A2.mp3',
      E2: 'E2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/bass/',
  },
  pick: {
    name: 'Pick',
    urls: {
      A1: 'A1.mp3',
      A2: 'A2.mp3',
      E2: 'E2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/bass/',
  },
  slap: {
    name: 'Slap',
    urls: {
      A1: 'A1.mp3',
      A2: 'A2.mp3',
      E2: 'E2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/bass/',
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

export const stringsInstruments: Record<StringsType, InstrumentConfig> = {
  strings: {
    name: 'Strings',
    urls: {
      C3: 'C3.mp3',
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  pizzicato: {
    name: 'Pizzicato',
    urls: {
      C3: 'C3.mp3',
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
};

export const synthInstruments: Record<SynthType, InstrumentConfig> = {
  lead: {
    name: 'Lead',
    urls: {
      C3: 'C3.mp3',
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  pad: {
    name: 'Pad',
    urls: {
      C3: 'C3.mp3',
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
};

export const organInstruments: Record<OrganType, InstrumentConfig> = {
  church: {
    name: 'Church',
    urls: {
      C3: 'C3.mp3',
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
  electric: {
    name: 'Electric',
    urls: {
      C3: 'C3.mp3',
      C4: 'C4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  },
};
