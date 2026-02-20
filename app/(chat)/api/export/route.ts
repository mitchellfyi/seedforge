import { auth } from "@/app/(auth)/auth";
import { getDocumentById, getProjectById } from "@/lib/db/queries";
import { ChatSDKError } from "@/lib/errors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const session = await auth();
  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  const project = await getProjectById({ id: projectId });
  if (!project || project.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  if (!project.documentId) {
    return Response.json({ error: "No document found" }, { status: 404 });
  }

  const doc = await getDocumentById({ id: project.documentId });
  if (!doc) {
    return Response.json({ error: "Document not found" }, { status: 404 });
  }

  // Return an HTML page styled for print/PDF
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(project.title)}</title>
  <style>
    @page { margin: 1in; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      line-height: 1.7;
      color: #1a1a1a;
      max-width: 700px;
      margin: 0 auto;
      padding: 2rem;
    }
    .cover {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #e5e5e5;
    }
    .cover h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    .cover .dq {
      font-style: italic;
      color: #666;
      font-size: 1.1rem;
    }
    .cover .meta {
      color: #999;
      font-size: 0.9rem;
      margin-top: 1rem;
    }
    h1, h2, h3 { color: #111; }
    h2 { margin-top: 2rem; border-bottom: 1px solid #eee; padding-bottom: 0.3rem; }
    img { max-width: 100%; height: auto; }
    blockquote {
      border-left: 3px solid #ccc;
      padding-left: 1rem;
      color: #555;
      font-style: italic;
    }
    .footer {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e5e5;
      text-align: center;
      color: #999;
      font-size: 0.85rem;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <h1>${escapeHtml(project.title)}</h1>
    <div class="dq">${escapeHtml(project.drivingQuestion)}</div>
    <div class="meta">Created with Seedforge</div>
  </div>
  <div class="content">
    ${doc.content ?? "<p>No content yet.</p>"}
  </div>
  <div class="footer">
    Built with Seedforge — Learn by Building
  </div>
  <script class="no-print">
    // Auto-trigger print dialog for easy PDF save
    if (window.location.hash === '#print') {
      window.onload = () => window.print();
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
