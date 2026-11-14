import { Track } from '../data/types';

export type PlayerEvent =
  | "play"
  | "pause"
  | "ended"
  | "timeupdate"
  | "waiting"
  | "canplay"
  | "error";

export interface PlayerEngine {
  load(track: Track): Promise<void>;
  play(): Promise<void>;
  pause(): void;
  seek(sec: number): void;
  setVolume(v: number): void;
  readonly currentTime: number;
  readonly duration: number;
  readonly buffered: number;
  on(event: PlayerEvent, cb: () => void): () => void;
  getAudioElement?(): HTMLAudioElement | null;
}

