import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Code,
} from "lucide-react";
import "./TipTap.css"; // your editor CSS

export default function RichTextEditor({ value, onChange, error }) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="richtext-editor-wrapper">
      <div className="editor-toolbar">
        <button
          type="button"
          className={editor.isActive("bold") ? "active-btn" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          className={editor.isActive("italic") ? "active-btn" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          className={editor.isActive("underline") ? "active-btn" : ""}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <u style={{ fontWeight: "bold" }}>U</u>
        </button>

        <button
          type="button"
          className={editor.isActive("bulletList") ? "active-btn" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          className={editor.isActive("orderedList") ? "active-btn" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <button type="button" onClick={addImage} title="Insert Image">
          <ImageIcon size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.commands.toggleCodeBlock()}
          className={editor.isActive("codeBlock") ? "active-btn" : ""}
          title="Code / HTML"
        >
          <Code size={16} />
        </button>
      </div>

      <EditorContent editor={editor} className="editor-content" />
      {error && <small className="text-danger">{error.message}</small>}
    </div>
  );
}
