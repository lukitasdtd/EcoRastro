'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GardenCard from '@/components/garden-card';
import { GardenFinder } from '@/components/garden-finder';
import type { MapPoint } from '@/lib/data';

export default function GardensPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'garden1');
  const [gardens, setGardens] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGardens = async () => {
      try {
        const response = await fetch('/api/gardens');
        if (response.ok) {
          const data = await response.json();
          setGardens(data);
        }
      } catch (error) {
        console.error("Error fetching gardens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGardens();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Sección Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {heroImage && (
            <Image 
                src={heroImage.imageUrl}
                alt="Huertas comunitarias"
                fill
                style={{ objectFit: 'cover' }}
            />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Encuentra Tu Huerta Comunitaria</h1>
          <p className="mt-2 text-lg text-gray-200 max-w-2xl">Conecta con la naturaleza y tu comunidad. Descubre, participa y cultiva en las huertas cercanas a ti.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* TAREA 8: Formulario de Búsqueda con IA (Server Action) */}
        <GardenFinder />

        {/* Sección de la Grilla de Huertas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Huertas Destacadas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p>Cargando huertas...</p>
            ) : gardens.length > 0 ? (
              gardens.map(garden => (
                <GardenCard key={garden.title} garden={garden} />
              ))
            ) : (
              <p>No se encontraron huertas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
