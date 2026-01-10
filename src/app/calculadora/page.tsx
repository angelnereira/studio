import { Metadata } from 'next';
import { Suspense } from 'react';
import { AnimatedDiv } from '@/components/animated-div';
import { BudgetCalculatorWizard } from '@/components/calculator/budget-calculator-wizard';
import { Calculator, Sparkles } from 'lucide-react';
import { SpotlightCard } from '@/components/spotlight-card';

export const metadata: Metadata = {
  title: 'Calculadora de Presupuestos | Ángel Nereira',
  description: 'Calcula el presupuesto estimado para tu proyecto de software. Obtén una cotización detallada en minutos con nuestra calculadora interactiva.',
  openGraph: {
    title: 'Calculadora de Presupuestos de Proyectos',
    description: 'Obtén una cotización detallada para tu proyecto de software en minutos',
  },
};

export const dynamic = 'force-dynamic';

export default function CalculadoraPage() {
  return (
    <AnimatedDiv>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Calculadora Interactiva</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline mb-4">
            Calculadora de Presupuestos
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Obtén una estimación detallada del costo de tu proyecto de software en pocos minutos.
            Nuestra calculadora considera múltiples factores para brindarte un presupuesto preciso y personalizado.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/70">
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-white/5">
              <Calculator className="h-4 w-4 text-primary" />
              <span>Estimación instantánea</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-white/5">
              <span>•</span>
              <span>Desglose detallado</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-white/5">
              <span>•</span>
              <span>Exportar PDF</span>
            </div>
          </div>
        </div>

        {/* Calculator Wizard */}
        <Suspense fallback={<div className="w-full h-96 flex items-center justify-center text-muted-foreground">Cargando calculadora...</div>}>
          <BudgetCalculatorWizard />
        </Suspense>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <SpotlightCard className="text-center p-6 bg-secondary/30 backdrop-blur-sm border-white/5">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Precisión Basada en Datos</h3>
            <p className="text-sm text-muted-foreground">
              Nuestros precios están basados en años de experiencia y análisis del mercado tecnológico
            </p>
          </SpotlightCard>

          <SpotlightCard className="text-center p-6 bg-secondary/30 backdrop-blur-sm border-white/5">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Personalización Total</h3>
            <p className="text-sm text-muted-foreground">
              Ajusta complejidad, urgencia y ubicación para obtener un presupuesto que se adapte a tus necesidades
            </p>
          </SpotlightCard>

          <SpotlightCard className="text-center p-6 bg-secondary/30 backdrop-blur-sm border-white/5">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Transparencia Total</h3>
            <p className="text-sm text-muted-foreground">
              Desglose completo de costos y recomendaciones personalizadas para maximizar el valor de tu inversión
            </p>
          </SpotlightCard>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h2>

          <div className="space-y-4">
            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                ¿Qué tan preciso es el presupuesto calculado?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                El presupuesto es una estimación basada en los parámetros que seleccionas y nuestra experiencia
                en proyectos similares. El costo final puede variar según requisitos específicos adicionales
                que surjan durante el análisis detallado del proyecto.
              </p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                ¿El presupuesto incluye todos los servicios mencionados?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                Sí, el presupuesto base incluye todos los features listados para cada tipo de servicio.
                Los complementos adicionales se agregan por separado y son opcionales pero recomendados
                según el tipo de proyecto.
              </p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                ¿Cuánto tiempo es válida la cotización?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                Las cotizaciones generadas son válidas por 30 días desde la fecha de generación.
                Después de este período, recomendamos generar una nueva cotización para reflejar
                posibles cambios en las condiciones del mercado.
              </p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                ¿Puedo modificar el proyecto después de iniciar?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                Sí, los proyectos son flexibles y pueden ajustarse durante el desarrollo. Sin embargo,
                cambios significativos en el alcance pueden afectar el presupuesto y timeline. Trabajamos
                de forma ágil para adaptarnos a tus necesidades mientras mantenemos transparencia en los costos.
              </p>
            </details>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
}
