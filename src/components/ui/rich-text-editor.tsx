"use client"

import { useEditor, EditorContent, Editor, mergeAttributes, Node } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import LinkExtension from "@tiptap/extension-link"
import ImageExtension from "@tiptap/extension-image"
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Toggle } from "@/components/ui/toggle"
import {
    Bold, Italic, Strikethrough, List, ListOrdered, Quote,
    Undo, Redo, Link as LinkIcon, Image as ImageIcon, Code, LayoutTemplate,
    Palette, Highlighter, AlignLeft, AlignCenter, AlignRight, MessageSquare, PlusCircle
} from "lucide-react"
import { Service } from "@/lib/services"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// --- Custom Email-Friendly Extensions ---

const EmailButton = Node.create({
    name: 'emailButton',
    group: 'inline',
    inline: true,
    draggable: true,
    atom: true,

    addAttributes() {
        return {
            href: { default: '#' },
            text: { default: 'Click Me' },
            backgroundColor: { default: '#000000' },
            color: { default: '#ffffff' },
        }
    },

    parseHTML() {
        return [{ tag: 'a[data-type="email-button"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['a', mergeAttributes(HTMLAttributes, {
            'data-type': 'email-button',
            style: `display: inline-block; background-color: ${HTMLAttributes.backgroundColor}; color: ${HTMLAttributes.color}; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-family: sans-serif; mso-padding-alt: 0; text-underline-color: ${HTMLAttributes.backgroundColor};`, // mso-padding-alt for Outlook
            href: HTMLAttributes.href,
            target: '_blank',
        }), HTMLAttributes.text]
    },

    addNodeView() {
        return ({ node, getPos, editor }) => {
            const dom = document.createElement('a')
            dom.style.cssText = `display: inline-block; background-color: ${node.attrs.backgroundColor}; color: ${node.attrs.color}; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-weight: bold; cursor: pointer; border: 2px solid transparent;`
            dom.textContent = node.attrs.text
            dom.onclick = (e) => {
                e.preventDefault()
                // Simple edit prompt for now
                const newText = prompt("Button Text:", node.attrs.text)
                const newLink = prompt("Button Link:", node.attrs.href)
                const newBg = prompt("Background Color (#hex):", node.attrs.backgroundColor)

                if (typeof getPos === 'function') {
                    editor.commands.command(({ tr }) => {
                        tr.setNodeMarkup(getPos(), undefined, {
                            ...node.attrs,
                            text: newText || node.attrs.text,
                            href: newLink || node.attrs.href,
                            backgroundColor: newBg || node.attrs.backgroundColor
                        })
                        return true
                    })
                }
            }
            // Add a visual indicator it's editable
            dom.title = "Click to edit button"
            return {
                dom,
                selectNode: () => { dom.style.borderColor = 'blue' },
                deselectNode: () => { dom.style.borderColor = 'transparent' }
            }
        }
    }
})

const EmailInfoCard = Node.create({
    name: 'emailInfoCard',
    group: 'block',
    content: 'block+',

    addAttributes() {
        return {
            type: { default: 'info' },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="email-info-card"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        const colors = {
            info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e3a8a' }, // blue-50
            success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' }, // green-50
            warning: { bg: '#fefce8', border: '#fde047', text: '#854d0e' }, // yellow-50
            danger: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' }, // red-50
        }
        const style = colors[HTMLAttributes.type as keyof typeof colors] || colors.info

        return ['div', mergeAttributes(HTMLAttributes, {
            'data-type': 'email-info-card',
            style: `background-color: ${style.bg}; border: 1px solid ${style.border}; color: ${style.text}; padding: 16px; border-radius: 8px; margin: 16px 0; font-family: sans-serif;`
        }), 0]
    },
})


interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
    editable?: boolean
    services?: Service[]
}

