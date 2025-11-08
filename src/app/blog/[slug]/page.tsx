import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { getAllPosts, getPostBySlug } from '@/lib/blogData';
import type { Metadata } from 'next';

interface BlogPostPageParams {
  slug: string;
}

export function generateStaticParams(): BlogPostPageParams[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata(
  { params }: { params: Promise<BlogPostPageParams> }
): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
      return {
        title: 'Insights',
      };
    }

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [
          {
            url: post.imageUrl,
            alt: post.imageHint || post.title,
          },
        ],
      },
    };
  })();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-muted/40">
        <Header />
        <main className="flex-grow py-16">
          <Container>
            <div className="text-center">
              <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
                Article not found
              </h1>
              <p className="mt-4 text-lg text-foreground/80">
                The insight you are looking for may have been moved or is not available.
              </p>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow py-10 sm:py-12 md:py-16">
        <Container>
          <article className="max-w-3xl mx-auto px-1">
            <header className="mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wide">
                FOGG Forecasts
              </p>
              <h1 className="mt-2 font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight">
                {post.title}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-foreground/70">
                {post.date}
              </p>
            </header>
            <section className="prose prose-slate max-w-none text-foreground/90 prose-sm sm:prose-base">
              {paragraphs.map((para, index) => (
                <p key={index} className="mb-4">
                  {para}
                </p>
              ))}
            </section>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}