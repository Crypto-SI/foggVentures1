
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { GalleryCard, type GalleryCardProps } from '@/components/gallery-card';

const galleryItems: GalleryCardProps[] = [
  {
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'diplomats meeting',
    title: 'Meeting with the Minister of Foreign Affairs',
    caption: 'Discussing bilateral trade agreements and opportunities for foreign investment in key sectors.',
  },
  {
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'business conference',
    title: 'Speaking at the Guyana Energy Conference',
    caption: 'Presenting insights on the future of sustainable energy and policy development in the region.',
  },
  {
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'handshake deal',
    title: 'Finalizing a Partnership with a Local Enterprise',
    caption: 'A successful collaboration to bring new technology and services to the Guyanese market.',
  },
  {
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ambassador reception',
    title: 'Reception at the British High Commission',
    caption: 'Engaging with international diplomats and business leaders to foster stronger relationships.',
  },
  {
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'podium presentation',
    title: 'Advising a Trade Delegation',
    caption: 'Providing strategic counsel to a delegation on navigating Guyana\'s economic landscape.',
  },
  {
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'charity event',
    title: 'Supporting a Community Initiative',
    caption: 'Participating in a local charity event to support educational programs for young people.',
  },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-primary">
              Gallery
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              A selection of photos from key meetings, events, and engagements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <GalleryCard key={index} {...item} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
