# BCL-4RMVN

Professional MIDI and audio player built with React, TypeScript, and Tone.js. Features a hardware-inspired UI with a multitimbral MIDI engine powered by real instrument samples.

## Features

- **MIDI Player (Keyforce)** — Multitimbral engine with real instrument samples (piano, bass, drums, guitar, brass, strings, synth). Automatic instrument detection per MIDI channel/program. 10 drum kit variants (Acoustic, CR78, LinnDrum, R8, Techno, Stark, Kit3, Kit8, KPR77, Bongos).
- **Audio Player (501BCLST)** — High-fidelity audio playback supporting MP3, WAV, OGG, M4A, FLAC, AAC, and MIDI files. Playlist management, loop, and transport controls.
- **Hardware-inspired UI** — Retro hardware aesthetic with responsive grid layout, LED indicators, and physical-control metaphors.
- **Keyboard Shortcuts** — Space for play/pause, arrow keys for track navigation.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — Build tool and dev server
- **Tone.js 15** — Web Audio framework for synthesis and scheduling
- **@tonejs/midi** — MIDI file parsing
- **React Router 7** — Client-side routing
- **Tailwind CSS v4** — Utility-first styling
- **Vitest** — Unit testing
- **Playwright** — E2E testing
- **Biome + ESLint** — Linting and formatting

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 3000 |
| `pnpm build` | Type check and build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix issues with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm test:ui` | Run tests with Vitest UI |
| `pnpm test:e2e` | Run E2E tests with Playwright |
| `pnpm test:e2e:ui` | Run E2E tests with Playwright UI |

## Project Structure

```
src/
├── components/
│   ├── audio-player/       # Audio player UI (container, screen, transport, volume, sidebar)
│   ├── layout/             # App layout (nav, footer, hero, features, section links)
│   ├── midi-player/        # MIDI player UI (container, screen, transport, controls, pads, keys)
│   └── ui/                 # Shared UI primitives
├── hooks/                  # Custom React hooks
│   ├── useAudioPlayer.ts   # Audio playback state and controls
│   ├── useMidiPlayer.ts    # MIDI engine (load, play, pause, stop, instrument mapping)
│   └── useTone.ts          # Tone.js context hook
├── pages/                  # Route pages
│   ├── HomePage.tsx        # Landing page with features and product links
│   ├── MidiPlayerPage.tsx  # MIDI player with instrument selection controls
│   ├── AudioPlayerPage.tsx # Audio player with playlist and transport
│   └── ...                 # About, Contact, Careers, Privacy, Terms, Cookies
├── services/               # Business logic
│   ├── toneService.ts      # Tone.js singleton (init, start, stop, tempo)
│   ├── midiParser.ts       # Instrument detection and duration calculation
│   ├── instrumentConfigs.ts # Sample URLs for drums, piano, bass, guitar, brass
│   └── instrumentNames.ts  # MIDI program number to instrument name mapping
├── styles/                 # Global CSS and Tailwind config
├── types/                  # TypeScript type definitions (MidiNote, MidiTrack, instrument types)
└── utils/                  # Utility functions (time formatting, helpers)
```

## MIDI Engine

The MIDI player uses a multitimbral architecture:

1. **Parsing** — `@tonejs/midi` decodes `.mid` files into tracks with notes (pitch, timing, duration, velocity)
2. **Instrument Detection** — Analyzes MIDI program numbers and channel 9 (drums) to identify instruments
3. **Sample Loading** — `Tone.Sampler` loads real instrument samples from Tone.js CDN; fallback `Tone.PolySynth` / `Tone.MembraneSynth` for missing samples
4. **Scheduling** — `Tone.Transport.schedule` places each note at its exact timestamp
5. **Instrument Mapping** — Program ranges map to instrument types (piano 0-7, guitar 24-31, bass 32-39, strings 40-55, brass 56-63, synth 80+)

## Instrument Samples

All samples are loaded from the [Tone.js audio CDN](https://tonejs.github.io/audio/):

| Category | Variants | Source |
|---|---|---|
| Drums | acoustic, cr78, linn, r8, techno, stark, kit3, kit8, kpr77, bongos | tonejs/drum-samples |
| Piano | casio, piano (Salamander) | tonejs/casio, tonejs/salamander |
| Bass | finger, pick, slap | tonejs/bass |
| Guitar | nylon, electric | tonejs/casio |
| Brass | trumpet, trombone, sax | tonejs/casio |

## License

Private — All rights reserved.
