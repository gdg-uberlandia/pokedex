export const LEVELS = {
  1: 700,
  2: 1400,
  3: 2100,
  4: 2800,
  5: 3500,
  6: 4200,
};

/**
 * The threshold to start earning awards
 */
export const LEVEL_THRESHOLD = 4;

export const getLevelByScore = (score: number): number => {
  for (const [key, value] of Object.entries(LEVELS)) {
    if (value == score) {
      return parseInt(key);
    }

    if (value > score) {
      return parseInt(key) - 1;
    }
  }
  return 5;
};
