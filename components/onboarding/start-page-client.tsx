"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import {
  onSeedforgeStreamEvent,
  type SeedforgeStreamEvent,
} from "@/components/data-stream-handler";
import { ProjectPreviewCard } from "@/components/project/project-preview-card";

const FIRST_TIME_PHASES = [
  "Interests",
  "Experience",
  "Aspirations",
  "Your Project",
];
const RETURNING_PHASES = ["What's Next", "Your Project"];

type ProjectSpec = {
  projectId: string;
  title: string;
  drivingQuestion: string;
  artifactDescription: string;
  estimatedMinutes: number;
  steps: string[];
  totalGp: number;
};

export function StartPageClient({
  chatId,
  isReturningUser,
  chatModel,
}: {
  chatId: string;
  isReturningUser: boolean;
  chatModel: string;
}) {
  const phases = isReturningUser ? RETURNING_PHASES : FIRST_TIME_PHASES;
  const [currentPhase, setCurrentPhase] = useState(0);
  const [projectSpec, setProjectSpec] = useState<ProjectSpec | null>(null);

  // Listen to stream events for project spec and message count
  useEffect(() => {
    const unsubscribe = onSeedforgeStreamEvent(
      (event: SeedforgeStreamEvent) => {
        if (event.type === "data-project-spec") {
          setProjectSpec(event.data);
          setCurrentPhase(phases.length - 1);
        }
      },
    );
    return () => {
      unsubscribe();
    };
  }, [phases.length]);

  // Track phase by counting user messages in the DOM (simple heuristic)
  useEffect(() => {
    if (projectSpec) return; // Already at final phase

    const observer = new MutationObserver(() => {
      const userMessages = document.querySelectorAll('[data-role="user"]');
      const count = userMessages.length;
      if (count > 0 && count - 1 < phases.length - 1) {
        setCurrentPhase(count - 1);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [projectSpec, phases.length]);

  return (
    <div className="flex flex-col h-dvh bg-background">
      {/* Header */}
      <div className="flex items-center justify-center py-6 border-b bg-gradient-to-r from-primary/5 to-accent/20">
        <div className="text-center flex flex-col items-center gap-3">
          <Image
            src="/brand/seed_anvil.png"
            alt="Seedforge"
            width={56}
            height={56}
          />
          <div>
            <h1 className="text-xl font-bold">
              {isReturningUser
                ? "Start a new project"
                : "Welcome to Seedforge"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              {isReturningUser
                ? "Tell me what you'd like to build next."
                : "Your first project takes just one session. Tell me what you're curious about and you'll walk away with something real."}
            </p>
          </div>

          {/* Phase Progress */}
          <div className="flex items-center gap-1 mt-2">
            {phases.map((phase, i) => (
              <div key={phase} className="flex items-center">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    i === currentPhase
                      ? "bg-primary text-primary-foreground"
                      : i < currentPhase
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {phase}
                </div>
                {i < phases.length - 1 && (
                  <div
                    className={`w-4 h-px mx-1 ${
                      i < currentPhase ? "bg-primary/40" : "bg-muted-foreground/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 relative max-w-2xl mx-auto w-full">
        <Chat
          id={chatId}
          initialMessages={[]}
          initialChatModel={chatModel}
          initialVisibilityType="private"
          isReadonly={false}
          autoResume={false}
          body={{
            isOnboarding: true,
            isReturningUser,
          }}
        />
        <DataStreamHandler />

        {/* Project Preview Overlay */}
        {projectSpec && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <ProjectPreviewCard spec={projectSpec} />
          </div>
        )}
      </div>
    </div>
  );
}
