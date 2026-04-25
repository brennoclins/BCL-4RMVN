import type { MidiData, DetectedInstruments } from '../types';
import { instrumentNames } from './instrumentNames';

export function detectInstruments(midiData: MidiData): DetectedInstruments {
  const instruments = new Set<string>();
  const channels = { bass: false, guitar: false, brass: false };

  if (midiData?.tracks) {
    for (const track of midiData.tracks) {
      if (track.channel === 9) {
        instruments.add('Drums');
      } else if (track.program !== undefined) {
        const prog = track.program;
        const name = instrumentNames[prog] || 'Ch ' + (track.channel + 1);
        instruments.add(name);

        if (prog >= 32 && prog <= 39) channels.bass = true;
        if (prog >= 24 && prog <= 31) channels.guitar = true;
        if (prog >= 56 && prog <= 63) channels.brass = true;
      }
    }
  }

  return { instruments, channels };
}

export function getDuration(midiData: MidiData): number {
  let maxTime = 0;
  if (midiData?.tracks) {
    for (const track of midiData.tracks) {
      for (const note of track.notes) {
        const endTime = note.time + note.duration;
        if (endTime > maxTime) maxTime = endTime;
      }
    }
  }
  return maxTime || 60;
}
