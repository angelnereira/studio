import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://angelnereira.com';

  // Static routes
  const routes = [
    '',
    '/proyectos',
    '/services',
    '/contact',
    '/calculadora',
    '/blog', // Assuming you'll have a blog index
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In the future, you can fetch dynamic blog posts here and add them to the sitemap
  // const posts = await getPosts();
  // const postRoutes = posts.map(...)

  return [...routes];
}
