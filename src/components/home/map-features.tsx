'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Search, Users, ZoomIn, ZoomOut, Info } from 'lucide-react';

type MarkerData = {
  id: number;
  name: string;
  type: 'Mascota Perdida' | 'Avistamiento';
  distance: string;
  position: { top: string; left: string };
  image: string;
  imageHint: string;
};

const markersData: MarkerData[] = [
  { id: 1, name: 'Toby', type: 'Mascota Perdida', distance: 'A 2km de ti', position: { top: '35%', left: '25%' }, image: 'pet1', imageHint: 'golden retriever' },
  { id: 2, name: 'Luna', type: 'Avistamiento', distance: 'A 800m de ti', position: { top: '55%', left: '60%' }, image: 'pet4', imageHint: 'black cat' },
  { id: 3, name: 'Rocky', type: 'Mascota Perdida', distance: 'A 1.5km de ti', position: { top: '70%', left: '40%' }, image: 'pet3', imageHint: 'small dog' },
];

const benefits = [
    {
        icon: <Search className="w-8 h-8 text-primary" />,
        title: "Encuentra y Reporta",
        description: "Visualiza reportes de mascotas perdidas y encontradas en tiempo real. Tu ayuda es crucial."
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Conecta con la Comunidad",
        description: "Únete a una red de vecinos comprometidos con el bienestar animal y el cuidado del entorno."
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-primary" />,
        title: "Ayuda Efectiva",
        description: "Recibe notificaciones y accede a herramientas que hacen la diferencia para reunir a una mascota con su familia."
    },
]

export function MapFeatures() {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-marker-id]')) {
          closePopup();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mapImage = PlaceHolderImages.find(img => img.id === 'map-features');
  
  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Mapa Interactivo: Encuentra y Ayuda</h2>
            <p className="max-w-3xl mx-auto text-lg text-foreground/60 mt-2">
                Explora los últimos reportes en tu comunidad y sé parte de la solución. Cada avistamiento cuenta.
            </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Columna del Mapa */}
          <div ref={mapRef} className="lg:col-span-2 relative h-96 md:h-[32rem] w-full rounded-2xl shadow-lg overflow-hidden border">
            {mapImage && (
                <Image src={mapImage.imageUrl} alt={mapImage.description} fill style={{objectFit: 'cover'}} className="brightness-90" data-ai-hint={mapImage.imageHint}/>
            )}
            
            {/* Marcadores */}
            {markersData.map(marker => {
              const petImage = PlaceHolderImages.find(img => img.id === marker.image);
              return (
                <div key={marker.id} style={{ top: marker.position.top, left: marker.position.left }} className="absolute transform -translate-x-1/2 -translate-y-1/2">
                    <button 
                        data-marker-id={marker.id}
                        onClick={() => handleMarkerClick(marker)} 
                        aria-label={`Ver detalles de ${marker.name}`}
                        className="group flex items-center justify-center w-8 h-8 bg-accent rounded-full shadow-xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-accent"
                    >
                        {petImage && (
                          <Image src={petImage.imageUrl} alt={marker.name} width={28} height={28} className="rounded-full object-cover border-2 border-white"/>
                        )}
                         <div className="absolute -bottom-2 w-px h-2 bg-accent"></div>
                         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"></div>
                    </button>
                </div>
              )
            })}
             {/* Cluster */}
            <div style={{ top: '20%', left: '75%' }} className="absolute transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/80 backdrop-blur-sm text-white font-bold text-lg rounded-full shadow-xl border-2 border-white/50">
                    +3
                </div>
            </div>

            {/* Popup */}
            {selectedMarker && (
              <div
                ref={popupRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`popup-title-${selectedMarker.id}`}
                className="absolute w-64 bg-background rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                style={{ top: selectedMarker.position.top, left: selectedMarker.position.left, transform: 'translate(1.5rem, -50%)' }}
              >
                <div className="relative h-32 w-full">
                  <Image src={PlaceHolderImages.find(img => img.id === selectedMarker.image)?.imageUrl ?? ''} alt={`Foto de ${selectedMarker.name}`} fill style={{objectFit: 'cover'}} />
                  <button onClick={closePopup} aria-label="Cerrar popup" className="absolute top-2 right-2 p-1 bg-black/40 rounded-full text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 id={`popup-title-${selectedMarker.id}`} className="font-bold text-lg">{selectedMarker.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMarker.type}</p>
                  <p className="text-sm font-semibold text-primary mt-1">{selectedMarker.distance}</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">Contactar</Button>
                    <Button size="sm" variant="secondary" className="flex-1">
                      <Info className="w-4 h-4 mr-1.5"/>
                      Más Info
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Controles del mapa */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="w-9 h-9 shadow-md"><ZoomIn className="w-5 h-5"/></Button>
                <Button size="icon" variant="secondary" className="w-9 h-9 shadow-md"><ZoomOut className="w-5 h-5"/></Button>
            </div>
          </div>

          {/* Columna de Beneficios */}
          <div className="flex flex-col gap-6">
            {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                        {benefit.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{benefit.title}</h3>
                        <p className="text-foreground/70">{benefit.description}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
