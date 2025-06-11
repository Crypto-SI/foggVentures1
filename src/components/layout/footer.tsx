import { Container } from '@/components/container';

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 bg-secondary">
      <Container className="text-center text-sm text-secondary-foreground">
        <p>&copy; {new Date().getFullYear()} FOGG Ventures. All rights reserved.</p>
        <p className="mt-1">High-Level Consultancy Services in Guyana.</p>
      </Container>
    </footer>
  );
}
