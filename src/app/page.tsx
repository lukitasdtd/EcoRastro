import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage1 = PlaceHolderImages.find(img => img.id === 'hero1');

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[calc(100vh-4rem)]">
         {heroImage1 && (
            <Image
                src={heroImage1.imageUrl}
                alt={heroImage1.description}
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-50"
                data-ai-hint={heroImage1.imageHint}
                priority
            />
          )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
           <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Conectando comunidades,
            <br />
            <span className="text-primary-foreground/90">protegiendo ecosistemas.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8">
            Encontramos mascotas, regeneramos la tierra, educamos para el futuro. Únete a EcoRastro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
                <Link href="/report-pet">Reportar una Mascota</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
                <Link href="/gardens">Explorar Huertas</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
