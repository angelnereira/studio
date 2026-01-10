"use client"

import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import LinkExtension from "@tiptap/extension-link"
import ImageExtension from "@tiptap/extension-image"
import { Toggle } from "@/components/ui/toggle"
import {
    Bold, Italic, Strikethrough, List, ListOrdered, Quote,
    Undo, Redo, Link as LinkIcon, Image as ImageIcon, Code
} from "lucide-react"

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
    editable?: boolean
}

const Toolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null

    return (
        <div className="border border-white/10 rounded-t-md p-2 flex flex-wrap gap-1 bg-black/20">
            <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <Toggle
                size="sm"
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('blockquote')}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className="h-4 w-4" />
            </Toggle>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <Toggle
                size="sm"
                onPressedChange={() => {
                    const url = window.prompt('URL')
                    if (url) editor.chain().focus().setLink({ href: url }).run()
                }}
            >
                <LinkIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() => {
                    const url = window.prompt('Image URL')
                    if (url) editor.chain().focus().setImage({ src: url }).run()
                }}
            >
                <ImageIcon className="h-4 w-4" />
            </Toggle>
        </div>
    )
}

export function RichTextEditor({ content, onChange, editable = true }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            LinkExtension.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline',
                },
            }),
            ImageExtension.configure({
                HTMLAttributes: {
                    class: 'rounded-lg border border-white/10 max-w-full',
                }
            }),
        ],
        content,
        editable,
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none min-h-[300px] p-4 bg-black/10 rounded-b-md border border-t-0 border-white/10 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="flex flex-col">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
