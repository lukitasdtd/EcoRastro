'use client';

import React, { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight, PawPrint, Leaf, Menu, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Tipos para los datos de la API
interface PetAPI {
  id: string;
  name: string;
  location: string; // string JSON, ej: "{\"lat\": -33, \"lng\": -70}"
  [key: string]: any;
}

interface GardenAPI {
  id: string;
  nombre: string;
  coordenadas: string; // string JSON, ej: "{\"lat\": -33, \"lng\": -70}"
  [key: string]: any;
}

// Tipo unificado para los puntos del mapa, compatible con leaflet-map
interface MapPoint {
  id: number; // ID como número
  lat: number;
  lng: number;
  name: string;
  type: 'pet' | 'garden';
}

export default function MapPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'mascotas' | 'huertas'>('mascotas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [allMapPoints, setAllMapPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [petsResponse, gardensResponse] = await Promise.all([
          fetch('/api/pets'),
          fetch('/api/gardens'),
        ]);

        if (!petsResponse.ok || !gardensResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const pets: PetAPI[] = await petsResponse.json();
        const gardens: GardenAPI[] = await gardensResponse.json();

        // Transformar datos de mascotas al formato MapPoint
        const formattedPets: MapPoint[] = pets.map(pet => {
          const position = JSON.parse(pet.location);
          return {
            id: parseInt(pet.id, 10),
            name: pet.name,
            lat: position.lat,
            lng: position.lng,
            type: 'pet',
          };
        });

        // Transformar datos de huertas al formato MapPoint
        const formattedGardens: MapPoint[] = gardens.map(garden => {
          const position = JSON.parse(garden.coordenadas);
          return {
            id: parseInt(garden.id, 10),
            name: garden.nombre,
            lat: position.lat,
            lng: position.lng,
            type: 'garden',
          };
        });

        setAllMapPoints([...formattedPets, ...formattedGardens]);
      } catch (error) {
        console.error("Error fetching and transforming map data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const Map = useMemo(() =>
    dynamic(() => import('@/components/leaflet-map'), {
      loading: () => <Skeleton className="w-full h-full" />,
      ssr: false,
    }),
  []);

  //se filtran los puntos según filtro activo
  const activeList = useMemo(() =>
    allMapPoints.filter(p => p.type === (activeFilter === 'mascotas' ? 'pet' : 'garden')),
    [activeFilter, allMapPoints]
  );


  const totalPages = Math.ceil(activeList.length / itemsPerPage);
  const paginatedList = activeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const listTitle = activeFilter === 'mascotas' ? 'Mascotas Reportadas' : 'Huertas Comunitarias';
  const ItemIcon = activeFilter === 'mascotas' ? PawPrint : Leaf;

  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleFilterChange = (filter: 'mascotas' | 'huertas') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };


  //se crea sidebar para filtros
  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-[#F7F9F7] md:flex">
       <aside
        className={`absolute top-0 left-0 z-20 flex flex-col bg-[#E6F4EC] p-6 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-full md:w-[360px] h-full`}
      >
        <div className={`flex-grow flex flex-col min-w-[312px] transition-opacity duration-100 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-xl font-bold text-[#1F3D2A]">Menú</h2>
            <Button onClick={() => setIsSidebarOpen(false)} variant="ghost" size="icon"><X className="h-6 w-6" /></Button>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#1F3D2A]">Filtros</h2>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleFilterChange('mascotas')}
                variant={activeFilter === 'mascotas' ? 'outline' : 'default'}
                className={`flex-1 rounded-lg text-base py-5 font-semibold transition-all duration-200 ${activeFilter === 'mascotas' ? 'bg-white text-[#F58220] border-[#F58220] border-2 shadow-sm' : 'bg-[#1F3D2A] text-white hover:bg-[#2a543a] border-transparent'}`}>
                Mascotas
              </Button>
              <Button
                onClick={() => handleFilterChange('huertas')}
                variant={activeFilter === 'huertas' ? 'outline' : 'default'}
                className={`flex-1 rounded-lg text-base py-5 font-semibold transition-all duration-200 ${activeFilter === 'huertas' ? 'bg-white text-[#1F3D2A] border-[#1F3D2A] border-2 shadow-sm' : 'bg-[#1F3D2A] text-white hover:bg-[#2a543a] border-transparent'}`}>
                Huertas
              </Button>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm flex-grow flex flex-col min-h-0">
            <h3 className="text-xl font-bold mb-4 text-[#1F3D2A]">{listTitle}</h3>
            <div className="flex-grow space-y-3 pr-1 overflow-y-auto">
              {loading ? (
                <p>Cargando datos...</p>
              ) : paginatedList.length > 0 ? (
                paginatedList.map((item) => {
                  const linkHref = item.type === 'pet'
                    ? `/mascotas/reporte/${item.id}`
                    : `/huertas/${item.id}`;

                  return (
                    <div key={item.id}>
                      <Link href={linkHref} className="block hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <ItemIcon className={`w-5 h-5 ${item.type === 'pet' ? 'text-[#F58220]' : 'text-green-600'}`} />
                            <p className="text-gray-700 text-sm">
                              {item.name} - <span className="font-semibold">{item.type === 'pet' ? 'Mascota reportada' : 'Huerta comunitaria'}</span>
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p>No hay resultados para mostrar.</p>
              )}
            </div>
            {totalPages > 1 && (
              <div className="pt-2 flex justify-center items-center gap-2">
                <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="ghost" size="sm"><ChevronLeft className="w-4 h-4" /></Button>
                <span className="text-sm text-gray-600 tabular-nums">Página {currentPage} de {totalPages}</span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="absolute inset-0 md:relative md:flex-1 z-0">
        <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden absolute top-4 left-4 z-[1000] bg-white p-2 rounded-md shadow-md">
          <Menu className="w-6 h-6 text-gray-700" />
        </Button>
        <div className="p-4 h-full">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Map points={allMapPoints} activeFilter={activeFilter} />
          </div>
        </div>
      </main>
    </div>
  );
}
