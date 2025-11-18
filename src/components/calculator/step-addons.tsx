"use client";

import { AddOnType, ServiceType } from '@/types/calculator';
import { ADD_ONS, RECOMMENDATIONS_BY_SERVICE } from '@/lib/calculator-constants';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check, Star } from 'lucide-react';

interface StepAddOnsProps {
  selectedAddOns: AddOnType[];
  serviceType: ServiceType;
  onToggleAddOn: (addOn: AddOnType) => void;
}

export function StepAddOns({
  selectedAddOns,
  serviceType,
  onToggleAddOn,
}: StepAddOnsProps) {
  const recommendedAddOns = RECOMMENDATIONS_BY_SERVICE[serviceType] || [];

  // Sort add-ons: recommended first
  const sortedAddOns = Object.values(ADD_ONS).sort((a, b) => {
    const aRecommended = recommendedAddOns.includes(a.id);
    const bRecommended = recommendedAddOns.includes(b.id);

    if (aRecommended && !bRecommended) return -1;
    if (!aRecommended && bRecommended) return 1;
    return 0;
  });

  const totalAddOnsPrice = selectedAddOns.reduce((total, addOnId) => {
    const addOn = ADD_ONS[addOnId];
    return total + (addOn?.price || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Complementos y Servicios Adicionales</h2>
        <p className="text-muted-foreground">
          Mejora tu proyecto con estos servicios complementarios
        </p>
      </div>

      {selectedAddOns.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {selectedAddOns.length} complemento{selectedAddOns.length !== 1 ? 's' : ''} seleccionado{selectedAddOns.length !== 1 ? 's' : ''}
            </span>
            <span className="text-lg font-bold text-primary">
              +${totalAddOnsPrice.toLocaleString()}
            </span>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedAddOns.map((addOn) => {
          const isSelected = selectedAddOns.includes(addOn.id);
          const isRecommended = recommendedAddOns.includes(addOn.id);

          return (
            <Card
              key={addOn.id}
              className={`p-5 cursor-pointer transition-all hover:shadow-md ${
                isSelected
                  ? 'border-primary border-2 bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onToggleAddOn(addOn.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox
                    id={addOn.id}
                    checked={isSelected}
                    onCheckedChange={() => onToggleAddOn(addOn.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label
                        htmlFor={addOn.id}
                        className="font-semibold cursor-pointer"
                      >
                        {addOn.name}
                      </Label>
                      {isRecommended && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100"
                        >
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Recomendado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {addOn.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                {addOn.estimatedHours && (
                  <span className="text-xs text-muted-foreground">
                    ~{addOn.estimatedHours}h
                  </span>
                )}
                <span className="text-sm font-bold text-primary ml-auto">
                  ${addOn.price.toLocaleString()}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <div className="flex gap-2">
          <Star className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
              Complementos Recomendados
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-200">
              Hemos marcado los complementos más relevantes para tu tipo de proyecto.
              Estos servicios suelen maximizar el valor y éxito del proyecto.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
