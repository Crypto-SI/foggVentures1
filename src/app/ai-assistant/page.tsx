
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AiAssistantSection } from '@/components/sections/ai-assistant-section';

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AiAssistantSection />
      </main>
      <Footer />
    </div>
  );
}
