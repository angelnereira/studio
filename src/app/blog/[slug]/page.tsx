import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/blog/mdx';
import { generateArticleSEO, generateArticleJSONLD } from '@/lib/blog/seo';
import { AnimatedDiv } from '@/components/animated-div';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { ArticleReadTracker } from '@/components/blog/article-read-tracker';
import { ShareButtons } from '@/components/blog/share-buttons';

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  const seo = generateArticleSEO(article);

  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(params.slug, 3);
  const jsonLd = generateArticleJSONLD(article);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Read Tracker */}
      <ArticleReadTracker slug={article.slug} title={article.title} />

      <article className="mx-auto max-w-4xl">
        {/* Back Button */}
        <AnimatedDiv>
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Button>
          </Link>
        </AnimatedDiv>

        {/* Article Header */}
        <AnimatedDiv delay={0.1}>
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8">{article.excerpt}</p>

            {/* Author & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">Ingeniero de Software</p>
                </div>
              </div>

              <Separator orientation="vertical" className="hidden sm:block h-12" />

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('es-PA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </div>

            <Separator className="mt-8" />
          </header>
        </AnimatedDiv>

        {/* Article Content */}
        <AnimatedDiv delay={0.2}>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12
            prose-headings:font-headline prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-secondary prose-pre:border prose-pre:border-border
            prose-img:rounded-lg prose-img:shadow-lg
            prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-foreground/90
            prose-strong:text-foreground prose-strong:font-semibold
            prose-table:border prose-table:border-border
            prose-th:bg-secondary prose-th:p-3
            prose-td:p-3 prose-td:border prose-td:border-border"
          >
            {article.content}
          </div>
        </AnimatedDiv>

        {/* Share Buttons */}
        <AnimatedDiv delay={0.3}>
          <div className="my-12">
            <ShareButtons
              url={`https://angelnereira.com/blog/${article.slug}`}
              title={article.title}
              slug={article.slug}
            />
          </div>
        </AnimatedDiv>

        <Separator className="my-12" />

        {/* CTA Section */}
        <AnimatedDiv delay={0.4}>
          <div className="my-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-3">¿Necesitas desarrollo de software?</h3>
            <p className="text-muted-foreground mb-6">
              Trabajo con empresas de FinTech y GovTech para crear soluciones escalables y
              robustas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/services">
                <Button size="lg">Ver Servicios</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contáctame
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedDiv>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <>
            <Separator className="my-12" />
            <AnimatedDiv delay={0.5}>
              <div className="my-12">
                <h2 className="text-3xl font-bold mb-8">Artículos Relacionados</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group"
                    >
                      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex gap-2 mb-3">
                            {related.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {related.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {related.excerpt}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedDiv>
          </>
        )}
      </article>
    </>
  );
}
