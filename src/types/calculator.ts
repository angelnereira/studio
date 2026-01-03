// Budget Calculator Types

export type ServiceType =
  | 'web-app'
  | 'mobile-app'
  | 'ecommerce'
  | 'landing-page'
  | 'crm-erp'
  | 'api-backend'
  | 'migration'
  | 'maintenance'
  | 'fiscal-system';

export type ComplexityLevel = 'basico' | 'intermedio' | 'avanzado' | 'enterprise';

export type UrgencyLevel = 'normal' | 'urgente' | 'muy-urgente';

export type ClientType = 'startup' | 'pyme' | 'enterprise' | 'gobierno';

export type Country =
  | 'panama'
  | 'usa'
  | 'spain'
  | 'mexico'
  | 'colombia'
  | 'latam-other';

export type AddOnType =
  | 'seo-optimization'
  | 'analytics-setup'
  | 'cloud-deployment'
  | 'ci-cd-pipeline'
  | 'security-audit'
  | 'documentation'
  | 'training'
  | 'support-3-months'
  | 'support-6-months'
  | 'support-12-months';

export interface ServiceBase {
  id: ServiceType;
  name: string;
  description: string;
  basePrice: number; // Base price in USD
  estimatedWeeks: number;
  features: string[];
}

export interface ComplexityMultiplier {
  level: ComplexityLevel;
  name: string;
  multiplier: number;
  description: string;
  characteristics: string[];
}

export interface CountryAdjustment {
  country: Country;
  name: string;
  multiplier: number;
  currency: string;
}

export interface UrgencyMultiplier {
  level: UrgencyLevel;
  name: string;
  multiplier: number;
  description: string;
  timeReduction: string;
}

export interface ClientTypeAdjustment {
  type: ClientType;
  name: string;
  multiplier: number;
  description: string;
}

export interface AddOn {
  id: AddOnType;
  name: string;
  description: string;
  price: number; // Fixed price in USD
  estimatedHours?: number;
}

export interface ProjectParams {
  // Step 1: Service Selection
  serviceType: ServiceType;

  // Step 2: Configuration
  complexityLevel: ComplexityLevel;
  country: Country;

  // Step 3: Timeline
  urgencyLevel: UrgencyLevel;
  estimatedStartDate?: string;

  // Step 4: Add-ons
  addOns: AddOnType[];

  // Step 5: Client Info (optional, for email/PDF)
  clientType?: ClientType;
  clientName?: string;
  clientEmail?: string;
  projectDescription?: string;
}

export interface PriceBreakdown {
  basePrice: number;
  complexityAdjustment: number;
  countryAdjustment: number;
  urgencyAdjustment: number;
  clientTypeAdjustment: number;
  addOnsTotal: number;
  subtotal: number;
  tax?: number;
  total: number;
}

export interface TimelineEstimate {
  baseWeeks: number;
  adjustedWeeks: number;
  startDate?: string;
  estimatedEndDate?: string;
}

export interface CalculationResult {
  service: ServiceBase;
  params: ProjectParams;
  priceBreakdown: PriceBreakdown;
  timeline: TimelineEstimate;
  currency: string;
  selectedAddOns: AddOn[];
  recommendations: string[];
  createdAt: string;
}

export interface CalculatorSession {
  id: string;
  result: CalculationResult;
  createdAt: string;
  expiresAt: string;
}
