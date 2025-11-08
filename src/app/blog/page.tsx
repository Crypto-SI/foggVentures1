
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { BlogPostCard } from '@/components/blog-post-card';
import { getPostSummaries } from '@/lib/blogData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'FOGG Forecasts: curated analysis and commentary on Guyana’s political economy, investment climate, and strategic opportunities.',
};

export default function BlogPage() {
  const posts = getPostSummaries();
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-primary">
              FOGG Forecasts
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Strategic insights on Guyana's evolving business, governance, and investment landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
