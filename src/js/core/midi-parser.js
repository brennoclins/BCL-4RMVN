const Midi = window.Midi;

export function parseFile(arrayBuffer) {
  return new Midi(arrayBuffer);
}

export function getDuration(midiData) {
  let maxTime = 0;
  if (midiData?.tracks) {
    midiData.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        const endTime = note.time + note.duration;
        if (endTime > maxTime) maxTime = endTime;
      });
    });
  }
  return maxTime || 60;
}

export function detectInstruments(midiData, instrumentNames) {
  const instruments = new Set();
  const channels = { bass: false, guitar: false, brass: false };

  if (midiData?.tracks) {
    midiData.tracks.forEach((track) => {
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
    });
  }

  return { instruments, channels };
}

export function scheduleNotes(midiData, instrument, startTime = 0.1) {
  if (!midiData?.tracks || !instrument) return;

  midiData.tracks.forEach((track) => {
    track.notes.forEach((note) => {
      Tone.Transport.schedule((time) => {
        instrument.triggerAttackRelease(note.name, note.duration, time, note.velocity);
      }, note.time);
    });
  });
}

export const instrumentNames = [
  'Acoustic Grand',
  'Bright Acoustic',
  'Electric Grand',
  'Honky-Tonk',
  'Electric Piano 1',
  'Electric Piano 2',
  'Harpsichord',
  'Clavinet',
  'Celesta',
  'Glockenspiel',
  'Music Box',
  'Vibraphone',
  'Marimba',
  'Xylophone',
  'Tubular Bells',
  'Dulcimer',
  'Drawbar Organ',
  'Percussive Organ',
  'Rock Organ',
  'Church Organ',
  'Reed Organ',
  'Accordion',
  'Harmonica',
  'Acoustic Guitar',
  'Nylon Guitar',
  'Jazz Guitar',
  'Clean Guitar',
  'Muted Guitar',
  'Overdrive',
  'Distortion',
  'Guitar Harm',
  'Acoustic Bass',
  'Finger Bass',
  'Pick Bass',
  'Fretless',
  'Slap 1',
  'Slap 2',
  'Synth Bass 1',
  'Synth Bass 2',
  'Violin',
  'Viola',
  'Cello',
  'Contrabass',
  'Tremolo',
  'Pizzicato',
  'Harp',
  'Timpani',
  'Strings',
  'Strings 2',
  'Synth 1',
  'Synth 2',
  'Choir',
  'Voice',
  'Synth Voice',
  'Orchestra',
  'Trumpet',
  'Trombone',
  'Tuba',
  'Mute Trumpet',
  'French Horn',
  'Brass',
  'Synth Brass',
  'Soprano Sax',
  'Alto Sax',
  'Tenor Sax',
  'Baritone Sax',
  'Oboe',
  'English Horn',
  'Bassoon',
  'Clarinet',
  'Piccolo',
  'Flute',
  'Recorder',
  'Pan Flute',
];
