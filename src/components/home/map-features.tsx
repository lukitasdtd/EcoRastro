
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Clock, PawPrint, Leaf } from 'lucide-react';

export function MapFeatures() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-light');
  const petImage = PlaceHolderImages.find(img => img.id === 'pet5');

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
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 id="map-title" className="text-3xl md:text-4xl font-bold tracking-tight">
            Mapa Interactivo: Encuentra y Ayuda
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
            Explora los últimos reportes, conecta con tu comunidad y sé parte de la solución.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna del Mapa */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full">
            <div className="relative w-full h-full p-3 bg-[#1F3D2A] rounded-[28px] shadow-lg">
              <div className="relative w-full h-full overflow-hidden rounded-[18px]">
                {mapImage && (
                  <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="brightness-110"
                    data-ai-hint={mapImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-white/10"></div>
                
                {/* Popup Estático */}
                <div className="absolute top-6 left-6 w-[250px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-200/50">
                  <div className="flex items-center gap-3">
                    {petImage && (
                        <Image
                            src={petImage.imageUrl}
                            alt="Mascota en el mapa"
                            width={56}
                            height={56}
                            className="rounded-full object-cover border-2 border-white"
                            data-ai-hint={petImage.imageHint}
                        />
                    )}
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Max</h4>
                      <p className="text-sm text-gray-600">A 0,5 km de usted</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button size="sm" asChild>
                        <Link href="#">Más Información</Link>
                    </Button>
                    <Button size="sm" variant="outline">Contactar</Button>
                  </div>
                </div>

                {/* Controles de Zoom */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
                    <button aria-label="Acercar" className="flex items-center justify-center w-9 h-9 bg-[#1F3D2A]/80 text-white rounded-md backdrop-blur-sm shadow-md hover:bg-[#1F3D2A] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent">
                        <Plus className="w-5 h-5"/>
                    </button>
                    <button aria-label="Alejar" className="flex items-center justify-center w-9 h-9 bg-[#1F3D2A]/80 text-white rounded-md backdrop-blur-sm shadow-md hover:bg-[#1F3D2A] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent">
                        <Minus className="w-5 h-5"/>
                    </button>
                </div>
              </div>
            </div>
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
    </section>
  );
}
