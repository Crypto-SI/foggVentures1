
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { NewsCard, type NewsCardProps } from '@/components/news-card';
import Parser from 'rss-parser';

// RSS Parser and data transformation logic are moved directly into this file
// to ensure no non-serializable data is passed from the server component.

interface ParsedRssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  guid?: string;
  isoDate?: string;
  creator?: string;
  enclosure?: {
    url?: string;
    type?: string;
  };
  'media:content'?: {
    '$': {
      url?: string;
      medium?: string;
    };
  };
}

async function getNewsFromRss(feedUrl: string): Promise<ParsedRssItem[]> {
  try {
    const parser = new Parser({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
      }
    });
    console.log(`Fetching RSS feed from: ${feedUrl}`);
    const feed = await parser.parseURL(feedUrl);
    return (feed.items as ParsedRssItem[]) || [];
  } catch (error) {
    console.error('Failed to fetch or parse RSS feed:', error);
    return [];
  }
}

function transformItemToCardProps(item: ParsedRssItem): NewsCardProps {
  let imageUrl = ''; // Start with an empty string

  // 1. Check media:content tag (often the most reliable for images)
  if (item['media:content']?.['$']?.url && item['media:content']?.['$']?.medium === 'image') {
    imageUrl = item['media:content']['$'].url;
  }
  // 2. Check enclosure tag
  else if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
    imageUrl = item.enclosure.url;
  } 
  // 3. Fallback: Parse content for an <img> tag
  else if (item.content) {
    const match = item.content.match(/<img[^>]+src="([^">]+)"/);
    if (match && match[1]) {
      imageUrl = match[1];
    }
  }

  // Final fallback to placeholder if no image was found
  if (!imageUrl) {
    imageUrl = 'https://placehold.co/600x400.png';
  }

  return {
    id: String(item.guid || item.link || item.title || Date.now()),
    title: String(item.title || 'Untitled Article'),
    source: String(item.creator || (item.link ? new URL(item.link).hostname.replace('www.', '') : 'N/A')),
    date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A',
    summary: String(item.contentSnippet || (item.content ? item.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No summary available.')),
    articleUrl: String(item.link || '#'),
    imageUrl: imageUrl,
  };
}


export default async function NewsPage() {
  const newsItems = await getNewsFromRss('https://rss.app/feeds/goLUOP2x85mRXLd6.xml');
  const processedNewsItems: NewsCardProps[] = newsItems.map(transformItemToCardProps);

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
