import jsPDF from 'jspdf';

// Brand colors
const ACID_LIME: [number, number, number] = [223, 255, 0];
const DEEP_FOREST: [number, number, number] = [8, 12, 10];
const TEXT_PRIMARY: [number, number, number] = [240, 240, 240];
const TEXT_SECONDARY: [number, number, number] = [160, 168, 152];
const SURFACE: [number, number, number] = [18, 24, 20];
const SURFACE_2: [number, number, number] = [28, 36, 30];

const PAGE_W = 210; // A4 mm
const PAGE_H = 297; // A4 mm
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

interface ProfileContent {
    tagline: string;
    headline: string;
    intro: string;
    metricsLabel: string;
    metrics: Array<{ value: string; label: string }>;
    servicesTitle: string;
    services: Array<{ name: string; value: string }>;
    portfolioTitle: string;
    projects: Array<{
        name: string;
        label: string;
        description: string;
        roi: string;
        metric: string;
    }>;
    stackTitle: string;
    stackGroups: Array<{ label: string; items: string[] }>;
    ctaTitle: string;
    ctaBody: string;
    contact: Array<{ label: string; value: string }>;
    footerTagline: string;
    pageLabel: string;
    ofLabel: string;
    generatedLabel: string;
}

function getContent(lang: 'es' | 'en'): ProfileContent {
    if (lang === 'es') {
        return {
            tagline: 'PERFIL PROFESIONAL · REFERENCIA TÉCNICA',
            headline: 'Ángel Nereira',
            intro:
                'Ingeniero de Software Full Stack especializado en FinTech, GovTech y plataformas SaaS de alto rendimiento. ' +
                'Construyo sistemas que procesan miles de transacciones diarias protegiendo el flujo de caja de mis clientes, ' +
                'con arquitecturas offline-first y cumplimiento fiscal DGI. Mi trabajo se evalúa en términos de ROI, ' +
                'reducción de riesgo operativo y activos tecnológicos que escalan.',
            metricsLabel: 'MÉTRICAS EN PRODUCCIÓN',
            metrics: [
                { value: '10K+', label: 'Facturas\nelectrónicas' },
                { value: '99.9%', label: 'Uptime\ngarantizado' },
                { value: '<200ms', label: 'Latencia\npromedio API' },
                { value: '2', label: 'Plataformas\nen producción' },
            ],
            servicesTitle: 'PROPUESTA DE VALOR · SERVICIOS',
            services: [
                {
                    name: 'ERP & FinTech SaaS',
                    value:
                        'Sistemas de facturación electrónica DGI, POS táctil, nómina y gestión de inventario. ' +
                        'Elimina multas fiscales, reduce cierres contables y protege el flujo de caja.',
                },
                {
                    name: 'PWA Offline-First',
                    value:
                        'Aplicaciones que operan sin internet. Service Workers y sincronización inteligente ' +
                        'garantizan continuidad de ingresos en mercados con conectividad variable.',
                },
                {
                    name: 'E-commerce & Plataformas',
                    value:
                        'Migración e implementación de plataformas de comercio electrónico de alto rendimiento. ' +
                        'Optimización de conversión con TTI sub-3s y arquitectura escalable.',
                },
                {
                    name: 'Integración de IA',
                    value:
                        'Automatización de flujos de trabajo con LLMs (GPT-4, Claude, Gemini). ' +
                        'Reducción de costos operativos y toma de decisiones basada en datos.',
                },
                {
                    name: 'Consultoría Técnica',
                    value:
                        'Auditorías de arquitectura, optimización de performance y roadmaps tecnológicos. ' +
                        'Traduzco cada decisión técnica en su impacto directo sobre los ingresos.',
                },
            ],
            portfolioTitle: 'PORTAFOLIO · CASOS DE ÉXITO',
            projects: [
                {
                    name: 'Sago One',
                    label: 'ERP SaaS Todo-en-Uno · FinTech · Next.js 15',
                    description:
                        'Plataforma ERP empresarial que certifica facturas ante la DGI, gestiona inventario en ' +
                        'tiempo real y opera un POS táctil bajo arquitectura offline-first. Garantiza continuidad ' +
                        'operativa e ingresos ininterrumpidos incluso sin conexión a internet.',
                    roi:
                        'Elimina multas fiscales por errores de transcripción, reduce el tiempo de cierre contable ' +
                        'mensual y protege el flujo de caja durante interrupciones de red —el momento más crítico ' +
                        'para los ingresos de un negocio.',
                    metric: '10K+ facturas procesadas · AES-256 · 99.9% uptime',
                },
                {
                    name: 'Plenty Market',
                    label: 'E-commerce Internacional · PWA · Logística Compleja',
                    description:
                        'Migración de infraestructura estática a plataforma e-commerce de alto rendimiento con ' +
                        'Partner Program logístico, zonas libres de impuestos y sincronización de inventario ' +
                        'en tiempo real.',
                    roi:
                        'Cada segundo de latencia reducido representa un 7% más de conversión. Con TTI bajo 3s ' +
                        'y caché estratégico, la plataforma convierte más visitantes en compradores y reduce ' +
                        'el abandono de carrito en fases críticas del funnel.',
                    metric: 'TTI <3s · 60% reducción en carga de imágenes · Partner Program activo',
                },
            ],
            stackTitle: 'STACK TECNOLÓGICO',
            stackGroups: [
                { label: 'Frontend & Mobile', items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PWA / Service Workers'] },
                { label: 'Backend & APIs', items: ['Node.js', 'tRPC', 'REST APIs', 'Prisma ORM', 'Zod'] },
                { label: 'Data & Infrastructure', items: ['PostgreSQL', 'Neon Serverless', 'Redis', 'Vercel Edge', 'Docker'] },
                { label: 'Integraciones', items: ['DGI / PAC (FinTech)', 'Stripe', 'Cloudinary', 'LLM APIs', 'Resend'] },
            ],
            ctaTitle: '¿LISTO PARA EL SIGUIENTE NIVEL?',
            ctaBody:
                'Disponible para proyectos de consultoría técnica, desarrollo de plataformas SaaS y colaboraciones ' +
                'estratégicas. Trabajo con clientes que entienden que el software bien construido es un activo ' +
                'de capital, no un gasto operativo.',
            contact: [
                { label: 'Web', value: 'angelnereira.com' },
                { label: 'Email', value: 'angel@angelnereira.com' },
                { label: 'LinkedIn', value: 'linkedin.com/in/angelnereira' },
                { label: 'GitHub', value: 'github.com/angelnereira' },
            ],
            footerTagline: 'Ángel Nereira · Perfil Profesional',
            pageLabel: 'Pág.',
            ofLabel: 'de',
            generatedLabel: 'Generado el',
        };
    }

    return {
        tagline: 'PROFESSIONAL PROFILE · TECHNICAL REFERENCE',
        headline: 'Ángel Nereira',
        intro:
            'Full Stack Software Engineer specialized in FinTech, GovTech, and high-performance SaaS platforms. ' +
            'I build systems that process thousands of daily transactions, protecting my clients\' cash flow, ' +
            'with offline-first architectures and government fiscal compliance. My work is measured in ROI, ' +
            'operational risk reduction, and scalable technology assets.',
        metricsLabel: 'PRODUCTION METRICS',
        metrics: [
            { value: '10K+', label: 'Electronic\nInvoices' },
            { value: '99.9%', label: 'Guaranteed\nUptime' },
            { value: '<200ms', label: 'Average\nAPI Latency' },
            { value: '2', label: 'Platforms\nin Production' },
        ],
        servicesTitle: 'VALUE PROPOSITION · SERVICES',
        services: [
            {
                name: 'ERP & FinTech SaaS',
                value:
                    'Electronic invoicing systems, touchscreen POS, payroll, and inventory management. ' +
                    'Eliminates tax penalties, reduces accounting closes, and protects cash flow.',
            },
            {
                name: 'Offline-First PWA',
                value:
                    'Applications that operate without internet. Service Workers and intelligent sync ' +
                    'guarantee revenue continuity in markets with variable connectivity.',
            },
            {
                name: 'E-commerce & Platforms',
                value:
                    'Migration and implementation of high-performance e-commerce platforms. ' +
                    'Conversion optimization with sub-3s TTI and scalable architecture.',
            },
            {
                name: 'AI Integration',
                value:
                    'Workflow automation with LLMs (GPT-4, Claude, Gemini). ' +
                    'Operational cost reduction and data-driven decision making.',
            },
            {
                name: 'Technical Consulting',
                value:
                    'Architecture audits, performance optimization, and technology roadmaps. ' +
                    'I translate every technical decision into its direct impact on revenue.',
            },
        ],
        portfolioTitle: 'PORTFOLIO · CASE STUDIES',
        projects: [
            {
                name: 'Sago One',
                label: 'All-in-One ERP SaaS · FinTech · Next.js 15',
                description:
                    'Enterprise ERP platform that certifies invoices to the DGI (Tax Authority), manages real-time ' +
                    'inventory, and operates a touchscreen POS under an offline-first architecture. Guarantees ' +
                    'operational continuity and uninterrupted revenue even without internet.',
                roi:
                    'Eliminates tax penalties from transcription errors, reduces monthly accounting close time, ' +
                    'and protects cash flow during network outages—the most critical moment for a business\'s revenue.',
                metric: '10K+ invoices processed · AES-256 · 99.9% uptime',
            },
            {
                name: 'Plenty Market',
                label: 'International E-commerce · PWA · Complex Logistics',
                description:
                    'Migration from static infrastructure to high-performance e-commerce platform with a logistics ' +
                    'Partner Program, tax-free zones, and real-time inventory synchronization.',
                roi:
                    'Every reduced second of latency represents 7% more conversion. With TTI under 3s and strategic ' +
                    'caching, the platform converts more visitors into buyers and reduces cart abandonment at ' +
                    'critical funnel stages.',
                metric: 'TTI <3s · 60% image load reduction · Active Partner Program',
            },
        ],
        stackTitle: 'TECHNOLOGY STACK',
        stackGroups: [
            { label: 'Frontend & Mobile', items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PWA / Service Workers'] },
            { label: 'Backend & APIs', items: ['Node.js', 'tRPC', 'REST APIs', 'Prisma ORM', 'Zod'] },
            { label: 'Data & Infrastructure', items: ['PostgreSQL', 'Neon Serverless', 'Redis', 'Vercel Edge', 'Docker'] },
            { label: 'Integrations', items: ['DGI / PAC (FinTech)', 'Stripe', 'Cloudinary', 'LLM APIs', 'Resend'] },
        ],
        ctaTitle: 'READY FOR THE NEXT LEVEL?',
        ctaBody:
            'Available for technical consulting projects, SaaS platform development, and strategic collaborations. ' +
            'I work with clients who understand that well-built software is a capital asset, not an operating expense.',
        contact: [
            { label: 'Web', value: 'angelnereira.com' },
            { label: 'Email', value: 'angel@angelnereira.com' },
            { label: 'LinkedIn', value: 'linkedin.com/in/angelnereira' },
            { label: 'GitHub', value: 'github.com/angelnereira' },
        ],
        footerTagline: 'Ángel Nereira · Professional Profile',
        pageLabel: 'Page',
        ofLabel: 'of',
        generatedLabel: 'Generated on',
    };
}

/**
 * Generate a professional Profile PDF buffer for server-side use.
 * NOT a traditional CV — this is a reference document for investors, clients, and partners.
 */
export function generateProfileBuffer(lang: 'es' | 'en'): Buffer {
    const content = getContent(lang);
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    let y = 0;

    // ─────────────────────────────────────────
    // Helpers
    // ─────────────────────────────────────────
    const checkPageBreak = (needed: number): void => {
        if (y + needed > PAGE_H - MARGIN - 12) {
            doc.addPage();
            y = MARGIN;
        }
    };

    const drawHRule = (color: [number, number, number] = SURFACE_2): void => {
        doc.setDrawColor(...color);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, y, PAGE_W - MARGIN, y);
        y += 4;
    };

    const sectionTitle = (text: string): void => {
        checkPageBreak(14);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...ACID_LIME);
        doc.text(text, MARGIN, y);
        y += 3;
        doc.setDrawColor(...ACID_LIME);
        doc.setLineWidth(0.4);
        doc.line(MARGIN, y, PAGE_W - MARGIN, y);
        y += 6;
    };

    // ─────────────────────────────────────────
    // PAGE 1 — Cover / Hero
    // ─────────────────────────────────────────

    // Full-bleed dark background
    doc.setFillColor(...DEEP_FOREST);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

    // Acid Lime top bar
    doc.setFillColor(...ACID_LIME);
    doc.rect(0, 0, PAGE_W, 3, 'F');

    // Left accent stripe
    doc.setFillColor(...ACID_LIME);
    doc.rect(0, 3, 3, 60, 'F');

    // Tagline
    y = 16;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXT_SECONDARY);
    doc.text(content.tagline, MARGIN + 6, y);
    y += 10;

    // Name / Headline
    doc.setFontSize(34);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXT_PRIMARY);
    doc.text(content.headline, MARGIN + 6, y);
    y += 8;

    // Subtitle line
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...ACID_LIME);
    const subtitle = lang === 'es'
        ? 'Ingeniero de Software Full Stack  ·  FinTech & SaaS  ·  Panama'
        : 'Full Stack Software Engineer  ·  FinTech & SaaS  ·  Panama';
    doc.text(subtitle, MARGIN + 6, y);
    y += 14;

    // Divider
    doc.setDrawColor(...SURFACE_2);
    doc.setLineWidth(0.3);
    doc.line(MARGIN + 6, y, PAGE_W - MARGIN, y);
    y += 8;

    // Intro paragraph
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT_SECONDARY);
    const introLines = doc.splitTextToSize(content.intro, CONTENT_W - 6);
    introLines.forEach((line: string) => {
        doc.text(line, MARGIN + 6, y);
        y += 5.2;
    });

    y += 10;

    // ── Metrics bar ───────────────────────────
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ACID_LIME);
    doc.text(content.metricsLabel, MARGIN + 6, y);
    y += 6;

    const metricBoxW = (CONTENT_W - 6) / content.metrics.length;
    content.metrics.forEach((m, i) => {
        const bx = MARGIN + 6 + i * metricBoxW;
        const by = y;

        doc.setFillColor(...SURFACE_2);
        doc.roundedRect(bx, by, metricBoxW - 3, 22, 2, 2, 'F');

        // Value
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...ACID_LIME);
        doc.text(m.value, bx + (metricBoxW - 3) / 2, by + 9, { align: 'center' });

        // Label (multi-line)
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        const labelParts = m.label.split('\n');
        labelParts.forEach((part, li) => {
            doc.text(part, bx + (metricBoxW - 3) / 2, by + 14 + li * 4, { align: 'center' });
        });
    });
    y += 30;

    // ── Services preview ──────────────────────
    sectionTitle(content.servicesTitle);

    content.services.forEach((svc) => {
        checkPageBreak(18);

        // Service name
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...TEXT_PRIMARY);
        doc.text(`• ${svc.name}`, MARGIN, y);
        y += 5;

        // Value text
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        const valueLines = doc.splitTextToSize(svc.value, CONTENT_W - 6);
        valueLines.forEach((line: string) => {
            doc.text(line, MARGIN + 4, y);
            y += 4.5;
        });
        y += 2;
    });

    // ─────────────────────────────────────────
    // PAGE 2 — Portfolio
    // ─────────────────────────────────────────
    doc.addPage();

    // Dark background
    doc.setFillColor(...DEEP_FOREST);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

    // Acid Lime top bar
    doc.setFillColor(...ACID_LIME);
    doc.rect(0, 0, PAGE_W, 3, 'F');

    y = MARGIN;

    sectionTitle(content.portfolioTitle);

    content.projects.forEach((proj, pi) => {
        checkPageBreak(55);

        // Project header box
        doc.setFillColor(...SURFACE_2);
        doc.roundedRect(MARGIN, y, CONTENT_W, 14, 3, 3, 'F');

        // Accent left border
        doc.setFillColor(...ACID_LIME);
        doc.roundedRect(MARGIN, y, 3, 14, 1.5, 1.5, 'F');

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...ACID_LIME);
        doc.text(proj.name, MARGIN + 7, y + 6);

        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        doc.text(proj.label, MARGIN + 7, y + 11);

        y += 18;

        // Description
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_PRIMARY);
        const descLines = doc.splitTextToSize(proj.description, CONTENT_W);
        descLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, MARGIN, y);
            y += 4.8;
        });
        y += 3;

        // ROI block
        const roiLabel = lang === 'es' ? 'IMPACTO DE NEGOCIO / ROI' : 'BUSINESS IMPACT / ROI';
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...ACID_LIME);
        doc.text(roiLabel, MARGIN, y);
        y += 4;

        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        const roiLines = doc.splitTextToSize(proj.roi, CONTENT_W - 4);
        roiLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, MARGIN + 2, y);
            y += 4.5;
        });
        y += 3;

        // Metric tag
        doc.setFillColor(...SURFACE);
        const metricTagW = doc.getTextWidth(proj.metric) + 10;
        doc.roundedRect(MARGIN, y, metricTagW, 6, 2, 2, 'F');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...ACID_LIME);
        doc.text(proj.metric, MARGIN + 5, y + 4);
        y += 12;

        if (pi < content.projects.length - 1) {
            drawHRule();
            y += 2;
        }
    });

    y += 8;

    // ── Tech Stack ────────────────────────────
    checkPageBreak(60);
    sectionTitle(content.stackTitle);

    const colW = CONTENT_W / 2;
    const stackStart = y;

    content.stackGroups.forEach((group, gi) => {
        const col = gi % 2;
        const row = Math.floor(gi / 2);
        const gx = MARGIN + col * colW;
        const gy = stackStart + row * 40;

        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...TEXT_PRIMARY);
        doc.text(group.label, gx, gy);

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);

        // Render as wrapping tags
        let tx = gx;
        let ty = gy + 5;
        group.items.forEach((item) => {
            const tagW = doc.getTextWidth(item) + 6;
            if (tx + tagW > gx + colW - 4) {
                tx = gx;
                ty += 7;
            }
            doc.setFillColor(...SURFACE_2);
            doc.roundedRect(tx, ty - 4, tagW, 5.5, 1.5, 1.5, 'F');
            doc.setTextColor(...TEXT_PRIMARY);
            doc.text(item, tx + 3, ty);
            tx += tagW + 2;
        });
    });

    y = stackStart + Math.ceil(content.stackGroups.length / 2) * 40 + 4;

    y += 8;

    // ── CTA block ─────────────────────────────
    checkPageBreak(50);

    doc.setFillColor(...SURFACE_2);
    doc.roundedRect(MARGIN, y, CONTENT_W, 48, 4, 4, 'F');

    // Lime accent top border inside
    doc.setFillColor(...ACID_LIME);
    doc.rect(MARGIN, y, CONTENT_W, 2, 'F');

    const ctaInnerX = MARGIN + 8;
    const ctaInnerW = CONTENT_W - 16;
    let cy = y + 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ACID_LIME);
    doc.text(content.ctaTitle, ctaInnerX, cy);
    cy += 7;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT_SECONDARY);
    const ctaLines = doc.splitTextToSize(content.ctaBody, ctaInnerW);
    ctaLines.forEach((line: string) => {
        doc.text(line, ctaInnerX, cy);
        cy += 5;
    });

    cy += 4;

    // Contact row
    const contactSpacing = ctaInnerW / content.contact.length;
    content.contact.forEach((c, i) => {
        const cx = ctaInnerX + i * contactSpacing;
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...ACID_LIME);
        doc.text(c.label, cx, cy);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        doc.text(c.value, cx, cy + 4);
    });

    y += 52;

    // ─────────────────────────────────────────
    // Footer on all pages
    // ─────────────────────────────────────────
    const pageCount = doc.getNumberOfPages();
    const dateStr = new Date().toLocaleDateString(lang === 'es' ? 'es-PA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        // Footer bar
        doc.setFillColor(...SURFACE_2);
        doc.rect(0, PAGE_H - 12, PAGE_W, 12, 'F');

        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);

        // Left: tagline
        doc.text(content.footerTagline, MARGIN, PAGE_H - 5);

        // Center: generated date
        const genText = `${content.generatedLabel} ${dateStr}`;
        doc.text(genText, PAGE_W / 2, PAGE_H - 5, { align: 'center' });

        // Right: page number
        const pageNumText = `${content.pageLabel} ${i} ${content.ofLabel} ${pageCount}`;
        doc.text(pageNumText, PAGE_W - MARGIN, PAGE_H - 5, { align: 'right' });

        // Bottom lime accent
        doc.setFillColor(...ACID_LIME);
        doc.rect(0, PAGE_H - 1.5, PAGE_W, 1.5, 'F');
    }

    const arrayBuffer = doc.output('arraybuffer');
    return Buffer.from(arrayBuffer);
}
