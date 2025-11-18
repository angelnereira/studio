'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SpotlightCard } from '@/components/spotlight-card';
import { AnimatedDiv } from '@/components/animated-div';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

interface BlogListInteractiveProps {
  posts: Post[];
}

export function BlogListInteractive({ posts }: BlogListInteractiveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  return (
    <>
      {/* Interactive Search and Filter Section */}
      <AnimatedDiv delay={0.1}>
        <div className="mt-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <span className="text-sm text-muted-foreground">Filtrar por tema:</span>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "secondary"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
            {(searchQuery || selectedTag) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Limpiar filtros
              </Button>
            )}
          </div>

          {/* Results Count */}
          <p className="text-center text-sm text-muted-foreground">
            {filteredPosts.length === posts.length
              ? `${posts.length} artículo${posts.length !== 1 ? 's' : ''}`
              : `${filteredPosts.length} de ${posts.length} artículo${posts.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>
      </AnimatedDiv>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 mt-8 md:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <AnimatedDiv key={post.slug} delay={0.1 * (index + 1)}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <SpotlightCard className="relative transition-all duration-300 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl h-full flex flex-col">
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {post.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl font-bold transition-colors duration-300 ease-geist group-hover:text-primary break-words">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center gap-2 text-sm text-muted-foreground border-t pt-4">
                    <time dateTime={post.date} className="text-xs">
                      {new Date(post.date).toLocaleDateString('es-PA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                    <span>&middot;</span>
                    <span className="text-xs">{post.readingTime}</span>
                  </CardFooter>
                </SpotlightCard>
              </Link>
            </AnimatedDiv>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No se encontraron artículos que coincidan con tu búsqueda.
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mt-4"
            >
              Ver todos los artículos
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
