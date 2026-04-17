"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function VerifyRequestClient() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", duration: 0.8 }}
                className="w-full max-w-md z-10 px-4"
            >
                <Card className="w-full bg-zinc-950/80 border-white/10 backdrop-blur-2xl relative shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/50 blur-[20px] group-hover:bg-primary/80 transition-all duration-700" />

                    <CardHeader className="text-center">
                        <motion.div
                            className="mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 text-primary ring-1 ring-white/10"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring", damping: 12 }}
                        >
                            <Mail className="w-8 h-8" />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold tracking-tight text-white">Check Your Email</CardTitle>
                        <CardDescription className="text-base text-zinc-400">
                            We&apos;ve sent you a secure magic link.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <motion.div
                            className="bg-zinc-900/50 border border-white/10 rounded-lg p-4 space-y-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="text-sm text-zinc-300">
                                A sign-in link has been sent to your email address.
                            </p>
                            <p className="text-sm text-zinc-400">
                                Click the link in the email to access the admin panel.
                            </p>
                        </motion.div>

                        <motion.div
                            className="border-t border-white/10 pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-xs text-zinc-500 mb-3 text-center">
                                Didn&apos;t receive the email? Check your spam folder or try again.
                            </p>
                            <Link href="/admin/login" className="block w-full">
                                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Login
                                </Button>
                            </Link>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
