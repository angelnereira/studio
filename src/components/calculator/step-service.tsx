"use client";

import { ServiceType } from '@/types/calculator';
import { SERVICIOS_BASE } from '@/lib/calculator-constants';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface StepServiceProps {
  selectedService: ServiceType | null;
  onSelect: (service: ServiceType) => void;
}

export function StepService({ selectedService, onSelect }: StepServiceProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">¿Qué tipo de proyecto necesitas?</h2>
        <p className="text-muted-foreground">
          Selecciona el servicio que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(SERVICIOS_BASE).map((service) => {
          const isSelected = selectedService === service.id;

          return (
            <Card
              key={service.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? 'border-primary border-2 bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onSelect(service.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                {isSelected && (
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>

              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="secondary">
                  {service.estimatedWeeks} semanas
                </Badge>
                <Badge variant="outline">
                  desde ${(service.basePrice / 1000).toFixed(0)}k
                </Badge>
              </div>

              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="text-primary">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
