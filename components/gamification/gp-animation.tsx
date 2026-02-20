"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface GpAnimationProps {
  amount: number;
  reason: string;
  show: boolean;
  onDone?: () => void;
}

export function GpAnimation({ amount, reason, show, onDone }: GpAnimationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDone?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-20 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">+{amount}</span>
            <span className="text-sm">GP</span>
          </div>
          <p className="text-xs opacity-90">{reason}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
