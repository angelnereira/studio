"use client"

import { type Editor } from "@tiptap/react"
import {
    Bold,
    Italic,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Link as LinkIcon,
    Image as ImageIcon,
    Minus
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { CldUploadWidget } from 'next-cloudinary';

interface EditorToolbarProps {
    editor: Editor | null
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
    const [linkUrl, setLinkUrl] = useState("")

    if (!editor) {
        return null
    }

    const setLink = () => {
        if (linkUrl) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
            setLinkUrl("")
        }
    }

    const addImage = (url: string) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div className="border border-input bg-transparent rounded-t-md p-2 flex flex-wrap gap-1 items-center">
            {/* Headings */}
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Basic Formatting */}
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Lists */}
            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Blocks */}
            <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("codeBlock")}
                onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <Code className="h-4 w-4" />
            </Toggle>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Minus className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Link */}
            <Popover>
                <PopoverTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("link")}>
                        <LinkIcon className="h-4 w-4" />
                    </Toggle>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                        />
                        <Button size="sm" onClick={setLink}>Add</Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Image Upload */}
            <CldUploadWidget
                uploadPreset="studio_preset"
                onSuccess={(result: any) => {
                    if (result?.info?.secure_url) {
                        addImage(result.info.secure_url)
                    }
                }}
                options={{
                    sources: ['local', 'url', 'unsplash'],
                    multiple: false,
                    maxFiles: 1
                }}
            >
                {({ open }) => (
                    <Button variant="ghost" size="sm" onClick={() => open()} type="button">
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                )}
            </CldUploadWidget>

            <div className="flex-1" />

            {/* History */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <Undo className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <Redo className="h-4 w-4" />
            </Button>

        </div>
    )
}
