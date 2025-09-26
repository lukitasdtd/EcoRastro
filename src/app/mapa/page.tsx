
'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ArrowRight, PawPrint, Leaf } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

export default function MapPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('mascotas');

  const Map = useMemo(() =>
    dynamic(() => import('@/components/leaflet-map'), {
      loading: () => <Skeleton className="w-full h-full" />,
      ssr: false,
    }),
  []);

  // Data for pets and orchards
  const nearbyPets = [
    { name: 'Luna', distance: '1,2 km', href: '#' },
    { name: 'Max', distance: '0,5 km', href: '#' },
    { name: 'Rocky', distance: '2,8 km', href: '#' },
  ];

  const nearbyOrchards = [
    { name: 'Huerta del Sol', distance: '0.8 km', href: '#' },
    { name: 'Jardín Comunitario', distance: '1.5 km', href: '#' },
    { name: 'Eco-Espacio', distance: '2.1 km', href: '#' },
  ];

  // Determine which data to show
  const activeList = activeFilter === 'mascotas' ? nearbyPets : nearbyOrchards;
  const listTitle = activeFilter === 'mascotas' ? 'Mascotas Cercanas' : 'Huertas Cercanas';
  const publishButtonText = activeFilter === 'mascotas' ? 'Publicar Mascota' : 'Publicar Huerta';
  const ItemIcon = activeFilter === 'mascotas' ? PawPrint : Leaf;

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#F7F9F7]">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col bg-[#E6F4EC] p-6 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-[360px]' : 'w-0 p-0'
        } overflow-hidden`}
      >
        <div className={`flex-grow flex flex-col min-w-[312px] transition-opacity duration-100 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
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
              <Link href={item.href} key={item.name} className="block">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <ItemIcon className={`w-6 h-6 ${activeFilter === 'mascotas' ? 'text-[#F58220]' : 'text-green-600'}`} />
                    <p className="text-gray-700">
                      {item.name} - <span className="font-bold">{item.distance}</span>
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        
          <div className="mt-6 flex-shrink-0">
            <h3 className="text-xl font-bold mb-4 text-[#1F3D2A]">Publica</h3>
            <Button className="w-full flex items-center justify-center gap-3 bg-[#F58220] hover:bg-[#f57320] text-white text-lg font-bold py-7 rounded-xl shadow-sm">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-orange-100 text-[#F58220] font-bold">
                  {activeFilter === 'mascotas' ? 'N' : 'H'}
                </AvatarFallback>
              </Avatar>
              {publishButtonText}
            </Button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -right-[18px] -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md z-30"
        >
          <ChevronLeft className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
        </button>
      </aside>

      {/* Map Content */}
      <main className="flex-1 relative">
        <div className="w-full h-full">
          <Map />
        </div>
      </main>
    </div>
  );
}
