"use client";

import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { initialArtifactData, useArtifact } from "@/hooks/use-artifact";
import { artifactDefinitions } from "./artifact";
import { useDataStream } from "./data-stream-provider";
import { getChatHistoryPaginationKey } from "./sidebar-history";

// Seedforge custom data stream event types
export type SeedforgeStreamEvent =
  | {
      type: "data-project-spec";
      data: {
        projectId: string;
        title: string;
        drivingQuestion: string;
        artifactDescription: string;
        estimatedMinutes: number;
        steps: string[];
        totalGp: number;
      };
    }
  | {
      type: "data-step-advance";
      data: {
        completedStepId: string;
        newStepId: string | null;
        feedback: string;
        gpAwarded: number;
        breakdown: any;
        isProjectComplete: boolean;
      };
    }
  | {
      type: "data-project-complete";
      data: {
        feedback: string;
        totalGpEarned: number;
        completionBonus: number;
        plantType: string;
      };
    }
  | {
      type: "data-insert-content";
      data: {
        html: string;
        position: string;
      };
    }
  | {
      type: "data-gp-awarded";
      data: {
        amount: number;
        reason: string;
        newTotal: number;
        newLevel: number;
        leveledUp: boolean;
      };
    }
  | {
      type: "data-checkpoint-result";
      data: {
        stepId: string;
        passed: boolean;
        strengths: string[];
        areasForImprovement: string[];
        skillsDemonstrated: string[];
        feedbackMessage: string;
      };
    };

// Global event bus for Seedforge stream events
type SeedforgeEventHandler = (event: SeedforgeStreamEvent) => void;
const seedforgeListeners: Set<SeedforgeEventHandler> = new Set();

export function onSeedforgeStreamEvent(handler: SeedforgeEventHandler) {
  seedforgeListeners.add(handler);
  return () => seedforgeListeners.delete(handler);
}

function emitSeedforgeEvent(event: SeedforgeStreamEvent) {
  for (const listener of seedforgeListeners) {
    listener(event);
  }
}

export function DataStreamHandler() {
  const { dataStream, setDataStream } = useDataStream();
  const { mutate } = useSWRConfig();

  const { artifact, setArtifact, setMetadata } = useArtifact();

  useEffect(() => {
    if (!dataStream?.length) {
      return;
    }

    const newDeltas = dataStream.slice();
    setDataStream([]);

    for (const delta of newDeltas) {
      const deltaType = (delta as any).type as string;

      // Handle chat title updates
      if (deltaType === "data-chat-title") {
        mutate(unstable_serialize(getChatHistoryPaginationKey));
        continue;
      }

      // Handle Seedforge custom events
      if (
        deltaType === "data-project-spec" ||
        deltaType === "data-step-advance" ||
        deltaType === "data-project-complete" ||
        deltaType === "data-insert-content" ||
        deltaType === "data-gp-awarded" ||
        deltaType === "data-checkpoint-result"
      ) {
        emitSeedforgeEvent(delta as unknown as SeedforgeStreamEvent);
        continue;
      }

      // Handle artifact stream events (from Chat SDK)
      const artifactDefinition = artifactDefinitions.find(
        (currentArtifactDefinition) =>
          currentArtifactDefinition.kind === artifact.kind,
      );

      if (artifactDefinition?.onStreamPart) {
        artifactDefinition.onStreamPart({
          streamPart: delta,
          setArtifact,
          setMetadata,
        });
      }

      setArtifact((draftArtifact) => {
        if (!draftArtifact) {
          return { ...initialArtifactData, status: "streaming" };
        }

        switch (delta.type) {
          case "data-id":
            return {
              ...draftArtifact,
              documentId: delta.data,
              status: "streaming",
            };

          case "data-title":
            return {
              ...draftArtifact,
              title: delta.data,
              status: "streaming",
            };

          case "data-kind":
            return {
              ...draftArtifact,
              kind: delta.data,
              status: "streaming",
            };

          case "data-clear":
            return {
              ...draftArtifact,
              content: "",
              status: "streaming",
            };

          case "data-finish":
            return {
              ...draftArtifact,
              status: "idle",
            };

          default:
            return draftArtifact;
        }
      });
    }
  }, [dataStream, setArtifact, setMetadata, artifact, setDataStream, mutate]);

  return null;
}
