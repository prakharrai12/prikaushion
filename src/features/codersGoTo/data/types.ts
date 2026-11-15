export type Mood = "warm-up" | "focus" | "debug" | "ship" | "night" | "celebrate" | "cool-down";

export type LyricsMeta =
  | { kind: "synced"; lrcUrl: string; source: string; license: string }
  | { kind: "plain"; textUrl: string; source: string; license: string }
  | { kind: "instrumental" }
  | { kind: "none" };

export type Track = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  durationSec?: number;
  mood: Mood;
  note?: string;
  audio?: { mp3?: string; m4a?: string; ogg?: string };
  cover?: { src640: string; src160: string; blur32: string };
  accent?: string;
  lyrics: LyricsMeta;
  credit: {
    license: "Owned" | "CC0" | "CC-BY" | "CC-BY-SA" | "Licensed" | "Spotify";
    attribution: string;
    sourceUrl?: string;
  };
  externalUrl?: string;
};

export type UiState = 'HIDDEN' | 'DOCKED' | 'SECTION' | 'IMMERSIVE';

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlaylistMeta {
  title: string;
  curator: string;
  description: string;
}

export interface LyricLine {
  t: number;
  end: number;
  text: string;
  interlude?: boolean;
  words?: { t: number; w: string }[];
}

export interface EnergyBands {
  bass: number; // 0..1
  mid: number;  // 0..1
  high: number; // 0..1
}

