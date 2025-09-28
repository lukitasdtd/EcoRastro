import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { gardenPoints } from '@/lib/data';
import GardenCard from '@/components/garden-card';
import { GardenFinder } from '@/components/garden-finder';

export default function GardensPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'garden1');

  return (
    <div className="bg-gray-50">
      {/* Sección Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {heroImage && (
            <Image 
                // CORRECCIÓN: Se utiliza `imageUrl` en lugar de `src` para que coincida con la estructura de datos.
                src={heroImage.imageUrl}
                alt="Huertas comunitarias"
                fill
                className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Encuentra Tu Huerta Comunitaria</h1>
          <p className="mt-2 text-lg text-gray-200 max-w-2xl">Conecta con la naturaleza y tu comunidad. Descubre, participa y cultiva en las huertas cercanas a ti.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* TAREA 8: Formulario de Búsqueda con IA (Server Action) */}
        <GardenFinder />

        {/* Sección de la Grilla de Huertas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Huertas Destacadas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gardenPoints.map(garden => (
              <GardenCard key={garden.title} garden={garden} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
