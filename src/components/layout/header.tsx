import Link from 'next/link';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button'; // Using Button for consistent styling if needed for nav items
import { ShieldEllipsis } from 'lucide-react'; // Example icon, replace if needed

export function Header() {
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <ShieldEllipsis className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary font-headline">
            GuyanaGovConnect
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
           <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
             <Link href="#contact">Book Consultation</Link>
           </Button>
        </nav>
        {/* TODO: Add mobile menu if needed */}
      </Container>
    </header>
  );
}
