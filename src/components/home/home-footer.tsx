import Link from 'next/link';

export function HomeFooter() {
  const navLinks = [
    { label: 'Nosotros', href: '/about' },
    { label: 'Mapa interactivo', href: '/mapa' },
    { label: 'Calendario de siembra', href: '/calendar' },
    { label: 'Buscar Mascotas', href: '/mascotas/buscar' },
    { label: 'Cuidado de huertas', href: '/huerta/educacion' },
    { label: 'Cuidado de mascotas', href: '/mascotas/educacion' },
  ];

  const midPoint = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, midPoint);
  const rightLinks = navLinks.slice(midPoint);

  return (
    <footer
    className="relative w-full py-10 md:py-14 px-4 text-center text-foreground overflow-hidden bg-no-repeat bg-cover bg-center m-0 border-none"
    >
      {/* Imagen de fondo difuminada */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/footer.png')", // ruta de tu imagen
          filter: 'blur(3px)', // difumina solo la imagen
          opacity: 20,        // nivel de visibilidad de la imagen
        }}
      />

      {/* Capa verde translúcida encima */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(213, 233, 221, 0.8)', // verde pálido translúcido
        }}
      />

      {/*Contenido del footer */}
      <div className="relative container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Únete a la Comunidad EcoRastro
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto">
          {/* Columna izquierda */}
          <ul className="space-y-3">
            {leftLinks.map(link => (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  className="text-lg hover:text-primary hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Columna derecha */}
          <ul className="space-y-3">
            {rightLinks.map(link => (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  className="text-lg hover:text-primary hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
