import { getAllPosts } from '@/lib/blog';
import { AnimatedDiv } from '@/components/animated-div';
import { BlogListInteractive } from '@/components/blog/blog-list-interactive';

export const metadata = {
  title: 'Blog | Ángel Nereira',
  description: 'Artículos sobre desarrollo de software, arquitectura en la nube, y el viaje de aprendizaje de un ingeniero panameño.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

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

      <BlogListInteractive posts={posts} />
    </>
  );
}
