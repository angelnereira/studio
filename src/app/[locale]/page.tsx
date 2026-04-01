import { Metadata } from 'next';
import HomePageClient from '@/components/home-page-client';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('hero.title') + ' | ' + t('hero.name'),
    description: t('hero.description'),
  };
}

export default function Page() {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ángel Nereira",
    "url": "https://angelnereira.com",
    "image": "https://angelnereira.com/hero-architect.png",
    "jobTitle": "Senior Full Stack Engineer & SaaS Architect",
    "worksFor": {
      "@type": "Organization",
      "name": "UbicSys S.A."
    },
    "sameAs": [
      "https://github.com/angelnereira",
      "https://www.linkedin.com/in/angel-nereira-software-ingineer-and-devops/"
    ]
  };

  const jsonLdSoftwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sago One",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "49.99",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Ángel Nereira"
    },
    "description": "Plataforma SaaS de facturación electrónica certificada por la DGI de Panamá, orientada a PyMEs."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApplication) }}
      />
      <HomePageClient />
    </>
  );
}
