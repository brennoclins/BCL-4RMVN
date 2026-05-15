import * as Tone from 'tone';

let toneStarted = false;

export const toneService = {
  async start(): Promise<void> {
    if (!toneStarted) {
      await Tone.start();
      toneStarted = true;
    }
  },

  get contextStarted(): boolean {
    return toneStarted;
  },

  get transport() {
    return Tone.Transport;
  },

  get now() {
    return Tone.now();
  },

  setTempo(bpm: number): void {
    Tone.Transport.bpm.value = bpm;
  },

  getTempo(): number {
    return Tone.Transport.bpm.value;
  },

  stop(): void {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.Transport.position = 0;
  },
};

export { Tone };
