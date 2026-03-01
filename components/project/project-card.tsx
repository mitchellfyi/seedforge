"use client";

import Link from "next/link";
import type { Project } from "@/lib/db/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    active: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    completed: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    abandoned: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Link
      className="block border rounded-lg p-4 hover:shadow-md transition-shadow bg-card"
      href={
        project.status === "completed"
          ? `/project/${project.id}`
          : `/project/${project.id}`
      }
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-sm line-clamp-1">{project.title}</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${statusColors[project.status] ?? statusColors.draft}`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-xs text-muted-foreground italic mb-3 line-clamp-2">
        "{project.drivingQuestion}"
      </p>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>~{project.estimatedMinutes}m</span>
        <span>{project.gpEarned} GP earned</span>
        {project.completedAt && (
          <span>
            Completed {new Date(project.completedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </Link>
  );
}
