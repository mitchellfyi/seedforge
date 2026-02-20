"use client";

import { motion } from "framer-motion";
import type { Step } from "@/lib/db/schema";

interface ProgressRailProps {
  steps: Step[];
  currentStepId: string | null;
  onStepClick: (stepId: string) => void;
}

export function ProgressRail({
  steps,
  currentStepId,
  onStepClick,
}: ProgressRailProps) {
  return (
    <div className="flex flex-col h-full w-[240px] border-r bg-muted/10 overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Progress
        </h3>
      </div>

      <div className="flex-1 p-3 space-y-1">
        {steps.map((s, i) => {
          const isActive = s.id === currentStepId;
          const isCompleted = s.status === "completed";
          const isLocked = s.status === "locked";
          const isAvailable =
            s.status === "available" || s.status === "in_progress";

          return (
            <button
              type="button"
              key={s.id}
              onClick={() => {
                if (!isLocked) onStepClick(s.id);
              }}
              disabled={isLocked}
              className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                isActive
                  ? "bg-primary/10 border border-primary/30 shadow-sm"
                  : isCompleted
                    ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900"
                    : isLocked
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-muted/50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Step indicator */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-primary text-primary-foreground"
                        : isLocked
                          ? "bg-muted text-muted-foreground"
                          : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon />
                  ) : isLocked ? (
                    <LockIcon />
                  ) : (
                    i + 1
                  )}
                </div>

                {/* Step title */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`truncate font-medium ${
                      isActive ? "text-primary" : ""
                    }`}
                  >
                    {s.title}
                  </p>
                  {isCompleted && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      +{s.gpValue} GP
                    </p>
                  )}
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-primary/70"
                    >
                      In progress
                    </motion.p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Need to Know link */}
      <div className="p-3 border-t">
        <button
          type="button"
          className="w-full text-left p-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          📚 Need to Know
        </button>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <rect
        x="2"
        y="4"
        width="6"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 4V3C3 1.89543 3.89543 1 5 1C6.10457 1 7 1.89543 7 3V4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
