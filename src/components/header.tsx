'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
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
import { Menu, UserCircle, ChevronDown } from 'lucide-react';
import { navItems, type NavItem } from '@/lib/menu-data';
import { cn } from '@/lib/utils';

// 🔹 Componente para un enlace individual
function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative block whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary',
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

// 🔹 Componente para un menú desplegable
function DropdownMenu({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const isParentActive =
    item.subItems?.some(sub => pathname === sub.href) ?? false;

  if (!item.subItems) {
    return <NavLink href={item.href}>{item.label}</NavLink>;
  }

  return (
    <li className="relative">
      <button
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary',
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
                onClick={onClose} // Cierra el menú al hacer clic
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

// 🔹 Componente principal del Header/Navbar
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Efecto para cerrar el dropdown si se hace clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  const handleToggleDropdown = (label: string) => {
    setOpenDropdown(prev => (prev === label ? null : label));
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary font-sans">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
            <Link href="/" onClick={handleCloseDropdown}>
                <Logo />
            </Link>
        </div>

        {/* Navegación Desktop */}
        <nav ref={navRef} className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-2">
            {navItems.map(item =>
              item.subItems ? (
                <DropdownMenu
                  key={item.label}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onToggle={() => handleToggleDropdown(item.label)}
                  onClose={handleCloseDropdown}
                />
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href} onClick={handleCloseDropdown}>{item.label}</NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Botón Perfil y Menú Móvil */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden rounded-full border-accent text-accent hover:bg-accent hover:text-gray-900 md:flex"
            asChild
          >
            <Link href="/usuario">
              <UserCircle className="mr-2 h-5 w-5" />
              Mi Perfil
            </Link>
          </Button>

          {/* Menú móvil */}
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
                  <SheetClose asChild></SheetClose>
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
                      href="/usuario"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserCircle className="mr-2 h-5 w-5" />
                      Mi Perfil
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
