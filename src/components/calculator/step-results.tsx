"use client";

import { useState } from 'react';
import { CalculationResult } from '@/types/calculator';
import { formatPrice, formatTimeline } from '@/lib/calculator-logic';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Package,
  AlertCircle,
  Download,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmailDialog } from './email-dialog';
import { useTranslations, useLocale } from 'next-intl';

interface StepResultsProps {
  result: CalculationResult;
  onExportPDF: () => void;
  onSendEmail: () => void;
}

export function StepResults({ result, onExportPDF, onSendEmail }: StepResultsProps) {
  const { priceBreakdown, timeline, service, selectedAddOns, recommendations, currency } = result;
  const t = useTranslations('calculator');
  const locale = useLocale();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('results.title')}</h2>
        <p className="text-muted-foreground">
          {t('results.subtitle')}
        </p>
      </div>

      {/* Main Price Card */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">{t('results.total_project')}</p>
          <p className="text-5xl font-bold text-primary mb-4">
            {formatPrice(priceBreakdown.total, currency)}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatTimeline(timeline.adjustedWeeks)}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>{service.name}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Price Breakdown */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t('results.cost_breakdown')}
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('results.base_price')}</span>
            <span className="font-medium">{formatPrice(priceBreakdown.basePrice, currency)}</span>
          </div>

          {priceBreakdown.complexityAdjustment !== 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('results.complexity_adjustment')}</span>
              <span className="font-medium text-primary">
                +{formatPrice(priceBreakdown.complexityAdjustment, currency)}
              </span>
            </div>
          )}

          {priceBreakdown.countryAdjustment !== 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('results.location_adjustment')}</span>
              <span className="font-medium text-primary">
                {priceBreakdown.countryAdjustment > 0 ? '+' : ''}
                {formatPrice(priceBreakdown.countryAdjustment, currency)}
              </span>
            </div>
          )}

          {priceBreakdown.urgencyAdjustment !== 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('results.urgency_adjustment')}</span>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                +{formatPrice(priceBreakdown.urgencyAdjustment, currency)}
              </span>
            </div>
          )}

          {priceBreakdown.clientTypeAdjustment !== 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('results.client_type_adjustment')}</span>
              <span className="font-medium">
                {priceBreakdown.clientTypeAdjustment > 0 ? '+' : ''}
                {formatPrice(priceBreakdown.clientTypeAdjustment, currency)}
              </span>
            </div>
          )}

          {priceBreakdown.addOnsTotal > 0 && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('results.addons_count', {count: selectedAddOns.length})}</span>
                <span className="font-medium text-primary">
                  +{formatPrice(priceBreakdown.addOnsTotal, currency)}
                </span>
              </div>
            </>
          )}

          <Separator />

          <div className="flex justify-between items-center text-lg font-bold pt-2">
            <span>Total</span>
            <span className="text-primary">{formatPrice(priceBreakdown.total, currency)}</span>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {t('results.timeline_title')}
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('results.estimated_duration')}</span>
            <span className="font-medium">{formatTimeline(timeline.adjustedWeeks)}</span>
          </div>

          {timeline.startDate && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('results.start_date')}</span>
                <span className="font-medium">
                  {new Date(timeline.startDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-PA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {timeline.estimatedEndDate && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('results.estimated_delivery')}</span>
                  <Badge variant="secondary" className="text-sm">
                    {new Date(timeline.estimatedEndDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-PA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Badge>
                </div>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Add-ons List */}
      {selectedAddOns.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            {t('results.addons_included')}
          </h3>

          <div className="space-y-2">
            {selectedAddOns.map((addOn) => (
              <div key={addOn.id} className="flex justify-between items-center py-2">
                <span className="text-sm">{addOn.name}</span>
                <span className="text-sm font-medium text-primary">
                  {formatPrice(addOn.price, currency)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <AlertCircle className="h-5 w-5" />
            {t('results.recommendations')}
          </h3>

          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={onExportPDF}
          className="w-full"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          {t('results.export_pdf')}
        </Button>
        <Button
          onClick={() => setIsEmailDialogOpen(true)}
          variant="outline"
          className="w-full"
          size="default"
        >
          <Mail className="h-4 w-4 mr-2" />
          {t('results.send_email')}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        {t('results.disclaimer')}
      </p>

      <EmailDialog
        result={result}
        open={isEmailDialogOpen}
        onOpenChange={setIsEmailDialogOpen}
      />
    </div>
  );
}
