// TAREA 8: Integración de API de Mapa (Leaflet + OpenStreetMap)
// Esta página renderiza un mapa interactivo usando Leaflet.
// Requisitos cumplidos:
// - Carga dinámica del componente con `next/dynamic` para evitar errores de SSR.
// - Muestra un estado de carga (`Skeleton`) mientras se importa el mapa.
// - Usa OpenStreetMap en vez de APIs con clave (Google Maps).

'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function InteractiveMapPage() {
  // Importación dinámica del componente del mapa (evita problemas con SSR)
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/leaflet-map'), {
        loading: () => <Skeleton className="w-full h-full rounded-2xl" />,
        ssr: false,
      }),
    []
  );

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      {/* Encabezado */}
      <section className="text-center w-full max-w-4xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Mapa Interactivo de la Comunidad
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Explora los reportes de mascotas, encuentra huertas comunitarias y descubre puntos de adopción en tu área.
        </p>
      </section>

      {/* Contenedor del mapa */}
      <div className="w-full max-w-6xl h-[70vh] min-h-[500px]">
        <Map />
      </div>
    </div>
  );
}
