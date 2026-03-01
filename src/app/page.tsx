import { Metadata } from 'next';
import HomePageClient from '@/components/home-page-client';

export const metadata: Metadata = {
  title: 'Ángel Nereira | Desarrollador Web Full Stack en Panamá',
  description: 'Desarrollador Full Stack en Panamá especializado en Next.js, TypeScript y soluciones SaaS FinTech.',
};

export default function Page() {

  return <HomePageClient />;
}
