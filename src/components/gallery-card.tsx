
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface GalleryCardProps {
  imageUrl: string;
  imageHint: string;
  title: string;
  caption: string;
}

export function GalleryCard({ imageUrl, imageHint, title, caption }: GalleryCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out group">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint={imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
        <CardDescription className="mt-2 text-sm text-muted-foreground flex-grow">{caption}</CardDescription>
      </CardContent>
    </Card>
  );
}
