import { tool, type UIMessageStreamWriter } from "ai";
import type { Session } from "next-auth";
import { z } from "zod";
import {
  createGardenPlant,
  getGardenPlantByProjectId,
  getLearnerProfile,
  getProjectById,
  getStepById,
  getStepsByProjectId,
  updateGardenPlant,
  updateLearnerProfile,
  updateProject,
  updateStep,
} from "@/lib/db/queries";
import {
  calculateSeedsFromGp,
  calculateStepGp,
  calculateStreakUpdate,
  DAILY_ACTIVITY_BONUS,
  getLevelFromGp,
  getPlantDomain,
  getPlantType,
  getProjectCompletionBonus,
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
      if (!userId) {
        throw new Error("Not authenticated");
      }

      const currentStep = await getStepById({ id: stepId });
      if (!currentStep) {
        throw new Error("Step not found");
      }

      const profile = await getLearnerProfile({ userId });
      if (!profile) {
        throw new Error("Learner profile not found");
      }

      // Calculate GP
      const { total: gpAwarded, breakdown } = calculateStepGp({
        baseGpValue: currentStep.gpValue,
        streakDays: profile.currentStreak,
        isFirstAttempt,
      });

      // Mark step complete
      await updateStep({
        id: stepId,
        status: "completed",
        completedAt: new Date(),
      });

      // Get all steps to find next
      const allSteps = await getStepsByProjectId({
        projectId: currentStep.projectId,
      });
      const nextStep = allSteps.find(
        (s) => s.orderIndex === currentStep.orderIndex + 1
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
        profile.longestStreak
      );

      let totalGpToAdd = gpAwarded;
      if (streakUpdate.isNewDay) {
        totalGpToAdd += DAILY_ACTIVITY_BONUS;
      }

      const newTotalGp = profile.totalGp + totalGpToAdd;
      const newLevel = getLevelFromGp(newTotalGp);
      const _leveledUp = newLevel > profile.level;
      const seedsEarned = calculateSeedsFromGp(totalGpToAdd);

      await updateLearnerProfile({
        userId,
        totalGp: newTotalGp,
        level: newLevel,
        totalSeeds: (profile.totalSeeds ?? 0) + seedsEarned,
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

      // Plant growth stage management
      const isProjectComplete = !nextStep;
      const domain = proj ? getPlantDomain(proj.learningIntent) : "general";
      const plantType = proj ? getPlantType(proj.estimatedMinutes) : "flower";

      if (proj) {
        const existingPlant = await getGardenPlantByProjectId({
          projectId: proj.id,
        });

        if (currentStep.orderIndex === 0 && !existingPlant) {
          // First step completed — plant a seed
          await createGardenPlant({
            userId,
            projectId: proj.id,
            plantType,
            domain,
          });
        } else if (existingPlant && !isProjectComplete) {
          // Mid-project — transition to growing once 50% of steps are done
          const completedCount = allSteps.filter(
            (s) => s.status === "completed" || s.id === stepId
          ).length;
          const halfwayDone = completedCount >= Math.ceil(allSteps.length / 2);
          if (halfwayDone && existingPlant.growthStage === "planted") {
            await updateGardenPlant({
              id: existingPlant.id,
              growthStage: "growing",
            });
          }
        }
      }

      if (isProjectComplete && proj) {
        // Award completion bonus
        const completionBonus = getProjectCompletionBonus(
          proj.gpEarned + totalGpToAdd
        );
        const completionSeeds = calculateSeedsFromGp(completionBonus);
        const finalTotalGp = newTotalGp + completionBonus;
        const finalLevel = getLevelFromGp(finalTotalGp);

        await updateLearnerProfile({
          userId,
          totalGp: finalTotalGp,
          level: finalLevel,
          totalSeeds: (profile.totalSeeds ?? 0) + seedsEarned + completionSeeds,
          completedProjectCount: profile.completedProjectCount + 1,
        });

        await updateProject({
          id: proj.id,
          status: "completed",
          gpEarned: proj.gpEarned + totalGpToAdd + completionBonus,
          completedAt: new Date(),
        });

        // Bring plant to full bloom on project completion
        const completedPlant = await getGardenPlantByProjectId({
          projectId: proj.id,
        });
        if (completedPlant) {
          await updateGardenPlant({
            id: completedPlant.id,
            growthStage: "blooming",
          });
        } else {
          await createGardenPlant({
            userId,
            projectId: proj.id,
            plantType,
            domain,
            growthStage: "blooming",
          });
        }

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

      // For the stream, report the final GP/level after any completion bonus
      const finalStreamGp =
        isProjectComplete && proj
          ? newTotalGp + getProjectCompletionBonus(proj.gpEarned + totalGpToAdd)
          : newTotalGp;
      const finalStreamLevel = getLevelFromGp(finalStreamGp);
      const finalLeveledUp = finalStreamLevel > profile.level;

      (dataStream as any).write({
        type: "data-gp-awarded",
        data: {
          amount: totalGpToAdd,
          reason: `Completed: ${currentStep.title}`,
          newTotal: finalStreamGp,
          newLevel: finalStreamLevel,
          leveledUp: finalLeveledUp,
        },
      });

      return {
        gpAwarded: totalGpToAdd,
        newStepId,
        isProjectComplete,
        leveledUp: finalLeveledUp,
        newLevel: finalStreamLevel,
        feedback,
      };
    },
  });
