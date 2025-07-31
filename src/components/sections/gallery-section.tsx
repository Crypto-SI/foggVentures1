
import Image from 'next/image';
import { Container } from '@/components/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GalleryItem {
  src: string;
  alt: string;
  hint: string;
  title: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: 'https://placehold.co/600x400.png',
    alt: 'Guyana Parliament Building',
    hint: 'government building',
    title: 'Government & Public Affairs',
  },
  {
    src: 'https://placehold.co/600x400.png',
    alt: 'Offshore oil rig',
    hint: 'oil rig',
    title: 'Energy Sector',
  },
  {
    src: 'https://placehold.co/600x400.png',
    alt: 'Kaieteur Falls in Guyana',
    hint: 'waterfall nature',
    title: 'Natural Resources',
  },
  {
    src: 'https://placehold.co/600x400.png',
    alt: 'Modern infrastructure project',
    hint: 'modern architecture',
    title: 'Infrastructure Development',
  },
  {
    src: 'https://placehold.co/600x400.png',
    alt: 'Lush agricultural fields',
    hint: 'agriculture fields',
    title: 'Agriculture & Investment',
  },
  {
    src: 'https://placehold.co/600x400.png',
    alt: 'Business handshake meeting',
    hint: 'business meeting',
    title: 'Strategic Partnerships',
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-secondary">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            Areas of Expertise
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
            Visual highlights from key sectors and successful engagements in Guyana.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.hint}
                    className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 bg-card">
                <CardTitle className="text-lg font-semibold text-primary text-center">
                  {item.title}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
