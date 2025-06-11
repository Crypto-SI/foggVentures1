
import { Container } from '@/components/container';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 bg-secondary">
      <Container className="text-center text-sm text-secondary-foreground">
        <p>&copy; {new Date().getFullYear()} FOGG Ventures. All rights reserved.</p>
        <p className="mt-1">High-Level Consultancy Services in Guyana.</p>
        <div className="mt-4">
          <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Admin
          </Link>
        </div>
      </Container>
    </footer>
  );
}
