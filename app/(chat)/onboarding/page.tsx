import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { PROJECT_GENERATION_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const chatId = generateUUID();

  return (
    <div className="flex flex-col h-dvh bg-background">
      {/* Header */}
      <div className="flex items-center justify-center py-6 border-b bg-gradient-to-r from-green-500/5 to-emerald-500/5">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Seedforge</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tell me what you'd like to learn — I'll design a project just for
            you.
          </p>
        </div>
      </div>

      {/* Full-screen chat for onboarding */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <Chat
          id={chatId}
          initialMessages={[]}
          initialChatModel={PROJECT_GENERATION_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          autoResume={false}
        />
        <DataStreamHandler />
      </div>
    </div>
  );
}
