import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Track, UiState, RepeatMode, EnergyBands } from './data/types';
import { playlist } from './data/playlist';
import { HtmlAudioEngine } from './engine/HtmlAudioEngine';
import { AudioAnalyserService } from './engine/analyser';
import { setupMediaSession, updateMediaSessionPosition } from './engine/mediaSession';

interface PlayerContextType {
  tracks: Track[];
  activeIndex: number;
  playingIndex: number;
  currentTrack: Track | null;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  uiState: UiState;
  liked: Set<string>;
  energy: EnergyBands;
  errorToast: string | null;
  hasAudio: boolean;
  playTrack: (index: number) => Promise<void>;
  toggle: () => Promise<void>;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleLike: (id: string) => void;
  setUiState: (s: UiState) => void;
  dismissToast: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

const STORAGE_KEYS = {
  volume: 'cgt:volume',
  muted: 'cgt:muted',
  lastTrackId: 'cgt:lastTrackId',
  shuffle: 'cgt:shuffle',
  repeat: 'cgt:repeat',
  likes: 'cgt:likes',
  dockHidden: 'cgt:dockHidden',
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks] = useState<Track[]>(playlist);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>('off');
  const [uiState, setUiState] = useState<UiState>('HIDDEN');
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [energy, setEnergy] = useState<EnergyBands>({ bass: 0, mid: 0, high: 0 });
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const engineRef = useRef<HtmlAudioEngine | null>(null);
  const analyserRef = useRef<AudioAnalyserService | null>(null);
  const consecutiveErrorsRef = useRef(0);
  const playHistoryRef = useRef<number[]>([]);
  const hasPreloadedNextRef = useRef(false);

  // Initialize engine & local preferences
  useEffect(() => {
    const engine = new HtmlAudioEngine();
    const analyser = new AudioAnalyserService();
    engineRef.current = engine;
    analyserRef.current = analyser;

    // Load persisted preferences
    try {
      const savedVol = localStorage.getItem(STORAGE_KEYS.volume);
      if (savedVol !== null) {
        const v = parseFloat(savedVol);
        setVolumeState(v);
        engine.setVolume(v);
      }
      const savedMuted = localStorage.getItem(STORAGE_KEYS.muted);
      if (savedMuted === 'true') {
        setMuted(true);
        engine.setVolume(0);
      }
      const savedShuffle = localStorage.getItem(STORAGE_KEYS.shuffle);
      if (savedShuffle === 'true') setShuffle(true);

      const savedRepeat = localStorage.getItem(STORAGE_KEYS.repeat) as RepeatMode;
      if (savedRepeat && ['off', 'all', 'one'].includes(savedRepeat)) setRepeat(savedRepeat);

      const savedLikes = localStorage.getItem(STORAGE_KEYS.likes);
      if (savedLikes) {
        setLiked(new Set(JSON.parse(savedLikes)));
      }

      const savedLastId = localStorage.getItem(STORAGE_KEYS.lastTrackId);
      if (savedLastId) {
        const idx = tracks.findIndex((t) => t.id === savedLastId);
        if (idx >= 0) {
          setActiveIndex(idx);
          setPlayingIndex(idx);
        }
      }
    } catch {
      // Fallback to defaults
    }

    // Engine event subscriptions
    const unsubPlay = engine.on('play', () => {
      setIsPlaying(true);
      setIsBuffering(false);
      consecutiveErrorsRef.current = 0;
    });

    const unsubPause = engine.on('pause', () => {
      setIsPlaying(false);
    });

    const unsubWaiting = engine.on('waiting', () => {
      setIsBuffering(true);
    });

    const unsubCanPlay = engine.on('canplay', () => {
      setIsBuffering(false);
    });

    const unsubTime = engine.on('timeupdate', () => {
      const cur = engine.currentTime;
      const dur = engine.duration;
      setCurrentTime(cur);
      setDuration(dur);
      updateMediaSessionPosition(cur, dur);

      // Preload next track at 70% progress
      if (dur > 0 && cur / dur > 0.7 && !hasPreloadedNextRef.current) {
        hasPreloadedNextRef.current = true;
        const nextIdx = (playingIndex + 1) % tracks.length;
        const nextTrk = tracks[nextIdx];
        if (nextTrk?.audio?.mp3) {
          engine.preloadNextTrack(nextTrk.audio.mp3);
        }
      }
    });

    const unsubEnded = engine.on('ended', () => {
      handleTrackEnded();
    });

    const unsubError = engine.on('error', () => {
      handleTrackError();
    });

    return () => {
      unsubPlay();
      unsubPause();
      unsubWaiting();
      unsubCanPlay();
      unsubTime();
      unsubEnded();
      unsubError();
      engine.pause();
    };
  }, []);

