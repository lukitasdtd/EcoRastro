'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GardenCard from '@/components/garden-card';
import { GardenFinder } from '@/components/garden-finder';
import type { Garden } from '@/lib/types';

export default function GardensPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'garden1');
  
  const [allGardens, setAllGardens] = useState<Garden[]>([]);
  const [filteredGardens, setFilteredGardens] = useState<Garden[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGardens = async () => {
      try {
        // Usar la ruta correcta de la API
        const response = await fetch('/api/gardens');
        if (response.ok) {
          const data: Garden[] = await response.json();
          setAllGardens(data);
          setFilteredGardens(data);
        } else {
          console.error("Error al obtener las huertas:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener las huertas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGardens();
  }, []);

  // Efecto para filtrar las huertas cuando cambia el término de búsqueda
  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = allGardens.filter(garden => {
      // Asumimos que la dirección es un string JSON o un objeto
      const addressString = typeof garden.direccion === 'string' 
        ? garden.direccion 
        : JSON.stringify(garden.direccion);
      
      return (
        garden.nombre.toLowerCase().includes(lowercasedFilter) ||
        addressString.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredGardens(filtered);
  }, [searchTerm, allGardens]);

  return (
    <div className="bg-gray-50">
      {/* Sección Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {heroImage && (
            <Image 
                src={heroImage.imageUrl}
                alt="Huertas comunitarias"
                fill
                className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Encuentra Tu Huerta Comunitaria</h1>
          <p className="mt-2 text-lg text-gray-200 max-w-2xl">Conecta con la naturaleza y tu comunidad. Descubre, participa y cultiva en las huertas cercanas a ti.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Pasar el estado y la función de actualización al componente de búsqueda */}
        <GardenFinder searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Sección de la Grilla de Huertas */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Huertas Destacadas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p>Cargando huertas...</p>
            ) : filteredGardens.length > 0 ? (
              filteredGardens.map(garden => (
                <GardenCard key={garden.id} garden={garden} />
              ))
            ) : (
              <p>No se encontraron huertas que coincidan con tu búsqueda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
