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
          sizes="100vw"
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
