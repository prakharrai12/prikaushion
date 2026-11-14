import { Track } from '../data/types';
import { PlayerEngine, PlayerEvent } from './PlayerEngine';

/**
 * SpotifyEngine - Scaffold for future Spotify Web Playback SDK / Embed integration.
 * Unwired by default.
 */
export class SpotifyEngine implements PlayerEngine {
  private listeners: Map<PlayerEvent, Set<() => void>> = new Map();
  private _currentTime: number = 0;
  private _duration: number = 0;

  constructor() {
    const events: PlayerEvent[] = [
      'play',
      'pause',
      'ended',
      'timeupdate',
      'waiting',
      'canplay',
      'error',
    ];
    events.forEach((ev) => this.listeners.set(ev, new Set()));
  }

  async load(track: Track): Promise<void> {
    this._currentTime = 0;
    this._duration = track.durationSec || 180;
  }

  async play(): Promise<void> {
    console.log('[SpotifyEngine] Play called on scaffold');
  }

  pause(): void {
    console.log('[SpotifyEngine] Pause called on scaffold');
  }

  seek(sec: number): void {
    this._currentTime = sec;
  }

  setVolume(_v: number): void {}

  get currentTime(): number {
    return this._currentTime;
  }

  get duration(): number {
    return this._duration;
  }

  get buffered(): number {
    return this._duration;
  }

  on(event: PlayerEvent, cb: () => void): () => void {
    const set = this.listeners.get(event);
    if (set) set.add(cb);
    return () => {
      set?.delete(cb);
    };
  }

  getAudioElement(): HTMLAudioElement | null {
    return null;
  }
}

