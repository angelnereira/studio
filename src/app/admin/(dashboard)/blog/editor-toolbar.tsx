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
    Minus,
    Palette,
    Highlighter,
    LayoutTemplate,
    MessageSquare,
    Youtube
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { CldUploadWidget } from 'next-cloudinary';
import { BLOG_TEMPLATES } from "./templates"

interface EditorToolbarProps {
    editor: Editor | null
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
    const [linkUrl, setLinkUrl] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState("")

    if (!editor) {
        return null
    }

    const setLink = () => {
        if (linkUrl) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
            setLinkUrl("")
        }
    }

    const addYoutube = () => {
        if (youtubeUrl) {
            editor.commands.setYoutubeVideo({ src: youtubeUrl })
            setYoutubeUrl("")
        }
    }

    const addImage = (url: string) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const insertTemplate = (content: string) => {
        editor.chain().focus().insertContent(content).run()
    }

    const insertCard = (type: 'info' | 'success' | 'warning' | 'danger') => {
        editor.chain().focus().setNode('infoCard', { type }).run()
    }

    return (
        <div className="border border-input bg-transparent rounded-t-md p-2 flex flex-wrap gap-1 items-center sticky top-0 bg-background/95 backdrop-blur z-10">
            {/* Templates */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 mr-2">
                        <LayoutTemplate className="h-4 w-4" />
                        Templates
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Choose a Template</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {BLOG_TEMPLATES.map((template) => (
                        <DropdownMenuItem key={template.name} onClick={() => insertTemplate(template.content)}>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium">{template.name}</span>
                                <span className="text-xs text-muted-foreground">{template.description}</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-6 bg-border mx-1" />

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

            {/* Style & Alignment */}
            <div className="w-px h-6 bg-border mx-1" />

            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
            >
                <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
            >
                <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
            >
                <AlignRight className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Colors & Highlight */}
            <Popover>
                <PopoverTrigger asChild>
                    <Toggle size="sm" pressed={false}>
                        <Palette className="h-4 w-4" style={{ color: editor.getAttributes('textStyle').color }} />
                    </Toggle>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                    <div className="grid grid-cols-5 gap-1">
                        {['#000000', '#444444', '#888888', '#ffffff', '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'].map(color => (
                            <button
                                key={color}
                                className="w-6 h-6 rounded-full border border-gray-200"
                                style={{ backgroundColor: color }}
                                onClick={() => editor.chain().focus().setColor(color).run()}
                            />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <Toggle
                size="sm"
                pressed={editor.isActive('highlight')}
                onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
            >
                <Highlighter className="h-4 w-4" />
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
            <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Inserts */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                        <MessageSquare className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Insert Card</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => insertCard('info')}>Information</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertCard('success')}>Success</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertCard('warning')}>Warning</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertCard('danger')}>Danger</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

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

            <Popover>
                <PopoverTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("youtube")}>
                        <Youtube className="h-4 w-4" />
                    </Toggle>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://youtube.com/watch?v=..."
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                        />
                        <Button size="sm" onClick={addYoutube}>Add</Button>
                    </div>
                </PopoverContent>
            </Popover>

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

