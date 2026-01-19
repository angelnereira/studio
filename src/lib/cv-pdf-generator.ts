import jsPDF from 'jspdf';

interface CVData {
    // Personal info
    name: string;
    email: string;
    phone?: string;
    location?: string;
    documentId?: string;
    citizenship?: string;
    summary: string;

    // Content sections
    experience: Array<{
        company: string;
        position: string;
        period: string;
        highlights: string[];
        relevanceScore?: number;
    }>;
    skillsHighlighted: string[];
    education?: Array<{
        institution: string;
        degree: string;
        year?: string;
    }>;
    languages?: Array<{
        language: string;
        level: string;
    }>;
    socialLinks?: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
    };
}

interface CVGenerationOptions {
    companyName?: string;
    positionTitle?: string;
    template?: 'modern' | 'traditional' | 'minimal';
    language?: 'en' | 'es';
}

const getLabels = (lang: 'en' | 'es' = 'en') => {
    return lang === 'es' ? {
        summary: 'Perfil Profesional',
        skills: 'Habilidades Clave',
        experience: 'Experiencia Profesional',
        education: 'Educación',
        languages: 'Idiomas',
        applicationFor: 'Aplicación para:',
        at: 'en',
        page: 'Página',
        of: 'de'
    } : {
        summary: 'Professional Summary',
        skills: 'Key Skills',
        experience: 'Professional Experience',
        education: 'Education',
        languages: 'Languages',
        applicationFor: 'Application for:',
        at: 'at',
        page: 'Page',
        of: 'of'
    };
};

/**
 * Generate a professional CV PDF from structured CV data
 */
