"use client";

import { Post } from '@/lib/blog';
import Image from 'next/image';
import PanamaDeepMusicAnalysis from '@/app/blog/panama-deep-music-analysis';
import { MusicArtistComparison } from './music-artist-comparison';

interface BlogPostRendererProps {
  post: Post;
}

export function BlogPostRenderer({ post }: BlogPostRendererProps) {
  if (post.slug === 'analisis-musical-panama') {
    return (
        <>
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mb-8">
                <p className="lead">
                    Este artículo presenta un análisis exhaustivo basado en datos del mercado musical panameño,
                    explorando el crecimiento exponencial de artistas urbanos y su impacto global en el streaming (2019-2025).
                </p>
            </div>

            {/* Herramienta de Comparación Interactiva */}
            <div className="my-16">
              <MusicArtistComparison />
            </div>

            {/* Contenido markdown completo del análisis */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none mx-auto my-12 prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80
              prose-table:w-full prose-table:block prose-table:overflow-x-auto sm:prose-table:table
              prose-thead:bg-primary/10 prose-th:px-2 prose-th:py-2 sm:prose-th:px-4 sm:prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-xs sm:prose-th:text-sm
              prose-td:px-2 prose-td:py-2 sm:prose-td:px-4 sm:prose-td:py-3 prose-td:border-b prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:text-xs sm:prose-td:text-sm
              prose-tr:hover:bg-secondary/50 prose-tr:transition-colors
              [&_table]:min-w-full [&_table]:text-left [&_table]:border-collapse
              [&_table]:shadow-sm [&_table]:rounded-lg [&_table]:overflow-hidden"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-12 p-6 bg-secondary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                    <strong>Fuentes de datos verificadas:</strong> Spotify Charts, YouTube Analytics,
                    Billboard Charts, Forbes, Statista, IFPI, y análisis de mercado de Market Data Forecast.
                    Todos los datos presentados corresponden al período 2019-2025 y han sido compilados
                    para ofrecer una visión objetiva del panorama musical panameño.
                </p>
            </div>
        </>
    );
  }

  return (
    <>
      <div className="relative w-full aspect-[1200/630] mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="blog post cover"
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none mx-auto prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80
        prose-table:w-full prose-table:block prose-table:overflow-x-auto sm:prose-table:table
        prose-thead:bg-primary/10 prose-th:px-2 prose-th:py-2 sm:prose-th:px-4 sm:prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-xs sm:prose-th:text-sm
        prose-td:px-2 prose-td:py-2 sm:prose-td:px-4 sm:prose-td:py-3 prose-td:border-b prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:text-xs sm:prose-td:text-sm
        prose-tr:hover:bg-secondary/50 prose-tr:transition-colors
        [&_table]:min-w-full [&_table]:text-left [&_table]:border-collapse
        [&_table]:shadow-sm [&_table]:rounded-lg [&_table]:overflow-hidden"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />
    </>
  );
}
