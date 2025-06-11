
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CalendarDays, NewspaperIcon } from 'lucide-react';

export interface NewsCardProps {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  articleUrl: string;
  imageUrl: string;
  imageHint?: string;
}

export function NewsCard({ title, source, date, summary, articleUrl, imageUrl, imageHint }: NewsCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group bg-card">
      <CardHeader className="p-0">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint={imageHint || 'news business'}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-lg font-semibold text-primary group-hover:text-accent transition-colors mb-2">
          {title}
        </CardTitle>
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <NewspaperIcon className="w-3.5 h-3.5 mr-1.5 text-accent" />
          <span>Source: {source}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-accent" />
          <span>{date}</span>
        </div>
        <p className="text-sm text-card-foreground/80 line-clamp-4">{summary}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" asChild className="w-full border-accent text-accent hover:bg-accent/10 hover:text-accent">
          <Link href={articleUrl} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
