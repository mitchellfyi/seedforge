"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Sparkles, ArrowRight } from "lucide-react";

type ProjectSpec = {
  projectId: string;
  title: string;
  drivingQuestion: string;
  artifactDescription: string;
  estimatedMinutes: number;
  steps: string[];
  totalGp: number;
};

export function ProjectPreviewCard({ spec }: { spec: ProjectSpec }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-[#E8A83E]/10 px-6 py-5 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">{spec.title}</h2>
        <p className="text-sm text-muted-foreground mt-1 italic">
          {spec.drivingQuestion}
        </p>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        {/* Artifact */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            What you&apos;ll make
          </h3>
          <p className="text-sm text-foreground">{spec.artifactDescription}</p>
        </div>

        {/* Steps */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Steps ({spec.steps.length})
          </h3>
          <ol className="space-y-1.5">
            {spec.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="flex-none w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/80">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>~{spec.estimatedMinutes} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#E8A83E]">
            <Sparkles className="w-4 h-4" />
            <span>{spec.totalGp} GP</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <Link
          href={`/project/${spec.projectId}`}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors shadow-lg shadow-primary/20"
        >
          Start Building
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
