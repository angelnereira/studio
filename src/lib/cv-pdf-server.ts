import jsPDF from "jspdf";

// Server-side personalized CV generator used when we don't have a custom
// uploaded CVAsset to attach. Produces a one/two-page CV with EN or ES
// labels derived from `application.language`.

const ACID_LIME: [number, number, number] = [223, 255, 0];

interface CVExperienceItem {
    position?: string;
    company?: string;
    period?: string;
    highlights?: string[];
}

interface CVContent {
    summary?: string;
    skillsHighlighted?: string[];
    experience?: CVExperienceItem[];
}

interface ProfileLike {
    name: string;
    email: string;
    phone?: string | null;
    location?: string | null;
    summary: string;
}

interface VacancyLike {
    position?: string | null;
    company?: string | null;
}

const LABELS = {
    en: {
        applicationFor: (pos: string, company: string) => `Application for: ${pos} at ${company}`,
        summary: "Professional Summary",
        keySkills: "Key Skills",
        experience: "Professional Experience",
    },
    es: {
        applicationFor: (pos: string, company: string) => `Postulación: ${pos} en ${company}`,
        summary: "Resumen Profesional",
        keySkills: "Habilidades Clave",
        experience: "Experiencia Profesional",
    },
} as const;

export function buildPersonalizedCVPdf(args: {
    profile: ProfileLike;
    vacancy: VacancyLike;
    cvContent: CVContent;
    language: "en" | "es";
}): { buffer: Buffer; filename: string } {
    const { profile, vacancy, cvContent } = args;
    const L = LABELS[args.language] ?? LABELS.en;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let y = 20;

    // Header banner
    doc.setFillColor(...ACID_LIME);
    doc.rect(0, 0, pageWidth, 50, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(profile.name, margin, y + 12);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
        [profile.email, profile.phone, profile.location].filter(Boolean).join(" · "),
        margin,
        y + 22,
    );

    y = 60;
    doc.setTextColor(255, 255, 255);

    // Target position chip
    if (vacancy.position && vacancy.company) {
        doc.setFillColor(30, 30, 30);
        doc.roundedRect(margin, y, contentWidth, 12, 3, 3, "F");
        doc.setFontSize(9);
        doc.setTextColor(...ACID_LIME);
        doc.text(L.applicationFor(vacancy.position, vacancy.company), margin + 5, y + 8);
        y += 20;
    }

    // Summary
    const summary = cvContent.summary || profile.summary;
    if (summary) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...ACID_LIME);
        doc.text(L.summary, margin, y);
        y += 7;
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(180, 180, 180);
        const lines = doc.splitTextToSize(summary, contentWidth);
        lines.forEach((line: string) => {
            doc.text(line, margin, y);
            y += 4.5;
        });
        y += 5;
    }

    // Skills
    const skills = cvContent.skillsHighlighted ?? [];
    if (skills.length > 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...ACID_LIME);
        doc.text(L.keySkills, margin, y);
        y += 7;
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(255, 255, 255);
        doc.text(skills.slice(0, 15).join(" · "), margin, y);
        y += 10;
    }

    // Experience
    const experience = cvContent.experience ?? [];
    if (experience.length > 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...ACID_LIME);
        doc.text(L.experience, margin, y);
        y += 7;
        experience.slice(0, 5).forEach((exp) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text(String(exp.position ?? ""), margin, y);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(156, 163, 175);
            doc.text(`${exp.company ?? ""} · ${exp.period ?? ""}`, margin, y + 5);
            y += 12;
            const highlights = exp.highlights ?? [];
            highlights.slice(0, 3).forEach((h) => {
                const hLines = doc.splitTextToSize(`• ${h}`, contentWidth - 5);
                hLines.forEach((line: string) => {
                    doc.text(line, margin + 3, y);
                    y += 4;
                });
            });
            y += 3;
        });
    }

    const buffer = Buffer.from(doc.output("arraybuffer"));
    const safeName = profile.name.replace(/\s+/g, "_");
    const safeCompany = (vacancy.company ?? "General").replace(/\s+/g, "_");
    const filename = `${safeName}_CV_${safeCompany}_${args.language.toUpperCase()}.pdf`;

    return { buffer, filename };
}
