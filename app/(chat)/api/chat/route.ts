import { geolocation } from "@vercel/functions";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  stepCountIs,
  streamText,
} from "ai";
import { after } from "next/server";
import { createResumableStreamContext } from "resumable-stream";
import { auth, type UserType } from "@/app/(auth)/auth";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import {
  type RequestHints,
  systemPrompt,
  onboardingSystemPrompt,
} from "@/lib/ai/prompts";
import {
  getLanguageModel,
  getCoachingModel,
  getProjectDesignerModel,
} from "@/lib/ai/providers";
import { createDocument } from "@/lib/ai/tools/create-document";
import { updateDocument } from "@/lib/ai/tools/update-document";
import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
import { generateProject } from "@/lib/ai/tools/generate-project";
import { advanceStep } from "@/lib/ai/tools/advance-step";
import { insertContent } from "@/lib/ai/tools/insert-content";
import { assessCheckpoint } from "@/lib/ai/tools/assess-checkpoint";
import {
  buildScaffoldingCoachPrompt,
  buildCompletionCoachPrompt,
} from "@/lib/ai/agents/scaffolding-coach";
import { isProductionEnvironment } from "@/lib/constants";
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  getProjectById,
  getStepsByProjectId,
  getOrCreateLearnerProfile,
  getDocumentById,
  saveChat,
  saveMessages,
  updateChatTitleById,
  updateMessage,
} from "@/lib/db/queries";
import type { DBMessage } from "@/lib/db/schema";
import { ChatSDKError } from "@/lib/errors";
import type { ChatMessage } from "@/lib/types";
import { convertToUIMessages, generateUUID } from "@/lib/utils";
import { generateTitleFromUserMessage } from "../../actions";
import { type PostRequestBody, postRequestBodySchema } from "./schema";

export const maxDuration = 60;

function getStreamContext() {
  try {
    return createResumableStreamContext({ waitUntil: after });
  } catch (_) {
    return null;
  }
}

