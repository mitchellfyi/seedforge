import type { GardenPlant } from "@/lib/db/schema";
import {
  getLevelFromGp,
  getLevelTitle,
  getGpProgressInLevel,
} from "@/lib/gamification/gp";

type Domain = "coding" | "design" | "writing" | "science" | "general";
type PlantType = "flower" | "bush" | "tree";

interface DemoProject {
  id: string;
  title: string;
  domain: Domain;
  plantType: PlantType;
}

export const DEMO_PROJECTS: DemoProject[] = [
  { id: "p01", title: "Personal Portfolio", domain: "coding", plantType: "bush" },
  { id: "p02", title: "Watercolor Landscape", domain: "design", plantType: "flower" },
  { id: "p03", title: "Short Story Collection", domain: "writing", plantType: "bush" },
  { id: "p04", title: "Weather Station", domain: "science", plantType: "tree" },
  { id: "p05", title: "Recipe Card App", domain: "coding", plantType: "flower" },
  { id: "p06", title: "Brand Identity Kit", domain: "design", plantType: "tree" },
  { id: "p07", title: "Daily Journal Habit", domain: "writing", plantType: "flower" },
  { id: "p08", title: "Plant Growth Tracker", domain: "science", plantType: "bush" },
  { id: "p09", title: "Budget Spreadsheet", domain: "general", plantType: "flower" },
  { id: "p10", title: "CLI Todo App", domain: "coding", plantType: "flower" },
  { id: "p11", title: "Poster Design", domain: "design", plantType: "flower" },
  { id: "p12", title: "Blog Post Series", domain: "writing", plantType: "tree" },
  { id: "p13", title: "Star Map Guide", domain: "science", plantType: "flower" },
  { id: "p14", title: "Habit Tracker", domain: "general", plantType: "bush" },
  { id: "p15", title: "REST API Server", domain: "coding", plantType: "tree" },
  { id: "p16", title: "UI Component Library", domain: "design", plantType: "bush" },
  { id: "p17", title: "Poetry Chapbook", domain: "writing", plantType: "flower" },
  { id: "p18", title: "Microscope Journal", domain: "science", plantType: "bush" },
  { id: "p19", title: "Study Planner", domain: "general", plantType: "flower" },
  { id: "p20", title: "Game Prototype", domain: "coding", plantType: "tree" },
];

export interface DemoSnapshot {
  plants: GardenPlant[];
  projectTitles: Map<string, string>;
  stats: {
    level: number;
    totalGp: number;
    currentStreak: number;
    completedProjects: number;
    levelTitle: string;
    gpProgress: { current: number; needed: number; percentage: number };
  };
  milestone: string;
}

export function getDemoSnapshot(progress: number): DemoSnapshot {
  const clamped = Math.max(0, Math.min(100, progress));

  // Determine which plants are visible based on progress
  const plants: GardenPlant[] = [];
  const projectTitles = new Map<string, string>();

  for (let i = 0; i < DEMO_PROJECTS.length; i++) {
    const proj = DEMO_PROJECTS[i];
    const birthPoint = (i / 20) * 100;

    if (clamped < birthPoint) continue;

    const age = clamped - birthPoint;
    let growthStage: string;
    if (age < 10) growthStage = "planted";
    else if (age < 25) growthStage = "growing";
    else growthStage = "blooming";

    // Arrange in a grid: 4 columns
    const col = i % 4;
    const row = Math.floor(i / 4);

    plants.push({
      id: proj.id,
      userId: "demo-user",
      projectId: proj.id,
      plantType: proj.plantType,
      domain: proj.domain,
      growthStage,
      positionX: col,
      positionY: row,
      createdAt: new Date("2025-01-01"),
    });

    projectTitles.set(proj.id, proj.title);
  }

  // Stats derived from progress
  const totalGp = Math.round((clamped / 100) ** 1.3 * 4500);
  const level = getLevelFromGp(totalGp);
  const levelTitle = getLevelTitle(level);
  const gpProgress = getGpProgressInLevel(totalGp, level);
  const currentStreak = Math.round((clamped / 100) * 45);
  const completedProjects = plants.filter(
    (p) => p.growthStage === "blooming",
  ).length;

  // Milestone labels
  let milestone: string;
  if (clamped === 0) milestone = "Your journey begins";
  else if (clamped < 15) milestone = "First seeds planted";
  else if (clamped < 35) milestone = "Garden taking shape";
  else if (clamped < 55) milestone = "Skills diversifying";
  else if (clamped < 75) milestone = "Garden flourishing";
  else if (clamped < 95) milestone = "Approaching mastery";
  else milestone = "A thriving garden";

  return {
    plants,
    projectTitles,
    stats: { level, totalGp, currentStreak, completedProjects, levelTitle, gpProgress },
    milestone,
  };
}
