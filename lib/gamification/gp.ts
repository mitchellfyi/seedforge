// =============================================================================
// Growth Points (GP) System
// Levels 1-20 for Phase 1, streak tracking, GP calculations
// =============================================================================

// Level thresholds: GP needed to reach the NEXT level
// Levels 1-5: 100 GP per level
// Levels 6-10: 200 GP per level
// Levels 11-20: 350 GP per level
const LEVEL_THRESHOLDS: Record<number, number> = {};

function buildThresholds() {
  let cumulative = 0;
  for (let lvl = 1; lvl <= 20; lvl++) {
    let gpForLevel: number;
    if (lvl <= 5) {
      gpForLevel = 100;
    } else if (lvl <= 10) {
      gpForLevel = 200;
    } else {
      gpForLevel = 350;
    }

    cumulative += gpForLevel;
    LEVEL_THRESHOLDS[lvl] = cumulative;
  }
}
buildThresholds();

export function getLevelFromGp(totalGp: number): number {
  for (let lvl = 20; lvl >= 1; lvl--) {
    if (totalGp >= LEVEL_THRESHOLDS[lvl]) {
      return Math.min(lvl + 1, 20);
    }
  }
  return 1;
}

export function getGpForNextLevel(currentLevel: number): number {
  if (currentLevel >= 20) {
    return 0;
  }
  return LEVEL_THRESHOLDS[currentLevel] ?? 100;
}

export function getGpProgressInLevel(
  totalGp: number,
  currentLevel: number
): { current: number; needed: number; percentage: number } {
  const prevThreshold =
    currentLevel > 1 ? LEVEL_THRESHOLDS[currentLevel - 1] : 0;
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel] ?? prevThreshold + 100;
  const gpInLevel = totalGp - prevThreshold;
  const gpNeeded = nextThreshold - prevThreshold;

  return {
    current: Math.max(0, gpInLevel),
    needed: gpNeeded,
    percentage: Math.min(100, Math.max(0, (gpInLevel / gpNeeded) * 100)),
  };
}

export function getLevelTitle(level: number): string {
  if (level <= 5) {
    return "Seedling";
  }
  if (level <= 10) {
    return "Sprout";
  }
  if (level <= 20) {
    return "Sapling";
  }
  return "Sapling"; // Phase 1 cap
}

// Streak multiplier: +0.5% GP per streak day, capped at +40%
export function getStreakMultiplier(streakDays: number): number {
  return 1.0 + Math.min(streakDays * 0.005, 0.4);
}

// Calculate GP for step completion
export function calculateStepGp({
  baseGpValue,
  streakDays,
  isFirstAttempt,
}: {
  baseGpValue: number;
  streakDays: number;
  isFirstAttempt: boolean;
}): { total: number; breakdown: GpBreakdown } {
  const streakMultiplier = getStreakMultiplier(streakDays);
  const firstAttemptBonus = isFirstAttempt ? 20 : 0;
  const base = Math.round(baseGpValue * streakMultiplier);
  const total = base + firstAttemptBonus;

  return {
    total,
    breakdown: {
      base: baseGpValue,
      streakMultiplier,
      firstAttemptBonus,
      total,
    },
  };
}

export type GpBreakdown = {
  base: number;
  streakMultiplier: number;
  firstAttemptBonus: number;
  total: number;
};

// Determine plant type from project duration
export function getPlantType(estimatedMinutes: number): string {
  if (estimatedMinutes < 60) {
    return "flower";
  }
  if (estimatedMinutes <= 180) {
    return "bush";
  }
  return "tree";
}

// Update streak based on last active date
export function calculateStreakUpdate(
  lastActiveDate: string | null,
  currentStreak: number,
  longestStreak: number
): { newStreak: number; newLongest: number; isNewDay: boolean } {
  const today = new Date().toISOString().split("T")[0];

  if (!lastActiveDate) {
    return {
      newStreak: 1,
      newLongest: Math.max(1, longestStreak),
      isNewDay: true,
    };
  }

  if (lastActiveDate === today) {
    return {
      newStreak: currentStreak,
      newLongest: longestStreak,
      isNewDay: false,
    };
  }

  const lastDate = new Date(lastActiveDate);
  const todayDate = new Date(today);
  const diffDays = Math.floor(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    // Consecutive day
    const newStreak = currentStreak + 1;
    return {
      newStreak,
      newLongest: Math.max(newStreak, longestStreak),
      isNewDay: true,
    };
  }

  // Streak broken — start new streak at 1
  return { newStreak: 1, newLongest: longestStreak, isNewDay: true };
}

// Daily activity bonus: +10 GP
export const DAILY_ACTIVITY_BONUS = 10;

// Project completion bonus
export function getProjectCompletionBonus(totalStepGp: number): number {
  // 20% bonus of total step GP, min 100, max 300
  return Math.min(300, Math.max(100, Math.round(totalStepGp * 0.2)));
}
