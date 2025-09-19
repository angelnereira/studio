import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Website & App Creation",
    description: "Full-stack development of modern, performant, and scalable web and mobile applications.",
    features: ["Responsive Design", "API Integration", "Database Architecture", "Deployment & Hosting"],
    price: "Starts at $2000"
  },
  {
    title: "Technical Consulting & Mentorship",
    description: "Expert guidance to help your team navigate technical challenges and grow their skills.",
    features: ["Code Reviews", "Architecture Planning", "Performance Optimization", "Team Training"],
    price: "$150/hour"
  },
  {
    title: "Software Design & Architecture",
    description: "Designing robust, scalable, and maintainable software systems from the ground up.",
    features: ["System Design", "Technology Stack Selection", "Scalability Planning", "Security Audits"],
    price: "Custom Quote"
  }
];

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">My Services</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Providing professional services to bring your digital ideas to life.
          </p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-2xl font-bold">{service.price}</div>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild className="w-full">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
