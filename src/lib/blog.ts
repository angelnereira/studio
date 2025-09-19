import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  wordCount: number;
  coverImage: string;
  ogImage: string;
  content: string;
  htmlContent: string;
};

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    author: data.author,
    excerpt: data.excerpt,
    tags: data.tags,
    coverImage: data.coverImage,
    ogImage: data.ogImage,
    wordCount,
    readingTime,
    content,
    htmlContent: '', // Will be processed separately
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function getPostWithHtml(slug: string): Promise<Post> {
    const post = getPostBySlug(slug);
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(post.content);
    const htmlContent = processedContent.toString();

    return {
        ...post,
        htmlContent
    }
}
