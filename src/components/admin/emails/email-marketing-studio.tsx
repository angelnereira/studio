"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
    Send, LayoutTemplate, Users, Settings, Plus,
    ArrowRight, ChevronRight, Check, Calendar,
    FileText, Save, Loader2, Trash2, Mail, Paperclip
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { createSenderIdentity, createTemplate, sendCampaign, saveCampaignDraft, deleteSenderIdentity } from "@/app/admin/(dashboard)/emails/marketing-actions"

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

interface EmailMarketingStudioProps {
    identities: Identity[]
    templates: Template[]
    campaigns: Campaign[]
}

export function EmailMarketingStudio({ identities, templates, campaigns }: EmailMarketingStudioProps) {
    const { toast } = useToast()
    const router = useRouter()

    // --- Compose State ---
    const [step, setStep] = useState(1)
    const [draft, setDraft] = useState({
        name: "",
        subject: "",
        content: "",
        senderId: identities[0]?.id || "",
        recipientType: "individual",
        specificEmail: "",
        audienceFilter: {} as any,
        scheduledAt: undefined as Date | undefined,
        attachments: [] as { filename: string, content: string }[]
    })
    const [isSending, setIsSending] = useState(false)

    // Helper to read file as base64
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const newAttachments: { filename: string, content: string }[] = []

            for (const file of files) {
                // Limit size: 4MB (Server actions/Vercel limit safety)
                if (file.size > 4 * 1024 * 1024) {
                    toast({ title: "File too large", description: `${file.name} exceeds 4MB limit.`, variant: "destructive" })
                    continue
                }

                const reader = new FileReader()
                const promise = new Promise<{ filename: string, content: string }>((resolve) => {
                    reader.onload = (re) => {
                        const base64 = re.target?.result as string
                        // Remove data URL prefix for cleaner backend handling or keep it if Resend likes it?
                        // Resend works well with Buffer, string path, or base64.
                        // Ideally we send just the Base64 content? 
                        // Resend 'content' expects Buffer or string. If string, it's just raw content. 
                        // Actually Resend Node SDK handles base64 string well if it's the raw content?
                        // Or we can leave the data URI prefix? 
                        // Docs say: content: '...base64...' (without prefix usually)
                        // But let's verify. Actually, sending the full data URI is often easier for some libs, but Resend Node might treat it as text.
                        // Let's strip the prefix.
                        const content = base64.split(',')[1] || base64
                        resolve({ filename: file.name, content })
                    }
                })
                reader.readAsDataURL(file)
                newAttachments.push(await promise)
            }
            setDraft(prev => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }))
        }
    }

    // --- Actions ---

    const handleNext = () => setStep(s => s + 1)
    const handleBack = () => setStep(s => s - 1)

    const handleSend = async () => {
        setIsSending(true)
        try {
            // 1. Save Draft (Create or Update)
            // Ideally we'd pass an ID if we were editing, but for this 'compose new' flow we might not have it yet.
            const saved = await saveCampaignDraft({
                name: draft.name || draft.subject || "Untitled Campaign",
                subject: draft.subject,
                content: draft.content,
                senderId: draft.senderId,
                content: draft.content,
                senderId: draft.senderId,
                content: draft.content,
                senderId: draft.senderId,
                audienceFilter: { recipientType: draft.recipientType, specificEmail: draft.specificEmail },
                scheduledAt: draft.scheduledAt, // Save the scheduled date
                attachments: draft.attachments
            })

            // Ensure we got an ID back
            if (!saved.success || !saved.id) {
                throw new Error(saved.message || "Failed to save draft logic")
            }

            // 2. Send the Campaign using the ID
            const result = await sendCampaign(saved.id)

            if (result.success) {
                toast({ title: "Campaign Sent!", description: result.message })

                // Reset form and go back to step 1
                setStep(1)
                setDraft({
                    name: "", subject: "", content: "",
                    senderId: draft.senderId,
                    recipientType: "individual", specificEmail: "", audienceFilter: {},
                    scheduledAt: undefined, attachments: []
                })
                router.refresh()
            } else {
                throw new Error(result.message)
            }

        } catch (error) {
            const msg = error instanceof Error ? error.message : "Failed to send."
            toast({ title: "Error", description: msg, variant: "destructive" })
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Tabs defaultValue="compose" className="space-y-6">
            <TabsList className="bg-black/40 border border-white/10 p-1">
                <TabsTrigger value="compose" className="gap-2"><Send className="w-4 h-4" /> Compose</TabsTrigger>
                <TabsTrigger value="campaigns" className="gap-2"><LayoutTemplate className="w-4 h-4" /> Campaigns</TabsTrigger>
                <TabsTrigger value="templates" className="gap-2"><FileText className="w-4 h-4" /> Templates</TabsTrigger>
                <TabsTrigger value="settings" className="gap-2"><Settings className="w-4 h-4" /> Settings</TabsTrigger>
            </TabsList>

            {/* --- COMPOSE TAB --- */}
            <TabsContent value="compose" className="space-y-6">
                <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Smart Composer</span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className={step >= 1 ? "text-primary font-bold" : ""}>1. Setup</span>
                                <ChevronRight className="w-4 h-4" />
                                <span className={step >= 2 ? "text-primary font-bold" : ""}>2. Design</span>
                                <ChevronRight className="w-4 h-4" />
                                <span className={step >= 3 ? "text-primary font-bold" : ""}>3. Review</span>
                            </div>
                        </CardTitle>
                        <CardDescription>Create beautiful, high-converting emails.</CardDescription>
                    </CardHeader>
                    <CardContent>

                        {/* STEP 1: SETUP */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Internal Campaign Name</Label>
                                        <Input
                                            placeholder="e.g. Summer Sale 2026"
                                            value={draft.name}
                                            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Sender Identity</Label>
                                        <Select
                                            value={draft.senderId}
                                            onValueChange={(v) => setDraft({ ...draft, senderId: v })}
                                        >
                                            <SelectTrigger><SelectValue placeholder="Select Sender" /></SelectTrigger>
                                            <SelectContent>
                                                {identities.map(id => (
                                                    <SelectItem key={id.id} value={id.id}>
                                                        {id.name} ({id.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {identities.length === 0 && (
                                            <p className="text-xs text-red-400">Please add a sender identity in Settings first.</p>
                                        )}
                                    </div>
                                </div>

                                <Separator className="bg-white/10" />

                                <div className="space-y-4">
                                    <Label>Audience</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { id: 'individual', label: 'Individual', icon: Users },
                                            { id: 'clients', label: 'Clients', icon: Users },
                                            { id: 'employers', label: 'Employers', icon: Users },
                                            { id: 'all', label: 'All Leads', icon: Users },
                                        ].map(type => (
                                            <div
                                                key={type.id}
                                                className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center gap-2 hover:bg-white/5 transition-colors ${draft.recipientType === type.id ? 'border-primary bg-primary/10' : 'border-white/10'}`}
                                                onClick={() => setDraft({ ...draft, recipientType: type.id })}
                                            >
                                                <type.icon className="w-6 h-6" />
                                                <span className="text-sm font-medium">{type.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {draft.recipientType === "individual" && (
                                        <div className="space-y-2">
                                            <Label>Recipient Email</Label>
                                            <Input
                                                placeholder="client@example.com"
                                                value={draft.specificEmail}
                                                onChange={(e) => setDraft({ ...draft, specificEmail: e.target.value })}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: DESIGN */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="space-y-2">
                                    <Label>Subject Line</Label>
                                    <Input
                                        placeholder="Grab their attention..."
                                        value={draft.subject}
                                        onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                                        className="text-lg font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Email Content</Label>
                                        <Select onValueChange={(v) => {
                                            const t = templates.find(t => t.id === v)
                                            if (t) setDraft({ ...draft, content: t.content, subject: draft.subject || t.subject || "" })
                                        }}>
                                            <SelectTrigger className="w-[200px] h-8 text-xs">
                                                <SelectValue placeholder="Load Template..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {templates.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <RichTextEditor
                                        content={draft.content}
                                        onChange={(html) => setDraft({ ...draft, content: html })}
                                    />

                                    {/* Attachments UI */}
                                    <div className="space-y-2 pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <Label className="flex items-center gap-2"><Paperclip className="w-4 h-4" /> Attachments</Label>
                                            <Label htmlFor="file-upload" className="cursor-pointer text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">
                                                + Add File
                                            </Label>
                                            <Input
                                                id="file-upload"
                                                type="file"
                                                multiple
                                                className="hidden"
                                                onChange={handleFileSelect}
                                            />
                                        </div>
                                        {draft.attachments.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {draft.attachments.map((file, idx) => (
                                                    <Badge key={idx} variant="secondary" className="gap-2 pl-2 pr-1 py-1">
                                                        <span className="truncate max-w-[150px]">{file.filename}</span>
                                                        <Trash2
                                                            className="w-3 h-3 cursor-pointer hover:text-red-400"
                                                            onClick={() => setDraft({
                                                                ...draft,
                                                                attachments: draft.attachments.filter((_, i) => i !== idx)
                                                            })}
                                                        />
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: REVIEW */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="grid gap-4 p-4 border border-white/10 rounded-lg bg-black/20">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Subject</Label>
                                            <p className="font-medium">{draft.subject}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Sender</Label>
                                            <p className="font-medium">
                                                {identities.find(i => i.id === draft.senderId)?.email || "Unknown"}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs">Recipient</Label>
                                            <p className="font-medium capitalize">{draft.recipientType} {draft.specificEmail && `(${draft.specificEmail})`}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-white/10 p-4 min-h-[200px] bg-white text-black prose max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: draft.content }} />
                                </div>

                                <div className="p-4 border border-white/10 rounded-lg bg-black/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Schedule for later</p>
                                            <p className="text-xs text-muted-foreground">Pick a date to send this campaign automatically.</p>
                                        </div>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !draft.scheduledAt && "text-muted-foreground"
                                                )}
                                            >
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {draft.scheduledAt ? format(draft.scheduledAt, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={draft.scheduledAt}
                                                onSelect={(date) => setDraft({ ...draft, scheduledAt: date })}
                                                initialFocus
                                                disabled={(date) => date < new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        )}

                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-white/10 pt-6">
                        {step > 1 ? (
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                        ) : (
                            <div /> // Spacer
                        )}

                        {step < 3 ? (
                            <Button onClick={handleNext}>Next Step <ArrowRight className="w-4 h-4 ml-2" /></Button>
                        ) : (
                            <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={handleSend} disabled={isSending}>
                                {isSending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : (draft.scheduledAt ? <Calendar className="w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />)}
                                {draft.scheduledAt ? "Schedule Campaign" : "Send Campaign"}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* --- SETTINGS TAB (Identities) --- */}
            <TabsContent value="settings">
                <Card className="bg-black/40 border-white/10">
                    <CardHeader>
                        <CardTitle>Sender Identities</CardTitle>
                        <CardDescription>Manage the email addresses you send from.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            {identities.map(identity => (
                                <div key={identity.id} className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-black/20">
                                    <div>
                                        <p className="font-medium">{identity.name}</p>
                                        <p className="text-sm text-muted-foreground">{identity.email}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {identity.verified ? (
                                            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Verified</Badge>
                                        ) : (
                                            <Badge variant="outline">Unverified</Badge>
                                        )}
                                        <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/20">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add new identity simple form (inline or dialog) */}
                        <div className="pt-4 border-t border-white/10">
                            <h4 className="text-sm font-medium mb-3">Add New Sender</h4>
                            <form action={async (formData) => {
                                await createSenderIdentity({ name: formData.get('name') as string, email: formData.get('email') as string })
                                toast({ title: "Identity Added", description: "Verify it in your Resend Dashboard." })
                                router.refresh()
                            }} className="flex gap-4">
                                <Input name="name" placeholder="Display Name (e.g. Angel)" className="flex-1" required />
                                <Input name="email" placeholder="email@domain.com" className="flex-1" required />
                                <Button type="submit">Add Sender</Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* --- CAMPAIGNS TAB --- */}
            <TabsContent value="campaigns">
                <Card className="bg-black/40 border-white/10">
                    <CardHeader><CardTitle>Past Campaigns</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {campaigns.length === 0 ? (
                                <p className="text-muted-foreground text-center py-8">No campaigns yet.</p>
                            ) : campaigns.map(c => (
                                <div key={c.id} className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-black/20 hover:bg-white/5 transition-colors">
                                    <div>
                                        <h4 className="font-bold">{c.name}</h4>
                                        <p className="text-xs text-muted-foreground">Sent on {c.createdAt ? format(new Date(c.createdAt), 'MMM d, yyyy') : 'Draft'}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-xl font-bold">{c.statsSent}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase">Sent</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-bold text-blue-400">{c.statsOpened}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase">Opened</p>
                                        </div>
                                        <Badge variant={c.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                                            {c.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* --- TEMPLATES TAB --- */}
            <TabsContent value="templates">
                <div className="grid grid-cols-3 gap-6">
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
                                <Button variant="secondary" className="w-full opacity-0 group-hover:opacity-100 transition-opacity">Edit Template</Button>
                            </CardFooter>
                        </Card>
                    ))}
                    <Card className="bg-black/20 border-white/10 border-dashed flex items-center justify-center min-h-[250px] hover:bg-black/30 cursor-pointer">
                        <div className="text-center">
                            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="font-medium">Create Template</p>
                        </div>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    )
}
