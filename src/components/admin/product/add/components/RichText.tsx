"use client";

import {
  FaBold,
  FaItalic,
  FaUndo,
  FaRedo,
  FaUnderline,
  FaStrikethrough,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaLink,
} from "react-icons/fa";
import {
  MdOutlineFormatListNumbered,
  MdFormatListBulleted,
} from "react-icons/md";
import { RiH1, RiH2, RiH3 } from "react-icons/ri";
import TextAlign from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extensions";
import Highlight from "@tiptap/extension-highlight";
import { AiOutlineHighlight } from "react-icons/ai";
import { useEffect, useState, memo } from "react";
import { EditorButton } from "./EditorButton";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default memo(function RichText({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [, forceUpdate] = useState({});
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    content: value,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-white border rounded-md bg-slate-50 py-2 px-3 focus:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow]",
      },
    },
    immediatelyRender: false,
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) return;
    const update = () => forceUpdate({});
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  if (!editor) return null;
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="flex items-center justify-center gap-1">
          <EditorButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={<FaUndo />}
            desc="Undo (Ctrl+Z)"
          />
          <EditorButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={<FaRedo />}
            desc="Redo (Ctrl+Y)"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <EditorButton
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            icon={<RiH1 />}
            desc="Heading 1"
          />
          <EditorButton
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            icon={<RiH2 />}
            desc="Heading 2"
          />
          <EditorButton
            isActive={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            icon={<RiH3 />}
            desc="Heading 3"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <EditorButton
            isActive={editor.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            icon={<FaBold />}
            desc="Bold (Ctrl+B)"
          />
          <EditorButton
            isActive={editor?.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={<FaItalic />}
            desc="Italic (Ctrl+I)"
          />
          <EditorButton
            isActive={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={<FaUnderline />}
            desc="Underline (Ctrl+U)"
          />
          <EditorButton
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon={<FaStrikethrough />}
            desc="Strikethrough"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <EditorButton
            isActive={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            icon={<FaAlignLeft />}
            desc="Align left"
          />
          <EditorButton
            isActive={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            icon={<FaAlignCenter />}
            desc="Align center"
          />
          <EditorButton
            isActive={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            icon={<FaAlignRight />}
            desc="Align right"
          />
          <EditorButton
            isActive={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            icon={<FaAlignJustify />}
            desc="Align justify"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <EditorButton
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={<MdOutlineFormatListNumbered />}
            desc="Numbered list"
          />
          <EditorButton
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={<MdFormatListBulleted />}
            desc="Bullet list"
          />
        </div>
        <div className="flex items-center justify-center">
          <EditorButton
            isActive={editor.isActive("highlight", { color: "#ffc078" })}
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
            }
            icon={<AiOutlineHighlight />}
            desc="Highlight"
          />
          <EditorButton icon={<FaLink />} desc="Insert/edit link" />
        </div>
      </div>
      <div className="focus:outline-none editor-content">
        <EditorContent editor={editor} />
      </div>
    </>
  );
});
