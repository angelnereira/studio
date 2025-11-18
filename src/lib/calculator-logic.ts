import type {
  ProjectParams,
  CalculationResult,
  PriceBreakdown,
  TimelineEstimate,
} from '@/types/calculator';
import {
  SERVICIOS_BASE,
  MULTIPLICADORES_COMPLEJIDAD,
  AJUSTES_PAIS,
  MULTIPLICADORES_URGENCIA,
  AJUSTES_TIPO_CLIENTE,
  ADD_ONS,
  RECOMMENDATIONS_BY_SERVICE,
} from './calculator-constants';

/**
 * Main calculation function for project budget
 */
export function calcularPresupuesto(params: ProjectParams): CalculationResult {
  const service = SERVICIOS_BASE[params.serviceType];
  const complexity = MULTIPLICADORES_COMPLEJIDAD[params.complexityLevel];
  const country = AJUSTES_PAIS[params.country];
  const urgency = MULTIPLICADORES_URGENCIA[params.urgencyLevel];
  const clientType = params.clientType
    ? AJUSTES_TIPO_CLIENTE[params.clientType]
    : AJUSTES_TIPO_CLIENTE.pyme; // Default to PYME

  // Calculate price breakdown
  const priceBreakdown = calculatePriceBreakdown(
    service.basePrice,
    complexity.multiplier,
    country.multiplier,
    urgency.multiplier,
    clientType.multiplier,
    params.addOns
  );

  // Calculate timeline
  const timeline = calculateTimeline(
    service.estimatedWeeks,
    urgency.level,
    params.estimatedStartDate
  );

  // Get selected add-ons
  const selectedAddOns = params.addOns.map((addOnId) => ADD_ONS[addOnId]);

  // Generate recommendations
  const recommendations = generateRecommendations(params, priceBreakdown.total);

  return {
    service,
    params,
    priceBreakdown,
    timeline,
    currency: country.currency,
    selectedAddOns,
    recommendations,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Calculate detailed price breakdown
 */
function calculatePriceBreakdown(
  basePrice: number,
  complexityMultiplier: number,
  countryMultiplier: number,
  urgencyMultiplier: number,
  clientTypeMultiplier: number,
  addOns: string[]
): PriceBreakdown {
  // Apply multipliers sequentially
  const afterComplexity = basePrice * complexityMultiplier;
  const complexityAdjustment = afterComplexity - basePrice;

  const afterCountry = afterComplexity * countryMultiplier;
  const countryAdjustment = afterCountry - afterComplexity;

  const afterUrgency = afterCountry * urgencyMultiplier;
  const urgencyAdjustment = afterUrgency - afterCountry;

  const afterClientType = afterUrgency * clientTypeMultiplier;
  const clientTypeAdjustment = afterClientType - afterUrgency;

  // Calculate add-ons total
  const addOnsTotal = addOns.reduce((total, addOnId) => {
    const addOn = ADD_ONS[addOnId as keyof typeof ADD_ONS];
    return total + (addOn?.price || 0);
  }, 0);

  const subtotal = afterClientType + addOnsTotal;

  // No tax for now (can be configured per country)
  const tax = 0;
  const total = subtotal + tax;

  return {
    basePrice,
    complexityAdjustment,
    countryAdjustment,
    urgencyAdjustment,
    clientTypeAdjustment,
    addOnsTotal,
    subtotal,
    tax,
    total,
  };
}

/**
 * Calculate project timeline
 */
function calculateTimeline(
  baseWeeks: number,
  urgencyLevel: 'normal' | 'urgente' | 'muy-urgente',
  startDate?: string
): TimelineEstimate {
  let adjustedWeeks = baseWeeks;

  if (urgencyLevel === 'urgente') {
    adjustedWeeks = Math.ceil(baseWeeks * 0.7); // 30% faster
  } else if (urgencyLevel === 'muy-urgente') {
    adjustedWeeks = Math.ceil(baseWeeks * 0.5); // 50% faster
  }

  let estimatedEndDate: string | undefined;

  if (startDate) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + adjustedWeeks * 7); // Convert weeks to days
    estimatedEndDate = end.toISOString().split('T')[0];
  }

  return {
    baseWeeks,
    adjustedWeeks,
    startDate,
    estimatedEndDate,
  };
}

