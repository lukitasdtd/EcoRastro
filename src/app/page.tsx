
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapFeatures } from '@/components/home/map-features';
import { PlantingCalendar } from '@/components/home/planting-calendar';
import { EnvironmentalEducation } from '@/components/home/environmental-education';
import { HomeFooter } from '@/components/home/home-footer';

export default function Home() {
  const heroHuerta = PlaceHolderImages.find(img => img.id === 'hero-huerta');
  const heroMascotas = PlaceHolderImages.find(img => img.id === 'hero-mascotas');

  return (
    <div className="flex flex-col items-center bg-background">
      <header className="relative w-full py-16 md:py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          {/* Contenedor de las imágenes */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative h-72 md:h-96 overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] shadow-lg">
              {heroHuerta && (
                <Image
                  src={heroHuerta.imageUrl}
                  alt={heroHuerta.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="brightness-75"
                  data-ai-hint={heroHuerta.imageHint}
                  priority
                />
              )}
            </div>
            <div className="relative h-72 md:h-96 overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg">
              {heroMascotas && (
                <Image
                  src={heroMascotas.imageUrl}
                  alt={heroMascotas.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="brightness-75"
                  data-ai-hint={heroMascotas.imageHint}
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Contenedor del texto superpuesto */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <div className="bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Conectando comunidades,
              <br />
              <span className="text-primary-foreground/90">protegiendo ecosistemas.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8">
              Encontramos mascotas, regeneramos la tierra, educamos para el futuro. Únete a EcoRastro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                  <Link href="/reportar-mascota">Reportar una Mascota</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                  <Link href="/gardens">Explorar Huertas</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <MapFeatures />

      <PlantingCalendar />

      <EnvironmentalEducation />

      <HomeFooter />

    </div>
  );
}
