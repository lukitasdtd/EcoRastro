'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'; 
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight, PawPrint, Leaf, Menu } from 'lucide-react';
import { allMapPoints } from '@/lib/data'; // 1. Importar datos centralizados

// La función `slugify` y la lista `mapPoints` se han eliminado de aquí.
// Ahora se importan desde `src/lib/data.ts` para mantener una única fuente de verdad.

export default function MapPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'mascotas' | 'huertas'>('mascotas');

  const Map = useMemo(() =>
    dynamic(() => import('@/components/leaflet-map'), {
      loading: () => <Skeleton className="w-full h-full" />,
      ssr: false,
    }),
  []);

  // Lógica de filtrado consistente con los datos importados
  const activeList = activeFilter === 'mascotas' 
    ? allMapPoints.filter(p => p.type === 'pet') 
    : allMapPoints.filter(p => p.type === 'garden');
  
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
          {/* 2. Pasar la lista completa al mapa. El mapa se encargará de filtrar internamente */}
          <Map points={allMapPoints} activeFilter={activeFilter} />
        </div>
      </main>
    </div>
  );
}
