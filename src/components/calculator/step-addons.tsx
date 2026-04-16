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

  const allAddOns = Object.values(ADD_ONS);
  const recommended = allAddOns.filter((a) => recommendedAddOns.includes(a.id));
  const optional = allAddOns.filter((a) => !recommendedAddOns.includes(a.id));

  const totalAddOnsPrice = selectedAddOns.reduce((total, addOnId) => {
    const addOn = ADD_ONS[addOnId];
    return total + (addOn?.price || 0);
  }, 0);

  const renderAddOnCard = (addOn: (typeof allAddOns)[number]) => {
    const isSelected = selectedAddOns.includes(addOn.id);
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
        <div className="flex items-start gap-3 flex-1 mb-3">
          <Checkbox
            id={addOn.id}
            checked={isSelected}
            onCheckedChange={() => onToggleAddOn(addOn.id)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1">
            <Label htmlFor={addOn.id} className="font-semibold cursor-pointer block mb-1">
              {addOn.name}
            </Label>
            <p className="text-sm text-muted-foreground">{addOn.description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          {addOn.estimatedHours && (
            <span className="text-xs text-muted-foreground">~{addOn.estimatedHours}h</span>
          )}
          <span className="text-sm font-bold text-primary ml-auto">
            ${addOn.price.toLocaleString()}
          </span>
        </div>
      </Card>
    );
  };

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

      {recommended.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <h3 className="text-sm font-semibold text-foreground">Recomendados para tu proyecto</h3>
            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
              {recommended.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommended.map(renderAddOnCard)}
          </div>
        </div>
      )}

      {optional.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-muted-foreground">Opcionales</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optional.map(renderAddOnCard)}
          </div>
        </div>
      )}
    </div>
  );
}
