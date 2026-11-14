import { LyricLine } from '../data/types';

export function parseLrc(lrcText: string, totalDuration: number = 0): LyricLine[] {
  if (!lrcText || typeof lrcText !== 'string') return [];

  const lines = lrcText.split(/\r?\n/);
  let offsetMs = 0;
  const rawEntries: { t: number; text: string; words?: { t: number; w: string }[] }[] = [];

  const offsetMatch = lrcText.match(/\[offset:\s*([+-]?\d+)\]/i);
  if (offsetMatch) {
    offsetMs = parseInt(offsetMatch[1], 10) || 0;
  }

  const timeTagRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{2,3}))?\]/g;
  const wordTagRegex = /<(\d{1,2}):(\d{2})(?:\.(\d{2,3}))?>([^<]+)/g;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Skip metadata headers like [ti:...], [ar:...]
    if (/^\[(ti|ar|al|by|length|re|ve):/i.test(trimmed)) {
      continue;
    }

    const matches = Array.from(trimmed.matchAll(timeTagRegex));
    if (matches.length === 0) continue;

    const textPart = trimmed.replace(timeTagRegex, '').trim();

    // Check for word-level sync
    let words: { t: number; w: string }[] | undefined;
    if (textPart.includes('<')) {
      const wordMatches = Array.from(textPart.matchAll(wordTagRegex));
      if (wordMatches.length > 0) {
        words = wordMatches.map((m) => {
          const min = parseInt(m[1], 10);
          const sec = parseInt(m[2], 10);
          const frac = m[3] ? parseFloat('0.' + m[3]) : 0;
          const time = min * 60 + sec + frac + offsetMs / 1000;
          return { t: Math.max(0, time), w: m[4].trim() };
        });
      }
    }

    const cleanText = textPart.replace(/<\d{1,2}:\d{2}(?:\.\d{2,3})?>/g, '').trim();

    for (const match of matches) {
      const min = parseInt(match[1], 10);
      const sec = parseInt(match[2], 10);
      const frac = match[3] ? parseFloat('0.' + match[3]) : 0;
      const t = min * 60 + sec + frac + offsetMs / 1000;

      rawEntries.push({
        t: Math.max(0, t),
        text: cleanText,
        words,
      });
    }
  }

  // Sort chronologically
  rawEntries.sort((a, b) => a.t - b.t);

  const result: LyricLine[] = [];

  for (let i = 0; i < rawEntries.length; i++) {
    const curr = rawEntries[i];
    const next = rawEntries[i + 1];
    const endTime = next ? next.t : totalDuration > curr.t ? totalDuration : curr.t + 4;

    result.push({
      t: curr.t,
      end: endTime,
      text: curr.text,
      words: curr.words,
    });

    // Interlude detection: if gap between this line's end and next line's start is > 6s
    if (next && next.t - curr.t > 8) {
      result.push({
        t: curr.t + 3,
        end: next.t - 0.5,
        text: '• • •',
        interlude: true,
      });
    }
  }

  return result;
}

