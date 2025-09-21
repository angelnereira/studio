import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/spotlight-card';
import { AnimatedDiv } from '@/components/animated-div';

export const metadata = {
  title: 'Blog | Ángel Nereira',
  description: 'Artículos sobre desarrollo de software, arquitectura en la nube, y el viaje de aprendizaje de un ingeniero panameño.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-24 lg:py-32">
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Tech & Thoughts</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Exploraciones sobre arquitectura de software, prácticas de desarrollo y el ecosistema tecnológico desde una perspectiva panameña con visión global.
          </p>
        </div>
      </AnimatedDiv>

      <div className="grid gap-8 mt-12">
        {posts.map((post, index) => (
          <AnimatedDiv key={post.slug} delay={0.1 * (index + 1)}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <SpotlightCard className="relative transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                  <CardTitle className="text-2xl font-bold transition-colors duration-300 ease-geist group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/profile/100/100" alt="Ángel Nereira" />
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                  </div>
                  <span className="text-xs">{new Date(post.date).toLocaleDateString('es-PA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>&middot;</span>
                  <span className="text-xs">{post.readingTime} min de lectura</span>
                </CardFooter>
              </SpotlightCard>
            </Link>
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
}
