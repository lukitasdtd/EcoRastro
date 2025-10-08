import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { adoptionPets } from '@/lib/data';

export default function MascotasPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-mascotas');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-96 bg-secondary/30">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            style={{ objectFit: 'cover' }}
            className="brightness-75"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Todo por Nuestras Mascotas
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
            Reporta una mascota perdida o encontrada para ayudar a reunirla con su familia, o dale un hogar a un amigo que lo necesita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/reportar-mascota">Reportar Mascota</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/adoption">Ver en Adopción</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="adopcion" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Adopta un Amigo Fiel</h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
            Estos maravillosos animales están buscando un hogar lleno de amor. ¿Podría ser el tuyo?
          </p>
        </div>
        <div className="text-center mt-12">
            <Button asChild>
                <Link href="/adoption">Ver todos los animales en adopción</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
