"use client";

import { useEffect } from 'react';
import { trackArticleView, useReadingProgress } from '@/lib/blog/analytics';

interface ArticleReadTrackerProps {
  slug: string;
  title: string;
}

export function ArticleReadTracker({ slug, title }: ArticleReadTrackerProps) {
  useEffect(() => {
    // Track initial view
    trackArticleView(slug, title);

    // Setup reading progress tracking
    const cleanup = useReadingProgress(slug);

    return cleanup;
  }, [slug, title]);

  return null;
}
