export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: 'Mapa Interactivo',
    href: '/mapa',
  },
  {
    label: 'Post Comunitarios',
    href: '/post-comunitarios',
  },
  {
    label: 'Mascotas',
    href: '/mascotas',
    subItems: [
      {
        label: 'Reportar Mascota',
        href: '/reportar-mascota',
      },
      {
        label: 'Buscar Mascota Reportada',
        href: '/mascotas/buscar',
      },
      {
        label: 'Redes de Apoyo',
        href: '/mascotas/redes-apoyo',
      },
    ],
  },
  {
    label: 'Huertas',
    href: '/huertas',
    subItems: [
      {
        label: 'Encontrar Huerta',
        href: '/huertas#finder',
      },
      {
        label: 'Calendario de Siembra',
        href: '/calendar',
      },
      {
        label: 'Formulario de Huerta',
        href: '/huertas/formulario-huerta',
      },
    ],
  },
  {
    label: 'Educación',
    href: '#',
    subItems: [
      {
        label: 'Cuidado de Mascotas',
        href: '/mascotas/educacion',
      },
      {
        label: 'Cultivo y Huertas',
        href: '/huerta/educacion',
      },
      {
        label: 'Fauna Silvestre',
        href: '/fauna-silvestre',
      },
      {
        label: 'Prácticas Verdes',
        href: '/practicas-verdes',
      },
    ]
  },
  {
    label: 'Acerca de Nosotros',
    href: '/about',
  },
  {
    label: 'Iniciar Sesión',
    href: '#',
    subItems: [
      {
        label: 'Iniciar Sesión',
        href: '/login',
      },
      {
        label: 'Registrarse',
        href: '/signup',
      },
    ],
  },
];
