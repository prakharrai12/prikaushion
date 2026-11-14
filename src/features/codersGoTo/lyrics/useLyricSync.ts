import { useState, useEffect, useRef } from 'react';
import { LyricLine } from '../data/types';

export function useLyricSync(
  lyrics: LyricLine[],
  currentTime: number,
  isPlaying: boolean,
  isVisible: boolean
) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const lastIndexRef = useRef<number>(-1);

  useEffect(() => {
    if (!lyrics.length || !isVisible) {
      return;
    }

    const targetTime = currentTime + 0.12; // 120ms lookahead

    // Binary search for closest line with t <= targetTime
    let low = 0;
    let high = lyrics.length - 1;
    let found = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lyrics[mid].t <= targetTime) {
        found = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (found !== lastIndexRef.current) {
      lastIndexRef.current = found;
      setActiveIndex(found);
    }
  }, [currentTime, lyrics, isVisible, isPlaying]);

  return activeIndex;
}

