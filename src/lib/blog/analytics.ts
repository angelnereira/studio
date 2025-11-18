"use client";

/**
 * Track article view
 */
export function trackArticleView(slug: string, title: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'article_view', {
      article_slug: slug,
      article_title: title,
    });
  }
}

/**
 * Track article read progress
 */
export function trackArticleRead(slug: string, readPercentage: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'article_read', {
      article_slug: slug,
      read_percentage: readPercentage,
    });
  }
}

/**
 * Track article share
 */
export function trackArticleShare(slug: string, platform: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'article_share', {
      article_slug: slug,
      platform: platform,
    });
  }
}

/**
 * Hook to track reading progress
 */
export function useReadingProgress(slug: string) {
  if (typeof window === 'undefined') return;

  const trackedMilestones = new Set<number>();

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollPercentage = Math.round(
      (scrollTop / (documentHeight - windowHeight)) * 100
    );

    // Track milestones: 25%, 50%, 75%, 100%
    const milestones = [25, 50, 75, 100];

    milestones.forEach((milestone) => {
      if (
        scrollPercentage >= milestone &&
        !trackedMilestones.has(milestone)
      ) {
        trackedMilestones.add(milestone);
        trackArticleRead(slug, milestone);
      }
    });
  };

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Cleanup
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
