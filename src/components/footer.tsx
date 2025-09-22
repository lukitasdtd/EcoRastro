'use client';

import Link from 'next/link';
import { Instagram, Facebook, Copyright } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // No mostrar el footer en la página de inicio
  if (pathname === '/') {
    return null;
  }

  return (
    <footer className={cn('bg-primary text-primary-foreground font-sans mt-auto')}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Columna del Logo */}
          <div className="flex justify-center md:justify-start">
            <Logo />
          </div>
          
          {/* Columna de Copyright */}
          <div className="flex flex-col items-center text-sm">
            <div className='flex items-center'>
                <Copyright className="h-4 w-4 mr-2" />
                <span>{currentYear} EcoRastro. Todos los derechos reservados.</span>
            </div>
            <Link href="/privacy-policy" className="text-xs text-primary-foreground/70 hover:text-white mt-1">
                Política de Privacidad
            </Link>
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
      </div>
    </footer>
  );
}
