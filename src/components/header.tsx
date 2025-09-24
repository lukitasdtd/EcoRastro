
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu, X, ChevronDown, UserCircle } from 'lucide-react';
import { navItems, type NavItem } from '@/lib/menu-data';
import { cn } from '@/lib/utils';

// Componente para un elemento de navegación individual
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'relative block whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary',
        isActive ? 'font-bold' : ''
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-accent"></span>
      )}
    </Link>
  );
}

// Componente para un elemento de menú con dropdown
function DropdownMenu({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLLIElement>(null);

  const isParentActive =
    item.subItems?.some(sub => pathname === sub.href) ?? false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (!item.subItems) {
    return <NavLink href={item.href}>{item.label}</NavLink>;
  }

  return (
    <li ref={menuRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center gap-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary',
          isParentActive ? 'font-bold' : ''
        )}
      >
        {item.label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
        {isParentActive && (
          <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-accent"></span>
        )}
      </button>
      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full z-20 mt-2 w-max max-w-xl origin-top-left rounded-lg bg-gray-800 p-4 text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition ease-out duration-200"
        >
          <div className="absolute -top-2 left-4 h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-gray-800"></div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {item.subItems.map(subItem => (
              <Link
                key={subItem.href}
                href={subItem.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="block rounded-md p-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

// Componente principal del Header/Navbar
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-primary font-sans transition-shadow',
        isScrolled && 'shadow-md'
      )}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-6">
            {navItems.map(item =>
              item.subItems ? (
                <DropdownMenu key={item.label} item={item} />
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Botón de Login y Menú Móvil */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden rounded-full border-accent text-accent hover:bg-accent hover:text-gray-900 md:flex"
            asChild
          >
            <Link href="/login">
              <UserCircle className="mr-2 h-5 w-5" />
              Iniciar Sesión
            </Link>
          </Button>

          {/* Botón Hamburguesa para Móvil */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-primary-hover"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-sm bg-primary p-0 text-white flex flex-col"
              >
                <SheetHeader className="flex h-16 flex-row items-center justify-between border-b border-primary-hover px-4 flex-shrink-0">
                  <div className="flex justify-center">
                    <Logo />
                  </div>
                  <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-primary-hover"
                    >
                      <X className="h-6 w-6" />
                      <span className="sr-only">Cerrar menú</span>
                    </Button>
                  </SheetTrigger>
                </SheetHeader>
                <ScrollArea className="flex-grow">
                  <nav className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      {navItems.map(item =>
                        item.subItems ? (
                          <AccordionItem
                            key={item.label}
                            value={item.label}
                            className="border-b-0"
                          >
                            <AccordionTrigger className="py-3 text-lg font-medium hover:no-underline">
                              {item.label}
                            </AccordionTrigger>
                            <AccordionContent className="pl-4">
                              <ul className="flex flex-col gap-2">
                                {item.subItems.map(sub => (
                                  <li key={sub.href}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block rounded-md p-2 hover:bg-primary-hover"
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-3 text-lg font-medium"
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </Accordion>
                  </nav>
                </ScrollArea>
                <div className="mt-auto border-t border-primary-hover p-4 flex-shrink-0">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-accent text-accent hover:bg-accent hover:text-gray-900"
                    asChild
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserCircle className="mr-2 h-5 w-5" />
                      Iniciar Sesión
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
