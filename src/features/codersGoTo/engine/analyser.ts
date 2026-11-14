import { EnergyBands } from '../data/types';

export class AudioAnalyserService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private isConnected = false;

  init(audioEl: HTMLAudioElement): boolean {
    if (this.isConnected && this.audioContext) {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch(() => { });
      }
      return true;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;

      this.audioContext = new AudioCtx();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.82;

      this.sourceNode = this.audioContext.createMediaElementSource(audioEl);
      this.sourceNode.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.isConnected = true;
      return true;
    } catch (e) {
      // Audio element might already have a source connected or CORS error
      console.warn('[AudioAnalyser] Fallback to simulated bands:', e);
      return false;
    }
  }

  getEnergy(): EnergyBands {
    if (!this.analyser || !this.dataArray || !this.isConnected) {
      return { bass: 0, mid: 0, high: 0 };
    }

    (this.analyser.getByteFrequencyData as unknown as (array: Uint8Array) => void)(this.dataArray);

    // Bins: bass (0-4), mid (5-30), high (31-90)
    let bassSum = 0;
    for (let i = 0; i <= 4; i++) {
      bassSum += this.dataArray[i];
    }
    const bass = bassSum / (5 * 255);

    let midSum = 0;
    for (let i = 5; i <= 30; i++) {
      midSum += this.dataArray[i];
    }
    const mid = midSum / (26 * 255);

    let highSum = 0;
    for (let i = 31; i <= 90; i++) {
      highSum += this.dataArray[i];
    }
    const high = highSum / (60 * 255);

    return {
      bass: Math.min(1, bass * 1.3),
      mid: Math.min(1, mid * 1.4),
      high: Math.min(1, high * 1.5),
    };
  }

  resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => { });
    }
  }
}
