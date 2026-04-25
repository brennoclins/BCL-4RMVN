let instance = null;

export const tone = {
  async start() {
    if (!instance) {
      instance = await import('https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js');
    }
    return instance.start();
  },

  get Transport() {
    return instance?.Transport;
  },

  get now() {
    return instance?.now;
  },

  Synth: class extends instance?.Synth {},
  PolySynth: class extends instance?.PolySynth {},
  Sampler: class extends instance?.Sampler {},
  MembraneSynth: class extends instance?.MembraneSynth {},
};

export function createSynth(options = {}) {
  return new instance.PolySynth(instance.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.1, release: 0.5 },
    ...options,
  }).toDestination();
}

export function createDrums(options = {}) {
  return new instance.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.4 },
    ...options,
  }).toDestination();
}

export function createBass(options = {}) {
  return new instance.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 6,
    oscillator: { type: 'square' },
    envelope: { attack: 0.001, decay: 0.3, sustain: 0.01, release: 0.3 },
    ...options,
  }).toDestination();
}

export function createSampler(urls, baseUrl) {
  return new instance.Sampler({ urls, baseUrl }).toDestination();
}

export function stopAll() {
  instance?.Transport?.stop();
  instance?.Transport?.cancel();
}

export function setTempo(bpm) {
  instance.Transport.bpm.value = bpm;
}