  // Energy analyser rAF loop while playing
  useEffect(() => {
    let animId: number;

    const tick = () => {
      if (analyserRef.current && isPlaying) {
        setEnergy(analyserRef.current.getEnergy());
      } else {
        setEnergy({ bass: 0, mid: 0, high: 0 });
      }
      if (isPlaying) {
        animId = requestAnimationFrame(tick);
      }
    };

    if (isPlaying) {
      animId = requestAnimationFrame(tick);
    } else {
      setEnergy({ bass: 0, mid: 0, high: 0 });
    }

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const currentTrack = tracks[playingIndex] || null;
  const hasAudio = Boolean(currentTrack?.audio && (currentTrack.audio.mp3 || currentTrack.audio.ogg));
  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  // MediaSession setup
  useEffect(() => {
    setupMediaSession(currentTrack, {
      play: () => toggle(),
      pause: () => toggle(),
      prev: () => prev(),
      next: () => next(),
      seek: (t) => seek(t),
    });
  }, [currentTrack]);

  const playTrack = useCallback(
    async (index: number) => {
      if (!engineRef.current || index < 0 || index >= tracks.length) return;
      const track = tracks[index];
      setActiveIndex(index);
      setPlayingIndex(index);
      hasPreloadedNextRef.current = false;

      try {
        localStorage.setItem(STORAGE_KEYS.lastTrackId, track.id);
      } catch {}

      if (!track.audio || (!track.audio.mp3 && !track.audio.ogg)) {
        setErrorToast(`AUDIO COMING SOON FOR "${track.title}"`);
        return;
      }

      await engineRef.current.load(track);

      // Lazily initialize audio analyser on user gesture
      const audioEl = engineRef.current.getAudioElement();
      if (audioEl && analyserRef.current) {
        analyserRef.current.init(audioEl);
      }

      try {
        await engineRef.current.play();
        playHistoryRef.current.push(index);
      } catch (err) {
        console.warn('[PlayerProvider] Playback could not start:', err);
      }
    },
    [tracks]
  );

  const toggle = useCallback(async () => {
    if (!engineRef.current) return;
    if (isPlaying) {
      engineRef.current.pause();
    } else {
      if (engineRef.current.currentTime === 0) {
        await playTrack(playingIndex);
      } else {
        try {
          await engineRef.current.play();
        } catch {
          await playTrack(playingIndex);
        }
      }
    }
  }, [isPlaying, playingIndex, playTrack]);

  const next = useCallback(() => {
    if (tracks.length === 0) return;
    let nextIdx = (playingIndex + 1) % tracks.length;

    if (shuffle) {
      const candidates = tracks
        .map((_, i) => i)
        .filter((i) => i !== playingIndex && Boolean(tracks[i].audio?.mp3 || tracks[i].audio?.ogg));
      if (candidates.length > 0) {
        nextIdx = candidates[Math.floor(Math.random() * candidates.length)];
      }
    }

    playTrack(nextIdx);
  }, [tracks, playingIndex, shuffle, playTrack]);

  const prev = useCallback(() => {
    if (!engineRef.current) return;
    // If currentTime > 3s, restart track
    if (engineRef.current.currentTime > 3) {
      engineRef.current.seek(0);
      return;
    }

    if (playHistoryRef.current.length > 1) {
      playHistoryRef.current.pop(); // pop current
      const lastIdx = playHistoryRef.current.pop(); // get previous
      if (lastIdx !== undefined) {
        playTrack(lastIdx);
        return;
      }
    }

    const prevIdx = (playingIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIdx);
  }, [tracks, playingIndex, playTrack]);

  const handleTrackEnded = () => {
    if (repeat === 'one') {
      engineRef.current?.seek(0);
      engineRef.current?.play().catch(() => {});
      return;
    }

    if (playingIndex === tracks.length - 1 && repeat === 'off') {
      engineRef.current?.pause();
      setActiveIndex(0);
      setPlayingIndex(0);
      return;
    }

    next();
  };

  const handleTrackError = () => {
    consecutiveErrorsRef.current += 1;
    const track = tracks[playingIndex];
    setErrorToast(`COULDN'T LOAD "${track?.title || 'TRACK'}" — SKIPPING`);

    if (consecutiveErrorsRef.current >= 3) {
      engineRef.current?.pause();
      setErrorToast('PLAYBACK PAUSED — CHECK YOUR CONNECTION');
    } else {
      setTimeout(() => {
        next();
      }, 1000);
    }
  };

  const seek = useCallback((seconds: number) => {
    if (engineRef.current) {
      engineRef.current.seek(seconds);
      setCurrentTime(seconds);
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (muted) setMuted(false);
    engineRef.current?.setVolume(clamped);
    try {
      localStorage.setItem(STORAGE_KEYS.volume, String(clamped));
    } catch {}
  }, [muted]);

  const toggleMute = useCallback(() => {
    if (muted) {
      setMuted(false);
      engineRef.current?.setVolume(volume);
    } else {
      setMuted(true);
      engineRef.current?.setVolume(0);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.muted, String(!muted));
    } catch {}
  }, [muted, volume]);

  const toggleShuffle = useCallback(() => {
    const nextVal = !shuffle;
    setShuffle(nextVal);
    try {
      localStorage.setItem(STORAGE_KEYS.shuffle, String(nextVal));
    } catch {}
  }, [shuffle]);

  const cycleRepeat = useCallback(() => {
    const modes: RepeatMode[] = ['off', 'all', 'one'];
    const nextMode = modes[(modes.indexOf(repeat) + 1) % modes.length];
    setRepeat(nextMode);
    try {
      localStorage.setItem(STORAGE_KEYS.repeat, nextMode);
    } catch {}
  }, [repeat]);

  const toggleLike = useCallback((id: string) => {
    setLiked((prevSet) => {
      const nextSet = new Set(prevSet);
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEYS.likes, JSON.stringify(Array.from(nextSet)));
      } catch {}
      return nextSet;
    });
  }, []);

  const dismissToast = useCallback(() => {
    setErrorToast(null);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        activeIndex,
        playingIndex,
        currentTrack,
        isPlaying,
        isBuffering,
        currentTime,
        duration,
        progress,
        volume,
        muted,
        shuffle,
        repeat,
        uiState,
        liked,
        energy,
        errorToast,
        hasAudio,
        playTrack,
        toggle,
        next,
        prev,
        seek,
        setVolume,
        toggleMute,
        toggleShuffle,
        cycleRepeat,
        toggleLike,
        setUiState,
        dismissToast,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return ctx;
};

