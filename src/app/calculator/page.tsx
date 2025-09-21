import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedDiv } from "@/components/animated-div";

export default function CalculatorPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Calculadora de Proyectos</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Define tus necesidades y obtén una estimación de costos al instante.
          </p>
        </div>
      </AnimatedDiv>
      <AnimatedDiv delay={0.2}>
        <div className="mx-auto mt-12 max-w-4xl">
          <Card>
              <CardHeader>
                  <CardTitle>En Construcción</CardTitle>
                  <CardDescription>
                      Esta calculadora interactiva está siendo desarrollada para ayudarte a planificar tu inversión. ¡Vuelve pronto!
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">Mientras tanto, si deseas una cotización, no dudes en <a href="/contact" className="text-primary underline">contactarme directamente</a>.</p>
              </CardContent>
          </Card>
        </div>
      </AnimatedDiv>
    </div>
  );
}
