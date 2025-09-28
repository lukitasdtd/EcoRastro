'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, List } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { shelters } from '@/lib/shelter-data';
import ShelterCard from '@/components/shelter-card';
// CORRECCIÓN: Se importan los datos para el mapa.
import { allMapPoints } from '@/lib/data';

export default function SupportNetworksPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/leaflet-map'),
    { 
      loading: () => <Skeleton className="w-full h-full rounded-2xl" />,
      ssr: false 
    }
  ), []);

  const featuredShelters = shelters.filter(shelter => shelter.rating > 4).slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Sección Hero */}
      <section className="relative w-full h-[500px] bg-primary/20 flex items-center justify-start text-left">
        <Image
          src="/gato-naranjo.jpg"
          alt="Un adorable gato naranjo mirando hacia arriba, sentado en un sillón"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-50"
          priority
        />
        <div className="relative z-10 text-white container mx-auto px-4">
           <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 !leading-tight text-shadow-md">
                  Conecta con refugios y adopta cerca de ti
                </h1>
                <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 text-shadow">
                  Encuentra organizaciones, veterinarias y grupos de apoyo en tu comunidad.
                </p>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-6 text-lg font-semibold">
                  Buscar Ahora
                </Button>
           </div>
        </div>
      </section>

       {/* Barra de Búsqueda que se superpone ligeramente */}
      <div className="relative -mt-10 z-20 px-4">
          <Card className="max-w-4xl mx-auto shadow-2xl rounded-2xl">
              <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-4 items-center">
                      <Input 
                          type="text" 
                          placeholder="Busca por comuna o ciudad" 
                          className="h-12 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Select>
                          <SelectTrigger className="h-12 text-base border-0 focus:ring-0 focus:ring-offset-0">
                              <List className="h-5 w-5 text-muted-foreground" />
                              <SelectValue placeholder="Especie" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="perro">Perro</SelectItem>
                              <SelectItem value="gato">Gato</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                      </Select>
                      <Button size="icon" className="h-12 w-12 rounded-lg">
                          <Search className="h-6 w-6" />
                      </Button>
                  </div>
              </CardContent>
          </Card>
      </div>

      {/* Sección Lugares Destacados y Mapa */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Lugares Destacados</h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
              Explora refugios y organizaciones de rescate con animales listos para encontrar un hogar.
            </p>
          </div>
          
          <div className="relative flex justify-center mb-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl"
            >
              <CarouselContent className="-ml-4">
                {featuredShelters.map((shelter) => (
                  <CarouselItem key={shelter.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <ShelterCard shelter={shelter} className="h-full"/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>

          <div className="relative w-full h-[70vh] min-h-[500px]">
            {/* CORRECCIÓN: Se pasan los datos al componente del mapa. */}
            <Map points={allMapPoints} />
          </div>
        </div>
      </section>

      {/* Sección Listado de Lugares */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Listado de lugares</h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
                Encuentra el refugio perfecto para apoyar o encontrar a tu próximo compañero.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shelters.map(shelter => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-12">
              <Button variant="default" size="sm" className="w-9 h-9 p-0">1</Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">2</Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">7</Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">8</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
