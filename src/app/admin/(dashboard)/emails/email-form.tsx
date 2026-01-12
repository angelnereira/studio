"use client"

import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { sendEmailAction, sendTemplateEmailAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Users, Loader2, Sparkles, FileJson } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WelcomeEmail, ServiceInquiryEmail, NewsletterEmail, ProjectCompleteEmail } from "@/emails/index"

function SubmitButton({ label = "Send Email" }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {pending ? "Sending..." : label}
        </Button>
    )
}

const TEMPLATES = [
    { id: "welcome", name: "Welcome Email", fields: ["name", "previewText"] },
    { id: "proposal", name: "Project Proposal", fields: ["clientName", "projectName", "projectUrl", "previewText"] }, // Maps to ProjectComplete or custom
    { id: "service-inquiry", name: "Service Inquiry Reply", fields: ["clientName", "serviceName", "packageName", "previewText"] },
    { id: "newsletter", name: "Newsletter", fields: ["subscriberName", "edition", "headline", "introText"] },
]

export function EmailForm() {
    const { toast } = useToast()
    const [mode, setMode] = useState("manual")
    const [recipientType, setRecipientType] = useState("individual")

    // Template State
    const [selectedTemplate, setSelectedTemplate] = useState("welcome")
    const [templateData, setTemplateData] = useState<any>({ name: "", previewText: "Welcome to our platform!" })
    const [jsonInput, setJsonInput] = useState("")

    // Manual form handling wrapper to use toast
    const handleSubmitManual = async (formData: FormData) => {
        const result = await sendEmailAction({}, formData)
        if (result.success) {
            toast({ title: "Success", description: result.message })
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" })
        }
    }

    const handleSubmitTemplate = async (formData: FormData) => {
        // Append json data
        formData.append("templateId", selectedTemplate)
        formData.append("templateData", JSON.stringify(templateData))

        const result = await sendTemplateEmailAction({}, formData)

        if (result.success) {
            toast({ title: "Success", description: result.message })
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" })
        }
    }

    const handleJsonFill = () => {
        try {
            const parsed = JSON.parse(jsonInput)
            setTemplateData({ ...templateData, ...parsed })
            toast({ title: "Auto-filled!", description: "Form fields updated from JSON." })
        } catch (e) {
            toast({ title: "Invalid JSON", description: "Please check your JSON syntax.", variant: "destructive" })
        }
    }

    const updateField = (key: string, value: string) => {
        setTemplateData((prev: any) => ({ ...prev, [key]: value }))
    }

    const currentTemplateFields = TEMPLATES.find(t => t.id === selectedTemplate)?.fields || []

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Email Studio</CardTitle>
                <CardDescription>Compose manually or generate from professional templates.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="manual" onValueChange={setMode} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="manual">Manual Compose</TabsTrigger>
                        <TabsTrigger value="generator">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Template Generator
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="manual">
                        <form action={handleSubmitManual} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Recipient Audience</Label>
                                    <Select name="recipientType" value={recipientType} onValueChange={setRecipientType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="individual">Individual Email</SelectItem>
                                            <SelectItem value="all">All Leads (Broadcast)</SelectItem>
                                            <SelectItem value="clients">Clients Only</SelectItem>
                                            <SelectItem value="employers">Employers/Jobs Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {recipientType === "individual" && (
                                    <div className="space-y-2">
                                        <Label>To (Email Address)</Label>
                                        <Input name="specificEmail" type="email" placeholder="client@example.com" required />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Subject Line</Label>
                                <Input name="subject" placeholder="Important Update regarding your project..." required />
                            </div>

                            <div className="space-y-2">
                                <Label>Message Body</Label>
                                <Textarea
                                    name="message"
                                    placeholder="Type your message here..."
                                    className="min-h-[200px] font-sans"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">HTML is supported in simple tags.</p>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <SubmitButton label="Send Manual Email" />
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="generator" className="space-y-6">
                        <form action={handleSubmitTemplate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Col: Configuration */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Recipient (Individual)</Label>
                                        <Input name="specificEmail" type="email" placeholder="client@example.com" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Select Template</Label>
                                        <Select name="templateId" value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TEMPLATES.map(t => (
                                                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <FileJson className="w-4 h-4" />
                                            Auto-fill via JSON
                                        </Label>
                                        <div className="flex gap-2">
                                            <Textarea
                                                value={jsonInput}
                                                onChange={(e) => setJsonInput(e.target.value)}
                                                placeholder='{"name": "Angel", "previewText": "Hello"}'
                                                className="font-mono text-xs h-20"
                                            />
                                            <Button type="button" variant="secondary" onClick={handleJsonFill} className="h-20">Fill</Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4 border rounded-md p-4 bg-white/5">
                                        <Label className="text-xs uppercase text-muted-foreground">Template Fields</Label>
                                        {currentTemplateFields.map(field => (
                                            <div key={field} className="space-y-1">
                                                <Label className="text-xs capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                                <Input
                                                    value={templateData[field] || ""}
                                                    onChange={(e) => updateField(field, e.target.value)}
                                                    placeholder={`Enter ${field}...`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Col: Live Preview */}
                                <div className="space-y-2">
                                    <Label>Live Preview</Label>
                                    <Card className="h-full bg-zinc-900 border-white/10 min-h-[500px] overflow-hidden flex flex-col">
                                        <div className="bg-zinc-800 p-2 border-b border-white/10 flex justify-end">
                                            <Label className="text-xs text-muted-foreground mr-2">Rendering: {TEMPLATES.find(t => t.id === selectedTemplate)?.name}</Label>
                                        </div>
                                        <ScrollArea className="flex-1 bg-white h-full relative">
                                            <div className="min-h-full w-full bg-white text-black p-0">
                                                {/* Render selected template with current data */}
                                                <div className="origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 w-full h-full transform-gpu transition-all p-4 flex justify-center">
                                                    <div className="shadow-2xl">
                                                        {selectedTemplate === "welcome" && <WelcomeEmail {...templateData} />}
                                                        {selectedTemplate === "newsletter" && <NewsletterEmail {...templateData} />}
                                                        {selectedTemplate === "service-inquiry" && <ServiceInquiryEmail {...templateData} />}
                                                        {selectedTemplate === "proposal" && <ProjectCompleteEmail {...templateData} />}
                                                        {!selectedTemplate && <div className="p-8 text-center text-gray-500">Select a template to preview</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </ScrollArea>
                                    </Card>
                                    <div className="text-xs text-muted-foreground text-center pt-2">
                                        Preview is scaled to fit. Actual email will be responsive.
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <SubmitButton label="Generate & Send Email" />
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
