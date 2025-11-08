
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AiAssistantSection } from '@/components/sections/ai-assistant-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Consultation Assistant',
  description:
    'Describe your objectives in Guyana and let the FOGG Ventures AI assistant help shape a tailored engagement path.',
};

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow py-8 sm:py-10">
        <AiAssistantSection />
      </main>
      <Footer />
    </div>
  );
}
