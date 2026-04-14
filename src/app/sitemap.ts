import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/blog';
import { projectsData } from '@/lib/projects-and-testimonials';
import { services } from '@/lib/services';

const BASE_URL = 'https://angelnereira.com';
const LOCALES = ['es', 'en'] as const;

/** Genera la URL con prefijo de locale (es = sin prefijo, en = /en/) */
function localeUrl(locale: string, path: string): string {
  const prefix = locale === 'es' ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Rutas estáticas ──────────────────────────────────────────────
  const staticPaths = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/proyectos', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/calculadora', priority: 0.6, changeFrequency: 'yearly' as const },
  ];

  const staticRoutes = staticPaths.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: now,
      changeFrequency,
      priority,
    }))
  );

  // ── Blog posts ───────────────────────────────────────────────────
  let postSlugs: string[] = [];
  try {
    postSlugs = getAllPostSlugs();
  } catch {
    // En entornos de build sin acceso al FS de posts, omitir sin romper
  }

  const blogRoutes = postSlugs.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, `/blog/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // ── Proyectos ────────────────────────────────────────────────────
  const projectRoutes = projectsData.flatMap((project) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, `/proyectos/${project.id}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  // ── Servicios ────────────────────────────────────────────────────
  const publishedServices = services.filter((s) => s.published);
  const serviceRoutes = publishedServices.flatMap((service) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, `/services/${service.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  );

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...serviceRoutes];
}
