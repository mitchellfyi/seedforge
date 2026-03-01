"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GpAnimation } from "@/components/gamification/gp-animation";
import { LevelUp } from "@/components/gamification/level-up";
import type {
  LearnerProfile,
  NeedToKnow,
  Project,
  Step,
} from "@/lib/db/schema";
import { onSeedforgeStreamEvent } from "../data-stream-handler";
import { BuildPane } from "./build-pane";
import { GpBar } from "./gp-bar";
import { LearnPane } from "./learn-pane";
import { ProgressRail } from "./progress-rail";

interface WorkspaceLayoutProps {
  project: Project;
  steps: Step[];
  learnerProfile: LearnerProfile;
  needToKnows: NeedToKnow[];
  initialContent: string;
  coachChatId: string;
}

export function WorkspaceLayout({
  project,
  steps,
  learnerProfile,
  needToKnows,
  initialContent,
  coachChatId,
}: WorkspaceLayoutProps) {
  const [content, setContent] = useState(initialContent);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [localSteps, setLocalSteps] = useState(steps);
  const [localProfile, setLocalProfile] = useState(learnerProfile);

  // Gamification animation state
  const [gpAnimation, setGpAnimation] = useState<{
    show: boolean;
    amount: number;
    reason: string;
  }>({ show: false, amount: 0, reason: "" });
  const [levelUp, setLevelUp] = useState<{ show: boolean; newLevel: number }>({
    show: false,
    newLevel: 1,
  });

  // Ref to the TipTap insert function, populated when editor is ready
  const insertHtmlRef = useRef<((html: string) => void) | null>(null);

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

  // Subscribe to Seedforge stream events from the AI coach
  useEffect(() => {
    const unsubscribe = onSeedforgeStreamEvent((event) => {
      if (event.type === "data-step-advance") {
        const { completedStepId, newStepId } = event.data;
        setLocalSteps((prev) =>
          prev.map((s) => {
            if (s.id === completedStepId) {
              return { ...s, status: "completed" as const };
            }
            if (s.id === newStepId) {
              return { ...s, status: "available" as const };
            }
            return s;
          })
        );
        if (newStepId) {
          setCurrentStepId(newStepId);
        }
      }

      if (event.type === "data-gp-awarded") {
        const { amount, reason, newTotal, newLevel, leveledUp } = event.data;
        setLocalProfile((prev) => ({
          ...prev,
          totalGp: newTotal,
          level: newLevel,
        }));
        setGpAnimation({ show: true, amount, reason });
        if (leveledUp) {
          setLevelUp({ show: true, newLevel });
        }
      }

      if (event.type === "data-insert-content") {
        insertHtmlRef.current?.(event.data.html);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Auto-save content with debounce
  const handleContentChange = useCallback(
    async (html: string) => {
      setContent(html);
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
        // Silently handle save errors — content is already tracked in state
      }
    },
    [project.documentId, project.title]
  );

  const handleStepClick = useCallback((stepId: string) => {
    setCurrentStepId(stepId);
  }, []);

  const handleEditorReady = useCallback((insertFn: (html: string) => void) => {
    insertHtmlRef.current = insertFn;
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
          needToKnows={needToKnows}
          onStepClick={handleStepClick}
          steps={localSteps}
        />

        {/* Center: Build Pane */}
        <BuildPane
          content={content}
          currentStepTitle={currentStep?.title ?? "Getting started"}
          onContentChange={handleContentChange}
          onEditorReady={handleEditorReady}
          projectTitle={project.title}
        />

        {/* Right: Learn Pane (Coach) */}
        <LearnPane chatId={coachChatId} />
      </div>

      {/* GP award popup */}
      <GpAnimation
        amount={gpAnimation.amount}
        onDone={() => setGpAnimation((prev) => ({ ...prev, show: false }))}
        reason={gpAnimation.reason}
        show={gpAnimation.show}
      />

      {/* Level-up full-screen celebration */}
      <LevelUp
        newLevel={levelUp.newLevel}
        onDone={() => setLevelUp((prev) => ({ ...prev, show: false }))}
        show={levelUp.show}
      />
    </div>
  );
}
