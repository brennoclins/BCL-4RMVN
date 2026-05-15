# Keyforce

Professional MIDI and audio player built with React, TypeScript, and Tone.js.

## Features

- **MIDI Player** — Multitimbral engine with real instrument samples (piano, bass, drums, guitar, brass)
- **Audio Player** — High-fidelity audio playback with transport controls
- **Hardware-inspired UI** — Retro hardware aesthetic with responsive design

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Build tool and dev server
- **Tone.js** — Web Audio framework for synthesis and scheduling
- **@tonejs/midi** — MIDI file parsing
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
| `pnpm dev` | Start dev server on port 5173 |
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
│   ├── audio-player/   # Audio player UI components
│   ├── layout/         # App layout (nav, footer, etc.)
│   ├── midi-player/    # MIDI player UI components
│   └── ui/             # Shared UI primitives
├── hooks/              # Custom React hooks
│   ├── useAudioPlayer.ts
│   ├── useMidiPlayer.ts
│   └── useTone.ts
├── pages/              # Route pages
├── services/           # Business logic (Tone.js, MIDI parser)
├── styles/             # Global CSS
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## License

Private — All rights reserved.
