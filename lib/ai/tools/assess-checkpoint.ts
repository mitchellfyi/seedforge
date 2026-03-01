import { tool, type UIMessageStreamWriter } from "ai";
import { z } from "zod";
import type { ChatMessage } from "@/lib/types";

type AssessCheckpointProps = {
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

export const assessCheckpoint = ({ dataStream }: AssessCheckpointProps) =>
  tool({
    description:
      "Evaluate the user's artifact content against the current step's checkpoint criteria. Use this to formally assess whether the step is complete. This is a structured evaluation, not a casual comment.",
    inputSchema: z.object({
      stepId: z.string().describe("The ID of the step being assessed"),
      passed: z.boolean().describe("Whether the checkpoint criteria are met"),
      strengths: z
        .array(z.string())
        .describe("Specific strengths observed in the work"),
      areasForImprovement: z
        .array(z.string())
        .describe("Specific areas that could improve (empty if passed)"),
      skillsDemonstrated: z
        .array(z.string())
        .describe("Skills the user demonstrated"),
      feedbackMessage: z
        .string()
        .describe("Warm, specific feedback for the user"),
    }),
    execute: ({
      stepId,
      passed,
      strengths,
      areasForImprovement,
      skillsDemonstrated,
      feedbackMessage,
    }) => {
      (dataStream as any).write({
        type: "data-checkpoint-result",
        data: {
          stepId,
          passed,
          strengths,
          areasForImprovement,
          skillsDemonstrated,
          feedbackMessage,
        },
      });

      if (passed) {
        return {
          passed: true,
          message: `Checkpoint passed! ${feedbackMessage}. The step can now be advanced using the advanceStep tool.`,
          stepId,
        };
      }

      return {
        passed: false,
        message: `Checkpoint not yet met. ${feedbackMessage}. Help the user address the areas for improvement before reassessing.`,
        stepId,
        areasForImprovement,
      };
    },
  });
