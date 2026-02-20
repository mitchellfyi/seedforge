"use client";

import Link from "next/link";
import { ProjectCard } from "./project-card";
import type { Project, LearnerProfile, GardenPlant } from "@/lib/db/schema";
import { getLevelTitle, getGpProgressInLevel } from "@/lib/gamification/gp";

interface ProjectDashboardProps {
  projects: Project[];
  learnerProfile: LearnerProfile;
  gardenPlants: GardenPlant[];
}

export function ProjectDashboard({
  projects,
  learnerProfile,
  gardenPlants,
}: ProjectDashboardProps) {
  const activeProjects = projects.filter((p) => p.status === "active");
  const completedProjects = projects.filter((p) => p.status === "completed");
  const progress = getGpProgressInLevel(
    learnerProfile.totalGp,
    learnerProfile.level,
  );
  const title = getLevelTitle(learnerProfile.level);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Stats Header */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Level"
          value={`${learnerProfile.level}`}
          subtitle={title}
        />
        <StatCard
          label="Growth Points"
          value={`${learnerProfile.totalGp}`}
          subtitle={`${progress.current}/${progress.needed} to next level`}
        />
        <StatCard
          label="Streak"
          value={
            learnerProfile.currentStreak > 0
              ? `🔥 ${learnerProfile.currentStreak}`
              : "—"
          }
          subtitle={`Best: ${learnerProfile.longestStreak} days`}
        />
        <StatCard
          label="Projects"
          value={`${learnerProfile.completedProjectCount}`}
          subtitle="completed"
        />
      </div>

      {/* Garden Preview */}
      {gardenPlants.length > 0 && (
        <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Your Garden</h2>
            <Link
              href="/garden"
              className="text-sm text-green-600 hover:underline"
            >
              View full garden
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {gardenPlants.slice(0, 8).map((plant) => (
              <div
                key={plant.id}
                className="flex-shrink-0 w-16 h-16 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-2xl"
              >
                {plant.plantType === "flower"
                  ? "🌸"
                  : plant.plantType === "bush"
                    ? "🌿"
                    : "🌳"}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3">Active Projects</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {activeProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

      {/* Start New Project CTA */}
      <div className="border-2 border-dashed border-green-300 dark:border-green-800 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">
          Ready to learn something new?
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Tell us what you're curious about and we'll design a project just for
          you.
        </p>
        <Link
          href="/onboarding"
          className="inline-block py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Start a new project
        </Link>
      </div>

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3">Completed</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {completedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="border rounded-lg p-4 bg-card text-center">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}
