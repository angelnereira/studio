"use client";

import { Post } from '@/lib/blog';
import Image from 'next/image';
import PanamaDeepMusicAnalysis from '@/app/blog/panama-deep-music-analysis';

interface BlogPostRendererProps {
  post: Post;
}

export function BlogPostRenderer({ post }: BlogPostRendererProps) {
  if (post.slug === 'analisis-musical-panama') {
    return (
        <>
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mb-8">
                <p>
                    Este artículo presenta un análisis interactivo de la escena musical en Panamá, utilizando datos de varias fuentes. 
                    El objetivo es explorar las tendencias, el crecimiento de los artistas y la evolución de los géneros musicales en los últimos años.
                    Todos los datos presentados son para fines demostrativos y se basan en investigaciones de mercado y análisis de tendencias públicas.
                </p>
            </div>
            <PanamaDeepMusicAnalysis />
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
        className="prose prose-lg dark:prose-invert max-w-none mx-auto prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }} 
      />
    </>
  );
}
