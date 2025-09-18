'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, PawPrint, Search, Sprout, Calendar, Flag } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/report', label: 'Reportar Mascota', icon: Flag },
  { href: '/adoption', label: 'Adopción', icon: PawPrint },
  { href: '/gardens', label: 'Jardines', icon: Sprout },
  { href: '/calendar', label: 'Calendario', icon: Calendar },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="px-4">
                <Logo />
              </div>
              <div className="flex flex-col gap-4 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
                ))}
             </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Registrarse</Link>
                </Button>
            </div>
             <div className="md:hidden">
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
