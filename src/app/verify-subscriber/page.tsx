"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { confirmVerification } from "@/app/blog/actions"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

function VerifyContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

    useEffect(() => {
        if (!token) {
            setStatus('error')
            return
        }

        confirmVerification(token)
            .then(res => {
                if (res.success) setStatus('success')
                else setStatus('error')
            })
            .catch(() => setStatus('error'))
    }, [token])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-2xl">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <h2 className="text-xl font-bold">Verificando...</h2>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">¡Email Verificado!</h2>
                        <p className="text-muted-foreground mb-8">
                            Ya puedes publicar tus comentarios en el blog.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/blog">Volver al Blog</Link>
                        </Button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                            <XCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Error de Verificación</h2>
                        <p className="text-muted-foreground mb-8">
                            El enlace no es válido o ha expirado.
                        </p>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/blog">Volver al Blog</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function VerifySubscriberPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <VerifyContent />
        </Suspense>
    )
}
