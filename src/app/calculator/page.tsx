import { Metadata } from 'next';
import { AnimatedDiv } from '@/components/animated-div';
import { BudgetCalculatorWizard } from '@/components/calculator/budget-calculator-wizard';
import { Calculator, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Budget Calculator | Ángel Nereira',
  description: 'Calculate the estimated budget for your software project. Get a detailed quote in minutes with our interactive calculator.',
  openGraph: {
    title: 'Project Budget Calculator',
    description: 'Get a detailed quote for your software project in minutes',
  },
};

export default function CalculatorPage() {
  return (
    <AnimatedDiv>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Interactive Calculator</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline mb-4">
            Project Budget Calculator
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Get a detailed cost estimate for your software project in just a few minutes.
            Our calculator considers multiple factors to provide you with an accurate and personalized budget.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Instant estimation</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>Detailed breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>Export to PDF</span>
            </div>
          </div>
        </div>

        {/* Calculator Wizard */}
        <BudgetCalculatorWizard />

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Data-Driven Precision</h3>
            <p className="text-sm text-muted-foreground">
              Our pricing is based on years of experience and analysis of the tech market
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Full Customization</h3>
            <p className="text-sm text-muted-foreground">
              Adjust complexity, urgency, and location to get a budget tailored to your needs
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Complete Transparency</h3>
            <p className="text-sm text-muted-foreground">
              Full cost breakdown and personalized recommendations to maximize your investment value
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                How accurate is the calculated budget?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                The budget is an estimate based on the parameters you select and our experience
                with similar projects. The final cost may vary depending on specific additional requirements
                that arise during detailed project analysis.
              </p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                Does the budget include all mentioned services?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                Yes, the base budget includes all listed features for each service type.
                Additional add-ons are listed separately and are optional but recommended
                based on the project type.
              </p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                How long is the quote valid?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                Generated quotes are valid for 30 days from the date of generation.
                After this period, we recommend generating a new quote to reflect
                possible changes in market conditions.
              </p>
            </details>

            <details className="group p-6 bg-secondary/50 rounded-lg">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                Can I modify the project after starting?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground">
                Yes, projects are flexible and can be adjusted during development. However,
                significant changes in scope may affect the budget and timeline. We work
                in an agile manner to adapt to your needs while maintaining cost transparency.
              </p>
            </details>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
}