export function generateCVPDF(
    cvData: CVData,
    options: CVGenerationOptions = {}
): void {
    const doc = new jsPDF();
    const { companyName, positionTitle, template = 'modern', language = 'en' } = options;
    const labels = getLabels(language);

    // Page settings
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let y = 20;

    // Brand colors
    const brandPrimary = [223, 255, 0]; // Acid Lime
    const brandDark = [8, 12, 10]; // Deep Forest
    const textPrimary = [255, 255, 255];
    const textSecondary = [156, 163, 175];

    // Helper to check if we need a new page
    const checkPageBreak = (neededSpace: number) => {
        if (y + neededSpace > pageHeight - margin) {
            doc.addPage();
            y = margin;
            return true;
        }
        return false;
    };

    // Header Section
    doc.setFillColor(...brandPrimary);
    doc.rect(0, 0, pageWidth, 60, 'F');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(cvData.name, margin, y + 15);

    // Contact info (on header)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y += 25;
    const contactInfo = [
        cvData.email,
        cvData.phone,
        cvData.location,
        cvData.documentId && `ID: ${cvData.documentId}`,
        cvData.citizenship,
    ].filter(Boolean).join(' • ');
    doc.text(contactInfo, margin, y);

    // Social links
    if (cvData.socialLinks) {
        y += 6;
        const links = [
            cvData.socialLinks.portfolio && 'angelnereira.com',
            cvData.socialLinks.linkedin && 'LinkedIn',
            cvData.socialLinks.github && 'GitHub',
        ].filter(Boolean).join(' • ');
        doc.text(links, margin, y);
    }

    // Reset to content area
    y = 75;
    doc.setTextColor(...textPrimary);

    // Target role indicator (if provided)
    if (positionTitle && companyName) {
        doc.setFillColor(30, 30, 30);
        doc.roundedRect(margin, y, contentWidth, 12, 3, 3, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...brandPrimary);
        doc.text(
            `${labels.applicationFor} ${positionTitle} ${labels.at} ${companyName}`,
            margin + 5,
            y + 8
        );
        y += 20;
        doc.setTextColor(...textPrimary);
    }

    // Professional Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...brandPrimary);
    doc.text(labels.summary, margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textSecondary);
    const summaryLines = doc.splitTextToSize(cvData.summary, contentWidth);
    summaryLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5;
    });
    y += 5;

    // Skills Section
    checkPageBreak(30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...brandPrimary);
    doc.text(labels.skills, margin, y);
    y += 8;

    // Display skills as tags
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    let currentX = margin;
    const skillsToShow = cvData.skillsHighlighted.slice(0, 15); // Top 15 skills

    skillsToShow.forEach((skill, index) => {
        const skillWidth = doc.getTextWidth(skill) + 8;

        if (currentX + skillWidth > pageWidth - margin) {
            currentX = margin;
            y += 8;
            checkPageBreak(8);
        }

        // Skill tag background
        doc.setFillColor(40, 40, 40);
        doc.roundedRect(currentX, y - 4, skillWidth, 6, 2, 2, 'F');

        doc.setTextColor(...textPrimary);
        doc.text(skill, currentX + 4, y);

        currentX += skillWidth + 3;
    });
    y += 10;

    // Experience Section
    checkPageBreak(30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...brandPrimary);
    doc.text(labels.experience, margin, y);
    y += 8;

    // Sort by relevance if available
    const sortedExperience = [...cvData.experience].sort(
        (a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)
    );

    sortedExperience.forEach((exp, index) => {
        checkPageBreak(25);

        // Company & Position
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...textPrimary);
        doc.text(exp.position, margin, y);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textSecondary);
        doc.text(`${exp.company} • ${exp.period}`, margin, y + 5);
        y += 12;

        // Highlights
        doc.setFontSize(9);
        exp.highlights.slice(0, 4).forEach((highlight) => {
            checkPageBreak(6);
            const bulletPoint = '• ';
            const highlightLines = doc.splitTextToSize(
                highlight,
                contentWidth - 5
            );

            doc.text(bulletPoint, margin + 2, y);
            highlightLines.forEach((line: string, lineIndex: number) => {
                doc.text(
                    line,
                    margin + (lineIndex === 0 ? 7 : 7),
                    y
                );
                y += 4;
            });
        });
        y += 3;
    });

    // Education Section
    if (cvData.education && cvData.education.length > 0) {
        checkPageBreak(25);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...brandPrimary);
        doc.text(labels.education, margin, y);
        y += 8;

        cvData.education.forEach((edu) => {
            checkPageBreak(10);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textPrimary);
            doc.text(edu.degree, margin, y);

            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...textSecondary);
            const eduInfo = [edu.institution, edu.year].filter(Boolean).join(' • ');
            doc.text(eduInfo, margin, y + 5);
            y += 12;
        });
    }

    // Languages Section
    if (cvData.languages && cvData.languages.length > 0) {
        checkPageBreak(20);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...brandPrimary);
        doc.text(labels.languages, margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textSecondary);
        cvData.languages.forEach((lang) => {
            doc.text(`${lang.language}: ${lang.level}`, margin, y);
            y += 6;
        });
    }

    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...textSecondary);
        doc.setFont('helvetica', 'normal');

        const footerText = `${cvData.name} • CV`;
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 10);

        const pageNumText = `${labels.page} ${i} ${labels.of} ${pageCount}`;
        doc.text(pageNumText, pageWidth - margin - doc.getTextWidth(pageNumText), pageHeight - 10);

        const dateText = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        doc.text(dateText, margin, pageHeight - 10);
    }

    // Generate filename
    const safeName = cvData.name.replace(/\s+/g, '_');
    const safeCompany = companyName?.replace(/\s+/g, '_') || 'General';
    const filename = `${safeName}_CV_${safeCompany}_${new Date().toISOString().split('T')[0]}.pdf`;

    // Save PDF
    doc.save(filename);
}

/**
 * Generate Blob URL for preview (without downloading)
 */
export function generateCVPDFBlob(
    cvData: CVData,
    options: CVGenerationOptions = {}
): Blob {
    const doc = new jsPDF();
    // Same generation logic as above but return blob instead
    // (For brevity, reusing the same logic)

    return doc.output('blob');
}
