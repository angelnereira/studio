
import { ReactElement } from "react";
import { Briefcase, Building, Puzzle, Code2, Bot, Database, KeyRound, ShoppingCart, Receipt, BrainCircuit, Rocket, Server, FileCog, MonitorCog, Smartphone, LineChart, ShieldCheck, Wallet, GitPullRequest, Cloud, Construction, Gauge, Users, Repeat, FileInput, Shield, GitMerge, CloudCog } from "lucide-react";

export type ServicePackage = {
  name: string;
  price: number | string; // Updated to allow string for ranges
  originalPrice?: number;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: string;
  time: string;
};

export type ServiceAddOn = {
  name:string;
  price: number | string;
  originalPrice?: number;
  priceSuffix?: string;
  description: string;
};

export type Service = {
  title: string;
  slug: string;
  icon: ReactElement;
  shortDescription: string;
  fullDescription: string;
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
  tags: string[];
  published: boolean;
  category: "Web Development" | "AI Solutions" | "Infrastructure & Maintenance" | "Business Management";
};


export const services: Service[] = [
  // === NEW WEB DEVELOPMENT PACKAGES ===
  {
    title: "Desarrollo Web",
    slug: "web-development",
    icon: <Rocket />,
    category: "Web Development",
    shortDescription: "Soluciones web a medida, desde landing pages hasta aplicaciones empresariales complejas.",
    fullDescription: "Creamos experiencias web robustas, escalables y centradas en el usuario. Ya sea que necesites una simple página de aterrizaje para validar una idea o una aplicación web empresarial completa, tenemos la solución.",
    packages: [
      {
        name: "Lanzamiento Digital",
        price: "800 - 1,500",
        description: "Ideal para startups y pequeños negocios que necesitan una presencia online rápida y efectiva.",
        features: [
          "Landing page responsiva",
          "Optimización SEO básica",
          "Formulario de contacto",
          "Integración Google Analytics",
          "Hosting por 1 año"
        ],
        cta: "Empezar Lanzamiento",
        time: "2-3 semanas"
      },
      {
        name: "Presencia Corporativa",
        price: "2,500 - 5,000",
        description: "Un sitio web completo para empresas medianas y profesionales establecidos que buscan consolidar su marca.",
        features: [
          "Sitio web multi-página",
          "Panel de administración (CMS)",
          "Sistema de blog avanzado",
          "Integración CRM básica",
          "Optimización de velocidad",
          "Certificado SSL premium",
          "Backup automático"
        ],
        cta: "Construir Presencia",
        time: "4-6 semanas"
      },
      {
        name: "Solución Empresarial",
        price: "5,000+",
        description: "Aplicaciones web personalizadas y de alta complejidad para grandes empresas y corporaciones.",
        features: [
          "Aplicación web a medida",
          "Arquitectura de microservicios",
          "Panel administrativo completo",
          "API REST personalizada",
          "Integración con sistemas existentes",
          "Seguridad de nivel empresarial",
          "Documentación técnica y capacitación"
        ],
        cta: "Diseñar Solución",
        time: "8-12+ semanas"
      }
    ],
    addOns: [
        { name: "Blog integrado", price: "+$300", description: "Para el paquete Lanzamiento Digital." },
        { name: "Chat en vivo", price: "+$200", description: "Para cualquier paquete." },
        { name: "E-commerce básico (hasta 50 productos)", price: "+$1,200", description: "Para el paquete Presencia Corporativa." },
        { name: "Sistema de citas online", price: "+$800", description: "Para el paquete Presencia Corporativa." },
        { name: "Aplicación móvil complementaria", price: "+$3,000", description: "Para el paquete Solución Empresarial." },
    ],
    tags: ["Web", "Startups", "PYMEs", "Corporativo"],
    published: true,
  },

  // === NEW AI SOLUTIONS PACKAGES ===
  {
    title: "Soluciones con IA",
    slug: "ai-solutions",
    icon: <BrainCircuit />,
    category: "AI Solutions",
    shortDescription: "Desde chatbots inteligentes hasta sistemas de recomendación y análisis predictivo.",
    fullDescription: "Integramos el poder de la inteligencia artificial en tus operaciones para automatizar procesos, personalizar la experiencia del cliente y extraer insights valiosos de tus datos.",
    packages: [
      {
        name: "IA Básica",
        price: "1,200 - 2,500",
        description: "Implementa un asistente virtual inteligente para automatizar la atención al cliente.",
        features: [
          "Chatbot básico con FAQ",
          "Integración WhatsApp Business",
          "Dashboard de conversaciones",
          "Entrenamiento inicial",
          "Soporte por 3 meses"
        ],
        cta: "Implementar Chatbot",
        time: "3-4 semanas"
      },
      {
        name: "IA Avanzada",
        price: "3,500 - 7,000",
        description: "Desarrolla sistemas de recomendación y análisis para una personalización profunda.",
        features: [
          "Chatbot con procesamiento de lenguaje natural (NLP)",
          "Sistema de recomendaciones de productos",
          "Análisis de sentimientos en comentarios",
          "Integración multi-canal",
          "Dashboard de analytics de IA"
        ],
        cta: "Desarrollar IA",
        time: "6-8 semanas"
      },
      {
        name: "IA Empresarial",
        price: "8,000+",
        description: "Soluciones de IA a medida con modelos de Machine Learning propios y análisis de big data.",
        features: [
          "Solución de IA 100% personalizada",
          "Modelos de machine learning propios",
          "Integración con Big Data",
          "Pipeline de datos automatizado",
          "Monitoreo y optimización continua",
          "Consultoría estratégica en IA"
        ],
        cta: "Crear Solución IA",
        time: "10-16+ semanas"
      }
    ],
    addOns: [],
    tags: ["IA", "Chatbot", "Machine Learning", "Automatización"],
    published: true,
  },
  
  // MIGRATED/ADAPTED SERVICES
  {
    title: "Planes de Soporte y Crecimiento",
    slug: "planes-soporte-crecimiento",
    icon: <ShieldCheck />,
    category: "Infrastructure & Maintenance",
    shortDescription: "Asegura la salud y evolución de tu proyecto con nuestros planes de suscripción.",
    fullDescription: "Ofrecemos planes de suscripción para el mantenimiento continuo, soporte técnico y desarrollo de nuevas funcionalidades. Garantiza que tu inversión tecnológica siga generando valor a largo plazo.",
    packages: [
      {
        name: "Soporte Esencial",
        price: 140,
        priceSuffix: "/mes",
        description: "Para mantener tu sitio o app segura y funcionando óptimamente.",
        features: ["Monitoreo de disponibilidad 24/7", "Backups diarios", "Actualizaciones de seguridad críticas", "Soporte técnico por email (respuesta en 24h)"],
        cta: "Obtener Soporte",
        time: "Suscripción mensual"
      },
      {
        name: "Crecimiento Plus",
        price: 350,
        priceSuffix: "/mes",
        description: "Ideal para negocios que buscan mejorar y añadir funcionalidades continuamente.",
        features: ["Todo lo del plan Esencial", "Soporte prioritario por chat", "4 horas de desarrollo para mejoras", "Consultoría proactiva de mejoras"],
        cta: "Empezar a Crecer",
        time: "Suscripción mensual"
      },
      {
        name: "Socio Estratégico",
        price: 980,
        priceSuffix: "/trimestre",
        description: "Una alianza para empresas que ven la tecnología como pilar de su estrategia.",
        features: ["Todo lo del plan Crecimiento Plus", "15 horas de desarrollo por trimestre", "Llamada de estrategia mensual", "Soporte prioritario 24/7 para emergencias"],
        cta: "Formar Alianza",
        time: "Suscripción trimestral"
      }
    ],
    addOns: [],
    tags: ["Soporte", "Suscripción", "Corporativo"],
    published: true,
  },
];
