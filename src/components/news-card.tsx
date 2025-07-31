"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CalendarDays, NewspaperIcon } from 'lucide-react';
import { useState } from 'react';

export interface NewsCardProps {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  articleUrl: string;
  imageUrl: string;
  // imageHint is removed as images will come from the feed or a default placeholder
}

export function NewsCard({ id, title, source, date, summary, articleUrl, imageUrl }: NewsCardProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group bg-card">
      <CardHeader className="p-0">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={currentImageUrl}
            alt={title}
            fill // Changed from layout="fill" to fill for Next 13+
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop for fill
            style={{ objectFit: "cover" }} // Changed from objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            // data-ai-hint is removed
            priority={false} // Consider setting priority for above-the-fold images if applicable
            onError={() => {
              // Fallback to placeholder if image fails to load
              setCurrentImageUrl('https://placehold.co/600x400.png');
            }}
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
