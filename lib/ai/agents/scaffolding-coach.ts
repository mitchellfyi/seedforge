import {
  buildCoachingSystemPrompt,
  buildCompletionPrompt,
} from "@/lib/ai/prompts";
import type { LearnerProfile, Project, Step } from "@/lib/db/schema";

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
    (s) => s.orderIndex > currentStep.orderIndex && s.status !== "completed"
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

export function buildCompletionCoachPrompt({
  project,
  steps,
  learnerProfile,
}: {
  project: Project;
  steps: Step[];
  learnerProfile: LearnerProfile;
}): string {
  const completedSteps = steps.filter((s) => s.status === "completed");

  return buildCompletionPrompt({
    projectTitle: project.title,
    drivingQuestion: project.drivingQuestion,
    artifactDescription: project.artifactDescription,
    completedStepTitles: completedSteps.map((s) => s.title),
    totalGp: learnerProfile.totalGp,
    level: learnerProfile.level,
    currentStreak: learnerProfile.currentStreak,
  });
}
