import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32 text-center">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
        Tech & Thoughts
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
        My technical blog is currently under construction. Check back soon for articles on development, projects, and professional growth.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
