
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
      <header className="relative w-full overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 pt-12 md:py-24">
          <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
            {/* --- Columna de Texto --- */}
            <div className="text-center md:text-left mb-12 md:mb-0">
               <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Conectando comunidades,
                <br />
                <span className="text-primary">protegiendo ecosistemas.</span>
              </h1>
              <p className="max-w-2xl mx-auto md:mx-0 text-lg md:text-xl text-foreground/70 mb-8">
                Encontramos mascotas, regeneramos la tierra, educamos para el futuro. Únete a EcoRastro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                    <Link href="/reportar-mascota">Reportar una Mascota</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                    <Link href="/gardens">Explorar Huertas</Link>
                </Button>
              </div>
            </div>
            
            {/* --- Columna de Imágenes --- */}
            <div className="relative h-[350px] md:h-[450px]">
                {heroHuerta && (
                     <div className="absolute w-[60%] h-[70%] top-0 left-0 rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden shadow-lg transform -rotate-6">
                        <Image
                            src={heroHuerta.imageUrl}
                            alt={heroHuerta.description}
                            fill
                            style={{ objectFit: 'cover' }}
                            data-ai-hint={heroHuerta.imageHint}
                            priority
                            className="transform-gpu scale-125"
                        />
                     </div>
                )}
                {heroMascotas && (
                     <div className="absolute w-[60%] h-[70%] bottom-0 right-0 rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden shadow-lg transform rotate-3">
                         <Image
                            src={heroMascotas.imageUrl}
                            alt={heroMascotas.description}
                            fill
                            style={{ objectFit: 'cover' }}
                            data-ai-hint={heroMascotas.imageHint}
                            priority
                            className="transform-gpu scale-125"
                        />
                     </div>
                )}
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
