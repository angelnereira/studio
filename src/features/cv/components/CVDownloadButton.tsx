"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { FileText, Loader2, Check, AlertCircle } from "lucide-react";

export function CVDownloadButton({ className, variant = "outline", compact = false }: { className?: string; variant?: "default" | "outline" | "ghost" | "secondary"; compact?: boolean }) {
    const t = useTranslations("cv.download");
    const language = useLocale();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleDownload = async () => {
        setStatus("loading");
        setErrorMsg("");

        try {
            const response = await fetch(`/api/cv/download?lang=${language}`);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(t('error.ratelimit'));
                }
                throw new Error(t('error.generic'));
            }

            // Convert response to blob
            const blob = await response.blob();

            // Create a link element
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Angel_Nereira_CV_${language.toUpperCase()}_2026.pdf`;

            // Append, click, and cleanup
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setStatus("success");

            // Reset back to idle after 3s
            setTimeout(() => {
                setStatus("idle");
            }, 3000);

        } catch (error: any) {
            console.error("CV download error:", error);
            setStatus("error");
            setErrorMsg(error.message || t('error.generic'));

            // Reset after 4s
            setTimeout(() => {
                setStatus("idle");
                setErrorMsg("");
            }, 4000);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Button
                onClick={handleDownload}
                disabled={status === "loading" || status === "success"}
                variant={variant}
                className={className}
                size={compact ? "sm" : "default"}
            >
                {status === "idle" && (
                    <>
                        <FileText className="mr-2 h-4 w-4" />
                        {!compact && t('button.label')}
                        {compact && <span className="sr-only">{t('button.label')}</span>}
                    </>
                )}

                {status === "loading" && (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {!compact && t('button.loading')}
                    </>
                )}

                {status === "success" && (
                    <>
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        {!compact && <span className="text-green-500">{t('button.success')}</span>}
                    </>
                )}

                {status === "error" && (
                    <>
                        <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                        {!compact && <span className="text-red-500">Error</span>}
                    </>
                )}
            </Button>

            {status === "error" && !compact && (
                <span className="text-xs text-red-500 mt-2 absolute -bottom-6">
                    {errorMsg}
                </span>
            )}
        </div>
    );
}
