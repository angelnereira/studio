import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyRequestPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            <Card className="w-full max-w-md bg-zinc-950/50 border-white/10 backdrop-blur-xl relative z-10">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-4 text-primary">
                        <Mail className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Check Your Email</CardTitle>
                    <CardDescription className="text-base">
                        We've sent you a secure magic link.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-zinc-400">
                            A sign-in link has been sent to your email address.
                        </p>
                        <p className="text-sm text-zinc-400">
                            Click the link in the email to access the admin panel.
                        </p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                        <p className="text-xs text-zinc-500 mb-3">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        <Link href="/admin/login">
                            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
