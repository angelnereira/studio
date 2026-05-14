"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
    Send, LayoutTemplate, Plus,
    Copy, BarChart3,
    FileText, Save, Loader2, Trash2, Mail, Paperclip, Code2, Upload, ShieldCheck, AlertTriangle, Sparkles, X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { VisualEmailComposer } from "@/components/admin/emails/visual-email-composer"
import { services } from "@/lib/services"
import { systemTemplates } from "@/lib/system-email-templates"
import { createTemplate, deleteCampaign, duplicateCampaign, sendQuickEmail } from "@/app/admin/(dashboard)/emails/marketing-actions"
import { generateEmailWithAI } from "@/app/admin/(dashboard)/emails/ai-actions"

// Types
type Identity = { id: string; name: string; email: string; verified: boolean }
type Template = { id: string; name: string; content: string; subject: string | null }
type Campaign = {
    id: string;
    name: string;
    status: string;
    createdAt: Date;
    statsSent: number;
    statsOpened: number;
    sender: Identity;
}
type Contact = { id: string; name: string; email: string }

interface EmailMarketingStudioProps {
    identities: Identity[]
    templates: Template[]
    campaigns: Campaign[]
    contacts: Contact[]
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function parseEmails(input: string): string[] {
    return input
        .split(/[,;\n]/)
        .map(e => e.trim())
        .filter(Boolean)
}

export function EmailMarketingStudio({ identities, templates, campaigns, contacts }: EmailMarketingStudioProps) {
    const { toast } = useToast()
    const router = useRouter()

    // Combine database templates with system templates
    const allTemplates = useMemo(() => [
        ...systemTemplates.map(st => ({
            id: st.id,
            name: st.name,
            content: st.content,
            subject: st.subject,
            category: st.category,
            description: st.description,
            isSystem: true,
        })),
        ...templates.map(t => ({ ...t, isSystem: false, category: 'custom', description: '' }))
    ], [templates])

    // --- Compose State (Gmail-like) ---
    const [draft, setDraft] = useState({
        to: "",
        cc: "",
        bcc: "",
        subject: "",
        content: "",
        senderId: identities[0]?.id || "",
        attachments: [] as { filename: string, content: string, size?: number }[]
    })
    const [showCcBcc, setShowCcBcc] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'html'>('visual')
    const [showPreview, setShowPreview] = useState(false)
    const [rawHtmlInput, setRawHtmlInput] = useState('')
    const [spamWarnings, setSpamWarnings] = useState<string[]>([])

    // --- Create Template Dialog State ---
    const [showCreateTemplate, setShowCreateTemplate] = useState(false)
    const [newTemplateName, setNewTemplateName] = useState('')
    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)
    const [activeTab, setActiveTab] = useState('compose')

    // --- AI Assistant State ---
    const [showAiDialog, setShowAiDialog] = useState(false)
    const [aiPrompt, setAiPrompt] = useState("")
    const [aiAction, setAiAction] = useState<"generate" | "improve" | "shorten" | "professional">("generate")
    const [isGeneratingAi, setIsGeneratingAi] = useState(false)

    // Parsed recipient lists for live counters
    const toEmails = parseEmails(draft.to)
    const ccEmails = parseEmails(draft.cc)
    const bccEmails = parseEmails(draft.bcc)
    const totalRecipients = toEmails.length + ccEmails.length + bccEmails.length
    const invalidEmails = [...toEmails, ...ccEmails, ...bccEmails].filter(e => !EMAIL_RE.test(e))

    // --- AI Assistant Handler ---
    const handleAiGenerate = async () => {
        if (!aiPrompt && aiAction === "generate") {
            toast({ title: "Prompt needed", description: "Please enter what you want to write about.", variant: "destructive" })
            return
        }
        setIsGeneratingAi(true)
        try {
            const res = await generateEmailWithAI({
                prompt: aiPrompt,
                action: aiAction,
                currentSubject: draft.subject,
                currentBody: draft.content
            })
            if (res.success && res.data) {
                applyExternalContent({
                    content: res.data.htmlBody || draft.content,
                    subject: res.data.subject || draft.subject,
                })
                toast({ title: "✨ AI Magic Applied", description: "Your email has been updated." })
                setShowAiDialog(false)
                setAiPrompt("")
            } else {
                toast({ title: "AI Error", description: res.message || "Failed to generate.", variant: "destructive" })
            }
        } catch (error) {
            console.error('AI error:', error)
            toast({ title: "AI Error", description: "An unexpected error occurred.", variant: "destructive" })
        } finally {
            setIsGeneratingAi(false)
        }
    }

