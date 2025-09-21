import { getPostWithHtml, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AnimatedDiv } from '@/components/animated-div';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostWithHtml(params.slug);
    
    if (!post) {
      return {
        title: 'Post no encontrado',
      };
    }

    return {
      title: `${post.title} | Ángel Nereira`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [
          {
            url: post.ogImage,
            width: 1200,
            height: 630,
          },
        ],
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.ogImage],
      },
    };
  } catch (error) {
     return {
      title: 'Post no encontrado',
    };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPostWithHtml(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <AnimatedDiv>
      <article className="container max-w-4xl py-12 md:py-24">
        <header className="mb-8 text-center">
          <div className="mb-4 flex justify-center gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
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
            <span>{post.readingTime} min de lectura</span>
          </div>
        </header>

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

      </article>
    </AnimatedDiv>
  );
}
