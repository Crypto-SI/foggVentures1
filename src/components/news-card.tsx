"use client";

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
}

export function NewsCard({ title, source, date, summary, articleUrl }: NewsCardProps) {
  const openArticle = () => {
    window.open(articleUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card cursor-pointer"
      role="link"
      tabIndex={0}
      onClick={openArticle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openArticle();
        }
      }}
    >
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <NewspaperIcon className="w-3.5 h-3.5 text-accent" />
          <span className="font-medium">{source}</span>
          <span className="text-muted-foreground/60">•</span>
          <div className="inline-flex items-center gap-1">
            <CalendarDays className="w-3 h-3 text-accent" />
            <span>{date}</span>
          </div>
        </div>
        <CardTitle className="mt-3 text-xl font-semibold text-card-foreground group-hover:text-accent transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 text-sm text-card-foreground/80 flex-grow">
        <p className="line-clamp-5 leading-relaxed">{summary}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button
          variant="outline"
          className="w-full border-accent text-accent hover:bg-accent/10 hover:text-accent"
          onClick={(event) => {
            event.stopPropagation();
            openArticle();
          }}
        >
          Read More <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
