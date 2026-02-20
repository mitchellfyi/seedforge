import Image from "next/image";
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
      <div className="flex items-center justify-center py-8 border-b bg-gradient-to-r from-primary/5 to-accent/20">
        <div className="text-center flex flex-col items-center gap-3">
          <Image
            src="/brand/seed_anvil.png"
            alt="Seedforge"
            width={64}
            height={64}
          />
          <div>
            <h1 className="text-2xl font-bold">What do you want to make?</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Your first project takes just one session. Tell me what
              you&apos;re curious about and you&apos;ll walk away with something
              real.
            </p>
          </div>
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
