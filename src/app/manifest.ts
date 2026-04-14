import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ángel Nereira — Full Stack Engineer',
    short_name: 'Ángel Nereira',
    description:
      'Portafolio profesional de Ángel Nereira. Ingeniero Full Stack especializado en FinTech, GovTech y SaaS.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#7c3aed',
    orientation: 'portrait-primary',
    lang: 'es',
    categories: ['portfolio', 'business', 'productivity'],
    icons: [
      {
        src: '/images/avatar.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/avatar.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/images/hero-architect.png',
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Portafolio de Ángel Nereira',
      },
    ],
  };
}
