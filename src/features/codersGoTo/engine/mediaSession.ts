import { Track } from '../data/types';

interface MediaSessionCallbacks {
  play: () => void;
  pause: () => void;
  prev: () => void;
  next: () => void;
  seek: (time: number) => void;
}

export function setupMediaSession(track: Track | null, callbacks: MediaSessionCallbacks) {
  if (typeof window === 'undefined' || !('mediaSession' in navigator) || !track) {
    return;
  }

  const artwork: MediaImage[] = [];
  if (track.cover?.src640) {
    artwork.push({ src: track.cover.src640, sizes: '512x512', type: 'image/webp' });
  }
  if (track.cover?.src160) {
    artwork.push({ src: track.cover.src160, sizes: '160x160', type: 'image/webp' });
  }

  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album || "The Coder's Go-To",
      artwork,
    });

    navigator.mediaSession.setActionHandler('play', () => callbacks.play());
    navigator.mediaSession.setActionHandler('pause', () => callbacks.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => callbacks.prev());
    navigator.mediaSession.setActionHandler('nexttrack', () => callbacks.next());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime !== undefined) {
        callbacks.seek(details.seekTime);
      }
    });
  } catch (err) {
    console.warn('[MediaSession] Setup failed:', err);
  }
}

export function updateMediaSessionPosition(currentTime: number, duration: number) {
  if (
    typeof window !== 'undefined' &&
    'mediaSession' in navigator &&
    'setPositionState' in navigator.mediaSession &&
    Number.isFinite(duration) &&
    duration > 0
  ) {
    try {
      navigator.mediaSession.setPositionState({
        duration: Math.max(0, duration),
        playbackRate: 1,
        position: Math.min(duration, Math.max(0, currentTime)),
      });
    } catch {
      // Ignore transient position state sync errors
    }
  }
}

