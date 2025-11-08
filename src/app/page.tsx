
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutFoggSection } from '@/components/sections/about-fogg-section';
import { BioSection } from '@/components/sections/bio';
import { ServicesSection } from '@/components/sections/services';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutFoggSection />
        <BioSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