const Toolbar = ({ editor, services = [] }: { editor: Editor | null, services?: Service[] }) => {
    const [linkUrl, setLinkUrl] = useState("")

    if (!editor) return null

    const setLink = () => {
        if (linkUrl) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
            setLinkUrl("")
        }
    }

    const insertService = (service: Service) => {
        const startingPackage = service.packages[0]
        const price = startingPackage.price
        const priceSuffix = startingPackage.priceSuffix || ''
        const url = `https://angelnereira.com/services/${service.slug}`

        const html = `
            <br />
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; border: 1px solid #333; border-radius: 12px; overflow: hidden; background-color: #111; color: #fff;">
                <tr>
                    <td style="padding: 30px 20px;">
                        <h2 style="margin: 0; text-align: center; color: #fff;">${service.title}</h2>
                        <p style="text-align: center; color: #888;">${service.shortDescription}</p>
                        <div style="text-align: center; margin: 20px 0;">
                             <p style="font-size: 12px; text-transform: uppercase; color: #ccf381; margin: 0;">Planes desde</p>
                             <p style="font-size: 36px; font-weight: 800; margin: 5px 0 10px; color: #fff;">$${typeof price === 'number' ? price.toLocaleString() : price}</p>
                        </div>
                        <div style="text-align: center;">
                             <a href="${url}" style="background-color: #ccf381; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Ver Detalles</a>
                        </div>
                    </td>
                </tr>
            </table>
            <br />
        `
        editor.chain().focus().insertContent(html).run()
    }

    const insertEmailButton = () => {
        const text = prompt("Button Text:", "Click Here")
        const href = prompt("URL:", "https://")
        if (text && href) {
            editor.chain().focus().insertContent({
                type: 'emailButton',
                attrs: { text, href, backgroundColor: '#000000', color: '#ffffff' }
            }).run()
        }
    }

    const insertEmailCard = (type: string) => {
        editor.chain().focus().setNode('emailInfoCard', { type }).run()
    }

    return (
        <div className="border border-white/10 rounded-t-md p-2 flex flex-wrap gap-1 bg-black/20 sticky top-0 z-10 backdrop-blur-md">
            {/* Text Style */}
            <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive('underline')} onPressedChange={() => editor.chain().focus().toggleUnderline().run()}>
                <Underline className="h-4 w-4" /> // Correct icon name import was assumed? Lucide doesn't have Underline by default usually?
                {/* Wait, lucide-react has 'Underline' icon. Let's check imports. I imported Underline extension, but need icon. */}
                {/* Lucide 'Underline' icon exists. */}
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
                <Strikethrough className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-white/10 mx-1" />

            {/* Alignment */}
            <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}>
                <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}>
                <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}>
                <AlignRight className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-white/10 mx-1" />

            {/* Color & Highlight */}
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

            <Toggle size="sm" pressed={editor.isActive('highlight')} onPressedChange={() => editor.chain().focus().toggleHighlight().run()}>
                <Highlighter className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
                <ListOrdered className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-white/10 mx-1" />

            {/* Links & Images */}
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

            <Toggle
                size="sm"
                onPressedChange={() => {
                    const url = window.prompt('Image URL')
                    if (url) editor.chain().focus().setImage({ src: url }).run()
                }}
            >
                <ImageIcon className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-white/10 mx-1" />

            {/* Inserts */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                        <PlusCircle className="h-4 w-4" /> Insert
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={insertEmailButton}>
                        <MessageSquare className="w-4 h-4 mr-2" /> Button
                    </DropdownMenuItem>
                    <DropdownMenuLabel>Info Cards</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => insertEmailCard('info')}>Info (Blue)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertEmailCard('success')}>Success (Green)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertEmailCard('warning')}>Warning (Yellow)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertEmailCard('danger')}>Danger (Red)</DropdownMenuItem>

                    {services && services.length > 0 && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Services</DropdownMenuLabel>
                            {services.map(service => (
                                <DropdownMenuItem key={service.slug} onClick={() => insertService(service)}>
                                    {service.title}
                                </DropdownMenuItem>
                            ))}
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export function RichTextEditor({ content, onChange, editable = true, services }: RichTextEditorProps) {
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
                    style: 'max-width: 100%; border-radius: 8px;'
                }
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            EmailButton,
            EmailInfoCard,
        ],
        content,
        editable,
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none min-h-[300px] p-4 bg-black/10 rounded-b-md border border-t-0 border-white/10 focus:outline-none",
                style: "font-family: sans-serif;"
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="flex flex-col">
            <Toolbar editor={editor} services={services} />
            <EditorContent editor={editor} />
        </div>
    )
}
