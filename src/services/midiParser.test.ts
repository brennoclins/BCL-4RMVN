import { describe, it, expect } from 'vitest';
import { getDuration, detectInstruments } from '@/services/midiParser';
import type { MidiData } from '@/types';

describe('midiParser', () => {
  describe('getDuration', () => {
    it('calculates duration from notes', () => {
      const midiData: MidiData = {
        tracks: [
          {
            channel: 0,
            notes: [
              { name: 'C4', time: 0, duration: 1, velocity: 1 },
              { name: 'D4', time: 2, duration: 1, velocity: 1 },
            ],
          },
        ],
      };

      expect(getDuration(midiData)).toBe(3);
    });

    it('returns 60 for empty midi', () => {
      expect(getDuration({ tracks: [] })).toBe(60);
      expect(getDuration({ tracks: [{ channel: 0, notes: [] }] })).toBe(60);
    });

    it('finds longest note end time', () => {
      const midiData: MidiData = {
        tracks: [
          {
            channel: 0,
            notes: [
              { name: 'C4', time: 0, duration: 1, velocity: 1 },
              { name: 'D4', time: 5, duration: 0.5, velocity: 1 },
            ],
          },
        ],
      };

      expect(getDuration(midiData)).toBe(5.5);
    });
  });

  describe('detectInstruments', () => {
    it('detects drums on channel 9', () => {
      const midiData: MidiData = {
        tracks: [{ channel: 9, notes: [] }],
      };

      const result = detectInstruments(midiData);
      expect(result.instruments.has('Drums')).toBe(true);
    });

    it('detects GM instrument names', () => {
      const midiData: MidiData = {
        tracks: [{ channel: 0, program: 0, notes: [] }],
      };

      const result = detectInstruments(midiData);
      expect(result.instruments.has('Acoustic Grand')).toBe(true);
    });

    it('detects bass channels', () => {
      const midiData: MidiData = {
        tracks: [{ channel: 0, program: 32, notes: [] }],
      };

      const result = detectInstruments(midiData);
      expect(result.channels.bass).toBe(true);
    });

    it('detects guitar channels', () => {
      const midiData: MidiData = {
        tracks: [{ channel: 0, program: 24, notes: [] }],
      };

      const result = detectInstruments(midiData);
      expect(result.channels.guitar).toBe(true);
    });

    it('detects brass channels', () => {
      const midiData: MidiData = {
        tracks: [{ channel: 0, program: 56, notes: [] }],
      };

      const result = detectInstruments(midiData);
      expect(result.channels.brass).toBe(true);
    });
  });
});
