
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

export interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  imageUrl: string;
  imageHint?: string;
  excerpt: string;
}

export function BlogPostCard({ slug, title, date, imageUrl, imageHint, excerpt }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group">
        <CardHeader className="p-0">
          <div className="aspect-[16/9] relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
              data-ai-hint={imageHint || 'abstract'}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
            {title}
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="w-4 h-4 mr-2 text-accent" />
            <span>{date}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
