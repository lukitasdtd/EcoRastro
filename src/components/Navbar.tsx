'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navItems = [
    { 
      name: 'Huertas', 
      href: '#', 
      sublinks: [
        { name: 'Educación', href: '/huertas/educacion' },
        { name: 'Calendario de Siembra', href: '/huertas/calendario-siembra' },
        { name: 'Ver Huertas', href: '/huertas' },
      ]
    },
    {
      name: 'Mascotas',
      href: '#',
      sublinks: [
        { name: 'Educación', href: '/mascotas/educacion' },
        { name: 'Reportar Mascota', href: '/reportar-mascota' },
        { name: 'Ver Mascotas', href: '/mascotas' },
      ],
    },
    { 
      name: 'Comunidad', 
      href: '#', 
      sublinks: [
        { name: '¿Quiénes somos?', href: '/comunidad/quienes-somos' },
        { name: 'Donaciones', href: '/comunidad/donaciones' },
        { name: 'Contacto', href: '/comunidad/contacto' },
      ]
    },
    {
      name: 'Perfil',
      href: '#',
      sublinks: [
        { name: 'Iniciar Sesión', href: '/perfil/iniciar-sesion' },
        { name: 'Registrarse', href: '/perfil/registrarse' },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeAllMenus}>
              <Image src="/images/logo.png" alt="Logo" width={140} height={40} />
            </Link>
          </div>
          
          {/* Navegación para escritorio */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button 
                  onClick={() => handleDropdown(item.name)} 
                  className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none">
                  {item.name}
                  <svg className="ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === item.name && (
                  <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {item.sublinks.map((sublink) => (
                        <Link 
                          key={sublink.name} 
                          href={sublink.href} 
                          onClick={closeAllMenus}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Botón para menú móvil */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú para móvil */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <button 
                  onClick={() => handleDropdown(item.name)} 
                  className="w-full text-left flex items-center justify-between px-2 py-2 text-base font-medium text-gray-700 hover:bg-green-100 rounded-md">
                  {item.name}
                  <svg className={`ml-2 h-5 w-5 transform ${openDropdown === item.name ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === item.name && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.sublinks.map((sublink) => (
                      <Link 
                        key={sublink.name} 
                        href={sublink.href} 
                        onClick={closeAllMenus}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-green-50">
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
