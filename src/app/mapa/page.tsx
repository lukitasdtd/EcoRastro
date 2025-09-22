// TAREA 8: Integración de API de Mapa (Leaflet + OpenStreetMap)
// Esta página renderiza un mapa interactivo usando Leaflet.
// Cumple con los siguientes requisitos:
// - Carga el componente del mapa de forma dinámica con `next/dynamic` para evitar errores de SSR (Server-Side Rendering).
//   Leaflet es una librería que manipula el `window` y el `document` del navegador, por lo que solo debe ejecutarse en el cliente.
//   `next/dynamic` con `ssr: false` asegura esto.
// - Muestra un estado de carga (`Skeleton`) mientras el componente del mapa se está cargando, mejorando la UX (Punto 14).
// - Esta implementación evita el uso de APIs que requieren una clave (como Google Maps), optando por la solución abierta de OpenStreetMap.

'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function InteractiveMapPage() {
  // Carga dinámica del componente del mapa. `useMemo` se usa para asegurar que la importación dinámica
  // solo se defina una vez por renderizado del componente.
  const Map = useMemo(() => dynamic(
    () => import('@/components/leaflet-map'), // Ruta al componente del mapa.
    { 
      // `loading` define qué mostrar mientras el componente principal se está cargando.
      loading: () => <Skeleton className="w-full h-full rounded-2xl" />,
      // `ssr: false` es la clave aquí: le dice a Next.js que no intente renderizar este componente en el servidor.
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
        {/* Se renderiza el componente del mapa cargado dinámicamente. */}
        <Map />
      </div>
    </div>
  );
}
