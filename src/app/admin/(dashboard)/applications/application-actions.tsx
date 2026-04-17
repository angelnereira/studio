"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Send, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendApplication } from "./actions";

interface CVExperience {
    position?: string;
    company?: string;
    period?: string;
    highlights?: string[];
}

interface CVContentShape {
    summary?: string;
    skillsHighlighted?: string[];
    experience?: CVExperience[];
}

interface ApplicationActionsProps {
    applicationId: string;
    status: string;
    cvPdfUrl: string | null;
    cvContent: CVContentShape | null;
    profileName: string;
    profileEmail: string;
    profilePhone: string | null;
    profileLocation: string | null;
    vacancyCompany: string | null;
    vacancyPosition: string | null;
}

export function ApplicationActions({
    applicationId,
    status,
    cvPdfUrl,
    cvContent,
    profileName,
    profileEmail,
    profilePhone,
    profileLocation,
    vacancyCompany,
    vacancyPosition,
}: ApplicationActionsProps) {
    const [isSending, startSendTransition] = useTransition();
    const [isDownloading, setIsDownloading] = useState(false);
    const { toast } = useToast();

    async function handleDownloadCV() {
        if (cvPdfUrl) {
            window.open(cvPdfUrl, "_blank", "noopener,noreferrer");
            return;
        }

        if (!cvContent) {
            toast({ title: "No CV content available to export.", variant: "destructive" });
            return;
        }

        setIsDownloading(true);
        try {
            const { default: jsPDF } = await import("jspdf");
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 20;
            const contentWidth = pageWidth - 2 * margin;
            let y = 20;

            doc.setFillColor(223, 255, 0);
            doc.rect(0, 0, pageWidth, 50, "F");
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(24);
            doc.setFont("helvetica", "bold");
            doc.text(profileName, margin, y + 12);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(
                [profileEmail, profilePhone, profileLocation].filter(Boolean).join(" · "),
                margin,
                y + 22,
            );

            y = 60;

            if (vacancyPosition && vacancyCompany) {
                doc.setFillColor(30, 30, 30);
                doc.roundedRect(margin, y, contentWidth, 12, 3, 3, "F");
                doc.setFontSize(9);
                doc.setTextColor(223, 255, 0);
                doc.text(
                    `Application for: ${vacancyPosition} at ${vacancyCompany}`,
                    margin + 5,
                    y + 8,
                );
                y += 20;
            }

            if (cvContent.summary) {
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(20, 20, 20);
                doc.text("Professional Summary", margin, y);
                y += 7;
                doc.setFontSize(9);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(cvContent.summary, contentWidth);
                lines.forEach((line: string) => {
                    doc.text(line, margin, y);
                    y += 4.5;
                });
                y += 5;
            }

            if (cvContent.skillsHighlighted?.length) {
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(20, 20, 20);
                doc.text("Key Skills", margin, y);
                y += 7;
                doc.setFontSize(9);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(40, 40, 40);
                doc.text(cvContent.skillsHighlighted.slice(0, 15).join(" · "), margin, y);
                y += 10;
            }

            if (cvContent.experience?.length) {
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(20, 20, 20);
                doc.text("Professional Experience", margin, y);
                y += 7;
                cvContent.experience.slice(0, 5).forEach((exp) => {
                    if (y > 270) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(20, 20, 20);
                    doc.text(String(exp.position || ""), margin, y);
                    doc.setFontSize(9);
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(90, 90, 90);
                    doc.text(`${exp.company || ""} · ${exp.period || ""}`, margin, y + 5);
                    y += 12;
                    (exp.highlights || []).slice(0, 3).forEach((h) => {
                        const hLines = doc.splitTextToSize(`• ${h}`, contentWidth - 5);
                        hLines.forEach((line: string) => {
                            doc.text(line, margin + 3, y);
                            y += 4;
                        });
                    });
                    y += 3;
                });
            }

            const safeName = profileName.replace(/\s+/g, "_");
            const safeCompany = (vacancyCompany || "General").replace(/\s+/g, "_");
            doc.save(`${safeName}_CV_${safeCompany}.pdf`);
            toast({ title: "CV downloaded" });
        } catch (error) {
            console.error("Download CV failed:", error);
            toast({ title: "Could not generate PDF", variant: "destructive" });
        } finally {
            setIsDownloading(false);
        }
    }

    function handleSend() {
        startSendTransition(async () => {
            const result = await sendApplication(applicationId);
            if (result.success) {
                toast({ title: result.message });
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        });
    }

    return (
        <div className="flex gap-3 flex-wrap">
            <Button
                variant="outline"
                className="gap-2"
                onClick={handleDownloadCV}
                disabled={isDownloading}
            >
                {isDownloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Download className="h-4 w-4" />
                )}
                Download CV
            </Button>

            {status === "ready" && (
                <Button className="gap-2" onClick={handleSend} disabled={isSending}>
                    {isSending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                    {isSending ? "Sending..." : "Send Application"}
                </Button>
            )}

            {cvPdfUrl && (
                <Button variant="ghost" className="gap-2" asChild>
                    <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        View PDF
                    </a>
                </Button>
            )}
        </div>
    );
}
