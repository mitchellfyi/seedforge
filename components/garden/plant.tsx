"use client";

import { motion } from "framer-motion";
import type { GardenPlant } from "@/lib/db/schema";

interface PlantComponentProps {
  plant: GardenPlant;
  projectTitle?: string;
}

const PLANT_EMOJIS: Record<string, Record<string, string>> = {
  flower: {
    design: "🌸",
    writing: "🌺",
    science: "🌼",
    general: "🌷",
    coding: "💐",
  },
  bush: {
    design: "🌿",
    writing: "📚",
    science: "🍀",
    general: "🌾",
    coding: "🎋",
  },
  tree: {
    design: "🌳",
    writing: "📖",
    science: "🌲",
    general: "🌴",
    coding: "🎄",
  },
};

const GROWTH_LABELS: Record<string, string> = {
  planted: "Just planted",
  growing: "Growing",
  blooming: "In bloom",
};

export function PlantComponent({ plant, projectTitle }: PlantComponentProps) {
  const emoji =
    PLANT_EMOJIS[plant.plantType]?.[plant.domain] ??
    PLANT_EMOJIS[plant.plantType]?.general ??
    "🌱";

  const scale = plant.growthStage === "blooming" ? 1.2 : plant.growthStage === "growing" ? 1.0 : 0.8;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-col items-center gap-1 p-2"
    >
      <motion.div
        className="text-4xl cursor-pointer"
        style={{ transform: `scale(${scale})` }}
        whileHover={{ scale: scale * 1.2 }}
        title={projectTitle}
      >
        {emoji}
      </motion.div>
      {projectTitle && (
        <p className="text-xs text-muted-foreground text-center truncate max-w-[80px]">
          {projectTitle}
        </p>
      )}
      <p className="text-[10px] text-muted-foreground/60">
        {GROWTH_LABELS[plant.growthStage] ?? plant.growthStage}
      </p>
    </motion.div>
  );
}
