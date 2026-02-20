"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { getLevelTitle } from "@/lib/gamification/gp";

interface LevelUpProps {
  newLevel: number;
  show: boolean;
  onDone?: () => void;
}

export function LevelUp({ newLevel, show, onDone }: LevelUpProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDone?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  const title = getLevelTitle(newLevel);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={onDone}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-card border rounded-2xl p-8 shadow-2xl text-center max-w-sm"
          >
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              🌟
            </motion.div>
            <h2 className="text-2xl font-bold mb-1">Level Up!</h2>
            <p className="text-lg text-green-600 font-semibold">
              Level {newLevel} — {title}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Your garden grows as you do. Keep building!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
