import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AnimatedDiv } from '@/components/animated-div';
import { SpotlightCard } from '@/components/spotlight-card';
import { CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  let post;
  try {
    const { slug } = await params;
    post = getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  // Obtener posts relacionados
  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <AnimatedDiv>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="mb-4 flex justify-center gap-2 flex-wrap">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/profile/100/100" alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.author}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('es-PA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <Separator orientation="vertical" className="h-4" />
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Contenido del artículo con ReactMarkdown */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
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
        <div className="mt-12 p-8 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-2xl font-bold mb-2">¿Necesitas un proyecto similar?</h3>
          <p className="text-muted-foreground mb-4">
            Desarrollo soluciones web personalizadas con Next.js, TypeScript y PostgreSQL.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contáctame
          </Link>
        </div>

        {/* Posts relacionados */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <SpotlightCard className="h-full hover:border-primary/50 transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="text-xs text-muted-foreground">
                      {relatedPost.readingTime}
                    </CardFooter>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </AnimatedDiv>
  );
}
