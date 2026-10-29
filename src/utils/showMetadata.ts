/**
 * Dedicated utility for series episode counts and canonical metadata overrides.
 * Ensures titles like VisionQuest have accurate episode counts (8 episodes) rather than
 * default placeholders (10 episodes).
 */

const KNOWN_SHOW_TOTAL_EPISODES: Record<string, number> = {
  visionquest: 8,
  visionquest2026: 8,
  wonderman: 8,
  ironheart: 6,
  daredevilbornagain: 9,
  eyesofwakanda: 4,
  marvelzombies: 4,
  secretinvasion: 6,
  msmarvel: 6,
  moonknight: 6,
  shehulk: 9,
  shehulkattorneyatlaw: 9,
  hawkeye: 6,
  thefalconandthewintersoldier: 6,
  wandavision: 9,
  agathaallalong: 9,
  echo: 5,
};

function normalizeTitleKey(str?: string): string {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Returns the accurate total episodes for a show, checking the canonical override table first.
 */
export function getShowTotalEpisodes(show: {
  title?: string;
  name?: string;
  totalEpisodes?: number;
  number_of_episodes?: number;
}): number {
  const key = normalizeTitleKey(show.title || show.name);
  for (const [knownKey, count] of Object.entries(KNOWN_SHOW_TOTAL_EPISODES)) {
    if (key.includes(knownKey) || knownKey.includes(key)) {
      return count;
    }
  }

  return show.totalEpisodes || show.number_of_episodes || 10;
}
