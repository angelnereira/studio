import type {
  ServiceBase,
  ServiceType,
  ComplexityMultiplier,
  ComplexityLevel,
  CountryAdjustment,
  Country,
  UrgencyMultiplier,
  UrgencyLevel,
  ClientTypeAdjustment,
  ClientType,
  AddOn,
  AddOnType,
} from '@/types/calculator';

// Base Services with estimated prices and timeline
// PRECIOS COMPETITIVOS PANAMÁ/LATAM 2026 - Estrategia de penetración de mercado
export const SERVICIOS_BASE: Record<ServiceType, ServiceBase> = {
  'web-app': {
    id: 'web-app',
    name: 'Aplicación Web',
    description: 'Aplicación web moderna (MVP) con funciones esenciales',
    basePrice: 1500,
    estimatedWeeks: 6,
    features: [
      'Diseño responsive',
      'Frontend con React/Next.js',
      'Backend básico',
      'Base de datos PostgreSQL',
      'Autenticación de usuarios',
      'Panel administrativo simple',
    ],
  },
  'mobile-app': {
    id: 'mobile-app',
    name: 'Aplicación Móvil',
    description: 'App híbrida (iOS/Android) optimizada para lanzamiento',
    basePrice: 3500,
    estimatedWeeks: 10,
    features: [
      'Desarrollo iOS y Android (React Native)',
      'UI/UX optimizado',
      'API integrada',
      'Notificaciones básicas',
      'Publicación en tiendas',
      'Soporte post-lanzamiento (1 mes)',
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Tienda online profesional para vender productos 24/7',
    basePrice: 1200,
    estimatedWeeks: 4,
    features: [
      'Catálogo de productos',
      'Carrito de compras',
      'Pasarela de pagos (Tarjeta/Yappy)',
      'Panel de pedidos',
      'Diseño vendedor',
      'WhatsApp integrado',
    ],
  },
  'landing-page': {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Página de alta conversión para captar clientes',
    basePrice: 500,
    estimatedWeeks: 1,
    features: [
      'Diseño premium moderno',
      'Carga ultrarrápida',
      'Formularios de contacto',
      'Botones de WhatsApp',
      'Optimización SEO básica',
      'Mobile-first',
    ],
  },
  'crm-erp': {
    id: 'crm-erp',
    name: 'Sistema de Gestión (ERP)',
    description: 'Software para digitalizar procesos de tu negocio',
    basePrice: 2500,
    estimatedWeeks: 12,
    features: [
      'Gestión de clientes/inventario',
      'Reportes automáticos',
      'Roles de usuario',
      'Automatización de tareas',
      'Base de datos segura',
      'Soporte técnico',
    ],
  },
  'api-backend': {
    id: 'api-backend',
    name: 'API/Backend',
    description: 'Motor lógico y base de datos para tus aplicaciones',
    basePrice: 1200,
    estimatedWeeks: 4,
    features: [
      'API RESTful segura',
      'Base de datos optimizada',
      'Documentación (Swagger)',
      'Autenticación JWT',
      'Rate limiting',
      'Despliegue en nube',
    ],
  },
  migration: {
    id: 'migration',
    name: 'Migración y Modernización',
    description: 'Actualiza tu software antiguo a tecnologías modernas',
    basePrice: 2000,
    estimatedWeeks: 6,
    features: [
      'Análisis de sistema actual',
      'Migración de datos segura',
      'Refactorización de código',
      'Mejora de rendimiento',
      'Testing exhaustivo',
      'Cero pérdida de datos',
    ],
  },
  maintenance: {
    id: 'maintenance',
    name: 'Mantenimiento Mensual',
    description: 'Asegura que tu web siempre funcione perfecta',
    basePrice: 300,
    estimatedWeeks: 4,
    features: [
      'Actualizaciones de seguridad',
      'Monitoreo 24/7',
      'Backups diarios',
      'Pequeños ajustes visuales',
      'Reporte de rendimiento',
      'Prioridad en soporte',
    ],
  },
  'fiscal-system': {
    id: 'fiscal-system',
    name: 'Facturación Electrónica (DGI)',
    description: 'Sistema certificado para emitir facturas en Panamá',
    basePrice: 2800,
    estimatedWeeks: 8,
    features: [
      'Conexión directa DGI/PAC',
      'Firma electrónica',
      'Validación de facturas',
      'Envío de correos automáticos',
      'Portal de clientes',
      'Cumplimiento legal 100%',
    ],
  },
};

// Complexity Multipliers (Ajustados para no disparar precios absurdamente)
export const MULTIPLICADORES_COMPLEJIDAD: Record<ComplexityLevel, ComplexityMultiplier> = {
  basico: {
    level: 'basico',
    name: 'Estándar',
    multiplier: 1.0,
    description: 'Funcionalidades esenciales para operar',
    characteristics: [
      'Funcionalidades core',
      'Diseño limpio',
      'Rápida implementación',
    ],
  },
  intermedio: {
    level: 'intermedio',
    name: 'Profesional',
    multiplier: 1.3,
    description: 'Para negocios en crecimiento que necesitan más poder',
    characteristics: [
      'Módulo de reportes',
      'Integraciones extra',
      'Diseño personalizado',
    ],
  },
  avanzado: {
    level: 'avanzado',
    name: 'Avanzado',
    multiplier: 1.6,
    description: 'Lógica de negocio compleja y alto volumen',
    characteristics: [
      'Automatización avanzada',
      'API pública',
      'Lógica a medida',
    ],
  },
  enterprise: {
    level: 'enterprise',
    name: 'Corporativo',
    multiplier: 2.2,
    description: 'Misión crítica, SLA y alta disponibilidad',
    characteristics: [
      'Cluster de servidores',
      'Auditoría de seguridad',
      'Soporte 24/7',
    ],
  },
};

// ... (Country stays same) ...

// Urgency Multipliers
// ... (Urgency stays same) ...

// Client Type Adjustments
// ... (Client stays same) ...

// Add-ons (Precios ajustados a realidad LATAM)
export const ADD_ONS: Record<AddOnType, AddOn> = {
  'seo-optimization': {
    id: 'seo-optimization',
    name: 'SEO Avanzado',
    description: 'Estrategia para aparecer primero en Google',
    price: 300,
    estimatedHours: 10,
  },
  'analytics-setup': {
    id: 'analytics-setup',
    name: 'Pack de Analíticas',
    description: 'Configuración profesional de GA4 y Pixel de FB',
    price: 150,
    estimatedHours: 5,
  },
  'cloud-deployment': {
    id: 'cloud-deployment',
    name: 'Configuración Cloud Pro',
    description: 'AWS/Vercel optimizado para velocidad',
    price: 350,
    estimatedHours: 8,
  },
  'ci-cd-pipeline': {
    id: 'ci-cd-pipeline',
    name: 'Automatización (CI/CD)',
    description: 'Despliegues automáticos sin errores',
    price: 400,
    estimatedHours: 10,
  },
  'security-audit': {
    id: 'security-audit',
    name: 'Hacking Ético / Auditoría',
    description: 'Pruebas de penetración para blindar tu app',
    price: 600,
    estimatedHours: 20,
  },
  documentation: {
    id: 'documentation',
    name: 'Manuales y Documentación',
    description: 'Guías paso a paso para tu equipo',
    price: 250,
    estimatedHours: 8,
  },
  training: {
    id: 'training',
    name: 'Capacitación Personalizada',
    description: 'Sesión Zoom grabada para enseñar a usar el sistema',
    price: 200,
    estimatedHours: 4,
  },
  'support-3-months': {
    id: 'support-3-months',
    name: 'Soporte Trimestral',
    description: '3 meses de tranquilidad técnica',
    price: 450,
  },
  'support-6-months': {
    id: 'support-6-months',
    name: 'Soporte Semestral',
    description: '6 meses de soporte y actualizaciones',
    price: 800,
  },
  'support-12-months': {
    id: 'support-12-months',
    name: 'Soporte Anual VIP',
    description: 'Un año completo de garantía y soporte',
    price: 1500,
  },
};

// Currency conversion rates (approximate, should be updated from API in production)
export const CURRENCY_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  MXN: 17.5,
  COP: 4000,
};

// Recommendations based on project type
export const RECOMMENDATIONS_BY_SERVICE: Record<ServiceType, AddOnType[]> = {
  'web-app': ['seo-optimization', 'analytics-setup', 'cloud-deployment', 'ci-cd-pipeline'],
  'mobile-app': ['analytics-setup', 'cloud-deployment', 'ci-cd-pipeline', 'support-6-months'],
  ecommerce: ['seo-optimization', 'analytics-setup', 'cloud-deployment', 'security-audit', 'support-6-months'],
  'landing-page': ['seo-optimization', 'analytics-setup'],
  'crm-erp': ['cloud-deployment', 'ci-cd-pipeline', 'documentation', 'training', 'support-12-months'],
  'api-backend': ['cloud-deployment', 'ci-cd-pipeline', 'documentation', 'security-audit'],
  migration: ['documentation', 'training', 'support-6-months'],
  maintenance: ['security-audit'],
  'fiscal-system': ['security-audit', 'cloud-deployment', 'training', 'support-12-months'],
};
