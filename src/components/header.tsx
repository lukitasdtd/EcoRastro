'use client';

// TAREA 6: Navegación (rutas)
// Este componente gestiona la barra de navegación principal de la aplicación.
// Cumple con los siguientes requisitos del sprint:
// - Define un menú de navegación que permite visitar todas las secciones de la aplicación.
// - Utiliza el componente <Link> de Next.js para una navegación rápida del lado del cliente sin recargar la página.
// - El proyecto se ejecuta sin errores y cada página carga en una URL separada.
// - Implementa el Hook `usePathname` para resaltar visualmente la página activa.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Map, Calendar, Sprout, PawPrint, Info, UserCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// Array de objetos que define los elementos de navegación.
// Esto facilita la adición o eliminación de enlaces en el futuro.
const navItems = [
  { href: '/mapa', label: 'Mapa Interactivo', icon: Map },
  { href: '/calendar', label: 'Calendario', icon: Calendar },
  { href: '/gardens', label: 'Huertas', icon: Sprout },
  { href: '/mascotas', label: 'Mascotas', icon: PawPrint },
  { href: '/about', label: 'Acerca de', icon: Info },
];

// Componente interno para los enlaces de navegación.
// Utiliza el Hook `usePathname` para saber cuál es la ruta actual.
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href; // Comprueba si el enlace es la página activa.

  return (
    // El componente <Link> de Next.js gestiona la navegación del lado del cliente.
    <Link
      href={href}
      // La función `cn` aplica clases de forma condicional para estilizar el enlace activo.
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
        
        {/* Menú para dispositivos móviles (utiliza el componente Sheet de ShadCN). */}
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
                {/* Itera sobre `navItems` para renderizar los enlaces en el menú móvil. */}
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
        
        {/* Logo para la vista de escritorio. */}
        <div className="hidden md:flex">
          <Logo />
        </div>

        {/* Navegación centrada para la vista de escritorio. */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          {/* Itera sobre `navItems` para renderizar los enlaces usando el componente `NavLink`. */}
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
          ))}
        </nav>
        
        {/* Logo centrado para la vista móvil. */}
        <div className="flex-1 flex justify-center md:hidden">
            <Logo />
        </div>


        {/* Elementos alineados a la derecha. */}
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
