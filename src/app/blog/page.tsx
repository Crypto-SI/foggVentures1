
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { BlogPostCard, type BlogPostCardProps } from '@/components/blog-post-card';

// Mock data for blog posts
const mockBlogPosts: BlogPostCardProps[] = [
  {
    slug: 'guyanas-economic-outlook-2024',
    title: 'Guyana\'s Economic Outlook for 2024: Opportunities Abound',
    date: 'October 26, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'Guyana economy',
    excerpt: 'A deep dive into the promising economic indicators for Guyana in the upcoming year, highlighting key sectors for investment and growth.'
  },
  {
    slug: 'navigating-regulatory-landscapes',
    title: 'Navigating Regulatory Landscapes in Emerging Markets: A Guyana Case Study',
    date: 'November 5, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'legal documents',
    excerpt: 'Understand the complexities of Guyana\'s regulatory environment and learn strategies for successful compliance and market entry.'
  },
  {
    slug: 'sustainable-investment-guyana',
    title: 'The Rise of Sustainable Investment in Guyana',
    date: 'November 18, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'renewable energy',
    excerpt: 'Exploring the growing trend of sustainable and ESG-focused investments in Guyana and how businesses can align with these principles.'
  },
  {
    slug: 'infrastructure-development-spotlight',
    title: 'Infrastructure Development: Guyana\'s Next Frontier',
    date: 'December 2, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'construction site',
    excerpt: 'An overview of major infrastructure projects underway and planned in Guyana, and the opportunities they present for businesses.'
  },
];


export default function BlogPage() {
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
              Insights and analysis on Guyana's evolving business and investment landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogPosts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
