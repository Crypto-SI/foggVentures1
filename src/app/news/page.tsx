
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { NewsCard, type NewsCardProps } from '@/components/news-card';
import Parser from 'rss-parser';
import type { Metadata } from 'next';

// RSS Parser and data transformation logic are moved directly into this file
// to ensure no non-serializable data is passed from the server component.

interface ParsedRssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  'content:encoded'?: string;
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

const FEED_URLS = [
  'https://rss.app/feeds/goLUOP2x85mRXLd6.xml', // original curated feed
  'https://news.google.com/rss/search?q=Guyana&hl=en-GY&gl=GY&ceid=GY:en', // Google News fallback
];

async function getNewsFromRss(feedUrl: string): Promise<ParsedRssItem[]> {
  const parser = new Parser({
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    },
  });

  const feed = await parser.parseURL(feedUrl);

  const safeItems = (feed.items as ParsedRssItem[]).map((item, index) => {
    try {
      const safeItem: ParsedRssItem = {
        title: item.title ?? '',
        link: item.link ?? '',
        pubDate: item.pubDate ?? item.isoDate ?? '',
        contentSnippet: item.contentSnippet ?? '',
        content: item.content ?? '',
        'content:encoded': (item as ParsedRssItem)['content:encoded'] ?? '',
        guid: item.guid ?? '',
        isoDate: item.isoDate ?? '',
        creator: item.creator ?? '',
        enclosure: item.enclosure
          ? {
              url: item.enclosure.url ?? '',
              type: item.enclosure.type ?? '',
            }
          : undefined,
        'media:content': item['media:content']?.['$']
          ? {
              $: {
                url: item['media:content']?.['$']?.url ?? '',
                medium: item['media:content']?.['$']?.medium ?? '',
              },
            }
          : undefined,
      };

      console.log('[NewsPage] RSS item parsed', {
        index,
        feedUrl,
        title: safeItem.title,
        link: safeItem.link,
        hasContent: !!safeItem.content,
        hasEnclosure: !!safeItem.enclosure?.url,
        hasMediaContent: !!safeItem['media:content']?.['$']?.url,
      });

      return safeItem;
    } catch (e) {
      console.warn('[NewsPage] Failed to sanitize RSS item', {
        feedUrl,
        index,
        rawItemType: typeof item,
        message: e instanceof Error ? e.message : String(e),
      });
      return {
        title: 'Invalid item skipped',
        link: '',
      } as ParsedRssItem;
    }
  });

  return safeItems;
}

async function getNewsWithFallback(): Promise<ParsedRssItem[]> {
  for (const feedUrl of FEED_URLS) {
    try {
      console.log('[NewsPage] Attempting to fetch feed', feedUrl);
      const items = await getNewsFromRss(feedUrl);
      if (items.length > 0) {
        console.log('[NewsPage] Using feed', feedUrl, 'with item count', items.length);
        return items;
      }

      console.warn('[NewsPage] Feed returned 0 items', feedUrl);
    } catch (error) {
      console.warn('[NewsPage] Failed to fetch feed', feedUrl, error instanceof Error ? error.message : error);
    }
  }

  console.warn('[NewsPage] All feeds failed; returning empty list');
  return [];
}

function getSourceFromLink(link?: string): string {
  if (!link) {
    return 'N/A';
  }

  try {
    const hostname = new URL(link).hostname.replace(/^www\./, '');
    return hostname || 'N/A';
  } catch (error) {
    console.warn('[NewsPage] Unable to derive hostname from link', link, error);
    return 'N/A';
  }
}

function stripHtml(html?: string): string {
  if (!html) {
    return '';
  }

  return html.replace(/<[^>]*>?/gm, '');
}

function transformItemToCardProps(item: ParsedRssItem): NewsCardProps {
  const summaryText =
    item.contentSnippet ||
    stripHtml(item.content).substring(0, 150) ||
    stripHtml(item['content:encoded']).substring(0, 150);

  return {
    id: String(item.guid || item.link || item.title || Date.now()),
    title: String(item.title || 'Untitled Article'),
    source: String(item.creator || getSourceFromLink(item.link)),
    date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A',
    summary: summaryText ? `${summaryText}...` : 'No summary available.',
    articleUrl: String(item.link || '#'),
  };
}


export const metadata: Metadata = {
  title: 'Guyana Economic News',
  description:
    'Curated Guyana economic and policy headlines relevant to investors, policymakers, and strategic partners.',
};

export const revalidate = 600;

export default async function NewsPage() {
  let processedNewsItems: NewsCardProps[] = [];

  try {
    const newsItems = await getNewsWithFallback();

    console.log('[NewsPage] Total RSS items fetched:', Array.isArray(newsItems) ? newsItems.length : 'non-array');

    if (Array.isArray(newsItems)) {
      processedNewsItems = newsItems
        .filter((item, index) => {
          const isObject = item && typeof item === 'object';
          const hasIdSource =
            typeof (item as any).guid === 'string' ||
            typeof (item as any).link === 'string' ||
            typeof (item as any).title === 'string';

          if (!isObject || !hasIdSource) {
            console.warn('[NewsPage] Skipping invalid RSS item at index', index, {
              type: typeof item,
              isObject,
              hasIdSource,
              keys: isObject ? Object.keys(item as any).slice(0, 10) : null,
            });
            return false;
          }

          return true;
        })
        .map(transformItemToCardProps);
    } else {
      console.error('[NewsPage] RSS items is not an array; got:', typeof newsItems);
      processedNewsItems = [];
    }
  } catch (error) {
    console.error('[NewsPage] Unexpected error while building news items:', error);
    processedNewsItems = [];
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow py-10 sm:py-12 md:py-16">
        <Container>
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              Guyana Economic News & Forecasts
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto">
              Curated headlines and analysis relevant to investors, policymakers, and partners focused on Guyana's growth story.
            </p>
          </div>

          {processedNewsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {processedNewsItems.map((article) => (
                <NewsCard key={article.id} {...article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No news articles are available at the moment. Please check back shortly for the latest Guyana economic updates.
              </p>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
