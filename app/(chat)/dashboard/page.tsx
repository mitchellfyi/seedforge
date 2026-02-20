import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { ProjectDashboard } from "@/components/project/project-dashboard";
import {
  getProjectsByUserId,
  getOrCreateLearnerProfile,
  getGardenPlantsByUserId,
} from "@/lib/db/queries";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [projects, learnerProfile, gardenPlants] = await Promise.all([
    getProjectsByUserId({ userId: session.user.id }),
    getOrCreateLearnerProfile({ userId: session.user.id }),
    getGardenPlantsByUserId({ userId: session.user.id }),
  ]);

  // If no projects yet, redirect to onboarding
  if (projects.length === 0) {
    redirect("/start");
  }

  return (
    <ProjectDashboard
      projects={projects}
      learnerProfile={learnerProfile}
      gardenPlants={gardenPlants}
    />
  );
}
