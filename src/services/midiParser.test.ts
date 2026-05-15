import { describe, it, expect } from 'vitest';
import { getDuration, detectInstruments, getTrackName } from './midiParser';
import type { MidiData } from '../types';

describe('midiParser', () => {
  describe('getDuration', () => {
    it('calculates duration from notes', () => {
      const midiData: MidiData = {
        name: 'test',
        bpm: 120,
        timeSignature: [4, 4],
        tracks: [
          {
            channel: 0,
            name: 'Track 1',
            notes: [
              { name: 'C4', midi: 60, time: 0, duration: 1, velocity: 1 },
              { name: 'D4', midi: 62, time: 2, duration: 1, velocity: 1 },
            ],
            muted: false,
          },
        ],
      };

      expect(getDuration(midiData)).toBe(3);
    });

    it('returns 60 for empty midi', () => {
      expect(getDuration({ name: 'test', bpm: 120, timeSignature: [4, 4], tracks: [] })).toBe(60);
      expect(getDuration({ name: 'test', bpm: 120, timeSignature: [4, 4], tracks: [{ channel: 0, name: 'Track 1', notes: [], muted: false }] })).toBe(60);
    });

    it('finds longest note end time', () => {
      const midiData: MidiData = {
        name: 'test',
        bpm: 120,
        timeSignature: [4, 4],
        tracks: [
          {
            channel: 0,
            name: 'Track 1',
            notes: [
              { name: 'C4', midi: 60, time: 0, duration: 1, velocity: 1 },
              { name: 'D4', midi: 62, time: 5, duration: 0.5, velocity: 1 },
            ],
            muted: false,
          },
        ],
      };

      expect(getDuration(midiData)).toBe(5.5);
    });
  });

  describe('detectInstruments', () => {
    it('detects drums on channel 9', () => {
      const midiData: MidiData = {
        name: 'test',
        bpm: 120,
        timeSignature: [4, 4],
        tracks: [{ channel: 9, name: 'Drums', notes: [], muted: false }],
      };

      const result = detectInstruments(midiData);
      expect(result.instruments.has('Drums')).toBe(true);
    });

    it('detects GM instrument names', () => {
      const midiData: MidiData = {
        name: 'test',
        bpm: 120,
        timeSignature: [4, 4],
        tracks: [{ channel: 0, program: 0, name: 'Acoustic Grand', notes: [], muted: false }],
      };

      const result = detectInstruments(midiData);
      expect(result.instruments.has('Acoustic Grand')).toBe(true);
    });

    it('detects bass channels', () => {
      const midiData: MidiData = {
        name: 'test',
        bpm: 120,
        timeSignature: [4, 4],
        tracks: [{ channel: 0, program: 32, name: 'Acoustic Bass', notes: [], muted: false }],
      };

      const result = detectInstruments(midiData);
      expect(result.channels.bass).toBe(true);
    });

    it('detects guitar channels', () => {
      const midiData: MidiData = {
        name: 'test',
        bpm: 120,
        timeSignature: [4, 4],
        tracks: [{ channel: 0, program: 24, name: 'Acoustic Guitar (nylon)', notes: [], muted: false }],
      };

      const result = detectInstruments(midiData);
      expect(result.channels.guitar).toBe(true);
    });

    it('detects brass channels', () => {
      const midiData: MidiData = {
        name: 'test',
        bpm: 120,
        timeSignature: [4, 4],
        tracks: [{ channel: 0, program: 56, name: 'Trumpet', notes: [], muted: false }],
      };

      const result = detectInstruments(midiData);
      expect(result.channels.brass).toBe(true);
    });
  });

  describe('getTrackName', () => {
    it('returns Drums for channel 9', () => {
      expect(getTrackName({ channel: 9 }, 0)).toBe('Drums');
    });

    it('returns program name for known programs', () => {
      expect(getTrackName({ channel: 0, program: 0 }, 0)).toBe('Acoustic Grand');
    });

    it('returns fallback for unknown programs', () => {
      expect(getTrackName({ channel: 0 }, 2)).toBe('Track 3');
    });
  });
});
