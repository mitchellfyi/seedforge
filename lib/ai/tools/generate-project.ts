import { tool, type UIMessageStreamWriter } from "ai";
import type { Session } from "next-auth";
import { z } from "zod";
import {
  createProject,
  createSteps,
  createNeedToKnows,
  getOrCreateLearnerProfile,
  updateLearnerProfile,
  saveDocument,
  updateProject,
} from "@/lib/db/queries";
import type { ChatMessage } from "@/lib/types";
import { generateUUID } from "@/lib/utils";

const projectSpecSchema = z.object({
  title: z.string().describe("Project title (e.g., 'Victorian Architecture Field Guide')"),
  drivingQuestion: z
    .string()
    .describe("Open-ended driving question starting with 'How might you...'"),
  artifactDescription: z
    .string()
    .describe("Concrete description of what the user will produce"),
  estimatedMinutes: z
    .number()
    .describe("Estimated completion time in minutes (30-120 for Phase 1)"),
  complexity: z.enum(["beginner", "intermediate", "advanced"]),
  targetAudience: z.string().optional(),
  tone: z.string().optional(),
  steps: z.array(
    z.object({
      title: z.string(),
      teachingObjective: z
        .string()
        .describe("What the user should LEARN in this step"),
      makingObjective: z
        .string()
        .describe("What the user should WRITE/CREATE in this step"),
      instructions: z.string().describe("Detailed step instructions"),
      checkpoint: z
        .string()
        .describe("How we know this step is done — assessment criteria"),
      estimatedMinutes: z.number(),
      scaffoldingLevel: z.enum([
        "full_guidance",
        "coached",
        "light_touch",
        "autonomous",
      ]),
      gpValue: z
        .number()
        .min(30)
        .max(80)
        .describe("GP awarded on completion, scaled by difficulty"),
    }),
  ).min(4).max(8),
  needToKnows: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(["knowledge", "skill", "tool"]),
    }),
  ),
  learnerProfile: z.object({
    interests: z.array(z.string()).describe("User's learning interests extracted from conversation"),
    priorExperience: z.array(z.string()).describe("Skills or domains the user already has experience with"),
    preferredComplexity: z.enum(["beginner", "intermediate", "advanced"]).describe("Calibrated complexity level"),
    initialScaffoldingLevel: z.enum(["full_guidance", "coached", "light_touch", "autonomous"]).describe("Starting scaffolding level based on experience"),
  }).describe("Learner profile data extracted from the onboarding conversation"),
});

type GenerateProjectProps = {
  session: Session;
  dataStream: UIMessageStreamWriter<ChatMessage>;
  learningIntent: string;
};

export const generateProject = ({
  session,
  dataStream,
  learningIntent,
}: GenerateProjectProps) =>
  tool({
    description: `Generate a complete project specification from the user's learning intent. This creates a personalised project with a driving question, artifact description, 4-8 buildable steps, and a need-to-know map. Use this after the onboarding conversation when you have enough context about the user's interests, experience, and aspirations.`,
    inputSchema: projectSpecSchema,
    execute: async (spec) => {
      const userId = session.user?.id;
      if (!userId) throw new Error("Not authenticated");

      // Create the document for the artifact
      const documentId = generateUUID();
      await saveDocument({
        id: documentId,
        title: spec.title,
        kind: "text",
        content: "",
        userId,
      });

      // Create the project
      const projectRecord = await createProject({
        userId,
        title: spec.title,
        drivingQuestion: spec.drivingQuestion,
        artifactDescription: spec.artifactDescription,
        learningIntent,
        estimatedMinutes: spec.estimatedMinutes,
        documentId,
        metadata: {
          targetAudience: spec.targetAudience,
          tone: spec.tone,
          complexity: spec.complexity,
        },
      });

      // Create steps (first step is available, rest locked)
      const stepRecords = await createSteps(
        spec.steps.map((s, i) => ({
          projectId: projectRecord.id,
          orderIndex: i,
          title: s.title,
          teachingObjective: s.teachingObjective,
          makingObjective: s.makingObjective,
          instructions: s.instructions,
          checkpoint: s.checkpoint,
          estimatedMinutes: s.estimatedMinutes,
          status: i === 0 ? "available" : "locked",
          gpValue: s.gpValue,
          metadata: {
            scaffoldingLevel: s.scaffoldingLevel,
          },
        })),
      );

      // Create need-to-knows
      if (spec.needToKnows.length > 0) {
        await createNeedToKnows(
          spec.needToKnows.map((ntk) => ({
            projectId: projectRecord.id,
            title: ntk.title,
            description: ntk.description,
            category: ntk.category,
          })),
        );
      }

      // Ensure learner profile exists and update with extracted data
      await getOrCreateLearnerProfile({ userId });
      await updateLearnerProfile({
        userId,
        interests: spec.learnerProfile.interests,
        priorExperience: spec.learnerProfile.priorExperience,
        preferredComplexity: spec.learnerProfile.preferredComplexity,
        initialScaffoldingLevel: spec.learnerProfile.initialScaffoldingLevel,
      });

      // Stream project spec to the UI for preview card
      (dataStream as any).write({
        type: "data-project-spec",
        data: {
          projectId: projectRecord.id,
          title: spec.title,
          drivingQuestion: spec.drivingQuestion,
          artifactDescription: spec.artifactDescription,
          estimatedMinutes: spec.estimatedMinutes,
          steps: spec.steps.map((s) => s.title),
          totalGp: spec.steps.reduce((sum, s) => sum + s.gpValue, 0),
        },
      });

      return {
        projectId: projectRecord.id,
        title: spec.title,
        drivingQuestion: spec.drivingQuestion,
        artifactDescription: spec.artifactDescription,
        stepCount: spec.steps.length,
        estimatedMinutes: spec.estimatedMinutes,
        message: `Project "${spec.title}" has been created with ${spec.steps.length} steps. The user can now click "Start Building" to begin.`,
      };
    },
  });
