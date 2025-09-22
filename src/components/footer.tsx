'use client';

import Link from 'next/link';
import { Instagram, Facebook, Copyright } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Footer() {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // This logic runs only on the client, after hydration.
    // It prevents a mismatch between server and client render.
    setShowFooter(pathname !== '/');
  }, [pathname]);

  if (!showFooter) {
    return null;
  }

  return (
    <footer className={cn('bg-primary text-primary-foreground font-sans mt-auto')}>
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Columna de Copyright */}
        <div className="flex items-center text-sm">
          <Copyright className="h-4 w-4 mr-2" />
          <span>{currentYear} EcoRastro. Todos los derechos reservados.</span>
        </div>

        {/* Columna de Redes Sociales */}
        <div className="flex items-center justify-center md:justify-end space-x-4">
          <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors" aria-label="Instagram de EcoRastro">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors" aria-label="Facebook de EcoRastro">
            <Facebook className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}