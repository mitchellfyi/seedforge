import { tool, type UIMessageStreamWriter } from "ai";
import type { Session } from "next-auth";
import { z } from "zod";
import {
  getStepById,
  getStepsByProjectId,
  updateStep,
  getProjectById,
  updateProject,
  getLearnerProfile,
  updateLearnerProfile,
  createGardenPlant,
} from "@/lib/db/queries";
import {
  calculateStepGp,
  getLevelFromGp,
  calculateStreakUpdate,
  DAILY_ACTIVITY_BONUS,
  getProjectCompletionBonus,
  getPlantType,
} from "@/lib/gamification/gp";
import type { ChatMessage } from "@/lib/types";

type AdvanceStepProps = {
  session: Session;
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

export const advanceStep = ({ session, dataStream }: AdvanceStepProps) =>
  tool({
    description:
      "Mark the current step as complete, award GP, and unlock the next step. Use this ONLY after you have assessed the checkpoint criteria and the user's work meets the requirements.",
    inputSchema: z.object({
      stepId: z.string().describe("The ID of the step to complete"),
      feedback: z
        .string()
        .describe("Specific feedback about what the user did well"),
      isFirstAttempt: z
        .boolean()
        .describe("Whether the user passed on first attempt"),
    }),
    execute: async ({ stepId, feedback, isFirstAttempt }) => {
      const userId = session.user?.id;
      if (!userId) throw new Error("Not authenticated");

      const currentStep = await getStepById({ id: stepId });
      if (!currentStep) throw new Error("Step not found");

      const profile = await getLearnerProfile({ userId });
      if (!profile) throw new Error("Learner profile not found");

      // Calculate GP
      const { total: gpAwarded, breakdown } = calculateStepGp({
        baseGpValue: currentStep.gpValue,
        streakDays: profile.currentStreak,
        isFirstAttempt,
      });

      // Mark step complete
      await updateStep({ id: stepId, status: "completed", completedAt: new Date() });

      // Get all steps to find next
      const allSteps = await getStepsByProjectId({
        projectId: currentStep.projectId,
      });
      const nextStep = allSteps.find(
        (s) => s.orderIndex === currentStep.orderIndex + 1,
      );

      // Unlock next step
      let newStepId: string | null = null;
      if (nextStep) {
        await updateStep({ id: nextStep.id, status: "available" });
        newStepId = nextStep.id;
      }

      // Update GP and streak
      const streakUpdate = calculateStreakUpdate(
        profile.lastActiveDate,
        profile.currentStreak,
        profile.longestStreak,
      );

      let totalGpToAdd = gpAwarded;
      if (streakUpdate.isNewDay) {
        totalGpToAdd += DAILY_ACTIVITY_BONUS;
      }

      const newTotalGp = profile.totalGp + totalGpToAdd;
      const newLevel = getLevelFromGp(newTotalGp);
      const leveledUp = newLevel > profile.level;

      await updateLearnerProfile({
        userId,
        totalGp: newTotalGp,
        level: newLevel,
        currentStreak: streakUpdate.newStreak,
        longestStreak: streakUpdate.newLongest,
        lastActiveDate: new Date().toISOString().split("T")[0],
      });

      // Update project GP
      const proj = await getProjectById({ id: currentStep.projectId });
      if (proj) {
        await updateProject({
          id: proj.id,
          gpEarned: proj.gpEarned + totalGpToAdd,
        });
      }

      // Check if project is complete (no more steps)
      const isProjectComplete = !nextStep;

      if (isProjectComplete && proj) {
        // Award completion bonus
        const completionBonus = getProjectCompletionBonus(proj.gpEarned + totalGpToAdd);
        const finalTotalGp = newTotalGp + completionBonus;
        const finalLevel = getLevelFromGp(finalTotalGp);

        await updateLearnerProfile({
          userId,
          totalGp: finalTotalGp,
          level: finalLevel,
          completedProjectCount: profile.completedProjectCount + 1,
        });

        await updateProject({
          id: proj.id,
          status: "completed",
          gpEarned: proj.gpEarned + totalGpToAdd + completionBonus,
          completedAt: new Date(),
        });

        // Plant in garden
        const plantType = getPlantType(proj.estimatedMinutes);
        await createGardenPlant({
          userId,
          projectId: proj.id,
          plantType,
          domain: "general", // Could be derived from project metadata
        });

        (dataStream as any).write({
          type: "data-project-complete",
          data: {
            feedback,
            totalGpEarned: proj.gpEarned + totalGpToAdd + completionBonus,
            completionBonus,
            plantType,
          },
        });
      }

      // Stream step advance data
      (dataStream as any).write({
        type: "data-step-advance",
        data: {
          completedStepId: stepId,
          newStepId,
          feedback,
          gpAwarded,
          breakdown,
          isProjectComplete,
        },
      });

      // Stream GP update
      (dataStream as any).write({
        type: "data-gp-awarded",
        data: {
          amount: totalGpToAdd,
          reason: `Completed: ${currentStep.title}`,
          newTotal: isProjectComplete
            ? newTotalGp +
              (proj
                ? getProjectCompletionBonus(proj.gpEarned + totalGpToAdd)
                : 0)
            : newTotalGp,
          newLevel: isProjectComplete
            ? getLevelFromGp(
                newTotalGp +
                  (proj
                    ? getProjectCompletionBonus(proj.gpEarned + totalGpToAdd)
                    : 0),
              )
            : newLevel,
          leveledUp,
        },
      });

      return {
        gpAwarded: totalGpToAdd,
        newStepId,
        isProjectComplete,
        leveledUp,
        newLevel,
        feedback,
      };
    },
  });
