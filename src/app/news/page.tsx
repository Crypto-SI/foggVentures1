
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { NewsCard, type NewsCardProps } from '@/components/news-card';
import type { ParsedRssItem } from '@/lib/news-utils'; // We'll define this
import { getNewsFromMockRss } from '@/lib/news-utils'; // We'll create this

// Helper to transform ParsedRssItem to NewsCardProps
function transformRssItemToNewsCardProps(item: ParsedRssItem): NewsCardProps {
  // Attempt to find an image URL
  let imageUrl = 'https://placehold.co/600x400.png'; // Default placeholder
  if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    imageUrl = item.enclosure.url;
  } else if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url && item['media:content'].$.medium === 'image') {
    imageUrl = item['media:content'].$.url;
  }
  // More advanced image extraction from item.content or item.contentEncoded could be added here if needed

  return {
    id: item.guid || item.link || item.title || Date.now().toString(), // Ensure a unique ID
    title: item.title || 'Untitled Article',
    source: item.creator || new URL(item.link || 'https://example.com').hostname, // Fallback to hostname
    date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A',
    summary: item.contentSnippet || item.content?.substring(0, 150) + '...' || 'No summary available.',
    articleUrl: item.link || '#',
    imageUrl: imageUrl,
    // data-ai-hint is not typically used when images come from a feed
  };
}


export default async function NewsPage() {
  // In a real scenario, getNewsFromRss would fetch and parse the actual RSS feed.
  // For now, it returns mock data.
  const newsItems: ParsedRssItem[] = await getNewsFromMockRss();
  const processedNewsItems: NewsCardProps[] = newsItems.map(transformRssItemToNewsCardProps);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-primary">
              Guyana Economic News & Forecasts
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Stay updated with the latest developments and economic outlook for Guyana.
            </p>
          </div>

          {processedNewsItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processedNewsItems.map((article) => (
                <NewsCard key={article.id} {...article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No news articles available at the moment. Please check back later.</p>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
