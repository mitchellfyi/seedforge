"use client";

import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { COACHING_MODEL } from "@/lib/ai/models";

interface LearnPaneProps {
  chatId: string;
  isReadonly?: boolean;
}

export function LearnPane({ chatId, isReadonly = false }: LearnPaneProps) {
  return (
    <div className="flex flex-col h-full w-[380px] border-l bg-muted/5">
      <div className="px-4 py-2 border-b bg-muted/10">
        <h3 className="text-sm font-semibold">Coach</h3>
        <p className="text-xs text-muted-foreground">
          Ask questions, get guidance
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Chat
          autoResume={false}
          id={chatId}
          initialChatModel={COACHING_MODEL}
          initialMessages={[]}
          initialVisibilityType="private"
          isReadonly={isReadonly}
        />
        <DataStreamHandler />
      </div>
    </div>
  );
}
