'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Map, Calendar, Sprout, PawPrint, Info, UserCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/mapa', label: 'Mapa Interactivo', icon: Map },
  { href: '/calendar', label: 'Calendario', icon: Calendar },
  { href: '/gardens', label: 'Huertas', icon: Sprout },
  { href: '/mascotas', label: 'Mascotas', icon: PawPrint },
  { href: '/about', label: 'Acerca de', icon: Info },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary pb-1 text-sm font-medium",
        isActive ? "text-primary border-b-2 border-primary" : "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-4">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="p-4 border-b">
                <Logo />
              </div>
              <nav className="flex flex-col gap-4 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary flex items-center gap-2"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Logo */}
        <div className="hidden md:flex">
          <Logo />
        </div>

        {/* Centered Navigation for Desktop */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
          ))}
        </nav>
        
        {/* Centered Logo for Mobile */}
        <div className="flex-1 flex justify-center md:hidden">
            <Logo />
        </div>


        {/* Right-aligned items */}
        <div className="flex items-center ml-auto">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
                <Link href="/login">
                    <UserCircle className="h-5 w-5" />
                    <span className="sr-only">Perfil</span>
                </Link>
            </Button>
        </div>

      </div>
    </header>
  );
}
