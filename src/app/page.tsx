import Image from 'next/image';
import Link from 'next/link';
import InteractiveMap from "@/components/interactive-map";
import { Clock, PawPrint, Sprout } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const heroImage1 = PlaceHolderImages.find(img => img.id === 'hero1');

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[calc(100vh-5rem)]">
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
           <h1 className="text-4xl md:text-7xl font-bold mb-4">
            Conectando comunidades,
            <br />
            <span className="text-primary-foreground/90">Protegiendo ecosistemas.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8">
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

      <section className="w-full py-16 md:py-24 bg-background" id="mapa">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Mapa de Actividad Comunitaria</h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80 mt-2">Encuentra y ayuda en tu barrio. Visualiza reportes y puntos de interés en tiempo real.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <InteractiveMap />
            </div>
            <div className="md:col-span-5 space-y-6">
               <Card className="bg-card border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Publica en tiempo real</CardTitle>
                    <CardDescription className="text-base">Reporta mascotas perdidas o encontradas al instante.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
               <Card className="bg-card border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PawPrint className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Adopción responsable</CardTitle>
                    <CardDescription className="text-base">Conecta con animales que buscan un hogar eterno.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
               <Card className="bg-card border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Huertas Comunitarias</CardTitle>
                    <CardDescription className="text-base">Encuentra huertas cercanas y conecta con más personas.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
