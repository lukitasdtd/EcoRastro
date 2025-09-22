'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, List } from 'lucide-react';

export default function SupportNetworksPage() {

  return (
    <div className="flex flex-col">
      {/* Sección Hero */}
      <section className="relative w-full h-[500px] bg-primary/20 flex items-center justify-center text-center">
        {/* Imagen de fondo */}
        <Image
          src="/gato-naranjo.jpg"
          alt="Un adorable gato naranjo mirando hacia arriba, sentado en un sillón"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-50"
          priority
        />

        {/* Contenido superpuesto */}
        <div className="relative z-10 text-white p-4 max-w-4xl mx-auto">
           <h1 className="text-4xl md:text-6xl font-bold mb-4 !leading-tight text-shadow-md">
              Conecta con refugios y adopta cerca de ti
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 text-shadow">
              Encuentra organizaciones, veterinarias y grupos de apoyo en tu comunidad.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-6 text-lg font-semibold">
              Buscar Ahora
            </Button>
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
    </div>
  );
}
