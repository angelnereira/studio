import { getCachedPosts } from '@/lib/blog';
import { AnimatedDiv } from '@/components/animated-div';
import { BlogListInteractive } from '@/components/blog/blog-list-interactive';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('metadata_title'),
    description: t('metadata_description'),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getCachedPosts();
  const t = await getTranslations('blog');

  return (
    <>
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('page_title')}</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            {t('page_description')}
          </p>
        </div>
      </AnimatedDiv>

      <BlogListInteractive posts={posts} />
    </>
  );
}