/**
 * Generate recommendations based on project parameters and budget
 */
function generateRecommendations(
  params: ProjectParams,
  totalBudget: number
): string[] {
  const recommendations: string[] = [];

  // Budget-based recommendations
  if (totalBudget > 20000) {
    recommendations.push(
      'Considerar implementación por fases para distribuir la inversión'
    );
    recommendations.push(
      'Recomendamos incluir auditoría de seguridad dado el alcance del proyecto'
    );
  }

  if (totalBudget < 5000) {
    recommendations.push(
      'Para proyectos de menor escala, considerar soluciones con plantillas existentes'
    );
  }

  // Urgency-based recommendations
  if (params.urgencyLevel === 'muy-urgente') {
    recommendations.push(
      'Timeline acelerado puede requerir equipo adicional o horas extra'
    );
    recommendations.push(
      'Priorizar features críticas y considerar MVP para primera entrega'
    );
  }

  // Service-specific recommendations
  const recommendedAddOns = RECOMMENDATIONS_BY_SERVICE[params.serviceType];
  const missingRecommendedAddOns = recommendedAddOns.filter(
    (addOn) => !params.addOns.includes(addOn)
  );

  if (missingRecommendedAddOns.length > 0) {
    const addOnNames = missingRecommendedAddOns
      .slice(0, 2)
      .map((id) => ADD_ONS[id].name)
      .join(' y ');
    recommendations.push(
      `Considerar agregar: ${addOnNames} para este tipo de proyecto`
    );
  }

  // Complexity-based recommendations
  if (params.complexityLevel === 'enterprise') {
    recommendations.push(
      'Proyectos enterprise requieren planning detallado - incluir fase de discovery'
    );
    recommendations.push(
      'Recomendamos contrato de soporte a largo plazo (12+ meses)'
    );
  }

  // Country-specific recommendations
  if (params.country === 'usa') {
    recommendations.push(
      'Cumplimiento con regulaciones de privacidad (CCPA, etc.) incluido'
    );
  }

  if (params.country === 'spain') {
    recommendations.push('Cumplimiento con GDPR y normativa europea incluido');
  }

  // E-commerce specific
  if (params.serviceType === 'ecommerce') {
    if (!params.addOns.includes('security-audit')) {
      recommendations.push(
        'CRÍTICO: Auditoría de seguridad es esencial para e-commerce (manejo de pagos)'
      );
    }
    if (!params.addOns.includes('seo-optimization')) {
      recommendations.push(
        'SEO es fundamental para el éxito de una tienda online'
      );
    }
  }

  // Mobile app specific
  if (params.serviceType === 'mobile-app') {
    if (!params.addOns.includes('analytics-setup')) {
      recommendations.push(
        'Analytics móvil es crucial para entender comportamiento de usuarios'
      );
    }
  }

  // Limit recommendations to top 5
  return recommendations.slice(0, 5);
}

/**
 * Format price with currency
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
  const formatted = new Intl.NumberFormat('es-PA', {
    style: 'currency',
    currency: currency === 'COP' || currency === 'MXN' ? 'USD' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return formatted;
}

/**
 * Format timeline duration
 */
export function formatTimeline(weeks: number): string {
  if (weeks === 1) return '1 semana';
  if (weeks < 4) return `${weeks} semanas`;

  const months = Math.round(weeks / 4);
  if (months === 1) return '1 mes';
  return `${months} meses`;
}

/**
 * Generate session ID
 */
export function generateSessionId(): string {
  return `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Save calculation to local storage
 */
export function saveCalculation(result: CalculationResult): string {
  const sessionId = generateSessionId();
  const session = {
    id: sessionId,
    result,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  };

  try {
    localStorage.setItem(`calculator_${sessionId}`, JSON.stringify(session));
    return sessionId;
  } catch (error) {
    console.error('Error saving calculation:', error);
    return '';
  }
}

/**
 * Load calculation from local storage
 */
export function loadCalculation(sessionId: string): CalculationResult | null {
  try {
    const data = localStorage.getItem(`calculator_${sessionId}`);
    if (!data) return null;

    const session = JSON.parse(data);

    // Check if expired
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(`calculator_${sessionId}`);
      return null;
    }

    return session.result;
  } catch (error) {
    console.error('Error loading calculation:', error);
    return null;
  }
}
