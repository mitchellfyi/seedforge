"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProjectPreviewProps {
  projectId: string;
  title: string;
  drivingQuestion: string;
  artifactDescription: string;
  estimatedMinutes: number;
  steps: string[];
  totalGp: number;
}

export function ProjectPreview({
  projectId,
  title,
  drivingQuestion,
  artifactDescription,
  estimatedMinutes,
  steps,
  totalGp,
}: ProjectPreviewProps) {
  const router = useRouter();

  const handleStartBuilding = () => {
    router.push(`/project/${projectId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto border rounded-xl bg-card shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border-b">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground italic">
          "{drivingQuestion}"
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Artifact */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            What you'll make
          </h3>
          <p className="text-sm">{artifactDescription}</p>
        </div>

        {/* Steps */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Your journey ({steps.length} steps)
          </h3>
          <ol className="space-y-1">
            {steps.map((stepTitle, i) => (
              <li key={stepTitle} className="flex items-center gap-2 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  {i + 1}
                </span>
                <span>{stepTitle}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Stats */}
        <div className="flex gap-4 pt-2">
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">
              ~{estimatedMinutes}m
            </p>
            <p className="text-xs text-muted-foreground">Estimated time</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{totalGp} GP</p>
            <p className="text-xs text-muted-foreground">Growth Points</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{steps.length}</p>
            <p className="text-xs text-muted-foreground">Steps</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 pt-0">
        <button
          type="button"
          onClick={handleStartBuilding}
          className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          Start Building
        </button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          You can adjust the project as you go
        </p>
      </div>
    </motion.div>
  );
}
