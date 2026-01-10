"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { sendEmailAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Users, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {pending ? "Sending..." : "Send Campaign"}
        </Button>
    )
}

export function EmailForm() {
    const { toast } = useToast()
    const [recipientType, setRecipientType] = useState("individual")

    // Manual form handling wrapper to use toast
    const handleSubmit = async (formData: FormData) => {
        const result = await sendEmailAction({}, formData)

        if (result.success) {
            toast({ title: "Success", description: result.message })
            // Optional: reset form
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Compose Email</CardTitle>
                <CardDescription>Send updates to your leads or specific contacts.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-6">
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
                        <p className="text-xs text-muted-foreground">HTML is supported in simple tags, but keep it clean.</p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <SubmitButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
