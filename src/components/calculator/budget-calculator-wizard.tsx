"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ServiceType,
  ComplexityLevel,
  Country,
  UrgencyLevel,
  AddOnType,
  ProjectParams,
  CalculationResult,
} from '@/types/calculator';
import { calcularPresupuesto, saveCalculation } from '@/lib/calculator-logic';
import { exportToPDF } from '@/lib/pdf-export';
import { Card } from '@/components/ui/card';
import { SpotlightCard } from '@/components/spotlight-card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StepService } from './step-service';
import { StepConfiguration } from './step-configuration';
import { StepTimeline } from './step-timeline';
import { StepAddOns } from './step-addons';
import { StepResults } from './step-results';

// Helper component to safely handle URL params within Suspense
function ServiceAutoSelector({ onSelect }: { onSelect: (type: ServiceType, defaults: AddOnType[]) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceSlug = searchParams.get('service');
    // Map slugs to ServiceType
    let mappedType: ServiceType | null = null;
    let defaultAddOns: AddOnType[] = [];

    if (serviceSlug) {
      if (serviceSlug.includes('saas') || serviceSlug.includes('fintech')) {
        mappedType = 'web-app';
        defaultAddOns = ['security-audit', 'cloud-deployment'];
      } else if (serviceSlug.includes('ecommerce') || serviceSlug.includes('tienda')) {
        mappedType = 'ecommerce';
        defaultAddOns = ['analytics-setup', 'seo-optimization'];
      } else if (serviceSlug.includes('landing') || serviceSlug.includes('corporate')) {
        mappedType = 'landing-page';
        defaultAddOns = ['seo-optimization'];
      } else if (serviceSlug.includes('pwa') || serviceSlug.includes('mobile')) {
        mappedType = 'mobile-app';
        defaultAddOns = ['analytics-setup'];
      } else if (serviceSlug.includes('crm') || serviceSlug.includes('erp')) {
        mappedType = 'crm-erp';
      }

      if (mappedType) {
        onSelect(mappedType, defaultAddOns);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}

export function BudgetCalculatorWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Form state
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [complexityLevel, setComplexityLevel] = useState<ComplexityLevel | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel | null>(null);
  const [startDate, setStartDate] = useState('');
  const [addOns, setAddOns] = useState<AddOnType[]>([]);

  const handleAutoSelect = (type: ServiceType, defaults: AddOnType[]) => {
    if (!serviceType) { // Only auto-select if not already selected
      setServiceType(type);
      setAddOns(defaults);
      setCurrentStep(2);
    }
  };

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Servicio',
    'Configuración',
    'Timeline',
    'Complementos',
    'Resultados',
  ];

  // Validation for each step
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return serviceType !== null;
      case 2:
        return complexityLevel !== null && country !== null;
      case 3:
        return urgencyLevel !== null;
      case 4:
        return true; // Add-ons are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      // Calculate and show results
      calculateBudget();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const calculateBudget = () => {
    if (!serviceType || !complexityLevel || !country || !urgencyLevel) {
      return;
    }

    const params: ProjectParams = {
      serviceType,
      complexityLevel,
      country,
      urgencyLevel,
      estimatedStartDate: startDate || undefined,
      addOns,
    };

    const calculationResult = calcularPresupuesto(params);
    setResult(calculationResult);

    // Save to localStorage
    saveCalculation(calculationResult);

    setCurrentStep(5);
  };

  const handleToggleAddOn = (addOn: AddOnType) => {
    setAddOns((prev) =>
      prev.includes(addOn)
        ? prev.filter((a) => a !== addOn)
        : [...prev, addOn]
    );
  };

  const handleExportPDF = () => {
    if (!result) return;
    try {
      exportToPDF(result);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    }
  };

  const handleSendEmail = () => {
    // TODO: Implement email sending
    console.log('Send email', result);
    alert('Funcionalidad de enviar email próximamente');
  };

  const handleReset = () => {
    setCurrentStep(1);
    setServiceType(null);
    setComplexityLevel(null);
    setCountry(null);
    setUrgencyLevel(null);
    setStartDate('');
    setAddOns([]);
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Suspense fallback={null}>
        <ServiceAutoSelector onSelect={handleAutoSelect} />
      </Suspense>

      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div key={stepNumber} className="flex-1 text-center">
                <div
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-2 transition-colors ${isActive
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground'
                    }`}
                >
                  {stepNumber}
                </div>
                <p
                  className={`text-xs ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}
                >
                  {title}
                </p>
              </div>
            );
          })}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <SpotlightCard className="p-8 mb-6 bg-card/50 backdrop-blur-md border-white/5">
        {currentStep === 1 && (
          <StepService
            selectedService={serviceType}
            onSelect={setServiceType}
          />
        )}

        {currentStep === 2 && (
          <StepConfiguration
            selectedComplexity={complexityLevel}
            selectedCountry={country}
            onComplexitySelect={setComplexityLevel}
            onCountrySelect={setCountry}
          />
        )}

        {currentStep === 3 && (
          <StepTimeline
            selectedUrgency={urgencyLevel}
            startDate={startDate}
            onUrgencySelect={setUrgencyLevel}
            onStartDateChange={setStartDate}
          />
        )}

        {currentStep === 4 && serviceType && (
          <StepAddOns
            selectedAddOns={addOns}
            serviceType={serviceType}
            onToggleAddOn={handleToggleAddOn}
          />
        )}

        {currentStep === 5 && result && (
          <StepResults
            result={result}
            onExportPDF={handleExportPDF}
            onSendEmail={handleSendEmail}
          />
        )}
      </SpotlightCard>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          size="lg"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        {currentStep < 5 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            size="lg"
          >
            {currentStep === 4 ? 'Calcular Presupuesto' : 'Siguiente'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleReset} size="lg" variant="outline">
            Nueva Cotización
          </Button>
        )}
      </div>
    </div>
  );
}
