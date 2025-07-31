
import Parser from 'rss-parser';

export interface ParsedRssItem {
  title?: string;
  link?: string;
  pubDate?: string; // Or Date object depending on parser
  contentSnippet?: string;
  content?: string; // Full content, often HTML
  guid?: string;
  isoDate?: string; // ISO 8601 date string
  creator?: string; // Author or source
  enclosure?: {
    url?: string;
    type?: string;
    length?: string;
  };
  'media:content'?: { // For Media RSS
    $: {
      url?: string;
      type?: string;
      medium?: string; // e.g., 'image'
      width?: string;
      height?: string;
    };
  };
  // Add other fields as needed based on typical RSS structures
}

// Add a User-Agent header to mimic a browser and prevent being blocked.
const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  }
});

export async function getNewsFromRss(feedUrl: string): Promise<ParsedRssItem[]> {
  try {
    console.log(`Fetching RSS feed from: ${feedUrl}`);
    const feed = await parser.parseURL(feedUrl);
    // The rss-parser library types items as a mix of its own type and a generic object.
    // We cast it here to our ParsedRssItem interface for consistency.
    return (feed.items as ParsedRssItem[]) || [];
  } catch (error) {
    console.error('Failed to fetch or parse RSS feed:', error);
    // Return an empty array in case of an error to prevent the page from crashing.
    return [];
  }
}
