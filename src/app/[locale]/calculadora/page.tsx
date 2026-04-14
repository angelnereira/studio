import { Metadata } from 'next';
import { Suspense } from 'react';
import { AnimatedDiv } from '@/components/animated-div';
import { BudgetCalculatorWizard } from '@/components/calculator/budget-calculator-wizard';
import { Calculator, Sparkles } from 'lucide-react';
import { SpotlightCard } from '@/components/spotlight-card';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface CalculadoraPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CalculadoraPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculadora' });
  return {
    title: t('metadata_title'),
    description: t('metadata_description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function CalculadoraPage({ params }: CalculadoraPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculadora');

  return (
    <AnimatedDiv>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t('badge')}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline mb-4">
            {t('title')}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('description')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/70">
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-white/5">
              <Calculator className="h-4 w-4 text-primary" />
              <span>{t('instant_estimate')}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-white/5">
              <span>•</span>
              <span>{t('detailed_breakdown')}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-white/5">
              <span>•</span>
              <span>{t('export_pdf')}</span>
            </div>
          </div>
        </div>

        {/* Calculator Wizard */}
        <Suspense fallback={<div className="w-full h-96 flex items-center justify-center text-muted-foreground">{t('loading')}</div>}>
          <BudgetCalculatorWizard />
        </Suspense>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <SpotlightCard className="text-center p-6 bg-secondary/30 backdrop-blur-sm border-white/5">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{t('info.precision_title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('info.precision_desc')}
            </p>
          </SpotlightCard>

          <SpotlightCard className="text-center p-6 bg-secondary/30 backdrop-blur-sm border-white/5">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{t('info.customization_title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('info.customization_desc')}
            </p>
          </SpotlightCard>

          <SpotlightCard className="text-center p-6 bg-secondary/30 backdrop-blur-sm border-white/5">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">{t('info.transparency_title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('info.transparency_desc')}
            </p>
          </SpotlightCard>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">{t('faq.title')}</h2>

          <div className="space-y-4">
            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {t('faq.q1')}
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">{t('faq.a1')}</p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {t('faq.q2')}
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">{t('faq.a2')}</p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {t('faq.q3')}
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">{t('faq.a3')}</p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {t('faq.q4')}
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">{t('faq.a4')}</p>
            </details>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
}
