import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { GardenGrid } from "@/components/garden/garden-grid";
import {
  getGardenPlantsByUserId,
  getOrCreateLearnerProfile,
  getProjectsByUserId,
} from "@/lib/db/queries";
import { getLevelTitle } from "@/lib/gamification/gp";

export default async function GardenPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [plants, projects, profile] = await Promise.all([
    getGardenPlantsByUserId({ userId: session.user.id }),
    getProjectsByUserId({ userId: session.user.id }),
    getOrCreateLearnerProfile({ userId: session.user.id }),
  ]);

  return (
    <div className="flex flex-col h-dvh">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h1 className="text-xl font-bold">Your Garden</h1>
          <p className="text-sm text-muted-foreground">
            {plants.length} plants &middot; Lvl {profile.level}{" "}
            {getLevelTitle(profile.level)}
          </p>
        </div>
        <Link
          className="text-sm text-muted-foreground hover:text-foreground"
          href="/"
        >
          Back to dashboard
        </Link>
      </div>

      {/* Garden */}
      <div className="flex-1 overflow-y-auto">
        <GardenGrid plants={plants} projects={projects} />
      </div>
    </div>
  );
}
