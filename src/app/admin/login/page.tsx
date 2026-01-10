
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Zap, Bell, Lock, Activity } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden font-sans selection:bg-primary/20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute w-full h-full bg-gradient-to-b from-black via-zinc-950/50 to-black pointer-events-none" />

            {/* Lock Screen Clock/Date (Optional vibe) */}
            <div className="absolute top-12 text-center z-10 opacity-50">
                <Lock className="w-6 h-6 mx-auto mb-2 text-zinc-500" />
                <p className="text-zinc-500 text-sm tracking-widest uppercase">System Locked</p>
            </div>

            <div className="z-10 w-full max-w-md space-y-6 px-4">

                {/* Censored Notifications / Teasers */}
                <div className="space-y-3 opacity-90">
                    <NotificationCard
                        icon={Bell}
                        title="New Lead Acquired"
                        time="12m ago"
                        message="New inquiry from Consult..."
                        censored
                    />
                    <NotificationCard
                        icon={Activity}
                        title="Traffic Spike Detected"
                        time="1h ago"
                        message="+12% increase in visit..."
                    />
                </div>

                {/* Main Login Card */}
                <Card className="bg-zinc-950/80 border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/50 blur-[20px]" />

                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 ring-1 ring-white/10">
                            <Zap className="w-6 h-6 text-primary filled-icon" />
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight text-white">Admin Access</CardTitle>
                        <CardDescription className="text-zinc-400">Authenticate to view full details</CardDescription>
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
                                <Label htmlFor="email" className="text-xs font-medium text-zinc-500 uppercase ml-1">Verified Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter authorization email"
                                    required
                                    className="bg-black/40 border-white/10 focus:border-primary/50 text-center h-11 transition-all focus:bg-black/60"
                                />
                            </div>
                            <Button type="submit" className="w-full text-black font-bold h-11 bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all">
                                Send Magic Link
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center border-t border-white/5 pt-4 bg-white/[0.01]">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">End-to-End Encrypted Session</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

function NotificationCard({ icon: Icon, title, time, message, censored = false }: { icon: any, title: string, time: string, message: string, censored?: boolean }) {
    return (
        <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md items-start group hover:bg-zinc-900/60 transition-colors cursor-default select-none">
            <div className="mt-1 p-2 bg-white/5 rounded-xl text-primary/80">
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-zinc-200">{title}</h4>
                    <span className="text-xs text-zinc-600 font-mono">{time}</span>
                </div>
                {censored ? (
                    <div className="space-y-1.5 mt-1">
                        <div className="h-2 w-3/4 bg-zinc-800 rounded-full animate-pulse" />
                        <div className="h-2 w-1/2 bg-zinc-800 rounded-full animate-pulse delay-75" />
                    </div>
                ) : (
                    <p className="text-xs text-zinc-400 leading-relaxed truncate">{message}</p>
                )}
            </div>
        </div>
    )
}
