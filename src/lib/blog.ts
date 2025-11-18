import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage: string;
  content: string;
  readingTime: string;
}

/**
 * Obtener todos los slugs de posts
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

/**
 * Obtener post por slug
 */
export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    content,
    readingTime: stats.text,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    author: data.author || 'Angel Nereira',
    tags: data.tags || [],
    coverImage: data.coverImage || '',
  };
}

/**
 * Obtener todos los posts ordenados por fecha
 */
export function getAllPosts(): Omit<Post, 'content'>[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  // Excluir content para la lista
  return posts.map(({ content, ...post }) => post);
}

/**
 * Buscar posts por tag
 */
export function getPostsByTag(tag: string): Omit<Post, 'content'>[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Obtener posts relacionados basados en tags comunes
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): Omit<Post, 'content'>[] {
  const currentPost = getPostBySlug(currentSlug);
  const allPosts = getAllPosts();

  // Filtrar post actual
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);

  // Calcular score por tags en común
  const scoredPosts = otherPosts.map(post => {
    const commonTags = post.tags.filter(tag =>
      currentPost.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    return {
      post,
      score: commonTags.length,
    };
  });

  // Ordenar por score y retornar top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

/**
 * Obtener todos los tags únicos
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagsSet = new Set<string>();

  allPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
