import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { communityGardens } from '@/lib/data';
import GardenCard from '@/components/garden-card';
import { GardenFinder } from '@/components/garden-finder';

export default function GardensPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'garden1');

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Cultiva Comunidad, Cosecha Futuro
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
            Encuentra tu espacio verde en la ciudad. Conéctate con otros, aprende a cultivar y disfruta de alimentos frescos y locales.
          </p>
          <Button asChild size="lg">
            <Link href="#finder">Buscar una Huerta</Link>
          </Button>
        </div>
      </section>

      <section id="finder" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Encuentra tu Huerta Ideal</h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
            Usa nuestro buscador inteligente para conectar con la huerta comunitaria perfecta para ti.
          </p>
        </div>
        <GardenFinder />
      </section>

      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Huertas Comunitarias Destacadas</h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
              Explora algunos de los espacios verdes que nuestra comunidad ha creado.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityGardens.map(garden => (
              <GardenCard key={garden.id} garden={garden} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
