
import Link from 'next/link';
import Image from 'next/image'; // Added Image import
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button'; 

export function Header() {
  const navItems = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'AI Assist', href: '/ai-assistant' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/foggicontrans.png"
            alt="FOGG Ventures Icon"
            width={36} 
            height={36}
            className="h-9 w-9" // Increased size
          />
          <span className="text-xl font-bold text-primary font-headline">
            FOGG Ventures
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2">
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>
        {/* TODO: Add mobile menu if needed */}
      </Container>
    </header>
  );
}
