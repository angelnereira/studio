"use client";

import { Button } from '@/components/ui/button';
import { trackArticleShare } from '@/lib/blog/analytics';
import { Share2, Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  slug: string;
}

export function ShareButtons({ url, title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const handleShare = (platform: string, link?: string) => {
    trackArticleShare(slug, platform);

    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer,width=600,height=600');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackArticleShare(slug, 'copy-link');

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Share2 className="h-5 w-5 text-muted-foreground" />
        <span className="font-semibold">Compartir artículo</span>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter', shareLinks.twitter)}
          className="gap-2"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin', shareLinks.linkedin)}
          className="gap-2"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook', shareLinks.facebook)}
          className="gap-2"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="gap-2"
        >
          <Link2 className="h-4 w-4" />
          {copied ? '¡Copiado!' : 'Copiar link'}
        </Button>
      </div>
    </div>
  );
}