export { getStreamContext };

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (_) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  try {
    const { id, message, messages, selectedChatModel, selectedVisibilityType } =
      requestBody;

    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    const userType: UserType = session.user.type;

    const messageCount = await getMessageCountByUserId({
      id: session.user.id,
      differenceInHours: 24,
    });

    if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
      return new ChatSDKError("rate_limit:chat").toResponse();
    }

    const isToolApprovalFlow = Boolean(messages);

    const chat = await getChatById({ id });
    let messagesFromDb: DBMessage[] = [];
    let titlePromise: Promise<string> | null = null;

    if (chat) {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError("forbidden:chat").toResponse();
      }
      if (!isToolApprovalFlow) {
        messagesFromDb = await getMessagesByChatId({ id });
      }
    } else if (message?.role === "user") {
      await saveChat({
        id,
        userId: session.user.id,
        title: "New chat",
        visibility: selectedVisibilityType,
      });
      titlePromise = generateTitleFromUserMessage({ message });
    }

    const uiMessages = isToolApprovalFlow
      ? (messages as ChatMessage[])
      : [...convertToUIMessages(messagesFromDb), message as ChatMessage];

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    if (message?.role === "user") {
      await saveMessages({
        messages: [
          {
            chatId: id,
            id: message.id,
            role: "user",
            parts: message.parts,
            attachments: [],
            createdAt: new Date(),
          },
        ],
      });
    }

    // =================================================================
    // Seedforge: Detect context (onboarding vs coaching vs general)
    // =================================================================

    // Check if this is a coaching chat (linked to a project)
    const projectId = (requestBody as any).projectId as string | undefined;
    let coachingSystemPrompt: string | null = null;
    let isOnboarding = false;
    let isCompletionMode = false;

    // Detect onboarding mode from the selectedChatModel or URL pattern
    const modelId = selectedChatModel;
    if (modelId.includes("opus") || (requestBody as any).isOnboarding) {
      isOnboarding = true;
    }

    if (projectId) {
      // Build coaching context
      const proj = await getProjectById({ id: projectId });
      if (proj) {
        const steps = await getStepsByProjectId({ projectId });
        const currentStep =
          steps.find((s) => s.status === "in_progress") ??
          steps.find((s) => s.status === "available");

        const profile = await getOrCreateLearnerProfile({
          userId: session.user.id,
        });

        const doc = proj.documentId
          ? await getDocumentById({ id: proj.documentId })
          : null;

        if (currentStep) {
          coachingSystemPrompt = buildScaffoldingCoachPrompt({
            project: proj,
            steps,
            currentStep,
            learnerProfile: profile,
            documentContent: doc?.content ?? null,
          });
        } else {
          // All steps complete — use completion prompt
          isCompletionMode = true;
          coachingSystemPrompt = buildCompletionCoachPrompt({
            project: proj,
            steps,
            learnerProfile: profile,
          });
        }
      }
    }

    // Determine model and system prompt
    const model = coachingSystemPrompt
      ? getCoachingModel()
      : isOnboarding
        ? getProjectDesignerModel()
        : getLanguageModel(selectedChatModel);

    const sysPrompt = coachingSystemPrompt
      ? coachingSystemPrompt
      : isOnboarding
        ? onboardingSystemPrompt
        : systemPrompt({ selectedChatModel, requestHints });

    // Determine tools based on context
    const activeToolNames = isCompletionMode
      ? ["createDocument", "updateDocument"]
      : coachingSystemPrompt
        ? [
            "advanceStep",
            "insertContent",
            "assessCheckpoint",
            "createDocument",
            "updateDocument",
          ]
        : isOnboarding
          ? ["generateProject"]
          : [
              "createDocument",
              "updateDocument",
              "requestSuggestions",
            ];

    const modelMessages = await convertToModelMessages(uiMessages);

    const stream = createUIMessageStream({
      originalMessages: isToolApprovalFlow ? uiMessages : undefined,
      execute: async ({ writer: dataStream }) => {
        // Build tools object
        const tools: Record<string, any> = {};

        if (activeToolNames.includes("createDocument")) {
          tools.createDocument = createDocument({ session, dataStream });
        }
        if (activeToolNames.includes("updateDocument")) {
          tools.updateDocument = updateDocument({ session, dataStream });
        }
        if (activeToolNames.includes("requestSuggestions")) {
          tools.requestSuggestions = requestSuggestions({
            session,
            dataStream,
          });
        }
        if (activeToolNames.includes("generateProject")) {
          tools.generateProject = generateProject({
            session,
            dataStream,
            learningIntent:
              message?.parts
                ?.filter((p: any) => p.type === "text")
                .map((p: any) => p.text)
                .join(" ") ?? "",
          });
        }
        if (activeToolNames.includes("advanceStep")) {
          tools.advanceStep = advanceStep({ session, dataStream });
        }
        if (activeToolNames.includes("insertContent")) {
          tools.insertContent = insertContent({ dataStream });
        }
        if (activeToolNames.includes("assessCheckpoint")) {
          tools.assessCheckpoint = assessCheckpoint({ dataStream });
        }

        const result = streamText({
          model,
          system: sysPrompt,
          messages: modelMessages,
          stopWhen: stepCountIs(5),
          experimental_activeTools: activeToolNames,
          tools,
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text",
          },
        });

        dataStream.merge(result.toUIMessageStream({ sendReasoning: true }));

        if (titlePromise) {
          const title = await titlePromise;
          dataStream.write({ type: "data-chat-title", data: title });
          updateChatTitleById({ chatId: id, title });
        }
      },
      generateId: generateUUID,
      onFinish: async ({ messages: finishedMessages }) => {
        if (isToolApprovalFlow) {
          for (const finishedMsg of finishedMessages) {
            const existingMsg = uiMessages.find(
              (m) => m.id === finishedMsg.id,
            );
            if (existingMsg) {
              await updateMessage({
                id: finishedMsg.id,
                parts: finishedMsg.parts,
              });
            } else {
              await saveMessages({
                messages: [
                  {
                    id: finishedMsg.id,
                    role: finishedMsg.role,
                    parts: finishedMsg.parts,
                    createdAt: new Date(),
                    attachments: [],
                    chatId: id,
                  },
                ],
              });
            }
          }
        } else if (finishedMessages.length > 0) {
          await saveMessages({
            messages: finishedMessages.map((currentMessage) => ({
              id: currentMessage.id,
              role: currentMessage.role,
              parts: currentMessage.parts,
              createdAt: new Date(),
              attachments: [],
              chatId: id,
            })),
          });
        }
      },
      onError: () => "Oops, an error occurred!",
    });

    return createUIMessageStreamResponse({
      stream,
      async consumeSseStream({ stream: sseStream }) {
        if (!process.env.REDIS_URL) {
          return;
        }
        try {
          const streamContext = getStreamContext();
          if (streamContext) {
            const streamId = generateId();
            await createStreamId({ streamId, chatId: id });
            await streamContext.createNewResumableStream(
              streamId,
              () => sseStream,
            );
          }
        } catch (_) {
          // ignore redis errors
        }
      },
    });
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    if (
      error instanceof Error &&
      error.message?.includes(
        "AI Gateway requires a valid credit card on file to service requests",
      )
    ) {
      return new ChatSDKError("bad_request:activate_gateway").toResponse();
    }

    console.error("Unhandled error in chat API:", error, { vercelId });
    return new ChatSDKError("offline:chat").toResponse();
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  const chat = await getChatById({ id });

  if (chat?.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}
