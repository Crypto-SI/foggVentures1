
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { BioSection } from '@/components/sections/bio';
import { ServicesSection } from '@/components/sections/services';
import { AiAssistantSection } from '@/components/sections/ai-assistant-section';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BioSection />
        <ServicesSection />
        <AiAssistantSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
