"use client";

import { ComplexityLevel, Country } from '@/types/calculator';
import { MULTIPLICADORES_COMPLEJIDAD, AJUSTES_PAIS } from '@/lib/calculator-constants';
import { Card } from '@/components/ui/card';
import { SpotlightCard } from '@/components/spotlight-card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';

interface StepConfigurationProps {
  selectedComplexity: ComplexityLevel | null;
  selectedCountry: Country | null;
  onComplexitySelect: (complexity: ComplexityLevel) => void;
  onCountrySelect: (country: Country) => void;
}

export function StepConfiguration({
  selectedComplexity,
  selectedCountry,
  onComplexitySelect,
  onCountrySelect,
}: StepConfigurationProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Configuración del Proyecto</h2>
        <p className="text-muted-foreground">
          Define la complejidad y ubicación para un presupuesto preciso
        </p>
      </div>

      {/* Complexity Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Nivel de Complejidad</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(MULTIPLICADORES_COMPLEJIDAD).map((complexity) => {
            const isSelected = selectedComplexity === complexity.level;

            return (
              <Card
                key={complexity.level}
                className={`p-5 cursor-pointer transition-all hover:shadow-md ${isSelected
                  ? 'border-primary border-2 bg-primary/5'
                  : 'border-border hover:border-primary/50'
                  }`}
                onClick={() => onComplexitySelect(complexity.level)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{complexity.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {complexity.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <ul className="space-y-1 mt-3">
                  {complexity.characteristics.map((char, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="text-primary">•</span>
                      {char}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 pt-3 border-t">
                  <span className="text-xs font-medium text-primary">
                    Multiplicador: {complexity.multiplier}x
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Country Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">País/Región</h3>
        <Card className="p-6">
          <RadioGroup
            value={selectedCountry || undefined}
            onValueChange={(value) => onCountrySelect(value as Country)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(AJUSTES_PAIS).map((country) => (
                <div
                  key={country.country}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={country.country}
                    id={country.country}
                  />
                  <Label
                    htmlFor={country.country}
                    className="flex-1 cursor-pointer flex justify-between items-center"
                  >
                    <span>{country.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {country.currency}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>
      </div>
    </div>
  );
}
