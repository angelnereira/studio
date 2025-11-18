import type { Article } from './mdx';

interface SEOMetadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
}

interface JSONLDArticle {
  '@context': string;
  '@type': string;
  headline: string;
  image: string;
  author: {
    '@type': string;
    name: string;
    url: string;
    jobTitle: string;
    worksFor: {
      '@type': string;
      name: string;
    };
  };
  publisher: {
    '@type': string;
    name: string;
    logo?: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  description: string;
  keywords?: string;
}

/**
 * Generate SEO metadata for article
 */
export function generateArticleSEO(article: Article): SEOMetadata {
  const baseUrl = 'https://angelnereira.com';
  const articleUrl = `${baseUrl}/blog/${article.slug}`;

  return {
    title: `${article.title} | Ángel Nereira`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.coverImage.startsWith('http')
            ? article.coverImage
            : `${baseUrl}${article.coverImage}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [
        article.coverImage.startsWith('http')
          ? article.coverImage
          : `${baseUrl}${article.coverImage}`,
      ],
    },
  };
}

/**
 * Generate JSON-LD structured data for article
 */
export function generateArticleJSONLD(article: Article): JSONLDArticle {
  const baseUrl = 'https://angelnereira.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    image: article.coverImage.startsWith('http')
      ? article.coverImage
      : `${baseUrl}${article.coverImage}`,
    author: {
      '@type': 'Person',
      name: 'Ángel Nereira',
      url: 'https://angelnereira.com',
      jobTitle: 'Ingeniero de Software',
      worksFor: {
        '@type': 'Organization',
        name: 'UbicSys S.A.',
      },
    },
    publisher: {
      '@type': 'Person',
      name: 'Ángel Nereira',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    description: article.excerpt,
    keywords: article.tags.join(', '),
  };
}

/**
 * Generate blog list page SEO
 */
export function generateBlogListSEO(): SEOMetadata {
  return {
    title: 'Blog | Ángel Nereira - Desarrollo Full Stack, FinTech y AI',
    description:
      'Artículos técnicos sobre desarrollo full stack, Next.js, PostgreSQL, facturación electrónica en Panamá, integración HKA/DGI, y desarrollo con IA. Case studies y tutoriales prácticos.',
    openGraph: {
      title: 'Blog - Ángel Nereira',
      description:
        'Case studies, tutoriales técnicos y experiencias en desarrollo full stack, FinTech y GovTech',
      type: 'website',
      images: [
        {
          url: 'https://angelnereira.com/images/blog-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Blog Ángel Nereira',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - Ángel Nereira',
      description:
        'Case studies, tutoriales técnicos y experiencias en desarrollo full stack',
      images: ['https://angelnereira.com/images/blog-og.jpg'],
    },
  };
}
