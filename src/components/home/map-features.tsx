
'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, PawPrint, Leaf } from 'lucide-react';
import Link from 'next/link';
import { allMapPoints } from '@/lib/data';

export function MapFeatures() {

  const Map = useMemo(() => dynamic(
    () => import('@/components/leaflet-map'),
    { 
      loading: () => <Skeleton className="w-full h-full rounded-[18px]" />,
      ssr: false 
    }
  ), []);

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Reportes en Tiempo Real',
      description:
        'Visualiza al instante los reportes de mascotas perdidas o avistadas por la comunidad.',
    },
    {
      icon: <PawPrint className="w-6 h-6" />,
      title: 'Red de Ayuda Activa',
      description:
        'Conecta con vecinos y voluntarios dispuestos a colaborar en la búsqueda y rescate.',
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Encuentra Espacios Verdes',
      description:
        'Descubre huertas comunitarias y zonas seguras para mascotas cerca de ti.',
    },
  ];

  return (
    <section className="w-full bg-background py-16 lg:py-24" aria-labelledby="map-title">
      <Link href="/mapa" className="group">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 id="map-title" className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
              Mapa Interactivo: Encuentra y Ayuda
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
              Explora los últimos reportes, conecta con tu comunidad y sé parte de la solución.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Columna del Mapa */}
            <div className="relative z-0 w-full h-[70vh] min-h-[500px] lg:h-full">
              <Map points={allMapPoints}/>
            </div>

            {/* Columna de Beneficios */}
            <div className="flex flex-col gap-y-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="relative bg-[#E6F4EC] rounded-2xl p-6 pt-10 text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-[#1F3D2A] flex items-center justify-center text-white ring-4 ring-[#E6F4EC]">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
