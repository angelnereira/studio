"use client";

import dynamic from 'next/dynamic';

const HomePageClient = dynamic(() => import('@/components/home-page-client'), { ssr: false });

export default function Page() {

  return <HomePageClient />;
}
