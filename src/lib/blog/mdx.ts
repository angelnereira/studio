import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  tags: string[];
  author: {
    name: string;
    image: string;
  };
  readingTime: string;
  featured?: boolean;
}

export interface ArticleWithContent extends Article {
  content: any;
}

/**
 * Get all article slugs
 */
export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * Get article metadata by slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleWithContent | null> {
  try {
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);

    const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content: rawContent } = matter(fileContent);

    // Compile MDX
    const { content } = await compileMDX({
      source: rawContent,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ],
        },
      },
    });

    // Calculate reading time
    const stats = readingTime(rawContent);

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString(),
      coverImage: data.coverImage || '/images/blog/default.jpg',
      tags: data.tags || [],
      author: data.author || {
        name: 'Angel Nereira',
        image: '/images/angel-nereira.jpg',
      },
      readingTime: stats.text,
      featured: data.featured || false,
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * Get all articles sorted by date
 */
export async function getAllArticles(): Promise<Article[]> {
  const slugs = getAllArticleSlugs();

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const article = await getArticleBySlug(slug);
      if (!article) return null;

      // Remove content for list view
      const { content, ...articleMeta } = article;
      return articleMeta;
    })
  );

  return articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}

/**
 * Get articles by tag
 */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter((article) =>
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get related articles
 */
export async function getRelatedArticles(
  currentSlug: string,
  limit: number = 3
): Promise<Article[]> {
  const currentArticle = await getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  const allArticles = await getAllArticles();

  // Filter out current article
  const otherArticles = allArticles.filter((article) => article.slug !== currentSlug);

  // Score articles by tag overlap
  const scoredArticles = otherArticles.map((article) => {
    const commonTags = article.tags.filter((tag) =>
      currentArticle.tags.includes(tag)
    );
    return {
      article,
      score: commonTags.length,
    };
  });

  // Sort by score and get top N
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles();
  const tagsSet = new Set<string>();

  articles.forEach((article) => {
    article.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter((article) => article.featured).slice(0, limit);
}
