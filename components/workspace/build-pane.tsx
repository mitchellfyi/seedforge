"use client";

import { TipTapEditor } from "@/components/tiptap/tiptap-editor";

interface BuildPaneProps {
  content: string;
  onContentChange: (html: string) => void;
  onEditorReady?: (insertFn: (html: string) => void) => void;
  projectTitle: string;
  currentStepTitle: string;
}

export function BuildPane({
  content,
  onContentChange,
  onEditorReady,
  projectTitle,
  currentStepTitle,
}: BuildPaneProps) {
  return (
    <div className="flex flex-col h-full flex-1 min-w-0">
      {/* Build pane header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/10">
        <div>
          <h2 className="text-sm font-semibold">{projectTitle}</h2>
          <p className="text-xs text-muted-foreground">
            Working on: {currentStepTitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Auto-saved</span>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        <TipTapEditor
          className="border-0 rounded-none h-full"
          content={content}
          onEditorReady={onEditorReady}
          onUpdate={onContentChange}
          placeholder="Start building your artifact here. The coach in the right panel will guide you through each step..."
        />
      </div>
    </div>
  );
}
