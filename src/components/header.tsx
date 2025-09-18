'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, PawPrint, Sprout, CalendarDays, Map, UserCircle } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Mapa Interactivo', icon: Map },
  { href: '/calendar', label: 'Calendario de Siembra', icon: CalendarDays },
  { href: '/gardens', label: 'Huertas', icon: Sprout },
  { href: '/adoption', label: 'Mascotas', icon: PawPrint },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary pb-2",
        isActive ? "text-primary font-semibold border-b-2 border-primary" : "text-foreground/70"
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="px-4 py-2">
                <Logo />
              </div>
              <div className="flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg p-3 text-lg font-medium hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                 <div className="mt-auto flex flex-col gap-2 pt-10">
                    <Button variant="outline" asChild size="lg">
                        <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild size="lg">
                        <Link href="/signup">Registrarse</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-center space-x-2 md:justify-center">
             <nav className="hidden items-center gap-8 text-base font-medium md:flex">
                {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
                ))}
             </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                  <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                  <Link href="/signup">Registrarse</Link>
              </Button>
          </div>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Perfil de Usuario</span>
          </Button>
           <div className="md:hidden">
            <Logo />
          </div>
        </div>
      </div>
    </header>
  );
}
