'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'; // Importar Link de Next.js
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight, PawPrint, Leaf, Menu } from 'lucide-react';

// Función para crear slugs amigables para las URLs
const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Reemplazar espacios por guiones
    .replace(/[^\w\-]+/g, '')   // Remover caracteres no alfanuméricos (excepto guiones)
    .replace(/\-\-+/g, '-')      // Reemplazar múltiples guiones por uno solo
    .replace(/^-+/, '')          // Remover guiones al principio
    .replace(/-+$/, '');         // Remover guiones al final
};

// Lista de puntos de ejemplo con enlaces dinámicos para TODAS las entidades
const mapPoints = [
  { lat: -33.45, lng: -70.65, title: 'Perro Perdido Providencia', desc: 'Golden Retriever encontrado.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Perro Perdido Providencia')}` },
  { lat: -33.48, lng: -70.58, title: 'Huerta Comunitaria Ñuñoa', desc: 'Cultivos orgánicos en Ñuñoa.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Huerta Comunitaria Ñuñoa')}` },
  { lat: -33.50, lng: -70.68, title: 'Gato Encontrado La Cisterna', desc: 'Gato naranja visto en paradero 21.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Gato Encontrado La Cisterna')}` },
  { lat: -33.43, lng: -70.62, title: 'Jardín Vertical Santiago', desc: 'Iniciativa vecinal en Santiago Centro.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Jardín Vertical Santiago')}` },
  { lat: -33.46, lng: -70.60, title: 'Punto de Adopción Las Condes', desc: 'Jornada de adopción de cachorros.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Punto de Adopción Las Condes')}` },
  { lat: -33.49, lng: -70.70, title: 'Huerta Escolar Maipú', desc: 'Proyecto educativo en Maipú.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Huerta Escolar Maipú')}` },
  { lat: -33.42, lng: -70.66, title: 'Canario Perdido Recoleta', desc: 'Canario amarillo visto cerca del cerro.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Canario Perdido Recoleta')}` },
  { lat: -33.51, lng: -70.61, title: 'Composta Comunitaria La Florida', desc: 'Centro de compostaje en La Florida.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Composta Comunitaria La Florida')}` },
];

export default function MapPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'mascotas' | 'huertas'>('mascotas');

  const Map = useMemo(() =>
    dynamic(() => import('@/components/leaflet-map'), {
      loading: () => <Skeleton className="w-full h-full" />,
      ssr: false,
    }),
  []);

  const activeList = activeFilter === 'mascotas' ? mapPoints.filter(p => p.type === 'pet') : mapPoints.filter(p => p.type === 'garden');
  const listTitle = activeFilter === 'mascotas' ? 'Mascotas Cercanas' : 'Huertas Cercanas';
  const ItemIcon = activeFilter === 'mascotas' ? PawPrint : Leaf;

  return (
    <div className="relative h-[calc(100vh-80px)] bg-[#F7F9F7] md:flex">
      {/* Sidebar */}
      <aside
        className={`absolute top-0 left-0 z-20 flex flex-col bg-[#E6F4EC] p-6 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-full md:w-[360px] h-full`}
      >
        <div className={`flex-grow flex flex-col min-w-[312px] transition-opacity duration-100 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <h2 className="text-xl font-bold mb-4 text-[#1F3D2A]">Filtro</h2>
          <div className="flex items-center gap-2 mb-6">
            <Button
              onClick={() => setActiveFilter('mascotas')}
              variant={activeFilter === 'mascotas' ? 'outline' : 'default'}
              className={`flex-1 rounded-lg text-base py-5 font-semibold transition-all duration-200 ${
                activeFilter === 'mascotas'
                  ? 'bg-white text-[#F58220] border-[#F58220] border-2 shadow-sm'
                  : 'bg-[#1F3D2A] text-white hover:bg-[#2a543a] border-transparent'
              }`}
            >
              Mascotas
            </Button>
            <Button
              onClick={() => setActiveFilter('huertas')}
              variant={activeFilter === 'huertas' ? 'outline' : 'default'}
              className={`flex-1 rounded-lg text-base py-5 font-semibold transition-all duration-200 ${
                activeFilter === 'huertas'
                  ? 'bg-white text-[#1F3D2A] border-[#1F3D2A] border-2 shadow-sm'
                  : 'bg-[#1F3D2A] text-white hover:bg-[#2a543a] border-transparent'
              }`}
            >
              Huertas
            </Button>
          </div>

          <h3 className="text-xl font-bold mb-4 text-[#1F3D2A]">{listTitle}</h3>
          <div className="space-y-3 overflow-y-auto flex-grow">
            {activeList.map((item) => (
              <div key={item.title}>
                {/* Envolvemos todos los items en un Link, ya que ahora todos tienen uno */}
                  <Link href={item.link} className="block hover:bg-white/60 rounded-xl transition-colors">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                      <div className="flex items-center gap-4">
                        <ItemIcon className={`w-6 h-6 ${item.type === 'pet' ? 'text-[#F58220]' : 'text-green-600'}`} />
                        <p className="text-gray-700">
                          {item.title} - <span className="font-bold">{item.desc}</span>
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Map Content */}
      <main className="flex-1 relative">
        <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden absolute top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md"
        >
            <Menu className="w-6 h-6 text-gray-700" />
        </Button>
        <div className="w-full h-full">
          <Map points={mapPoints} activeFilter={activeFilter} />
        </div>
      </main>
    </div>
  );
}
