
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Header() {
 const [mobileOpen, setMobileOpen] = useState(false);

 const navItems = [
   { name: 'About', href: '/#about' },
   { name: 'Services', href: '/#services' },
   { name: 'News', href: '/news' },
   { name: 'Contact', href: '/#contact' },
   { name: 'How can we help', href: '/ai-assistant' },
 ];

 const closeMobile = () => setMobileOpen(false);

 return (
   <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
     <Container className="flex h-16 items-center justify-between">
       <Link
         href="/"
         className="flex items-center gap-2"
         onClick={closeMobile}
       >
         <Image
           src="/images/foggicontrans.png"
           alt="FOGG Ventures Icon"
           width={36}
           height={36}
           className="h-9 w-9"
           data-ai-hint="logo"
         />
         <span className="text-xl font-bold text-primary font-headline">
           FOGG Ventures
         </span>
       </Link>

       {/* Desktop nav */}
       <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
         {navItems.map((item) => (
           <Button
             key={item.name}
             variant="ghost"
             asChild
             className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
           >
             <Link href={item.href}>{item.name}</Link>
           </Button>
         ))}
       </nav>

       {/* Mobile menu toggle */}
       <button
         type="button"
         className="inline-flex items-center justify-center md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
         aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
         onClick={() => setMobileOpen((open) => !open)}
       >
         {mobileOpen ? (
           <X className="h-5 w-5" aria-hidden="true" />
         ) : (
           <Menu className="h-5 w-5" aria-hidden="true" />
         )}
       </button>
     </Container>

     {/* Mobile nav overlay */}
     {mobileOpen && (
       <div className="md:hidden border-t border-border/40 bg-background/98 backdrop-blur-sm">
         <nav className="px-4 py-3 space-y-1">
           {navItems.map((item) => (
             <Link
               key={item.name}
               href={item.href}
               onClick={closeMobile}
               className="block w-full rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
             >
               {item.name}
             </Link>
           ))}
         </nav>
       </div>
     )}
   </header>
 );
}
