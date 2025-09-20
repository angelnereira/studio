
"use client";

import * as React from 'react';
import Link from 'next/link';
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { services, Service } from '@/lib/services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpotlightCard } from './spotlight-card';

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: 'start',
};

export const ServicesCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [
    Autoplay({ playOnInit: true, delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const publishedServices = services.filter(s => s.published);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {publishedServices.map((service) => (
            <div className="flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/3 pl-4" key={service.slug}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      {React.cloneElement(service.icon, { className: 'w-6 h-6' })}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardTitle className="text-lg font-bold transition-colors duration-300 ease-geist group-hover:text-primary mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">{service.shortDescription}</CardDescription>
                  </CardContent>
                </SpotlightCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>

        <div className="flex items-center justify-center gap-2">
            {scrollSnaps.map((_, index) => (
            <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                selectedIndex === index ? 'w-4 bg-primary' : 'bg-muted-foreground/50'
                )}
            />
            ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="rounded-full h-8 w-8"
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Siguiente</span>
        </Button>
      </div>
    </div>
  );
};
