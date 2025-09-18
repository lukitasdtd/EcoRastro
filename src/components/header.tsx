'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, UserCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/mapa', label: 'Mapa Interactivo' },
  { href: '/calendar', label: 'Calendario de Siembra' },
  { href: '/gardens', label: 'Huertas' },
  { href: '/mascotas', label: 'Mascotas' },
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
        
        {/* Left side */}
        <div className="flex items-center">
          {/* Mobile Menu */}
          <div className="md:hidden mr-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
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
                      className="text-foreground/80 hover:text-primary"
                    >
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
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
          ))}
        </nav>

        {/* Mobile Logo */}
        <div className="flex-1 flex justify-center md:hidden">
            <Logo />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar..." className="pl-8 sm:w-[200px] lg:w-[300px] rounded-full bg-muted border-none h-9" />
            </div>
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
