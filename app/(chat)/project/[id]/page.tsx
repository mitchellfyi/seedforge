import { notFound, redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import {
  getDocumentById,
  getOrCreateLearnerProfile,
  getProjectById,
  getStepsByProjectId,
} from "@/lib/db/queries";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const project = await getProjectById({ id });

  if (!project) {
    notFound();
  }

  if (project.userId !== session.user.id) {
    notFound();
  }

  const [steps, learnerProfile, document] = await Promise.all([
    getStepsByProjectId({ projectId: id }),
    getOrCreateLearnerProfile({ userId: session.user.id }),
    project.documentId ? getDocumentById({ id: project.documentId }) : null,
  ]);

  const coachChatId = project.coachChatId ?? id;
  const initialContent = document?.content ?? "";

  return (
    <WorkspaceLayout
      coachChatId={coachChatId}
      initialContent={initialContent}
      learnerProfile={learnerProfile}
      project={project}
      steps={steps}
    />
  );
}
