import { getAllArticles } from '@/lib/blog/mdx';

export async function GET() {
  const baseUrl = 'https://angelnereira.com';
  const articles = await getAllArticles();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ángel Nereira Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Artículos técnicos sobre desarrollo full stack, Next.js, PostgreSQL, FinTech y AI. Case studies y experiencias reales de un Ingeniero de Software.</description>
    <language>es-PA</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/blog/${article.slug}</link>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${article.slug}</guid>
      ${article.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
      <author>${article.author.name}</author>
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
