"use client";

import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef } from "react";

interface TipTapEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

export function TipTapEditor({
  content,
  onUpdate,
  placeholder = "Start writing your artifact here...",
  editable = true,
  className = "",
}: TipTapEditorProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      Image.configure({ inline: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    editable,
    onUpdate: ({ editor: ed }) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onUpdate(ed.getHTML());
      }, 500);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-6 py-4",
      },
    },
  });

  // Sync external content changes (e.g., AI insertContent)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  const insertHtmlAtCursor = useCallback(
    (html: string) => {
      if (editor) {
        editor.commands.insertContent(html);
      }
    },
    [editor]
  );

  // Expose insert function via ref pattern
  useEffect(() => {
    if (editor) {
      (editor as any).__seedforgeInsert = insertHtmlAtCursor;
    }
  }, [editor, insertHtmlAtCursor]);

  return (
    <div
      className={`tiptap-editor-wrapper border rounded-lg bg-background ${className}`}
    >
      <TipTapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function TipTapToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) {
    return null;
  }

  const buttonClass = (active: boolean) =>
    `px-2 py-1 text-xs rounded transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "hover:bg-muted text-muted-foreground"
    }`;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/30">
      <button
        className={buttonClass(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
      >
        B
      </button>
      <button
        className={buttonClass(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
      >
        I
      </button>
      <button
        className={buttonClass(editor.isActive("underline"))}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        type="button"
      >
        U
      </button>
      <div className="w-px bg-border mx-1" />
      <button
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type="button"
      >
        H1
      </button>
      <button
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type="button"
      >
        H2
      </button>
      <button
        className={buttonClass(editor.isActive("heading", { level: 3 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        type="button"
      >
        H3
      </button>
      <div className="w-px bg-border mx-1" />
      <button
        className={buttonClass(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type="button"
      >
        List
      </button>
      <button
        className={buttonClass(editor.isActive("orderedList"))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        type="button"
      >
        1.
      </button>
      <button
        className={buttonClass(editor.isActive("blockquote"))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        type="button"
      >
        Quote
      </button>
    </div>
  );
}
