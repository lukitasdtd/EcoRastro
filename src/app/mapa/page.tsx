'use client';

import React, { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'; 
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight, PawPrint, Leaf, Menu, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function MapPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'mascotas' | 'huertas'>('mascotas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [allMapPoints, setAllMapPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsResponse, gardensResponse] = await Promise.all([
          fetch('/api/pets'),
          fetch('/api/gardens'),
        ]);

        const pets = await petsResponse.json();
        const gardens = await gardensResponse.json();

        const formattedPets = pets.map(pet => ({ ...pet, type: 'pet' }));
        const formattedGardens = gardens.map(garden => ({ ...garden, type: 'garden' }));

        setAllMapPoints([...formattedPets, ...formattedGardens]);
      } catch (error) {
        console.error("Error fetching map data:", error);
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

  // se filtra la lista de puntos según el filtro activo
  const activeList = useMemo(() => 
    activeFilter === 'mascotas' 
      ? allMapPoints.filter(p => p.type === 'pet') 
      : allMapPoints.filter(p => p.type === 'garden'),
    [activeFilter, allMapPoints]
  );

  // se paginan los puntos según el filtro activo
  const totalPages = Math.ceil(activeList.length / itemsPerPage);
  const paginatedList = activeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  //se cambia el título de la lista según el filtro activo
  const listTitle = activeFilter === 'mascotas' ? 'Mascotas Cercanas' : 'Huertas Cercanas';
  const ItemIcon = activeFilter === 'mascotas' ? PawPrint : Leaf;

  //se manejan los cambios de página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //se manejan los cambios de página
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //se maneja los cambios de filtro
  const handleFilterChange = (filter: 'mascotas' | 'huertas') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  //se renderiza el componente
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
              <Button onClick={() => setIsSidebarOpen(false)} variant="ghost" size="icon">
                  <X className="h-6 w-6" />
              </Button>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#1F3D2A]">Filtro</h2>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleFilterChange('mascotas')}
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
                onClick={() => handleFilterChange('huertas')}
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
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm flex-grow flex flex-col min-h-0">
            <h3 className="text-xl font-bold mb-4 text-[#1F3D2A]">{listTitle}</h3>
            <div className="flex-grow space-y-3 pr-1">
                {paginatedList.map((item) => {
                  const linkHref = item.type === 'pet' 
                    ? `/mascotas/reporte/${item.id}`
                    : item.link;

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
                })}
            </div>
             {totalPages > 1 && (
                <div className="pt-2 flex justify-center items-center gap-2">
                    <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="ghost" size="sm">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600 tabular-nums">
                        Página {currentPage} de {totalPages}
                    </span>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
          </div>
        </div>
      </aside>
      
      <main className="absolute inset-0 md:relative md:flex-1 z-0">
        <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden absolute top-4 left-4 z-[1000] bg-white p-2 rounded-md shadow-md"
        >
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
