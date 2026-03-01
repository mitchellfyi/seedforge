"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getGpProgressInLevel, getLevelTitle } from "@/lib/gamification/gp";

interface GpBarProps {
  totalGp: number;
  level: number;
  currentStreak: number;
  avatarPreset?: string;
}

export function GpBar({
  totalGp,
  level,
  currentStreak,
  avatarPreset = "grower-1",
}: GpBarProps) {
  const progress = getGpProgressInLevel(totalGp, level);
  const title = getLevelTitle(level);
  const [displayedGp, setDisplayedGp] = useState(totalGp);

  // Animate GP counter
  useEffect(() => {
    if (totalGp !== displayedGp) {
      const diff = totalGp - displayedGp;
      const steps = Math.min(Math.abs(diff), 20);
      const increment = diff / steps;
      let current = displayedGp;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current += increment;
        setDisplayedGp(Math.round(current));
        if (step >= steps) {
          setDisplayedGp(totalGp);
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [totalGp, displayedGp]);

  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b bg-muted/20">
      {/* Avatar */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-900 flex items-center justify-center text-sm">
          {avatarPreset === "grower-1" && "🌱"}
          {avatarPreset === "grower-2" && "🌿"}
          {avatarPreset === "grower-3" && "🌻"}
          {avatarPreset === "grower-4" && "🌳"}
        </div>
      </div>

      {/* GP Progress */}
      <div className="flex-1 max-w-xs">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-medium text-muted-foreground">
            {progress.current}/{progress.needed} GP
          </span>
          <span className="font-medium">
            Lvl {level} {title}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress.percentage}%` }}
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Streak */}
      {currentStreak > 0 && (
        <div className="flex items-center gap-1 text-sm">
          <span className="text-orange-500">🔥</span>
          <span className="font-medium">{currentStreak}</span>
        </div>
      )}
    </div>
  );
}
