
import Link from 'next/link';
import { getAllArticles } from '@/lib/blog/mdx';
import { generateBlogListSEO } from '@/lib/blog/seo';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/spotlight-card';
import { AnimatedDiv } from '@/components/animated-div';
import { Calendar, Clock } from 'lucide-react';

export async function generateMetadata() {
  return generateBlogListSEO();
}

export default async function BlogPage() {
  const posts = await getAllArticles();

  return (
    <>
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Tech & Thoughts</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Exploraciones sobre arquitectura de software, prácticas de desarrollo y el ecosistema tecnológico desde una perspectiva panameña con visión global.
          </p>
        </div>
      </AnimatedDiv>

      {posts.length === 0 ? (
        <div className="text-center mt-12 p-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No hay artículos publicados aún. ¡Pronto habrá contenido nuevo!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 mt-12 md:grid-cols-2">
          {posts.map((post, index) => (
            <AnimatedDiv key={post.slug} delay={0.1 * (index + 1)}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <SpotlightCard className="relative transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl font-bold transition-colors duration-300 ease-geist group-hover:text-primary break-words">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.image} alt={post.author.name} />
                        <AvatarFallback>AN</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('es-PA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </CardFooter>
                </SpotlightCard>
              </Link>
            </AnimatedDiv>
          ))}
        </div>
      )}
    </>
  );
}
