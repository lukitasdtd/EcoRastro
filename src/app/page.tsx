
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapFeatures } from '@/components/home/map-features';
import { PlantingCalendar } from '@/components/home/planting-calendar';
import { EnvironmentalEducation } from '@/components/home/environmental-education';
import { HomeFooter } from '@/components/home/home-footer';
import { Logo } from '@/components/logo';

export default function Home() {
  const heroHuerta = PlaceHolderImages.find(img => img.id === 'hero-huerta');
  const heroMascotas = PlaceHolderImages.find(img => img.id === 'hero-mascotas');

  return (
    <div className="flex flex-col items-center bg-background">
      <div className="w-full container mx-auto text-center py-2">
        <Logo size="large"/>
      </div>
      <header className="w-full bg-muted/30 py-10">
        <div className="container mx-auto">
          <div className="relative h-[550px] md:h-[450px] flex flex-col md:flex-row shadow-2xl">
            
            {/* --- Container for Images --- */}
            <div className="absolute inset-0 flex flex-col md:flex-row">
              {heroHuerta && (
                <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden rounded-tl-[50px] rounded-br-[50px]">
                  <Image
                    src={heroHuerta.imageUrl}
                    alt={heroHuerta.description}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={heroHuerta.imageHint}
                    priority
                    className="transform-gpu scale-110 brightness-75"
                  />
                </div>
              )}
              {heroMascotas && (
                <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden rounded-tl-[50px] rounded-br-[50px]">
                  <Image
                    src={heroMascotas.imageUrl}
                    alt={heroMascotas.description}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={heroMascotas.imageHint}
                    priority
                    className="transform-gpu scale-110 brightness-75"
                  />
                </div>
              )}
            </div>

            {/* --- Text Overlay --- */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-50 font-quicksand" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                Conectando comunidades,<br /> Protegiendo ecosistemas
              </h1>
              <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-200" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                Encontramos mascotas, regeneramos la tierra, educamos para el futuro. Únete a EcoRastro
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/reportar-mascota">Reportar una Mascota</Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg">
                        <Link href="/gardens">Explorar Huertas</Link>
                    </Button>
                </div>
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
