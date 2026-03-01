"use client";

import { useCallback, useEffect, useState } from "react";
import type { LearnerProfile, Project, Step } from "@/lib/db/schema";
import { BuildPane } from "./build-pane";
import { GpBar } from "./gp-bar";
import { LearnPane } from "./learn-pane";
import { ProgressRail } from "./progress-rail";

interface WorkspaceLayoutProps {
  project: Project;
  steps: Step[];
  learnerProfile: LearnerProfile;
  initialContent: string;
  coachChatId: string;
}

export function WorkspaceLayout({
  project,
  steps,
  learnerProfile,
  initialContent,
  coachChatId,
}: WorkspaceLayoutProps) {
  const [content, setContent] = useState(initialContent);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [localSteps, _setLocalSteps] = useState(steps);
  const [localProfile, _setLocalProfile] = useState(learnerProfile);

  // Set initial current step (first available/in_progress step)
  useEffect(() => {
    const active =
      localSteps.find((s) => s.status === "in_progress") ??
      localSteps.find((s) => s.status === "available");
    if (active) {
      setCurrentStepId(active.id);
    }
  }, [localSteps]);

  const currentStep = localSteps.find((s) => s.id === currentStepId);

  // Auto-save content
  const handleContentChange = useCallback(
    async (html: string) => {
      setContent(html);
      // Debounced save to document API
      try {
        await fetch("/api/document", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: project.documentId,
            content: html,
            title: project.title,
            kind: "text",
          }),
        });
      } catch {
        // Silently handle save errors for now
      }
    },
    [project.documentId, project.title]
  );

  const handleStepClick = useCallback((stepId: string) => {
    setCurrentStepId(stepId);
  }, []);

  return (
    <div className="flex flex-col h-dvh">
      {/* GP Bar at top */}
      <GpBar
        avatarPreset={localProfile.avatarPreset ?? "grower-1"}
        currentStreak={localProfile.currentStreak}
        level={localProfile.level}
        totalGp={localProfile.totalGp}
      />

      {/* Three-pane workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Progress Rail */}
        <ProgressRail
          currentStepId={currentStepId}
          onStepClick={handleStepClick}
          steps={localSteps}
        />

        {/* Center: Build Pane */}
        <BuildPane
          content={content}
          currentStepTitle={currentStep?.title ?? "Getting started"}
          onContentChange={handleContentChange}
          projectTitle={project.title}
        />

        {/* Right: Learn Pane (Coach) */}
        <LearnPane chatId={coachChatId} />
      </div>
    </div>
  );
}
