import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { StartPageClient } from "@/components/onboarding/start-page-client";
import { PROJECT_GENERATION_MODEL } from "@/lib/ai/models";
import { getLearnerProfile } from "@/lib/db/queries";
import { generateUUID } from "@/lib/utils";

export default async function StartPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const profile = await getLearnerProfile({ userId: session.user.id });
  const isReturningUser = !!profile?.interests && profile.interests.length > 0;

  const chatId = generateUUID();

  return (
    <StartPageClient
      chatId={chatId}
      chatModel={PROJECT_GENERATION_MODEL}
      isReturningUser={isReturningUser}
    />
  );
}
