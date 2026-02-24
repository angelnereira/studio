"use client"

import { useState, useCallback } from "react"
import {
    Type, Image, MousePointerClick, Minus, MoveVertical,
    Columns2, Share2, FileDown, Plus, Trash2, ChevronUp,
    ChevronDown, Palette, Eye, Pencil, Copy, Heading1, AlignLeft, MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

export type BlockType = 'header' | 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'columns' | 'testimonial' | 'social' | 'footer'

export interface EmailBlock {
    id: string;
    type: BlockType;
    props: Record<string, string | number | boolean | string[]>;
}

interface VisualEmailComposerProps {
    initialBlocks?: EmailBlock[];
    onChange: (html: string) => void;
    brandColor?: string;
}

// ═══════════════════════════════════════
// BLOCK DEFAULTS
// ═══════════════════════════════════════

const BRAND = '#DFFF00'

function createBlock(type: BlockType): EmailBlock {
    const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const defaults: Record<BlockType, Record<string, string | number | boolean | string[]>> = {
        header: { title: 'Your Email Title', subtitle: 'A short subtitle here', bgColor: '#0d1410', textColor: '#ffffff', accentColor: BRAND, showLogo: true },
        text: { content: 'Write your message here. You can use **bold** and share your ideas clearly with your audience.', align: 'left', fontSize: '15', textColor: '#9ca3af' },
        image: { src: '', alt: 'Image description', width: '100', borderRadius: '8', link: '' },
        button: { text: 'Take Action', href: 'https://angelnereira.com', bgColor: BRAND, textColor: '#000000', borderRadius: '6', align: 'center', fullWidth: false },
        divider: { color: 'rgba(255,255,255,0.1)', thickness: '1', style: 'solid' },
        spacer: { height: '24' },
        columns: { left: 'Left column content here.', right: 'Right column content here.', textColor: '#9ca3af', gap: '16' },
        testimonial: { quote: '"Working with Ángel was an incredible experience. The results exceeded our expectations."', author: 'Client Name', role: 'CEO, Company', avatar: '', accentColor: BRAND },
        social: { linkedin: 'https://linkedin.com/in/angelnereira', github: 'https://github.com/angelnereira', twitter: '', website: 'https://angelnereira.com' },
        footer: { text: 'Ángel Nereira · Ingeniero de Software Full Stack · Panamá', textColor: '#6b7280', unsubscribeText: '', bgColor: 'transparent' },
    }
    return { id, type, props: { ...defaults[type] } }
}

// ═══════════════════════════════════════
// BLOCK → HTML RENDERER
// ═══════════════════════════════════════

function blockToHtml(block: EmailBlock): string {
    const p = block.props
    switch (block.type) {
        case 'header':
            return `<div style="background-color: ${p.bgColor}; padding: 32px 24px; text-align: center; border-radius: 12px 12px 0 0;">
  ${p.showLogo ? `<div style="width: 48px; height: 48px; border-radius: 12px; background: ${p.accentColor}20; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;"><span style="color: ${p.accentColor}; font-weight: bold; font-size: 18px;">AN</span></div>` : ''}
  <h1 style="color: ${p.textColor}; font-size: 24px; font-weight: bold; margin: 0 0 8px 0; font-family: 'Inter', sans-serif;">${p.title}</h1>
  ${p.subtitle ? `<p style="color: ${p.accentColor}; font-size: 14px; margin: 0; opacity: 0.9;">${p.subtitle}</p>` : ''}
</div>`

        case 'text': {
            const content = String(p.content).replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff;">$1</strong>')
                .replace(/\{\{(\w+)\}\}/g, '<span style="background: #DFFF0030; color: #DFFF00; padding: 1px 4px; border-radius: 3px; font-size: 13px;">{{$1}}</span>')
            return `<div style="padding: 0 24px; margin: 16px 0;">
  <p style="color: ${p.textColor}; font-size: ${p.fontSize}px; line-height: 1.7; text-align: ${p.align}; margin: 0; font-family: 'Inter', sans-serif;">${content}</p>
</div>`
        }

        case 'image':
            if (!p.src) return `<div style="padding: 16px 24px; text-align: center;"><div style="border: 2px dashed rgba(255,255,255,0.15); border-radius: ${p.borderRadius}px; padding: 40px; color: #6b7280; font-size: 13px;">📷 Click to add image</div></div>`
            return `<div style="padding: 16px 24px; text-align: center;">
  ${p.link ? `<a href="${p.link}" target="_blank">` : ''}
  <img src="${p.src}" alt="${p.alt}" style="max-width: ${p.width}%; border-radius: ${p.borderRadius}px; display: inline-block;" />
  ${p.link ? '</a>' : ''}
</div>`

        case 'button': {
            const w = p.fullWidth ? 'display: block; width: 100%; box-sizing: border-box;' : 'display: inline-block;'
            return `<div style="padding: 16px 24px; text-align: ${p.align};">
  <a href="${p.href}" target="_blank" style="${w} background-color: ${p.bgColor}; color: ${p.textColor}; padding: 14px 28px; border-radius: ${p.borderRadius}px; text-decoration: none; font-weight: bold; font-size: 14px; font-family: 'Inter', sans-serif;">${p.text}</a>
</div>`
        }

        case 'divider':
            return `<div style="padding: 8px 24px;">
  <hr style="border: none; border-top: ${p.thickness}px ${p.style} ${p.color}; margin: 0;" />
</div>`

        case 'spacer':
            return `<div style="height: ${p.height}px;"></div>`

        case 'columns':
            return `<div style="padding: 16px 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="width: 48%; vertical-align: top; padding-right: ${Number(p.gap) / 2}px;"><p style="color: ${p.textColor}; font-size: 14px; line-height: 22px; margin: 0; font-family: 'Inter', sans-serif;">${p.left}</p></td>
    <td style="width: 48%; vertical-align: top; padding-left: ${Number(p.gap) / 2}px;"><p style="color: ${p.textColor}; font-size: 14px; line-height: 22px; margin: 0; font-family: 'Inter', sans-serif;">${p.right}</p></td>
  </tr></table>
</div>`

        case 'testimonial':
            return `<div style="padding: 16px 24px;">
  <div style="border-left: 3px solid ${p.accentColor}; padding: 16px 20px; background: rgba(255,255,255,0.03); border-radius: 0 8px 8px 0;">
    <p style="color: #e5e7eb; font-size: 15px; line-height: 24px; font-style: italic; margin: 0 0 16px 0; font-family: 'Inter', sans-serif;">${p.quote}</p>
    <div style="display: flex; align-items: center; gap: 12px;">
      ${p.avatar ? `<img src="${p.avatar}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />` : `<div style="width: 36px; height: 36px; border-radius: 50%; background: ${p.accentColor}20; display: flex; align-items: center; justify-content: center; color: ${p.accentColor}; font-weight: bold; font-size: 14px;">${String(p.author).charAt(0)}</div>`}
      <div>
        <p style="color: #fff; font-size: 13px; font-weight: 600; margin: 0;">${p.author}</p>
        <p style="color: #6b7280; font-size: 11px; margin: 0;">${p.role}</p>
      </div>
    </div>
  </div>
</div>`

        case 'social': {
            const icons: [string, string, string][] = [
                ['linkedin', String(p.linkedin), '🔗'],
                ['github', String(p.github), '💻'],
                ['twitter', String(p.twitter), '🐦'],
                ['website', String(p.website), '🌐'],
            ]
            const links = icons.filter(([, url]) => url).map(([name, url, emoji]) =>
                `<a href="${url}" target="_blank" style="display: inline-block; margin: 0 8px; color: #9ca3af; text-decoration: none; font-size: 20px;" title="${name}">${emoji}</a>`
            ).join('')
            return `<div style="padding: 16px 24px; text-align: center;">${links}</div>`
        }

        case 'footer':
            return `<div style="padding: 24px; text-align: center; background: ${p.bgColor};">
  <p style="color: ${p.textColor}; font-size: 12px; margin: 0; font-family: 'Inter', sans-serif;">${p.text}</p>
  ${p.unsubscribeText ? `<p style="margin: 8px 0 0 0;"><a href="#" style="color: #6b7280; font-size: 11px;">${p.unsubscribeText}</a></p>` : ''}
</div>`

        default:
            return ''
    }
}

function blocksToFullHtml(blocks: EmailBlock[]): string {
    const body = blocks.map(blockToHtml).join('\n')
    return `<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
  <div style="max-width: 560px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden;">
${body}
  </div>
</div>`
}

// ═══════════════════════════════════════
// PALETTE ITEMS
// ═══════════════════════════════════════

const PALETTE: { type: BlockType; label: string; icon: React.ElementType; description: string }[] = [
    { type: 'header', label: 'Header', icon: Heading1, description: 'Title + subtitle' },
    { type: 'text', label: 'Text', icon: Type, description: 'Paragraph content' },
    { type: 'image', label: 'Image', icon: Image, description: 'Photo or banner' },
    { type: 'button', label: 'Button', icon: MousePointerClick, description: 'Call-to-action' },
    { type: 'columns', label: 'Columns', icon: Columns2, description: 'Two-column layout' },
    { type: 'testimonial', label: 'Testimonial', icon: MessageSquare, description: 'Client quote' },
    { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line' },
    { type: 'spacer', label: 'Spacer', icon: MoveVertical, description: 'Vertical space' },
    { type: 'social', label: 'Social', icon: Share2, description: 'Social links' },
    { type: 'footer', label: 'Footer', icon: AlignLeft, description: 'Footer text' },
]

// ═══════════════════════════════════════
// PROPERTY EDITORS
// ═══════════════════════════════════════

function BlockEditor({ block, onChange }: { block: EmailBlock; onChange: (props: Record<string, string | number | boolean | string[]>) => void }) {
    const p = block.props
    const set = (key: string, val: string | number | boolean) => onChange({ ...p, [key]: val })

    const ColorInput = ({ label, propKey }: { label: string; propKey: string }) => (
        <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">{label}</Label>
            <div className="flex gap-2">
                <input type="color" value={String(p[propKey] || '#000000').replace(/rgba?\([^)]+\)/g, '#333333')} onChange={e => set(propKey, e.target.value)} className="w-8 h-8 rounded border border-white/10 cursor-pointer bg-transparent" />
                <Input value={String(p[propKey])} onChange={e => set(propKey, e.target.value)} className="h-8 text-xs flex-1" />
            </div>
        </div>
    )

    switch (block.type) {
        case 'header':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">Title</Label><Input value={String(p.title)} onChange={e => set('title', e.target.value)} className="h-8 text-sm" /></div>
                    <div><Label className="text-xs text-muted-foreground">Subtitle</Label><Input value={String(p.subtitle)} onChange={e => set('subtitle', e.target.value)} className="h-8 text-sm" /></div>
                    <ColorInput label="Background" propKey="bgColor" />
                    <ColorInput label="Accent Color" propKey="accentColor" />
                    <div className="flex items-center gap-2"><input type="checkbox" checked={!!p.showLogo} onChange={e => set('showLogo', e.target.checked)} /><Label className="text-xs">Show Logo</Label></div>
                </div>
            )

        case 'text':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">Content</Label>
                        <Textarea value={String(p.content)} onChange={e => set('content', e.target.value)} rows={4} className="text-sm" placeholder="Use **bold** and {{name}} variables..." />
                        <p className="text-[10px] text-muted-foreground mt-1">Use **bold** for emphasis, {'{{name}}'} for variables</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-xs text-muted-foreground">Align</Label>
                            <Select value={String(p.align)} onValueChange={v => set('align', v)}>
                                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="left">Left</SelectItem><SelectItem value="center">Center</SelectItem><SelectItem value="right">Right</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div><Label className="text-xs text-muted-foreground">Font Size</Label><Input type="number" value={String(p.fontSize)} onChange={e => set('fontSize', e.target.value)} className="h-8 text-xs" min="12" max="24" /></div>
                    </div>
                    <ColorInput label="Text Color" propKey="textColor" />
                </div>
            )

        case 'image':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">Image URL</Label><Input value={String(p.src)} onChange={e => set('src', e.target.value)} className="h-8 text-xs" placeholder="https://..." /></div>
                    <div><Label className="text-xs text-muted-foreground">Alt Text</Label><Input value={String(p.alt)} onChange={e => set('alt', e.target.value)} className="h-8 text-xs" /></div>
                    <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-xs text-muted-foreground">Width %</Label><Input type="number" value={String(p.width)} onChange={e => set('width', e.target.value)} className="h-8 text-xs" min="20" max="100" /></div>
                        <div><Label className="text-xs text-muted-foreground">Radius</Label><Input type="number" value={String(p.borderRadius)} onChange={e => set('borderRadius', e.target.value)} className="h-8 text-xs" min="0" max="24" /></div>
                    </div>
                    <div><Label className="text-xs text-muted-foreground">Link URL</Label><Input value={String(p.link)} onChange={e => set('link', e.target.value)} className="h-8 text-xs" placeholder="Optional link on click" /></div>
                </div>
            )

        case 'button':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">Button Text</Label><Input value={String(p.text)} onChange={e => set('text', e.target.value)} className="h-8 text-sm" /></div>
                    <div><Label className="text-xs text-muted-foreground">Link URL</Label><Input value={String(p.href)} onChange={e => set('href', e.target.value)} className="h-8 text-xs" /></div>
                    <div className="grid grid-cols-2 gap-2">
                        <ColorInput label="Button Color" propKey="bgColor" />
                        <ColorInput label="Text Color" propKey="textColor" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-xs text-muted-foreground">Radius</Label><Input type="number" value={String(p.borderRadius)} onChange={e => set('borderRadius', e.target.value)} className="h-8 text-xs" min="0" max="24" /></div>
                        <div><Label className="text-xs text-muted-foreground">Align</Label>
                            <Select value={String(p.align)} onValueChange={v => set('align', v)}>
                                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="left">Left</SelectItem><SelectItem value="center">Center</SelectItem><SelectItem value="right">Right</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2"><input type="checkbox" checked={!!p.fullWidth} onChange={e => set('fullWidth', e.target.checked)} /><Label className="text-xs">Full Width</Label></div>
                </div>
            )

        case 'divider':
            return (
                <div className="space-y-3">
                    <ColorInput label="Color" propKey="color" />
                    <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-xs text-muted-foreground">Thickness</Label><Input type="number" value={String(p.thickness)} onChange={e => set('thickness', e.target.value)} className="h-8 text-xs" min="1" max="4" /></div>
                        <div><Label className="text-xs text-muted-foreground">Style</Label>
                            <Select value={String(p.style)} onValueChange={v => set('style', v)}>
                                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="solid">Solid</SelectItem><SelectItem value="dashed">Dashed</SelectItem><SelectItem value="dotted">Dotted</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            )

        case 'spacer':
            return (
                <div><Label className="text-xs text-muted-foreground">Height (px)</Label><Input type="range" min="8" max="64" value={String(p.height)} onChange={e => set('height', e.target.value)} className="w-full" /><span className="text-xs text-muted-foreground">{p.height}px</span></div>
            )

        case 'columns':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">Left Column</Label><Textarea value={String(p.left)} onChange={e => set('left', e.target.value)} rows={3} className="text-sm" /></div>
                    <div><Label className="text-xs text-muted-foreground">Right Column</Label><Textarea value={String(p.right)} onChange={e => set('right', e.target.value)} rows={3} className="text-sm" /></div>
                    <div><Label className="text-xs text-muted-foreground">Gap (px)</Label><Input type="number" value={String(p.gap)} onChange={e => set('gap', e.target.value)} className="h-8 text-xs" min="0" max="32" /></div>
                    <ColorInput label="Text Color" propKey="textColor" />
                </div>
            )

        case 'testimonial':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">Quote</Label><Textarea value={String(p.quote)} onChange={e => set('quote', e.target.value)} rows={3} className="text-sm" /></div>
                    <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-xs text-muted-foreground">Author</Label><Input value={String(p.author)} onChange={e => set('author', e.target.value)} className="h-8 text-xs" /></div>
                        <div><Label className="text-xs text-muted-foreground">Role</Label><Input value={String(p.role)} onChange={e => set('role', e.target.value)} className="h-8 text-xs" /></div>
                    </div>
                    <div><Label className="text-xs text-muted-foreground">Avatar URL</Label><Input value={String(p.avatar)} onChange={e => set('avatar', e.target.value)} className="h-8 text-xs" placeholder="Optional photo URL" /></div>
                    <ColorInput label="Accent Color" propKey="accentColor" />
                </div>
            )

        case 'social':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">LinkedIn</Label><Input value={String(p.linkedin)} onChange={e => set('linkedin', e.target.value)} className="h-8 text-xs" /></div>
                    <div><Label className="text-xs text-muted-foreground">GitHub</Label><Input value={String(p.github)} onChange={e => set('github', e.target.value)} className="h-8 text-xs" /></div>
                    <div><Label className="text-xs text-muted-foreground">Twitter / X</Label><Input value={String(p.twitter)} onChange={e => set('twitter', e.target.value)} className="h-8 text-xs" /></div>
                    <div><Label className="text-xs text-muted-foreground">Website</Label><Input value={String(p.website)} onChange={e => set('website', e.target.value)} className="h-8 text-xs" /></div>
                </div>
            )

        case 'footer':
            return (
                <div className="space-y-3">
                    <div><Label className="text-xs text-muted-foreground">Footer Text</Label><Input value={String(p.text)} onChange={e => set('text', e.target.value)} className="h-8 text-xs" /></div>
                    <div><Label className="text-xs text-muted-foreground">Unsubscribe Text</Label><Input value={String(p.unsubscribeText)} onChange={e => set('unsubscribeText', e.target.value)} className="h-8 text-xs" placeholder="Leave empty to hide" /></div>
                    <ColorInput label="Text Color" propKey="textColor" />
                </div>
            )
    }
}

// ═══════════════════════════════════════
// CANVAS BLOCK PREVIEW (clickable inline)
// ═══════════════════════════════════════

function CanvasBlock({ block, isSelected, onClick }: { block: EmailBlock; isSelected: boolean; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "relative group cursor-pointer transition-all duration-150",
                isSelected ? "ring-2 ring-[#DFFF00] ring-offset-2 ring-offset-black/80 rounded" : "hover:ring-1 hover:ring-white/20 rounded",
            )}
        >
            {/* Block type label */}
            <div className={cn(
                "absolute -top-3 left-2 text-[10px] font-medium px-1.5 py-0.5 rounded z-10 transition-opacity",
                isSelected ? "bg-[#DFFF00] text-black opacity-100" : "bg-white/10 text-white/50 opacity-0 group-hover:opacity-100"
            )}>
                {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
            </div>
            {/* Render the block HTML */}
            <div dangerouslySetInnerHTML={{ __html: blockToHtml(block) }} />
        </div>
    )
}

// ═══════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════

export function VisualEmailComposer({ initialBlocks, onChange }: VisualEmailComposerProps) {
    const [blocks, setBlocks] = useState<EmailBlock[]>(initialBlocks || [
        createBlock('header'),
        createBlock('text'),
        createBlock('button'),
        createBlock('divider'),
        createBlock('social'),
        createBlock('footer'),
    ])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [showPreview, setShowPreview] = useState(false)

    const selectedBlock = blocks.find(b => b.id === selectedId)
    const selectedIndex = blocks.findIndex(b => b.id === selectedId)

    // Emit HTML whenever blocks change
    const updateAndEmit = useCallback((newBlocks: EmailBlock[]) => {
        setBlocks(newBlocks)
        onChange(blocksToFullHtml(newBlocks))
    }, [onChange])

    const addBlock = (type: BlockType) => {
        const newBlock = createBlock(type)
        const insertAt = selectedIndex >= 0 ? selectedIndex + 1 : blocks.length
        const newBlocks = [...blocks]
        newBlocks.splice(insertAt, 0, newBlock)
        updateAndEmit(newBlocks)
        setSelectedId(newBlock.id)
    }

    const removeBlock = (id: string) => {
        updateAndEmit(blocks.filter(b => b.id !== id))
        if (selectedId === id) setSelectedId(null)
    }

    const duplicateBlock = (id: string) => {
        const idx = blocks.findIndex(b => b.id === id)
        if (idx < 0) return
        const dup = { ...blocks[idx], id: `block-${Date.now()}-dup`, props: { ...blocks[idx].props } }
        const newBlocks = [...blocks]
        newBlocks.splice(idx + 1, 0, dup)
        updateAndEmit(newBlocks)
        setSelectedId(dup.id)
    }

    const moveBlock = (id: string, dir: -1 | 1) => {
        const idx = blocks.findIndex(b => b.id === id)
        const target = idx + dir
        if (target < 0 || target >= blocks.length) return
        const newBlocks = [...blocks]
            ;[newBlocks[idx], newBlocks[target]] = [newBlocks[target], newBlocks[idx]]
        updateAndEmit(newBlocks)
    }

    const updateBlockProps = (id: string, props: Record<string, string | number | boolean | string[]>) => {
        updateAndEmit(blocks.map(b => b.id === id ? { ...b, props } : b))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-4 min-h-[600px]">
            {/* ═══ LEFT: Block Palette ═══ */}
            <div className="space-y-2 lg:border-r lg:border-white/10 lg:pr-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" /> Blocks
                    </h4>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
                    {PALETTE.map(item => (
                        <button
                            key={item.type}
                            onClick={() => addBlock(item.type)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-black/30 border border-white/5 hover:border-[#DFFF00]/40 hover:bg-[#DFFF00]/5 transition-all text-left group"
                        >
                            <div className="p-1.5 rounded bg-white/5 group-hover:bg-[#DFFF00]/10 transition-colors">
                                <item.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#DFFF00]" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-white">{item.label}</p>
                                <p className="text-[10px] text-muted-foreground hidden lg:block">{item.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Toggle preview on mobile */}
                <Separator className="bg-white/10 my-3" />
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-2 lg:hidden"
                    onClick={() => setShowPreview(!showPreview)}
                >
                    <Eye className="w-3.5 h-3.5" />
                    {showPreview ? 'Back to Edit' : 'Preview'}
                </Button>
            </div>

            {/* ═══ CENTER: Canvas ═══ */}
            <div className={cn("space-y-1", showPreview && "hidden lg:block")}>
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <Pencil className="w-3.5 h-3.5" /> Canvas
                        <Badge variant="outline" className="text-[10px] ml-1">{blocks.length} blocks</Badge>
                    </h4>
                    {selectedBlock && (
                        <div className="flex items-center gap-1">
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => moveBlock(selectedBlock.id, -1)} disabled={selectedIndex === 0}><ChevronUp className="w-3.5 h-3.5" /></Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => moveBlock(selectedBlock.id, 1)} disabled={selectedIndex === blocks.length - 1}><ChevronDown className="w-3.5 h-3.5" /></Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => duplicateBlock(selectedBlock.id)}><Copy className="w-3.5 h-3.5" /></Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => removeBlock(selectedBlock.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                    )}
                </div>

                {/* Email canvas wrapper */}
                <div className="rounded-xl border border-white/10 bg-[#080c0a] p-4 overflow-y-auto max-h-[700px]">
                    <div className="max-w-[560px] mx-auto bg-[rgba(13,20,16,0.8)] border border-white/10 rounded-xl overflow-hidden">
                        {blocks.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">
                                <Plus className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                <p className="text-sm">Add blocks from the palette to start designing</p>
                            </div>
                        ) : (
                            blocks.map(block => (
                                <CanvasBlock
                                    key={block.id}
                                    block={block}
                                    isSelected={block.id === selectedId}
                                    onClick={() => setSelectedId(block.id === selectedId ? null : block.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ═══ RIGHT: Properties / Preview ═══ */}
            <div className={cn("lg:border-l lg:border-white/10 lg:pl-4 space-y-4", !showPreview && "hidden lg:block")}>
                {/* Preview toggle (desktop) */}
                <div className="flex gap-1 p-0.5 bg-black/40 rounded-lg border border-white/10">
                    <button
                        onClick={() => setShowPreview(false)}
                        className={cn("flex-1 text-xs py-1.5 px-2 rounded flex items-center justify-center gap-1 transition-colors",
                            !showPreview ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        <Palette className="w-3 h-3" /> Properties
                    </button>
                    <button
                        onClick={() => setShowPreview(true)}
                        className={cn("flex-1 text-xs py-1.5 px-2 rounded flex items-center justify-center gap-1 transition-colors",
                            showPreview ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        <Eye className="w-3 h-3" /> Preview
                    </button>
                </div>

                {showPreview ? (
                    /* Live Preview */
                    <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Recipient Preview</p>
                        <div className="rounded-lg border border-white/10 bg-white overflow-hidden max-h-[600px] overflow-y-auto">
                            <div dangerouslySetInnerHTML={{ __html: blocksToFullHtml(blocks) }} />
                        </div>
                    </div>
                ) : (
                    /* Block Properties */
                    selectedBlock ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Badge className="bg-[#DFFF00]/10 text-[#DFFF00] border-[#DFFF00]/30 text-xs">
                                    {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground">Block {selectedIndex + 1}/{blocks.length}</span>
                            </div>
                            <Separator className="bg-white/10" />
                            <BlockEditor
                                block={selectedBlock}
                                onChange={(props) => updateBlockProps(selectedBlock.id, props)}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Palette className="w-6 h-6 mx-auto mb-2 opacity-30" />
                            <p className="text-xs">Select a block on the canvas to edit its properties</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

// Export utility for HTML generation
export { blocksToFullHtml, blockToHtml }
