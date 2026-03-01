// =============================================================================
// Growth Points (GP) System
// Full level curve 1–100+, streak tracking, GP calculations
// =============================================================================

// GP required per level, by tier. Based on the design document:
// Levels 1–5:   100 GP/level
// Levels 6–10:  200 GP/level
// Levels 11–20: 350 GP/level
// Levels 21–35: 500 GP/level
// Levels 36–50: 650 GP/level
// Levels 51–75: 800 GP/level
// Levels 76–100: 1000 GP/level
// Levels 100+:  1000 GP/level (flat, prestige levels, no cap)
const MAX_STORED_LEVEL = 150;
const LEVEL_THRESHOLDS: Record<number, number> = {};

function gpPerLevel(lvl: number): number {
  if (lvl <= 5) {
    return 100;
  }
  if (lvl <= 10) {
    return 200;
  }
  if (lvl <= 20) {
    return 350;
  }
  if (lvl <= 35) {
    return 500;
  }
  if (lvl <= 50) {
    return 650;
  }
  if (lvl <= 75) {
    return 800;
  }
  return 1000;
}

function buildThresholds() {
  let cumulative = 0;
  for (let lvl = 1; lvl <= MAX_STORED_LEVEL; lvl++) {
    cumulative += gpPerLevel(lvl);
    LEVEL_THRESHOLDS[lvl] = cumulative;
  }
}
buildThresholds();

export function getLevelFromGp(totalGp: number): number {
  for (let lvl = MAX_STORED_LEVEL; lvl >= 1; lvl--) {
    if (totalGp >= LEVEL_THRESHOLDS[lvl]) {
      return lvl + 1;
    }
  }
  return 1;
}

export function getGpForNextLevel(currentLevel: number): number {
  return LEVEL_THRESHOLDS[currentLevel] ?? LEVEL_THRESHOLDS[MAX_STORED_LEVEL];
}

export function getGpProgressInLevel(
  totalGp: number,
  currentLevel: number
): { current: number; needed: number; percentage: number } {
  const prevThreshold =
    currentLevel > 1 ? (LEVEL_THRESHOLDS[currentLevel - 1] ?? 0) : 0;
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel] ?? prevThreshold + 1000;
  const gpInLevel = totalGp - prevThreshold;
  const gpNeeded = nextThreshold - prevThreshold;

  return {
    current: Math.max(0, gpInLevel),
    needed: gpNeeded,
    percentage: Math.min(100, Math.max(0, (gpInLevel / gpNeeded) * 100)),
  };
}

// Level titles from the design document — all 8 tiers
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
  if (level <= 35) {
    return "Grower";
  }
  if (level <= 50) {
    return "Cultivator";
  }
  if (level <= 75) {
    return "Gardener";
  }
  if (level <= 100) {
    return "Steward";
  }
  return "Keeper";
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

// Seeds earned ≈ 1 per 5 GP (design doc formula)
export function calculateSeedsFromGp(gp: number): number {
  return Math.floor(gp / 5);
}

// Derive the garden plant domain from a project's learning intent via keywords.
// Maps to the domains available in the plant component: design, writing, science, coding, general.
export function getPlantDomain(learningIntent: string): string {
  const lower = learningIntent.toLowerCase();
  if (
    /\b(code|coding|program|develop|software|web|app|script|python|javascript|react|html|css)\b/.test(
      lower
    )
  ) {
    return "coding";
  }
  if (
    /\b(design|graphic|illustrat|colour|color|typography|layout|poster|brand|logo|visual|art|draw|paint|sketch|canvas|svg)\b/.test(
      lower
    )
  ) {
    return "design";
  }
  if (
    /\b(writ|essay|story|blog|journal|report|content|copy|edit|author|novel|poem|fiction|prose)\b/.test(
      lower
    )
  ) {
    return "writing";
  }
  if (
    /\b(science|biology|chemistry|physics|math|statistic|data|research|history|geography|nature|plant|animal|ecology|astro)\b/.test(
      lower
    )
  ) {
    return "science";
  }
  return "general";
}

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
