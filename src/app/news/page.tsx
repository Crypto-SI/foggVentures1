
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { NewsCard, type NewsCardProps } from '@/components/news-card';

// Mock data for news articles
const mockNewsArticles: NewsCardProps[] = [
  {
    id: 'news-1',
    title: "Guyana's Q3 Economic Growth Exceeds Expectations, Oil Sector Leads Charge",
    source: 'Guyana Chronicle',
    date: 'October 28, 2023',
    summary: 'The latest figures released by the Ministry of Finance show robust economic growth in the third quarter, primarily driven by increased oil production and strong performances in the services sector. Non-oil growth also shows positive trends.',
    articleUrl: '#', // Replace with actual URL if available
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'Guyana oil rig',
  },
  {
    id: 'news-2',
    title: 'Government Announces New Incentives for Agricultural Investment',
    source: 'Stabroek News',
    date: 'October 25, 2023',
    summary: 'In a bid to diversify the economy, new incentives and support programs have been announced for local and international investors in the agricultural sector, focusing on sustainable farming and food security.',
    articleUrl: '#',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'agriculture Guyana',
  },
  {
    id: 'news-3',
    title: 'International Monetary Fund Upgrades Guyana\'s Economic Forecast for 2024',
    source: 'Reuters',
    date: 'October 22, 2023',
    summary: 'The IMF has revised its economic outlook for Guyana, projecting even stronger GDP growth for the upcoming year based on continued expansion in the energy sector and prudent fiscal management.',
    articleUrl: '#',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'economic chart graph',
  },
  {
    id: 'news-4',
    title: 'Tech Hub Initiative Launched to Boost Digital Economy',
    source: 'Department of Public Information',
    date: 'October 19, 2023',
    summary: 'A new government-led initiative aims to foster a vibrant technology ecosystem in Guyana, providing training, funding, and infrastructure to support startups and digital innovation.',
    articleUrl: '#',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'technology computer code',
  },
];

export default function NewsPage() {
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

          {mockNewsArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockNewsArticles.map((article) => (
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