    // Anti-spam HTML sanitizer
    const sanitizeEmailHtml = (html: string): { clean: string; warnings: string[] } => {
        const warnings: string[] = []
        let clean = html

        const scriptCount = (clean.match(/<script[\s\S]*?<\/script>/gi) || []).length
        if (scriptCount > 0) { warnings.push(`Removed ${scriptCount} <script> tag(s) — blocked by email clients`); clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '') }

        const iframeCount = (clean.match(/<iframe[\s\S]*?<\/iframe>/gi) || []).length + (clean.match(/<iframe[^>]*\/>/gi) || []).length
        if (iframeCount > 0) { warnings.push(`Removed ${iframeCount} <iframe> tag(s) — spam trigger`); clean = clean.replace(/<iframe[\s\S]*?(<\/iframe>|\/>)/gi, '') }

        if (/<form/i.test(clean)) { warnings.push('Removed <form> tags — most clients block forms'); clean = clean.replace(/<\/?form[^>]*>/gi, '') }

        clean = clean.replace(/<(embed|object|applet)[\s\S]*?(<\/(embed|object|applet)>|\/>)/gi, () => { warnings.push('Removed embedded objects'); return '' })

        if (/javascript:/i.test(clean)) { warnings.push('Removed javascript: URLs — security risk'); clean = clean.replace(/javascript:[^"']*/gi, '#') }

        const eventCount = (clean.match(/\son\w+\s*=/gi) || []).length
        if (eventCount > 0) { warnings.push(`Removed ${eventCount} event handler(s) (onclick, onload, etc.)`); clean = clean.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '') }

        if (/@import/i.test(clean) || /expression\s*\(/i.test(clean)) {
            warnings.push('Removed @import / expression() in CSS — spam trigger')
            clean = clean.replace(/@import[^;]+;/gi, '')
            clean = clean.replace(/expression\s*\([^)]*\)/gi, '')
        }

        if (/position\s*:\s*(fixed|absolute)/i.test(clean)) {
            warnings.push('Removed position:fixed/absolute — breaks email layout')
            clean = clean.replace(/position\s*:\s*(fixed|absolute)/gi, 'position:relative')
        }

        const linkCount = (clean.match(/<a\s/gi) || []).length
        if (linkCount > 20) warnings.push(`${linkCount} links detected — too many links trigger spam filters`)

        const imgNoAlt = (clean.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length
        if (imgNoAlt > 0) warnings.push(`${imgNoAlt} image(s) missing alt text — add alt for better deliverability`)

        const capsWords = clean.replace(/<[^>]*>/g, '').match(/\b[A-Z]{5,}\b/g) || []
        if (capsWords.length > 3) warnings.push('Excessive ALL CAPS text detected — triggers spam filters')

        return { clean, warnings }
    }

    // Centralized: when content comes from outside (template/upload/AI), we MUST
    // both update draft.content AND switch the user to a controlled editor that
    // shows it. The visual block composer has its own internal block state and
    // can't render arbitrary HTML, so we route to the code editor.
    const applyExternalContent = ({ content, subject }: { content: string; subject?: string }) => {
        setDraft(prev => ({ ...prev, content, subject: prev.subject || subject || prev.subject }))
        setRawHtmlInput(content)
        setEditorMode(prev => (prev === 'visual' ? 'code' : prev))
        setShowPreview(false)
    }

    // Handle raw HTML upload from file
    const handleHtmlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
            toast({ title: 'Invalid file', description: 'Please upload an .html or .htm file', variant: 'destructive' })
            return
        }
        const reader = new FileReader()
        reader.onload = (ev) => {
            const html = ev.target?.result as string
            const { clean, warnings } = sanitizeEmailHtml(html)
            setRawHtmlInput(clean)
            setDraft(prev => ({ ...prev, content: clean }))
            setSpamWarnings(warnings)
            toast({
                title: '✅ HTML Loaded & Sanitized',
                description: warnings.length > 0 ? `${warnings.length} issue(s) auto-fixed` : 'Clean HTML — no issues found'
            })
        }
        reader.readAsText(file)
        // Reset the input value so re-uploading the same filename re-triggers onChange.
        e.target.value = ''
    }

