'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Map, Calendar, Sprout, PawPrint, Search, UserCircle } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/mapa', label: 'Mapa Interactivo', icon: Map },
  { href: '/calendar', label: 'Calendario de Siembra', icon: Calendar },
  { href: '/gardens', label: 'Huertas', icon: Sprout },
  { href: '/mascotas', label: 'Mascotas', icon: PawPrint },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary pb-1 text-sm font-medium",
        isActive ? "text-primary border-b-2 border-primary" : "text-foreground/80"
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
            <SheetContent side="left" className="w-72 bg-card p-0">
              <div className="p-4 border-b">
                <Logo />
              </div>
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                  <Button variant="ghost" asChild key={item.href} className="justify-start">
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg p-3 text-base font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2 p-4 border-t">
                  <Button variant="outline" asChild>
                      <Link href="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button asChild>
                      <Link href="/signup">Registrarse</Link>
                  </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
            ))}
        </nav>
        
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar..." className="pl-8 sm:w-[200px] lg:w-[300px]" />
          </div>
          <div className="hidden md:flex items-center">
              <Button variant="ghost" size="icon" asChild>
                  <Link href="/login">
                    <UserCircle className="h-6 w-6" />
                    <span className="sr-only">Perfil</span>
                  </Link>
              </Button>
          </div>
           <div className="md:hidden">
            <Logo />
          </div>
        </div>
      </div>
    </header>
  );
}
