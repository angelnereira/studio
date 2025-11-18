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
export const SERVICIOS_BASE: Record<ServiceType, ServiceBase> = {
  'web-app': {
    id: 'web-app',
    name: 'Aplicación Web',
    description: 'Aplicación web moderna con frontend y backend completo',
    basePrice: 8000,
    estimatedWeeks: 8,
    features: [
      'Diseño responsive',
      'Frontend con React/Next.js',
      'Backend con API REST',
      'Base de datos PostgreSQL',
      'Autenticación de usuarios',
      'Dashboard administrativo',
    ],
  },
  'mobile-app': {
    id: 'mobile-app',
    name: 'Aplicación Móvil',
    description: 'App nativa o híbrida para iOS y Android',
    basePrice: 12000,
    estimatedWeeks: 12,
    features: [
      'Desarrollo iOS y Android',
      'UI/UX optimizado para móviles',
      'Backend API integrado',
      'Notificaciones push',
      'Integración con servicios nativos',
      'App store deployment',
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Tienda online completa con carrito y pagos',
    basePrice: 10000,
    estimatedWeeks: 10,
    features: [
      'Catálogo de productos',
      'Carrito de compras',
      'Pasarelas de pago integradas',
      'Panel de administración',
      'Gestión de inventario',
      'Envío y tracking de pedidos',
    ],
  },
  'landing-page': {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Página de aterrizaje optimizada para conversión',
    basePrice: 2000,
    estimatedWeeks: 2,
    features: [
      'Diseño moderno y responsive',
      'Optimización SEO',
      'Formularios de contacto',
      'Integración con analytics',
      'Optimización de velocidad',
      'Call-to-actions estratégicos',
    ],
  },
  'crm-erp': {
    id: 'crm-erp',
    name: 'CRM/ERP',
    description: 'Sistema de gestión empresarial personalizado',
    basePrice: 15000,
    estimatedWeeks: 16,
    features: [
      'Gestión de clientes',
      'Automatización de procesos',
      'Reportes y analytics',
      'Múltiples roles de usuario',
      'Integraciones con sistemas externos',
      'Workflow personalizado',
    ],
  },
  'api-backend': {
    id: 'api-backend',
    name: 'API/Backend',
    description: 'Backend robusto con API REST o GraphQL',
    basePrice: 6000,
    estimatedWeeks: 6,
    features: [
      'API REST o GraphQL',
      'Autenticación y autorización',
      'Base de datos optimizada',
      'Documentación completa',
      'Rate limiting y seguridad',
      'Logging y monitoreo',
    ],
  },
  migration: {
    id: 'migration',
    name: 'Migración de Sistema',
    description: 'Migración y modernización de aplicaciones legacy',
    basePrice: 7000,
    estimatedWeeks: 8,
    features: [
      'Análisis del sistema actual',
      'Plan de migración detallado',
      'Migración de datos',
      'Testing exhaustivo',
      'Capacitación del equipo',
      'Soporte post-migración',
    ],
  },
  maintenance: {
    id: 'maintenance',
    name: 'Mantenimiento y Soporte',
    description: 'Mantenimiento continuo y soporte técnico',
    basePrice: 1500,
    estimatedWeeks: 4,
    features: [
      'Actualizaciones de seguridad',
      'Corrección de bugs',
      'Optimización de rendimiento',
      'Monitoreo continuo',
      'Backups automáticos',
      'Soporte técnico prioritario',
    ],
  },
};

// Complexity Multipliers
export const MULTIPLICADORES_COMPLEJIDAD: Record<ComplexityLevel, ComplexityMultiplier> = {
  basico: {
    level: 'basico',
    name: 'Básico',
    multiplier: 1.0,
    description: 'Proyecto simple con funcionalidades estándar',
    characteristics: [
      'Funcionalidades básicas',
      'Sin integraciones complejas',
      'Diseño simple',
      'Usuario único o pocos roles',
    ],
  },
  intermedio: {
    level: 'intermedio',
    name: 'Intermedio',
    multiplier: 1.5,
    description: 'Proyecto con complejidad moderada y algunas integraciones',
    characteristics: [
      'Múltiples módulos',
      '2-3 integraciones externas',
      'Diseño personalizado',
      'Varios roles de usuario',
    ],
  },
  avanzado: {
    level: 'avanzado',
    name: 'Avanzado',
    multiplier: 2.0,
    description: 'Proyecto complejo con múltiples integraciones y lógica de negocio avanzada',
    characteristics: [
      'Arquitectura compleja',
      'Múltiples integraciones',
      'Lógica de negocio personalizada',
      'Alto volumen de usuarios',
    ],
  },
  enterprise: {
    level: 'enterprise',
    name: 'Enterprise',
    multiplier: 2.5,
    description: 'Solución empresarial de misión crítica con requisitos avanzados',
    characteristics: [
      'Alta disponibilidad (99.9%)',
      'Escalabilidad masiva',
      'Seguridad avanzada',
      'Compliance y auditoría',
      'Múltiples regiones',
    ],
  },
};

// Country Adjustments (based on market rates and cost of living)
export const AJUSTES_PAIS: Record<Country, CountryAdjustment> = {
  panama: {
    country: 'panama',
    name: 'Panamá',
    multiplier: 1.0,
    currency: 'USD',
  },
  usa: {
    country: 'usa',
    name: 'Estados Unidos',
    multiplier: 1.4,
    currency: 'USD',
  },
  spain: {
    country: 'spain',
    name: 'España',
    multiplier: 1.2,
    currency: 'EUR',
  },
  mexico: {
    country: 'mexico',
    name: 'México',
    multiplier: 0.9,
    currency: 'MXN',
  },
  colombia: {
    country: 'colombia',
    name: 'Colombia',
    multiplier: 0.85,
    currency: 'COP',
  },
  'latam-other': {
    country: 'latam-other',
    name: 'Otro país LATAM',
    multiplier: 0.9,
    currency: 'USD',
  },
};

// Urgency Multipliers
export const MULTIPLICADORES_URGENCIA: Record<UrgencyLevel, UrgencyMultiplier> = {
  normal: {
    level: 'normal',
    name: 'Normal',
    multiplier: 1.0,
    description: 'Timeline estándar sin prisa',
    timeReduction: '0%',
  },
  urgente: {
    level: 'urgente',
    name: 'Urgente',
    multiplier: 1.3,
    description: 'Entrega acelerada (30% más rápido)',
    timeReduction: '30%',
  },
  'muy-urgente': {
    level: 'muy-urgente',
    name: 'Muy Urgente',
    multiplier: 1.6,
    description: 'Entrega prioritaria (50% más rápido)',
    timeReduction: '50%',
  },
};

// Client Type Adjustments
export const AJUSTES_TIPO_CLIENTE: Record<ClientType, ClientTypeAdjustment> = {
  startup: {
    type: 'startup',
    name: 'Startup',
    multiplier: 0.9,
    description: 'Descuento para startups en etapa temprana',
  },
  pyme: {
    type: 'pyme',
    name: 'PYME',
    multiplier: 1.0,
    description: 'Tarifa estándar para pequeñas y medianas empresas',
  },
  enterprise: {
    type: 'enterprise',
    name: 'Enterprise',
    multiplier: 1.2,
    description: 'Incluye SLA y soporte premium',
  },
  gobierno: {
    type: 'gobierno',
    name: 'Gobierno',
    multiplier: 1.15,
    description: 'Incluye documentación y cumplimiento normativo adicional',
  },
};

// Add-ons
export const ADD_ONS: Record<AddOnType, AddOn> = {
  'seo-optimization': {
    id: 'seo-optimization',
    name: 'Optimización SEO',
    description: 'Optimización completa para motores de búsqueda',
    price: 800,
    estimatedHours: 20,
  },
  'analytics-setup': {
    id: 'analytics-setup',
    name: 'Setup de Analytics',
    description: 'Configuración de Google Analytics, Tag Manager y métricas personalizadas',
    price: 500,
    estimatedHours: 12,
  },
  'cloud-deployment': {
    id: 'cloud-deployment',
    name: 'Despliegue en Cloud',
    description: 'Configuración y despliegue en AWS, Oracle Cloud o plataforma cloud',
    price: 1000,
    estimatedHours: 24,
  },
  'ci-cd-pipeline': {
    id: 'ci-cd-pipeline',
    name: 'Pipeline CI/CD',
    description: 'Configuración de integración y despliegue continuo',
    price: 1200,
    estimatedHours: 30,
  },
  'security-audit': {
    id: 'security-audit',
    name: 'Auditoría de Seguridad',
    description: 'Revisión completa de seguridad y vulnerabilidades',
    price: 1500,
    estimatedHours: 40,
  },
  documentation: {
    id: 'documentation',
    name: 'Documentación Completa',
    description: 'Documentación técnica y de usuario detallada',
    price: 600,
    estimatedHours: 15,
  },
  training: {
    id: 'training',
    name: 'Capacitación',
    description: 'Sesiones de capacitación para el equipo del cliente',
    price: 800,
    estimatedHours: 16,
  },
  'support-3-months': {
    id: 'support-3-months',
    name: 'Soporte 3 Meses',
    description: 'Soporte técnico por 3 meses post-lanzamiento',
    price: 1500,
  },
  'support-6-months': {
    id: 'support-6-months',
    name: 'Soporte 6 Meses',
    description: 'Soporte técnico por 6 meses post-lanzamiento',
    price: 2700,
  },
  'support-12-months': {
    id: 'support-12-months',
    name: 'Soporte 12 Meses',
    description: 'Soporte técnico por 12 meses post-lanzamiento',
    price: 5000,
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
};
