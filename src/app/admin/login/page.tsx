
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Zap } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            <Card className="w-full max-w-md bg-zinc-950/50 border-white/10 backdrop-blur-xl relative z-10">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 text-primary">
                        <Zap className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">System Access</CardTitle>
                    <CardDescription>Enter your verified email to receive a magic link.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={async (formData) => {
                            "use server"
                            await signIn("resend", formData)
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@angelnereira.com"
                                required
                                className="bg-black/50 border-white/10 focus:border-primary/50"
                            />
                        </div>
                        <Button type="submit" className="w-full text-black font-bold">
                            Send Access Link
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-xs text-muted-foreground">Secure Restricted Area. IPs are logged.</p>
                </CardFooter>
            </Card>
        </div>
    )
}
