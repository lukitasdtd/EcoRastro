'use client';

// TAREA 8: Implementación de API de Google Maps
// Este componente cliente encapsula toda la lógica para mostrar un mapa interactivo.
// Cumple con los siguientes requisitos del sprint:
// - Carga la API de Google Maps de forma asíncrona usando `@googlemaps/js-api-loader`.
// - Renderiza el mapa, lo centra en una ubicación inicial y muestra marcadores personalizados.
// - Implementa geolocalización para centrar el mapa en la ubicación del usuario.
// - Maneja el ciclo de vida del mapa (creación y limpieza) usando hooks de React (`useEffect`, `useRef`).
// - Utiliza variables de entorno para la clave de la API.

import React, from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocateFixed, Plus, Minus, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Tipo para los puntos que se mostrarán en el mapa.
type MapPoint = {
  id: string;
  lat: number;
  lng: number;
  type: 'lost' | 'found' | 'adoption' | 'garden';
  title: string;
  description: string;
};

interface InteractiveMapProps {
  points: MapPoint[];
}

export default function InteractiveMap({ points }: InteractiveMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<google.maps.Map | null>(null);
  const markers = React.useRef<google.maps.Marker[]>([]);
  const userMarker = React.useRef<google.maps.Marker | null>(null);
  const { toast } = useToast();

  const initialCenter = { lat: -33.4489, lng: -70.6693 };
  const initialZoom = 11;

  // 1. Carga de la API y renderizado inicial del mapa
  React.useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['marker'], // Se necesita para los marcadores avanzados.
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary('maps');

      if (mapRef.current && !mapInstance.current) {
        mapInstance.current = new Map(mapRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          mapId: 'ECORASTRO_MAP_ID', // ID para aplicar estilos personalizados desde la cloud.
          disableDefaultUI: true, // Desactivamos la UI por defecto para poner la nuestra.
        });

        // Limpia marcadores anteriores antes de añadir nuevos.
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];

        // 2. Creación de marcadores personalizados para cada punto
        points.forEach(point => {
          const icon = getIconForPoint(point.type);
          const marker = new google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map: mapInstance.current,
            title: point.title,
            icon: {
              url: icon,
              scaledSize: new google.maps.Size(32, 32),
            },
          });

          // InfoWindow que se abre al hacer clic
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-bold text-lg">${point.title}</h3>
                <p class="text-sm">${point.description}</p>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance.current, marker);
          });

          markers.current.push(marker);
        });
      }
    });

    // 3. Limpieza al desmontar el componente.
    return () => {
      // Aunque Google Maps limpia sus instancias, es buena práctica hacerlo manualmente.
      mapInstance.current = null; 
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]); // Se re-ejecuta si los puntos cambian.

  // Función para obtener el icono según el tipo de punto
  const getIconForPoint = (type: MapPoint['type']) => {
    switch (type) {
      case 'lost': return '/map-icons/pin-red.svg';
      case 'found': return '/map-icons/pin-yellow.svg';
      case 'adoption': return '/map-icons/pin-blue.svg';
      case 'garden': return '/map-icons/pin-green.svg';
      default: return '/map-icons/pin-gray.svg';
    }
  };

  // 4. Implementación de geolocalización
  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          mapInstance.current?.setCenter(pos);
          mapInstance.current?.setZoom(15);

          // Si ya existe un marcador de usuario, solo se actualiza su posición.
          if (userMarker.current) {
            userMarker.current.setPosition(pos);
          } else {
             userMarker.current = new google.maps.Marker({
              position: pos,
              map: mapInstance.current,
              title: 'Tu ubicación',
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
              },
            });
          }
        },
        () => {
          // Gestión de errores si el usuario deniega el permiso.
          toast({
            title: 'Permiso de ubicación denegado',
            description: 'No pudimos acceder a tu ubicación. Puedes activarlo en la configuración de tu navegador.',
            variant: 'destructive',
          });
        }
      );
    }
  };

  // 5. Funciones para los controles del mapa
  const handleZoomIn = () => {
    const currentZoom = mapInstance.current?.getZoom() || 0;
    mapInstance.current?.setZoom(currentZoom + 1);
  };
  
  const handleZoomOut = () => {
    const currentZoom = mapInstance.current?.getZoom() || 0;
    mapInstance.current?.setZoom(currentZoom - 1);
  };

  const handleRecenter = () => {
    mapInstance.current?.setCenter(initialCenter);
    mapInstance.current?.setZoom(initialZoom);
  }

  return (
    <Card className="w-full h-full rounded-2xl shadow-lg border-[10px] border-[#1F3D2A] overflow-hidden">
      <CardContent className="p-0 h-full relative">
        <div ref={mapRef} className="w-full h-full" role="region" aria-label="Mapa interactivo de la comunidad"/>
        
        {/* Controles del Mapa */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <Button size="icon" onClick={handleGeolocate} aria-label="Centrar en mi ubicación">
                <LocateFixed className="w-5 h-5"/>
           </Button>
           <Button size="icon" onClick={handleRecenter} aria-label="Recentrar mapa a la vista inicial">
                <Home className="w-5 h-5"/>
           </Button>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
           <Button size="icon" onClick={handleZoomIn} aria-label="Acercar mapa">
                <Plus className="w-5 h-5"/>
           </Button>
           <Button size="icon" onClick={handleZoomOut} aria-label="Alejar mapa">
                <Minus className="w-5 h-5"/>
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}