import { Track } from '../data/types';
import { PlayerEngine, PlayerEvent } from './PlayerEngine';

export class HtmlAudioEngine implements PlayerEngine {
  private audio: HTMLAudioElement;
  private listeners: Map<PlayerEvent, Set<() => void>> = new Map();
  private currentTrack: Track | null = null;
  private preloadedNextAudio: HTMLAudioElement | null = null;

  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.crossOrigin = 'anonymous';
    // Enable iOS inline playback
    (this.audio as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;

    const events: PlayerEvent[] = [
      'play',
      'pause',
      'ended',
      'timeupdate',
      'waiting',
      'canplay',
      'error',
    ];

    events.forEach((ev) => {
      this.listeners.set(ev, new Set());
      this.audio.addEventListener(ev, () => {
        this.emit(ev);
      });
    });
  }

  getAudioElement(): HTMLAudioElement | null {
    return this.audio;
  }

  async load(track: Track): Promise<void> {
    this.currentTrack = track;
    if (!track.audio || (!track.audio.mp3 && !track.audio.ogg)) {
      this.audio.src = '';
      return;
    }

    let src = track.audio.mp3;
    if (track.audio.ogg && this.audio.canPlayType('audio/ogg; codecs="vorbis,opus"')) {
      src = track.audio.ogg;
    }

    this.audio.src = src;
    this.audio.load();
  }

  async play(): Promise<void> {
    if (!this.audio.src || this.audio.src === window.location.href) {
      return;
    }
    try {
      await this.audio.play();
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        this.emit('error');
        throw err;
      }
    }
  }

  pause(): void {
    this.audio.pause();
  }

  seek(sec: number): void {
    if (Number.isFinite(sec) && sec >= 0) {
      this.audio.currentTime = Math.min(sec, this.duration || sec);
    }
  }

  setVolume(v: number): void {
    const clamped = Math.max(0, Math.min(1, v));
    this.audio.volume = clamped;
  }

  get currentTime(): number {
    return this.audio.currentTime || 0;
  }

  get duration(): number {
    return this.audio.duration || (this.currentTrack?.durationSec ?? 0);
  }

  get buffered(): number {
    if (this.audio.buffered.length > 0) {
      return this.audio.buffered.end(this.audio.buffered.length - 1);
    }
    return 0;
  }

  on(event: PlayerEvent, cb: () => void): () => void {
    const set = this.listeners.get(event);
    if (set) {
      set.add(cb);
    }
    return () => {
      set?.delete(cb);
    };
  }

  preloadNextTrack(url: string): void {
    if (this.preloadedNextAudio) {
      this.preloadedNextAudio.src = '';
      this.preloadedNextAudio = null;
    }
    if (!url) return;
    this.preloadedNextAudio = new Audio();
    this.preloadedNextAudio.preload = 'auto';
    this.preloadedNextAudio.src = url;
  }

  private emit(event: PlayerEvent): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((cb) => {
        try {
          cb();
        } catch (e) {
          console.error(`Error in player listener for ${event}:`, e);
        }
      });
    }
  }
}

