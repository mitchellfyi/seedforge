import { tool, type UIMessageStreamWriter } from "ai";
import { z } from "zod";
import type { ChatMessage } from "@/lib/types";

type InsertContentProps = {
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

export const insertContent = ({ dataStream }: InsertContentProps) =>
  tool({
    description:
      "Insert scaffolding text, templates, or structural content into the user's TipTap editor. Use this when the user asks for help structuring their document, needs a template to fill in, or when providing scaffold content for a step.",
    inputSchema: z.object({
      html: z
        .string()
        .describe(
          "HTML content to insert into the editor. Use proper HTML tags (h2, p, ul, li, blockquote, etc.)",
        ),
      position: z
        .enum(["end", "cursor"])
        .default("end")
        .describe("Where to insert: 'end' appends, 'cursor' inserts at cursor position"),
    }),
    execute: async ({ html, position }) => {
      (dataStream as any).write({
        type: "data-insert-content",
        data: { html, position },
      });

      return {
        success: true,
        message:
          "Content has been inserted into the editor. The user can now edit and build on it.",
      };
    },
  });
