
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HomeFooter() {
  const footerImage = PlaceHolderImages.find(img => img.id === 'footer-bg');
  const navLinks = [
    { label: 'Nosotros', href: '/about' },
    { label: 'Nuestra misión', href: '/about' },
    { label: 'Mapa interactivo', href: '/mapa' },
    { label: 'Mascotas', href: '/mascotas' },
    { label: 'Calendario de siembra', href: '/calendar' },
    { label: 'Tips de huerta', href: '/gardens' },
    { label: 'Tenencia responsable', href: '/mascotas' },
  ];
  
  const midPoint = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, midPoint);
  const rightLinks = navLinks.slice(midPoint);

  return (
    <footer className="relative w-full py-20 px-4 text-center text-foreground overflow-hidden">
      {footerImage && (
        <Image
          src={footerImage.imageUrl}
          alt={footerImage.description}
          fill
          style={{ objectFit: 'cover' }}
          className="z-[-1] opacity-20"
          data-ai-hint={footerImage.imageHint}
        />
      )}
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Únete a la Comunidad EcoRastro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto">
          <ul className="space-y-3">
            {leftLinks.map(link => (
              <li key={`${link.href}-${link.label}`}>
                <Link href={link.href} className="text-lg hover:text-primary hover:underline transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {rightLinks.map(link => (
              <li key={`${link.href}-${link.label}`}>
                <Link href={link.href} className="text-lg hover:text-primary hover:underline transition-colors">
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
