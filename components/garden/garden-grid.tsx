"use client";

import { PlantComponent } from "./plant";
import type { GardenPlant, Project } from "@/lib/db/schema";

interface GardenGridProps {
  plants: GardenPlant[];
  projects: Project[];
}

export function GardenGrid({ plants, projects }: GardenGridProps) {
  const projectMap = new Map(projects.map((p) => [p.id, p]));

  if (plants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8">
        <div className="text-6xl mb-4">🌱</div>
        <h3 className="text-lg font-semibold mb-2">Your garden is empty</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Complete a project to plant your first seed. Each finished project adds
          a new plant to your garden — flowers for quick projects, bushes for
          medium ones, trees for big adventures.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-4 bg-gradient-to-b from-green-50/30 to-emerald-50/30 dark:from-green-950/10 dark:to-emerald-950/10 rounded-xl border min-h-[400px]">
        {plants.map((plant) => {
          const proj = projectMap.get(plant.projectId);
          return (
            <PlantComponent
              key={plant.id}
              plant={plant}
              projectTitle={proj?.title}
            />
          );
        })}
      </div>
    </div>
  );
}
