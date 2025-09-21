export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Mapa Interactivo',
    href: '/mapa',
  },
  {
    label: 'Mascotas',
    href: '/mascotas',
    subItems: [
      {
        label: 'Reportar Mascota',
        href: '/report-pet',
      },
      {
        label: 'Redes de Apoyo',
        href: '/mascotas/redes-apoyo',
      },
      {
        label: 'Educación Canina',
        href: '/mascotas/educacion',
      },
       {
        label: 'Ver en Adopción',
        href: '/adoption',
      },
    ],
  },
  {
    label: 'Huertas',
    href: '/gardens',
    subItems: [
      {
        label: 'Educación sobre Cultivo',
        href: '/huerta/educacion',
      },
      {
        label: 'Calendario de Siembra',
        href: '/calendar',
      },
      {
        label: 'Encontrar Huerta',
        href: '/gardens#finder',
      },
    ],
  },
  {
    label: 'Acerca de Nosotros',
    href: '/about',
  },
];
