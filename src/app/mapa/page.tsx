// TAREA 8: Integración de API de Mapa (Leaflet + OpenStreetMap)
// Esta página ahora renderiza un mapa interactivo usando Leaflet.
// Cumple con los siguientes requisitos:
// - Carga el componente del mapa de forma dinámica con `next/dynamic` para evitar errores de SSR.
// - Muestra un estado de carga mientras el componente del mapa se está cargando.
// - Elimina la dependencia de Google Maps y su API key.

'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function InteractiveMapPage() {
  // Carga dinámica del componente del mapa para que solo se renderice en el cliente.
  const Map = useMemo(() => dynamic(
    () => import('@/components/leaflet-map'),
    { 
      loading: () => <Skeleton className="w-full h-full rounded-2xl" />,
      ssr: false 
    }
  ), []);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <section className="text-center w-full max-w-4xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Mapa Interactivo de la Comunidad</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Explora los reportes de mascotas, encuentra huertas comunitarias y descubre puntos de adopción en tu área.
        </p>
      </section>
      
      <div className="w-full max-w-6xl h-[70vh] min-h-[500px]">
        <Map />
      </div>
    </div>
  );
}
