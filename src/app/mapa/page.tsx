// TAREA 8: Integración de API de Google Maps
// Este componente de página ahora renderiza el mapa interactivo real.
// Cumple con los siguientes requisitos del sprint:
// - Renderiza un componente cliente (`InteractiveMap`) que encapsula la lógica de Google Maps.
// - La página en sí misma sigue siendo un Server Component, optimizando la carga inicial.
// - El diseño general de la página se mantiene, con un título y descripción sobre el mapa.

'use client'; // Esta página ahora necesita ser un Client Component para manejar el estado del mapa.

import InteractiveMap from "@/components/interactive-map";
import { communityGardens, adoptionPets } from "@/lib/data";
import type { Garden, Pet } from "@/lib/types";

// Se añaden coordenadas de ejemplo a los datos. En una aplicación real, vendrían de la BBDD.
const gardensWithCoords: (Garden & { lat: number; lng: number })[] = communityGardens.map((garden, i) => ({
  ...garden,
  lat: -33.48 + i * 0.03,
  lng: -70.58 + i * 0.05,
}));

const petsWithCoords: (Pet & { lat: number; lng: number; status: 'lost' | 'found' | 'adoption' })[] = adoptionPets.map((pet, i) => ({
  ...pet,
  lat: -33.45 + i * 0.02,
  lng: -70.65 - i * 0.04,
  status: 'adoption'
}));

// Se añaden algunos reportes de ejemplo para mostrar más variedad de marcadores.
const mockReports = [
    { id: 'r1', name: 'Perro perdido', lat: -33.43, lng: -70.62, status: 'lost', description: 'Se perdió Pastor Alemán cerca del Costanera Center.' },
    { id: 'r2', name: 'Gato encontrado', lat: -33.50, lng: -70.68, status: 'found', description: 'Gato blanco encontrado en San Miguel.' }
];


export default function InteractiveMapPage() {
  const mapPoints = [
    ...gardensWithCoords.map(g => ({
        id: g.id,
        lat: g.lat,
        lng: g.lng,
        type: 'garden',
        title: g.name,
        description: g.description,
    })),
    ...petsWithCoords.map(p => ({
        id: p.id,
        lat: p.lat,
        lng: p.lng,
        type: p.status,
        title: `Adopta a ${p.name}`,
        description: `Raza: ${p.breed}, Edad: ${p.age} años.`,
    })),
     ...mockReports.map(r => ({
        id: r.id,
        lat: r.lat,
        lng: r.lng,
        type: r.status,
        title: r.name,
        description: r.description,
    })),
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <section className="text-center w-full max-w-4xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Mapa Interactivo de la Comunidad</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Explora los reportes de mascotas, encuentra huertas comunitarias y descubre puntos de adopción en tu área.
        </p>
      </section>
      
      <div className="w-full max-w-6xl h-[70vh] min-h-[500px]">
         {/* El componente del mapa ahora recibe los puntos a renderizar como props. */}
        <InteractiveMap points={mapPoints} />
      </div>
    </div>
  );
}
