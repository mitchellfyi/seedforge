import { buildCoachingSystemPrompt } from "@/lib/ai/prompts";
import type { Project, Step, LearnerProfile } from "@/lib/db/schema";

export function buildScaffoldingCoachPrompt({
  project,
  steps,
  currentStep,
  learnerProfile,
  documentContent,
}: {
  project: Project;
  steps: Step[];
  currentStep: Step;
  learnerProfile: LearnerProfile;
  documentContent: string | null;
}): string {
  const completedSteps = steps.filter((s) => s.status === "completed");
  const upcomingSteps = steps.filter(
    (s) => s.orderIndex > currentStep.orderIndex && s.status !== "completed",
  );

  return buildCoachingSystemPrompt({
    projectTitle: project.title,
    drivingQuestion: project.drivingQuestion,
    artifactDescription: project.artifactDescription,
    currentStep: {
      title: currentStep.title,
      orderIndex: currentStep.orderIndex,
    },
    stepInstructions: currentStep.instructions,
    teachingObjective: currentStep.teachingObjective,
    makingObjective: currentStep.makingObjective,
    checkpoint: currentStep.checkpoint,
    scaffoldingLevel:
      (currentStep.metadata as any)?.scaffoldingLevel ?? "coached",
    documentContent,
    totalGp: learnerProfile.totalGp,
    level: learnerProfile.level,
    currentStreak: learnerProfile.currentStreak,
    completedStepTitles: completedSteps.map((s) => s.title),
    upcomingStepTitles: upcomingSteps.map((s) => s.title),
  });
}
