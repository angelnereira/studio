"use client";

import { UrgencyLevel } from '@/types/calculator';
import { MULTIPLICADORES_URGENCIA } from '@/lib/calculator-constants';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, Calendar, Clock, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface StepTimelineProps {
  selectedUrgency: UrgencyLevel | null;
  startDate: string;
  onUrgencySelect: (urgency: UrgencyLevel) => void;
  onStartDateChange: (date: string) => void;
}

const urgencyIcons = {
  normal: Clock,
  urgente: Zap,
  'muy-urgente': Zap,
};

export function StepTimeline({
  selectedUrgency,
  startDate,
  onUrgencySelect,
  onStartDateChange,
}: StepTimelineProps) {
  const t = useTranslations('calculator');
  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('timeline.title')}</h2>
        <p className="text-muted-foreground">
          {t('timeline.subtitle')}
        </p>
      </div>

      {/* Urgency Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('timeline.urgency_level')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(MULTIPLICADORES_URGENCIA).map((urgency) => {
            const isSelected = selectedUrgency === urgency.level;
            const Icon = urgencyIcons[urgency.level];

            return (
              <Card
                key={urgency.level}
                className={`p-5 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-primary border-2 bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onUrgencySelect(urgency.level)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`h-5 w-5 ${
                        urgency.level === 'muy-urgente'
                          ? 'text-red-500'
                          : urgency.level === 'urgente'
                          ? 'text-orange-500'
                          : 'text-blue-500'
                      }`}
                    />
                    <h4 className="font-semibold">{urgency.name}</h4>
                  </div>
                  {isSelected && (
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {urgency.description}
                </p>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-xs text-muted-foreground">
                    {t('timeline.reduction')}: {urgency.timeReduction}
                  </span>
                  <span className="text-xs font-medium text-primary">
                    +{((urgency.multiplier - 1) * 100).toFixed(0)}%
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Start Date Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('timeline.start_date_title')}</h3>
        <Card className="p-6">
          <div className="space-y-3">
            <Label htmlFor="start-date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('timeline.start_date_question')}
            </Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              min={today}
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground">
              {t('timeline.start_date_help')}
            </p>
          </div>
        </Card>
      </div>

      {/* Info card */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>{t('timeline.note_label')}:</strong> {t('timeline.note_body')}
        </p>
      </Card>
    </div>
  );
}
