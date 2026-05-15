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
    experienceTitle: string;
    experience: Array<{
        role: string;
        company: string;
        period: string;
        location?: string;
        highlights: string[];
    }>;
    portfolioTitle: string;
    projects: Array<{
        name: string;
        label: string;
        description: string;
        roi: string;
        metric: string;
    }>;
    openSourceTitle: string;
    openSourceProjects: Array<{
        name: string;
        stack: string;
        description: string;
        repo: string;
    }>;
    languagesTitle: string;
    languages: Array<{ language: string; level: string }>;
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
            experienceTitle: 'EXPERIENCIA PROFESIONAL',
            experience: [
                {
                    role: 'Founder & Lead Engineer / Consultor IT',
                    company: 'UbicSys S.A.',
                    period: 'Ago 2024 – Presente',
                    location: 'Panamá',
                    highlights: [
                        'Sago One (Plataforma SaaS B2B): arquitecto y desarrollador principal de la plataforma de facturación electrónica PWA Offline-First (DGI/HKA-PAC). 10+ empresas activas en producción, incluyendo Zona Libre y Puerto de Cruceros Colón 2000.',
                        'Ministerio de Seguridad – Sistema 911: lideré migración en vivo de imágenes de SO en terminales de despacho de emergencias con cero downtime, manteniendo 100% de capacidad operativa.',
                        'Consulado de Colombia (cliente activo): mantenimiento periódico de infraestructura crítica — redes, firewalls, servidores locales y atención presencial de incidentes.',
                        'SITAC (Colombia): diagnósticos técnicos remotos para el Ministerio de Relaciones Exteriores que aceleraron la resolución de fallas de despliegue internacional.',
                        '99.9% de uptime mediante arquitecturas Serverless-first y Database Branching (Neon PostgreSQL).',
                    ],
                },
                {
                    role: 'Consultor de Software & Audio Engineer',
                    company: 'Freelance Internacional',
                    period: 'Ene 2017 – Ene 2024',
                    highlights: [
                        'I+D en bases de infraestructura de baja latencia y patrones de diseño adaptables para sistemas de software y audio.',
                        'Diseño de algoritmos de alta precisión aplicando Procesamiento Digital de Señales (DSP) en pipelines de procesamiento de audio.',
                    ],
                },
            ],
            portfolioTitle: 'PORTAFOLIO · CASOS DE ÉXITO',
            projects: [
                {
                    name: 'Sago One',
                    label: 'ERP SaaS Todo-en-Uno · FinTech · Next.js 15',
                    description:
                        'Plataforma SaaS B2B multi-tenant para emisión de documentos fiscales electrónicos vía ' +
                        'SOAP HKA/DGI (PAC-compliant). Microservicio Go para CUFE/CAFE offline (~15µs/op, Módulo 10). ' +
                        'POS offline-first con impresión térmica Web Bluetooth (ESC/POS).',
                    roi:
                        'Elimina multas fiscales por errores de transcripción, reduce el tiempo de cierre contable ' +
                        'mensual y protege el flujo de caja durante interrupciones de red —el momento más crítico ' +
                        'para los ingresos de un negocio.',
                    metric: '10K+ facturas · AES-256-CBC · RLS multi-tenant · 99.9% uptime',
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
            openSourceTitle: 'OPEN SOURCE · HERRAMIENTAS PROPIAS',
            openSourceProjects: [
                {
                    name: 'HKA-SDK',
                    stack: 'Go',
                    description: 'Gateway fiscal SOAP multi-tenant para HKA PAC. Abstrae la complejidad SOAP con validación estricta y enrutamiento dinámico de tipos de documento.',
                    repo: 'github.com/angelnereira/HKA-SDK',
                },
                {
                    name: 'Gravital-Shell',
                    stack: 'Kotlin',
                    description: 'Terminal Linux profesional para Android. Ejecuta Alpine Linux sin root con PTY real, sesiones persistentes y gestor APK integrado.',
                    repo: 'github.com/angelnereira/Gravital-Shell',
                },
                {
                    name: 'Gravital-Share',
                    stack: 'Rust',
                    description: 'Resuelve el VPN routing en hotspots Android: enruta el tráfico de dispositivos conectados al hotspot a través del túnel VPN del anfitrión.',
                    repo: 'github.com/angelnereira/Gravital-Share',
                },
                {
                    name: 'Gravital-Talk',
                    stack: 'Rust',
                    description: 'Biblioteca de comunicación / audio standalone con auth Gravital ID y persistencia en Gravital Cloud. Pipeline DSP propio de baja latencia.',
                    repo: 'github.com/angelnereira/Gravital-Talk',
                },
            ],
            languagesTitle: 'IDIOMAS',
            languages: [
                { language: 'Español', level: 'Nativo' },
                { language: 'Inglés', level: 'Lectura técnica avanzada · Conversacional intermedio' },
            ],
            stackTitle: 'STACK TECNOLÓGICO',
            stackGroups: [
                { label: 'Lenguajes', items: ['TypeScript', 'Go', 'Rust', 'Kotlin', 'Node.js', 'SQL'] },
                { label: 'Backend & Datos', items: ['PostgreSQL (Neon)', 'Prisma ORM', 'Upstash Redis', 'BullMQ', 'SOAP / REST'] },
                { label: 'Infraestructura', items: ['Docker', 'Vercel Edge', 'Railway', 'GCP', 'GitHub Actions'] },
                { label: 'Seguridad & Móvil', items: ['AES-256-CBC', 'RLS Multi-tenant', 'PWA Offline-First', 'Web Bluetooth', 'ESC/POS'] },
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
        experienceTitle: 'PROFESSIONAL EXPERIENCE',
        experience: [
            {
                role: 'Founder & Lead Engineer / IT Consultant',
                company: 'UbicSys S.A.',
                period: 'Aug 2024 – Present',
                location: 'Panama',
                highlights: [
                    'Sago One (B2B SaaS): architected and lead-developed the Offline-First PWA invoicing platform (DGI/HKA-PAC compliant). 10+ active enterprise clients including Free Trade Zone operators and Colón 2000 Cruise Port.',
                    'Ministry of Security – 911 Emergency System: spearheaded a live, zero-downtime OS image migration across dispatch terminals, maintaining 100% operational capacity throughout.',
                    'Colombian Consulate (ongoing client): on-site IT infrastructure maintenance — network administration, firewall configuration, on-premise servers, hardware health checks.',
                    'SITAC (Colombia): remote technical diagnostics for the Colombian Ministry of Foreign Affairs that accelerated international deployment-failure resolution.',
                    '99.9% guaranteed uptime via Serverless-first architectures and Neon PostgreSQL Database Branching.',
                ],
            },
            {
                role: 'Software Consultant & Audio Engineer',
                company: 'Freelance International',
                period: 'Jan 2017 – Jan 2024',
                highlights: [
                    'R&D for low-latency infrastructure foundations and adaptable design patterns for software and audio systems.',
                    'Applied Digital Signal Processing (DSP) principles to design high-precision algorithms for audio processing pipelines.',
                ],
            },
        ],
        portfolioTitle: 'PORTFOLIO · CASE STUDIES',
        projects: [
            {
                name: 'Sago One',
                label: 'All-in-One ERP SaaS · FinTech · Next.js 15',
                description:
                    'Multi-tenant B2B SaaS for electronic fiscal document emission via HKA/DGI SOAP (PAC-compliant). ' +
                    'Go microservice for offline CUFE/CAFE generation (~15µs/op, Módulo 10). Offline-first POS with ' +
                    'Web Bluetooth thermal printing (ESC/POS).',
                roi:
                    'Eliminates tax penalties from transcription errors, reduces monthly accounting close time, ' +
                    'and protects cash flow during network outages—the most critical moment for a business\'s revenue.',
                metric: '10K+ invoices · AES-256-CBC · multi-tenant RLS · 99.9% uptime',
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
        openSourceTitle: 'OPEN SOURCE · OWN TOOLING',
        openSourceProjects: [
            {
                name: 'HKA-SDK',
                stack: 'Go',
                description: 'Multi-tenant SOAP fiscal gateway for HKA PAC. Abstracts SOAP complexity with strict validation and dynamic document-type routing.',
                repo: 'github.com/angelnereira/HKA-SDK',
            },
            {
                name: 'Gravital-Shell',
                stack: 'Kotlin',
                description: 'Professional Linux terminal for Android. Runs Alpine Linux without root with real PTY, persistent sessions and built-in APK manager.',
                repo: 'github.com/angelnereira/Gravital-Shell',
            },
            {
                name: 'Gravital-Share',
                stack: 'Rust',
                description: 'Solves Android VPN routing on hotspots: routes traffic from hotspot-connected devices through the host\'s VPN tunnel.',
                repo: 'github.com/angelnereira/Gravital-Share',
            },
            {
                name: 'Gravital-Talk',
                stack: 'Rust',
                description: 'Standalone audio / communication library with Gravital ID auth and Gravital Cloud persistence. Custom low-latency DSP pipeline.',
                repo: 'github.com/angelnereira/Gravital-Talk',
            },
        ],
        languagesTitle: 'LANGUAGES',
        languages: [
            { language: 'Spanish', level: 'Native proficiency' },
            { language: 'English', level: 'Advanced technical reading · Basic-Intermediate conversational' },
        ],
        stackTitle: 'TECHNOLOGY STACK',
        stackGroups: [
            { label: 'Languages', items: ['TypeScript', 'Go', 'Rust', 'Kotlin', 'Node.js', 'SQL'] },
            { label: 'Backend & Data', items: ['PostgreSQL (Neon)', 'Prisma ORM', 'Upstash Redis', 'BullMQ', 'SOAP / REST'] },
            { label: 'Infrastructure', items: ['Docker', 'Vercel Edge', 'Railway', 'GCP', 'GitHub Actions'] },
            { label: 'Security & Mobile', items: ['AES-256-CBC', 'Multi-tenant RLS', 'PWA Offline-First', 'Web Bluetooth', 'ESC/POS'] },
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
    // PAGE 2 — Experience + Portfolio
    // ─────────────────────────────────────────
    doc.addPage();
    doc.setFillColor(...DEEP_FOREST);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    doc.setFillColor(...ACID_LIME);
    doc.rect(0, 0, PAGE_W, 3, 'F');
    y = MARGIN;

    // ── Experience ─────────────────────────────
    sectionTitle(content.experienceTitle);

    content.experience.forEach((exp, ei) => {
        checkPageBreak(30);

        // Role header line
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...TEXT_PRIMARY);
        doc.text(exp.role, MARGIN, y);

        // Period right-aligned
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...ACID_LIME);
        doc.text(exp.period, PAGE_W - MARGIN, y, { align: 'right' });
        y += 5;

        // Company + location
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...TEXT_SECONDARY);
        const companyLine = exp.location ? `${exp.company} · ${exp.location}` : exp.company;
        doc.text(companyLine, MARGIN, y);
        y += 5;

        // Bulleted highlights
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...TEXT_SECONDARY);
        exp.highlights.forEach((h) => {
            const lines = doc.splitTextToSize(`•  ${h}`, CONTENT_W - 4);
            lines.forEach((line: string) => {
                checkPageBreak(5);
                doc.text(line, MARGIN + 2, y);
                y += 4.4;
            });
        });

        if (ei < content.experience.length - 1) {
            y += 3;
            drawHRule();
            y += 1;
        }
    });

    y += 6;

    // ─────────────────────────────────────────
    // PAGE 3 — Portfolio + Open Source + Stack
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

    // ── Open Source projects (compact list) ────
    checkPageBreak(60);
    sectionTitle(content.openSourceTitle);

    content.openSourceProjects.forEach((osp, oi) => {
        checkPageBreak(16);

        // Project name + stack tag in one row
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...ACID_LIME);
        doc.text(osp.name, MARGIN, y);

        const stackText = `· ${osp.stack}`;
        const nameWidth = doc.getTextWidth(osp.name);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        doc.text(stackText, MARGIN + nameWidth + 3, y);

        // Repo URL right-aligned
        doc.setFontSize(7);
        doc.setTextColor(...TEXT_SECONDARY);
        doc.text(osp.repo, PAGE_W - MARGIN, y, { align: 'right' });
        y += 4.5;

        // Description
        doc.setFontSize(8.2);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        const ospLines = doc.splitTextToSize(osp.description, CONTENT_W);
        ospLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, MARGIN, y);
            y += 4.2;
        });

        if (oi < content.openSourceProjects.length - 1) {
            y += 2;
        }
    });

    y += 8;

    // ── Languages ──────────────────────────────
    checkPageBreak(28);
    sectionTitle(content.languagesTitle);

    content.languages.forEach((lng) => {
        checkPageBreak(6);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...TEXT_PRIMARY);
        doc.text(lng.language, MARGIN, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...TEXT_SECONDARY);
        // Indent the level text after the language label
        const langWidth = doc.getTextWidth(lng.language);
        const levelLines = doc.splitTextToSize(lng.level, CONTENT_W - langWidth - 8);
        levelLines.forEach((line: string, idx: number) => {
            const x = idx === 0 ? MARGIN + langWidth + 6 : MARGIN + langWidth + 6;
            doc.text(line, x, y);
            if (idx < levelLines.length - 1) y += 4.5;
        });
        y += 6;
    });

    y += 6;

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
