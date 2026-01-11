import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SpotlightCard } from '@/components/spotlight-card';
import { CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ModernPostLayout } from '@/components/blog/ModernPostLayout';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return {
      title: `${post.title} | Ángel Nereira`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [
          {
            url: post.coverImage,
            width: 1200,
            height: 630,
          },
        ] : [],
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Post no encontrado',
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;

  try {
    post = getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  // Obtener posts relacionados
  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <ModernPostLayout
      title={post.title}
      excerpt={post.excerpt}
      date={post.date}
      readingTime={post.readingTime}
      author={post.author}
      tags={post.tags}
      coverImage={post.coverImage}
    >
      {/* Contenido del artículo con ReactMarkdown */}
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-headline prose-p:font-sans prose-img:rounded-xl prose-img:border prose-img:border-primary/10">
        <ReactMarkdown
          components={{
            // Sintaxis highlighting para código
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // Links externos con target blank
            a({ node, href, children, ...props }) {
              const isExternal = href?.startsWith('http');
              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="text-primary hover:underline underline-offset-4 decoration-primary/50"
                  {...props}
                >
                  {children}
                </a>
              );
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* CTA al final */}
      <div className="mt-16 p-8 bg-secondary/10 rounded-2xl border border-primary/20 backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-3 font-headline">¿Te interesa implementar algo similar?</h3>
        <p className="text-muted-foreground mb-6 text-lg">
          Ayudo a empresas a construir soluciones web de alto impacto. Hablemos sobre tu próximo proyecto.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
        >
          Iniciar Conversación
        </Link>
      </div>

      {/* Posts relacionados */}
      {relatedPosts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full inline-block"></span>
            Seguir Leyendo
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group block"
              >
                <SpotlightCard className="h-full hover:border-primary/50 transition-all bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {relatedPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="text-xs text-muted-foreground mt-auto pt-4 border-t border-white/5">
                    {relatedPost.readingTime}
                  </CardFooter>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </div>
      )}
    </ModernPostLayout>
  );
}
