"use client"

import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import LinkExtension from "@tiptap/extension-link"
import ImageExtension from "@tiptap/extension-image"
import { Toggle } from "@/components/ui/toggle"
import {
    Bold, Italic, Strikethrough, List, ListOrdered, Quote,
    Undo, Redo, Link as LinkIcon, Image as ImageIcon, Code, LayoutTemplate
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

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
    editable?: boolean
    services?: Service[]
}

const Toolbar = ({ editor, services = [] }: { editor: Editor | null, services?: Service[] }) => {
    if (!editor) return null

    const insertService = (service: Service) => {
        const startingPackage = service.packages[0]
        const price = startingPackage.price
        const priceSuffix = startingPackage.priceSuffix || ''
        const url = `https://angelnereira.com/services/${service.slug}`

        const html = `
            <br />
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; border: 1px solid #333; border-radius: 8px; overflow: hidden; font-family: sans-serif; background: #000; color: #fff;">
                <tr>
                    <td style="padding: 20px; text-align: center; border-bottom: 1px solid #333;">
                         <h2 style="margin: 0; font-size: 24px;">${service.title}</h2>
                         <p style="margin: 5px 0 0; color: #888;">${service.shortDescription}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center;">
                        <p style="font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px; margin: 0;">Planes desde</p>
                        <p style="font-size: 32px; font-weight: bold; margin: 10px 0; color: #ccf381;">
                            $${typeof price === 'number' ? price.toLocaleString() : price}
                            <span style="font-size: 16px; font-weight: normal; color: #888;">${priceSuffix}</span>
                        </p>
                        <a href="${url}" style="display: inline-block; background: #ccf381; color: #000; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; margin-top: 10px;">Ver Detalles</a>
                    </td>
                </tr>
                <tr>
                     <td style="padding: 15px; background: #111; text-align: center; font-size: 12px; color: #666;">
                        Ideal para: ${service.tags.join(' · ')}
                     </td>
                </tr>
            </table>
            <br />
        `
        editor.chain().focus().insertContent(html).run()
    }

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

            {services && services.length > 0 && (
                <>
                    <div className="w-px h-6 bg-white/10 mx-1" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <LayoutTemplate className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto">
                            <DropdownMenuLabel>Insert Service</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {services.map(service => (
                                <DropdownMenuItem key={service.slug} onClick={() => insertService(service)}>
                                    {service.title}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}
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
            <Toolbar editor={editor} services={services} />
            <EditorContent editor={editor} />
        </div>
    )
}
