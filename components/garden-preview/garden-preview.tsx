"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PlantComponent } from "@/components/garden/plant";
import { getDemoSnapshot } from "./demo-data";

const MILESTONES = [0, 25, 50, 75, 100];

/**
 * Embeddable garden demo: stats bar + garden grid + slider.
 * No nav, no header, no CTA — designed to be embedded in other pages.
 */
export function GardenDemoEmbed() {
  const [progress, setProgress] = useState(0);
  const snapshot = useMemo(() => getDemoSnapshot(progress), [progress]);
  const { plants, projectTitles, stats, milestone } = snapshot;

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Level */}
        <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
          <div className="text-xs text-foreground/40 mb-1">Level</div>
          <div className="text-2xl font-bold text-[#E8A83E]">{stats.level}</div>
          <div className="text-xs text-foreground/50">{stats.levelTitle}</div>
        </div>

        {/* GP */}
        <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
          <div className="text-xs text-foreground/40 mb-1">Growth Points</div>
          <div className="text-2xl font-bold text-[#E8A83E]">
            {stats.totalGp.toLocaleString()}
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              animate={{ width: `${stats.gpProgress.percentage}%` }}
              className="h-full rounded-full bg-[#E8A83E]"
              initial={false}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          <div className="text-[10px] text-foreground/30 mt-1">
            {stats.gpProgress.current} / {stats.gpProgress.needed} to next level
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
          <div className="text-xs text-foreground/40 mb-1">Streak</div>
          <div className="text-2xl font-bold text-[#4CAF50]">
            {stats.currentStreak}
          </div>
          <div className="text-xs text-foreground/50">days</div>
        </div>

        {/* Projects */}
        <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
          <div className="text-xs text-foreground/40 mb-1">Projects</div>
          <div className="text-2xl font-bold text-foreground">
            {stats.completedProjects}
          </div>
          <div className="text-xs text-foreground/50">completed</div>
        </div>
      </div>

      {/* Garden Grid */}
      <div className="rounded-2xl bg-gradient-to-b from-[#1E3A2F]/60 to-[#1A2E1A]/80 border border-white/5 p-6 min-h-[320px]">
        {plants.length === 0 ? (
          <div className="flex items-center justify-center h-[280px] text-foreground/30 text-sm">
            Drag the slider to plant your first seeds...
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1">
            <AnimatePresence mode="popLayout">
              {plants.map((plant) => (
                <motion.div
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  initial={{ scale: 0, opacity: 0 }}
                  key={plant.id}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <PlantComponent
                    plant={plant}
                    projectTitle={projectTitles.get(plant.projectId)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Slider */}
      <div>
        <div className="relative pt-4 pb-2">
          {/* Milestone dots */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-[6px] pointer-events-none">
            {MILESTONES.map((m) => (
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  progress >= m ? "bg-[#E8A83E]" : "bg-white/20"
                }`}
                key={m}
              />
            ))}
          </div>

          <input
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E8A83E] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#E8A83E]/30 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#E8A83E] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            max={100}
            min={0}
            onChange={(e) => setProgress(Number(e.target.value))}
            type="range"
            value={progress}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-[#E8A83E] font-medium">{milestone}</p>
          <p className="text-xs text-foreground/30 mt-1">
            Drag to simulate your learning journey
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Full-page garden preview (used as a standalone page).
 * Wraps GardenDemoEmbed with nav, header, and CTA.
 */
export function GardenPreview() {
  return (
    <div className="min-h-dvh bg-[#1A1A2E] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link href="/">
          <Image
            alt="Seedforge"
            className="h-12 w-auto drop-shadow-[0_0_12px_rgba(212,146,42,0.3)]"
            height={46}
            priority
            src="/brand/seedforge.png"
            width={140}
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
            href="/"
          >
            &larr; Home
          </Link>
          <Link
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-[#E8A83E] text-primary-foreground transition-colors"
            href="/register"
          >
            Start building
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-8 pb-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-[#E8A83E]/15 text-[#E8A83E] border border-[#E8A83E]/20">
            Demo preview
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            See How Your Garden Grows
          </h1>
        </div>
      </section>

      {/* Demo */}
      <section className="px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <GardenDemoEmbed />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Ready to grow your own?
          </h2>
          <p className="text-foreground/50 mb-6 text-sm">
            Start building real projects and watch your garden come to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              className="px-8 py-3 text-base font-semibold rounded-lg bg-primary hover:bg-[#E8A83E] text-primary-foreground transition-colors shadow-lg shadow-primary/25"
              href="/register"
            >
              Start building — free
            </Link>
            <Link
              className="px-8 py-3 text-base font-medium rounded-lg border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
              href="/api/auth/guest?redirectUrl=/dashboard"
            >
              Try as guest
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