    // Apply raw HTML with sanitization
    const applyRawHtml = () => {
        if (!rawHtmlInput.trim()) {
            toast({ title: 'Empty', description: 'Paste some HTML code first', variant: 'destructive' })
            return
        }
        try {
            const { clean, warnings } = sanitizeEmailHtml(rawHtmlInput)
            setRawHtmlInput(clean)
            setDraft(prev => ({ ...prev, content: clean }))
            setSpamWarnings(warnings)
            toast({
                title: '✅ HTML Applied',
                description: warnings.length > 0 ? `${warnings.length} spam trigger(s) removed` : 'Clean HTML inserted'
            })
        } catch (error) {
            console.error('Sanitize error:', error)
            toast({ title: 'Error', description: 'Failed to sanitize HTML. Check the code.', variant: 'destructive' })
        }
    }

    // Helper to read file as base64 (returns total size for limit enforcement)
    const MAX_FILE_MB = 4
    const MAX_TOTAL_MB = 40 // Resend caps at 40MB total per email
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const files = Array.from(e.target.files)
        const existingTotal = draft.attachments.reduce((s, a) => s + (a.size || 0), 0)
        const newAttachments: { filename: string, content: string, size: number }[] = []
        let runningTotal = existingTotal

        for (const file of files) {
            if (file.size > MAX_FILE_MB * 1024 * 1024) {
                toast({ title: "File too large", description: `${file.name} exceeds ${MAX_FILE_MB}MB limit.`, variant: "destructive" })
                continue
            }
            if (runningTotal + file.size > MAX_TOTAL_MB * 1024 * 1024) {
                toast({ title: "Total too large", description: `Combined attachments exceed ${MAX_TOTAL_MB}MB (Resend limit).`, variant: "destructive" })
                continue
            }

            const reader = new FileReader()
            const promise = new Promise<{ filename: string, content: string, size: number }>((resolve, reject) => {
                reader.onload = (re) => {
                    const base64 = re.target?.result as string
                    const content = base64.split(',')[1] || base64
                    resolve({ filename: file.name, content, size: file.size })
                }
                reader.onerror = () => reject(reader.error)
            })
            reader.readAsDataURL(file)
            newAttachments.push(await promise)
            runningTotal += file.size
        }
        setDraft(prev => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }))
        e.target.value = ''
    }

    // Add contact email to a field (To/Cc/Bcc) — preserves any existing emails.
    const addContactTo = (contactId: string, field: 'to' | 'cc' | 'bcc' = 'to') => {
        const contact = contacts.find(c => c.id === contactId)
        if (!contact) return
        setDraft(prev => {
            const existing = parseEmails(prev[field])
            if (existing.includes(contact.email)) return prev
            const next = [...existing, contact.email].join(', ')
            return { ...prev, [field]: next }
        })
        toast({ title: "Added", description: `${contact.name || contact.email} added to ${field.toUpperCase()}` })
    }

    // --- Quick Send (Gmail-like) ---
    const handleQuickSend = async () => {
        if (toEmails.length === 0) {
            toast({ title: "Missing recipient", description: "Add at least one address in 'To'.", variant: "destructive" })
            return
        }
        if (invalidEmails.length > 0) {
            toast({ title: "Invalid email", description: `Fix: ${invalidEmails.slice(0, 3).join(', ')}${invalidEmails.length > 3 ? '…' : ''}`, variant: "destructive" })
            return
        }
        if (!draft.subject.trim()) {
            toast({ title: "Missing subject", description: "Enter a subject line.", variant: "destructive" })
            return
        }

        // Final sync of content if in HTML mode to avoid silent data loss
        let currentContent = draft.content
        if (editorMode === 'html' && rawHtmlInput) {
            const { clean } = sanitizeEmailHtml(rawHtmlInput)
            currentContent = clean
            setDraft(prev => ({ ...prev, content: clean }))
        }

        if (!currentContent.trim()) {
            toast({ title: "Missing content", description: "Add some email content.", variant: "destructive" })
            return
        }
        if (!draft.senderId) {
            toast({ title: "No sender", description: "Select a sender identity (Settings → Sender Identities).", variant: "destructive" })
            return
        }

        setIsSending(true)
        try {
            const result = await sendQuickEmail({
                to: toEmails,
                cc: ccEmails,
                bcc: bccEmails,
                subject: draft.subject,
                html: currentContent,
                senderId: draft.senderId,
                attachments: draft.attachments.length > 0
                    ? draft.attachments.map(({ filename, content }) => ({ filename, content }))
                    : undefined
            })

            if (result.success) {
                toast({ title: "✅ Sent!", description: result.message })
                setDraft({ to: "", cc: "", bcc: "", subject: "", content: "", senderId: draft.senderId, attachments: [] })
                setRawHtmlInput("")
                setShowCcBcc(false)
                router.refresh()
            } else {
                throw new Error(result.message || "Failed to send")
            }
        } catch (error) {
            console.error('Quick send error:', error)
            const msg = error instanceof Error ? error.message : "Failed to send."
            toast({ title: "Error", description: msg, variant: "destructive" })
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
            <TabsList className="bg-black/40 border border-white/10 p-1 w-full md:w-auto overflow-x-auto">
                <TabsTrigger value="compose" className="gap-1.5 text-xs md:text-sm"><Send className="w-3.5 h-3.5 md:w-4 md:h-4" /> Compose</TabsTrigger>
                <TabsTrigger value="campaigns" className="gap-1.5 text-xs md:text-sm"><LayoutTemplate className="w-3.5 h-3.5 md:w-4 md:h-4" /> Campaigns</TabsTrigger>
                <TabsTrigger value="templates" className="gap-1.5 text-xs md:text-sm"><FileText className="w-3.5 h-3.5 md:w-4 md:h-4" /> Templates</TabsTrigger>
            </TabsList>

            {/* --- COMPOSE TAB (Gmail-like) --- */}
            <TabsContent value="compose" className="space-y-4">
                <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
                    <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                            <Mail className="w-4 h-4 md:w-5 md:h-5" /> Quick Compose
                        </CardTitle>
                        <CardDescription className="text-xs md:text-sm">Send professional HTML emails — supports multiple recipients (up to 50 per email, including CC/BCC).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* To */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs text-muted-foreground">
                                    To {toEmails.length > 0 && <Badge variant="outline" className="ml-2 text-[10px] py-0">{toEmails.length}</Badge>}
                                </Label>
                                <button type="button" onClick={() => setShowCcBcc(!showCcBcc)} className="text-[11px] text-muted-foreground hover:text-white transition">
                                    {showCcBcc ? '− Hide Cc/Bcc' : '+ Add Cc/Bcc'}
                                </button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    placeholder="email@a.com, email@b.com, email@c.com"
                                    type="text"
                                    value={draft.to}
                                    onChange={(e) => setDraft({ ...draft, to: e.target.value })}
                                    className="flex-1"
                                />
                                {contacts.length > 0 && (
                                    <Select onValueChange={(id) => addContactTo(id, 'to')}>
                                        <SelectTrigger className="sm:w-[140px]">
                                            <SelectValue placeholder="+ Contact" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {contacts.map(c => (
                                                <SelectItem key={c.id} value={c.id}>{c.name || c.email}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                            <p className="text-[10px] text-muted-foreground">Separate multiple emails with commas or semicolons.</p>
                        </div>

                        {showCcBcc && (
                            <>
                                <div className="space-y-1.5">
                                    <Label className="text-xs text-muted-foreground">
                                        Cc {ccEmails.length > 0 && <Badge variant="outline" className="ml-2 text-[10px] py-0">{ccEmails.length}</Badge>}
                                    </Label>
                                    <Input
                                        placeholder="cc1@example.com, cc2@example.com"
                                        type="text"
                                        value={draft.cc}
                                        onChange={(e) => setDraft({ ...draft, cc: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs text-muted-foreground">
                                        Bcc {bccEmails.length > 0 && <Badge variant="outline" className="ml-2 text-[10px] py-0">{bccEmails.length}</Badge>}
                                    </Label>
                                    <Input
                                        placeholder="bcc1@example.com, bcc2@example.com"
                                        type="text"
                                        value={draft.bcc}
                                        onChange={(e) => setDraft({ ...draft, bcc: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        {/* From */}
                        <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">From</Label>
                            <Select
                                value={draft.senderId}
                                onValueChange={(v) => setDraft({ ...draft, senderId: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Sender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {identities.map(id => (
                                        <SelectItem key={id.id} value={id.id}>
                                            {id.name} ({id.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {identities.length === 0 && (
                                <p className="text-xs text-red-400">Add a sender identity in Settings first.</p>
                            )}
                        </div>

                        {/* Subject */}
                        <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Subject</Label>
                            <Input
                                placeholder="Your email subject..."
                                value={draft.subject}
                                onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                                className="text-sm md:text-base font-medium"
                            />
                        </div>

                        {/* Recipient summary banner */}
                        {totalRecipients > 0 && (
                            <div className="text-[11px] text-muted-foreground bg-black/30 rounded border border-white/5 px-3 py-2">
                                <span className="text-white font-medium">{totalRecipients} total recipient{totalRecipients > 1 ? 's' : ''}</span>
                                {' · '}
                                {toEmails.length > 0 && <>To: {toEmails.length}</>}
                                {ccEmails.length > 0 && <> · Cc: {ccEmails.length}</>}
                                {bccEmails.length > 0 && <> · Bcc: {bccEmails.length}</>}
                                {invalidEmails.length > 0 && (
                                    <span className="text-red-400 ml-2">⚠ {invalidEmails.length} invalid</span>
                                )}
                            </div>
                        )}

                        <Separator className="bg-white/10" />

                        {/* Editor mode toggle + Template loader */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                            <div className="flex gap-0.5 p-0.5 bg-black/40 rounded border border-white/10 overflow-x-auto">
                                <button
                                    onClick={() => setEditorMode('visual')}
                                    className={cn(
                                        'text-xs px-2.5 sm:px-3 py-1.5 rounded transition-colors whitespace-nowrap',
                                        editorMode === 'visual' ? 'bg-[#DFFF00]/20 text-[#DFFF00]' : 'text-muted-foreground hover:text-white'
                                    )}
                                >
                                    🎨 Visual
                                </button>
                                <button
                                    onClick={() => setEditorMode('code')}
                                    className={cn(
                                        'text-xs px-2.5 sm:px-3 py-1.5 rounded transition-colors whitespace-nowrap',
                                        editorMode === 'code' ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white'
                                    )}
                                >
                                    &lt;/&gt; Editor
                                </button>
                                <button
                                    onClick={() => { setEditorMode('html'); setRawHtmlInput(draft.content) }}
                                    className={cn(
                                        'text-xs px-2.5 sm:px-3 py-1.5 rounded transition-colors flex items-center gap-1 whitespace-nowrap',
                                        editorMode === 'html' ? 'bg-orange-500/20 text-orange-400' : 'text-muted-foreground hover:text-white'
                                    )}
                                >
                                    <Code2 className="w-3 h-3" /> Raw HTML
                                </button>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Select onValueChange={(v) => {
                                    const t = allTemplates.find(t => t.id === v)
                                    if (t) {
                                        applyExternalContent({ content: t.content, subject: t.subject || undefined })
                                        toast({ title: "Template Loaded", description: `"${t.name}" applied.` })
                                    }
                                }}>
                                    <SelectTrigger className="w-[150px] sm:w-[180px] h-8 text-xs">
                                        <SelectValue placeholder="📦 Load Template..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">📦 System Templates</div>
                                        {allTemplates.filter(t => t.isSystem).map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                                        {templates.length > 0 && (
                                            <>
                                                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t border-white/10 mt-1 pt-2">📝 My Templates</div>
                                                {allTemplates.filter(t => !t.isSystem).map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => setShowPreview(!showPreview)}>
                                    {showPreview ? '✏️ Edit' : '👁️ Preview'}
                                </Button>
                                <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="h-8 text-xs gap-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0">
                                            <Sparkles className="w-3.5 h-3.5" /> AI
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-purple-400" /> AI Email Assistant
                                            </DialogTitle>
                                            <DialogDescription>
                                                Let Gemini AI write or improve your email.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-2">
                                            <div className="space-y-2">
                                                <Label>Action</Label>
                                                <Select value={aiAction} onValueChange={(val: "generate" | "improve" | "shorten" | "professional") => setAiAction(val)}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="generate">✒️ Generate from scratch</SelectItem>
                                                        <SelectItem value="improve">✨ Improve current text</SelectItem>
                                                        <SelectItem value="shorten">🔪 Make it shorter</SelectItem>
                                                        <SelectItem value="professional">👔 Make it professional</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Instructions (Prompt)</Label>
                                                <textarea
                                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] resize-y"
                                                    placeholder={aiAction === "generate" ? "E.g. Write an email announcing our new summer sale with 50% off..." : "Optional: Add specific instructions like 'Mention the deadline is Friday'"}
                                                    value={aiPrompt}
                                                    onChange={(e) => setAiPrompt(e.target.value)}
                                                />
                                            </div>
                                            <Button
                                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                                                onClick={handleAiGenerate}
                                                disabled={isGeneratingAi || (!aiPrompt && aiAction === "generate")}
                                            >
                                                {isGeneratingAi ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                                {isGeneratingAi ? "Generating Magic..." : (aiAction === "generate" ? "Generate Email" : "Apply Magic")}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        {/* Content: Visual / Code / Preview */}
                        {showPreview ? (
                            <div className="rounded-xl border border-white/10 bg-white overflow-hidden">
                                <div className="bg-gray-100 px-3 sm:px-4 py-2 border-b flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2">Email Preview</span>
                                </div>
                                <div className="p-0 min-h-[300px] max-h-[600px] overflow-y-auto">
                                    <div dangerouslySetInnerHTML={{ __html: draft.content || '<div style="padding: 40px; text-align: center; color: #999;">No content yet — switch to Edit and start composing.</div>' }} />
                                </div>
                            </div>
                        ) : editorMode === 'visual' ? (
                            <VisualEmailComposer
                                onChange={(html) => setDraft(prev => ({ ...prev, content: html }))}
                            />
                        ) : editorMode === 'html' ? (
                            <div className="space-y-3">
                                {/* Raw HTML Editor */}
                                <div className="rounded-xl border border-orange-500/20 bg-black/60 overflow-hidden">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2 bg-orange-500/10 border-b border-orange-500/20">
                                        <div className="flex items-center gap-2">
                                            <Code2 className="w-4 h-4 text-orange-400" />
                                            <span className="text-xs font-medium text-orange-400">Raw HTML Code</span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Label htmlFor="html-file-upload" className="cursor-pointer text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors flex items-center gap-1">
                                                <Upload className="w-3 h-3" /> Upload .html
                                            </Label>
                                            <Input
                                                id="html-file-upload"
                                                type="file"
                                                accept=".html,.htm"
                                                className="hidden"
                                                onChange={handleHtmlFileUpload}
                                            />
                                            <Button size="sm" className="h-7 text-xs bg-orange-500 hover:bg-orange-600 text-white gap-1" onClick={applyRawHtml}>
                                                <ShieldCheck className="w-3 h-3" /> Sanitize & Apply
                                            </Button>
                                        </div>
                                    </div>
                                    <textarea
                                        value={rawHtmlInput}
                                        onChange={(e) => setRawHtmlInput(e.target.value)}
                                        className="w-full min-h-[280px] sm:min-h-[350px] bg-transparent text-green-300 font-mono text-xs p-3 sm:p-4 focus:outline-none resize-y leading-relaxed"
                                        placeholder={'<!-- Paste your HTML email code here -->\n<div style="font-family: Arial, sans-serif;">\n  <h1>Your Email</h1>\n  <p>Content goes here...</p>\n</div>'}
                                        spellCheck={false}
                                    />
                                </div>

                                {/* Spam warnings */}
                                {spamWarnings.length > 0 && (
                                    <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 space-y-1.5">
                                        <div className="flex items-center gap-2 text-yellow-400 text-xs font-semibold">
                                            <AlertTriangle className="w-3.5 h-3.5" /> {spamWarnings.length} issue(s) auto-fixed
                                        </div>
                                        {spamWarnings.map((w, i) => (
                                            <p key={i} className="text-xs text-yellow-300/70 pl-5">• {w}</p>
                                        ))}
                                    </div>
                                )}

                                {/* Anti-spam tips */}
                                <div className="rounded-lg border border-white/5 bg-black/30 p-3 hidden sm:block">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Anti-Spam Best Practices
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                                        <p>✅ Use inline styles, not &lt;style&gt; blocks</p>
                                        <p>✅ Add alt text to all images</p>
                                        <p>✅ Keep image-to-text ratio balanced</p>
                                        <p>✅ Include unsubscribe link</p>
                                        <p>❌ No JavaScript or event handlers</p>
                                        <p>❌ No iframes, forms, or embeds</p>
                                        <p>❌ Avoid ALL CAPS or spammy words</p>
                                        <p>❌ No excessive links (&gt;20)</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <RichTextEditor
                                content={draft.content}
                                onChange={(html) => setDraft(prev => ({ ...prev, content: html }))}
                                services={services}
                            />
                        )}

                        {/* Attachments */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Label htmlFor="quick-file-upload" className="cursor-pointer text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5">
                                    <Paperclip className="w-3.5 h-3.5" /> Attach File
                                </Label>
                                <Input
                                    id="quick-file-upload"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                                {draft.attachments.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {draft.attachments.map((file, idx) => (
                                            <Badge key={idx} variant="secondary" className="gap-1.5 pl-2 pr-1 py-0.5 text-xs">
                                                <span className="truncate max-w-[120px]">{file.filename}</span>
                                                {file.size && (
                                                    <span className="text-muted-foreground text-[10px]">
                                                        {(file.size / 1024 / 1024).toFixed(1)}MB
                                                    </span>
                                                )}
                                                <button
                                                    type="button"
                                                    className="hover:text-red-400"
                                                    onClick={() => setDraft({
                                                        ...draft,
                                                        attachments: draft.attachments.filter((_, i) => i !== idx)
                                                    })}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Button
                                className="w-full sm:w-auto bg-[#DFFF00] text-black hover:bg-[#c8e600] font-bold px-6 gap-2"
                                onClick={handleQuickSend}
                                disabled={isSending || toEmails.length === 0 || !draft.subject}
                            >
                                {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {isSending
                                    ? "Sending..."
                                    : totalRecipients > 1
                                        ? `Send to ${totalRecipients}`
                                        : "Send Email"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>



            {/* --- CAMPAIGNS TAB --- */}
            <TabsContent value="campaigns">
                <Card className="bg-black/40 border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg"><BarChart3 className="w-4 h-4 md:w-5 md:h-5" /> Campaign Results</CardTitle>
                        <CardDescription className="text-xs md:text-sm">Track performance and manage your sent campaigns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {campaigns.length === 0 ? (
                                <div className="text-center py-12">
                                    <Send className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-40" />
                                    <p className="text-muted-foreground">No campaigns sent yet.</p>
                                    <p className="text-xs text-muted-foreground mt-1">Go to the Compose tab to create your first campaign.</p>
                                </div>
                            ) : campaigns.map(c => {
                                const openRate = c.statsSent > 0 ? Math.round((c.statsOpened / c.statsSent) * 100) : 0
                                return (
                                    <div key={c.id} className="p-3 md:p-4 rounded-lg border border-white/10 bg-black/20 space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <h4 className="font-medium truncate">{c.name}</h4>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {format(new Date(c.createdAt), 'MMM d, yyyy')} · via {c.sender?.email || 'Unknown'}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={cn(
                                                    c.status === 'completed' && 'bg-green-500/10 text-green-400',
                                                    c.status === 'draft' && 'bg-blue-500/10 text-blue-400',
                                                    c.status === 'failed' && 'bg-red-500/10 text-red-400',
                                                    c.status === 'sending' && 'bg-yellow-500/10 text-yellow-400',
                                                )}>{c.status}</Badge>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-white" onClick={async () => {
                                                    const r = await duplicateCampaign(c.id)
                                                    toast({ title: r.success ? "Duplicated" : "Error", description: r.message })
                                                    router.refresh()
                                                }}><Copy className="w-3.5 h-3.5" /></Button>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={async () => {
                                                    const r = await deleteCampaign(c.id)
                                                    toast({ title: r.success ? "Deleted" : "Error", description: r.message })
                                                    router.refresh()
                                                }}><Trash2 className="w-3.5 h-3.5" /></Button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                                            <div className="bg-black/30 rounded-lg p-2 md:p-2.5 text-center border border-white/5">
                                                <p className="text-base md:text-lg font-bold">{c.statsSent}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Sent</p>
                                            </div>
                                            <div className="bg-black/30 rounded-lg p-2 md:p-2.5 text-center border border-white/5">
                                                <p className="text-base md:text-lg font-bold text-blue-400">{c.statsOpened}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Opened</p>
                                            </div>
                                            <div className="bg-black/30 rounded-lg p-2 md:p-2.5 text-center border border-white/5">
                                                <p className="text-base md:text-lg font-bold text-green-400">{openRate}%</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Open Rate</p>
                                            </div>
                                            <div className="bg-black/30 rounded-lg p-2 md:p-2.5 text-center border border-white/5">
                                                <p className="text-base md:text-lg font-bold text-yellow-400">{c.statsSent > 0 ? c.statsSent - c.statsOpened : 0}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pending</p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5">
                                            <div className="h-full rounded-full bg-gradient-to-r from-primary to-green-400 transition-all" style={{ width: `${openRate}%` }} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* --- TEMPLATES TAB --- */}
            <TabsContent value="templates">
                <div className="space-y-6 md:space-y-8">
                    {/* System Templates Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">📦 Sistema</Badge>
                            <h3 className="text-base md:text-lg font-semibold">Templates Predefinidos</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {allTemplates.filter(t => t.isSystem).map(t => (
                                <Card key={t.id} className="bg-black/40 border-white/10 hover:border-primary/50 cursor-pointer group transition-all">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">{t.name}</CardTitle>
                                        <CardDescription className="text-xs">{t.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[120px] overflow-hidden relative">
                                        <div className="scale-[0.4] origin-top-left w-[250%] text-black p-2 rounded-md h-[300px]" dangerouslySetInnerHTML={{ __html: t.content }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    </CardContent>
                                    <CardFooter className="pt-2">
                                        <Button
                                            variant="secondary"
                                            className="w-full text-xs"
                                            onClick={() => {
                                                applyExternalContent({ content: t.content, subject: t.subject || undefined })
                                                setActiveTab('compose')
                                                toast({ title: "Template Cargado", description: `"${t.name}" listo para usar en Compose.` })
                                            }}
                                        >
                                            Usar Template
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Custom Templates Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">📝 Personalizados</Badge>
                            <h3 className="text-base md:text-lg font-semibold">Mis Templates</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {templates.map(t => (
                                <Card key={t.id} className="bg-black/40 border-white/10 hover:border-primary/50 cursor-pointer group transition-all">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{t.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="h-[150px] overflow-hidden relative">
                                        <div className="scale-[0.5] origin-top-left w-[200%] bg-white text-black p-4 rounded-md h-[300px]" dangerouslySetInnerHTML={{ __html: t.content }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="secondary" className="w-full" onClick={() => {
                                            applyExternalContent({ content: t.content, subject: t.subject || undefined })
                                            setActiveTab('compose')
                                            toast({ title: 'Template Loaded', description: `"${t.name}" loaded into Compose for editing.` })
                                        }}>Edit Template</Button>
                                    </CardFooter>
                                </Card>
                            ))}

                            {/* Create Template Dialog */}
                            <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
                                <DialogTrigger asChild>
                                    <Card className="bg-black/20 border-white/10 border-dashed flex items-center justify-center min-h-[200px] sm:min-h-[250px] hover:bg-black/30 cursor-pointer transition-colors" onClick={() => setShowCreateTemplate(true)}>
                                        <div className="text-center">
                                            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p className="font-medium">Create Template</p>
                                            <p className="text-xs text-muted-foreground mt-1">Save current compose content</p>
                                        </div>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Save as Template</DialogTitle>
                                        <DialogDescription className="sr-only">
                                            Guardar el contenido del email actual como un template personalizado.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-2">
                                            <Label>Template Name</Label>
                                            <Input
                                                placeholder="e.g. Monthly Newsletter"
                                                value={newTemplateName}
                                                onChange={(e) => setNewTemplateName(e.target.value)}
                                            />
                                        </div>
                                        {!draft.content && (
                                            <p className="text-xs text-yellow-400">⚠️ No content in Compose tab. Go to Compose first and create your email content.</p>
                                        )}
                                        <Button
                                            className="w-full"
                                            disabled={!newTemplateName.trim() || !draft.content || isCreatingTemplate}
                                            onClick={async () => {
                                                setIsCreatingTemplate(true)
                                                try {
                                                    await createTemplate({
                                                        name: newTemplateName,
                                                        content: draft.content,
                                                        subject: draft.subject || '',
                                                    })
                                                    toast({ title: '✅ Template Saved', description: `"${newTemplateName}" created successfully.` })
                                                    setNewTemplateName('')
                                                    setShowCreateTemplate(false)
                                                    router.refresh()
                                                } catch {
                                                    toast({ title: 'Error', description: 'Failed to save template.', variant: 'destructive' })
                                                } finally {
                                                    setIsCreatingTemplate(false)
                                                }
                                            }}
                                        >
                                            {isCreatingTemplate ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                            {isCreatingTemplate ? 'Saving...' : 'Save Template'}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}
