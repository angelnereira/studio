"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createSenderIdentity, deleteSenderIdentity } from "@/app/admin/(dashboard)/emails/marketing-actions"

interface Identity {
    id: string
    name: string
    email: string
    verified: boolean
}

export function SenderIdentitiesManager({ identities }: { identities: Identity[] }) {
    const { toast } = useToast()
    const router = useRouter()
    const [isAdding, setIsAdding] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sender Identities</CardTitle>
                <CardDescription>Email addresses used to send emails via Resend.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {identities.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">No sender identities configured yet.</p>
                    ) : identities.map(identity => (
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
                                <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/20" onClick={async () => {
                                    await deleteSenderIdentity(identity.id)
                                    toast({ title: "Deleted", description: "Sender identity removed." })
                                    router.refresh()
                                }}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium mb-3">Add New Sender</h4>
                    <form action={async (formData) => {
                        setIsAdding(true)
                        try {
                            await createSenderIdentity({
                                name: formData.get('name') as string,
                                email: formData.get('email') as string
                            })
                            toast({ title: "Identity Added", description: "Verify it in your Resend Dashboard." })
                            router.refresh()
                        } catch {
                            toast({ title: "Error", description: "Failed to add identity.", variant: "destructive" })
                        } finally {
                            setIsAdding(false)
                        }
                    }} className="flex gap-4">
                        <Input name="name" placeholder="Display Name (e.g. Angel)" className="flex-1" required />
                        <Input name="email" placeholder="email@domain.com" className="flex-1" required />
                        <Button type="submit" disabled={isAdding}>
                            {isAdding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            Add Sender
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}
