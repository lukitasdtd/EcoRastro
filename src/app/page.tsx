import Image from 'next/image';
import InteractiveMap from "@/components/interactive-map";
import { Clock, PawPrint, Sprout, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const heroImage1 = PlaceHolderImages.find(img => img.id === 'hero1');
  const heroImage2 = PlaceHolderImages.find(img => img.id === 'hero2');

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Conectando comunidades,
            <br />
            <span className="text-primary">Protegiendo ecosistemas.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-foreground/80 mb-8">
            Encontramos mascotas, regeneramos la tierra, educamos para el futuro.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Busca una mascota, huerta o evento..."
              className="w-full rounded-full pl-10 pr-4 py-3 text-base shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {heroImage1 && (
             <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={heroImage1.imageUrl}
                  alt={heroImage1.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={heroImage1.imageHint}
                />
            </div>
          )}
          {heroImage2 && (
             <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={heroImage2.imageUrl}
                  alt={heroImage2.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={heroImage2.imageHint}
                />
             </div>
          )}
        </div>
      </section>

      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Mapa interactivo: Encuentra y ayuda</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <InteractiveMap />
            </div>
            <div className="md:col-span-7 space-y-6">
               <Card className="bg-secondary/50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Publica en tiempo real</CardTitle>
                    <CardDescription className="text-base">Reporta mascotas perdidas o encontradas al instante.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
               <Card className="bg-secondary/50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PawPrint className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Adopción responsable</CardTitle>
                    <CardDescription className="text-base">Conecta con animales que buscan un hogar eterno.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
               <Card className="bg-secondary/50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
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
