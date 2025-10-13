'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Map, Marker, LatLngTuple } from 'leaflet';

interface DraggableMapProps {
    onLocationChange: (lat: number, lng: number) => void;
}

//componente para el mapa arrastable
export default function LeafletMapDraggable({ onLocationChange }: DraggableMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const { toast } = useToast();

  const defaultCenter: LatLngTuple = [-33.4489, -70.6693];
  const defaultZoom = 13;

  //se inicializa mapa
  useEffect(() => {
    let isMounted = true;
    if (mapRef.current && !mapInstance.current) {
      const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
      if (!apiKey) {
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-muted text-destructive-foreground"><p>Error: API Key de mapa no configurada.</p></div>';
        }
        return;
      }

      import('leaflet').then(L => {
        import('leaflet-defaulticon-compatibility').then(() => {
            if (!isMounted || !mapRef.current) return;

            const map = L.map(mapRef.current, {
              center: defaultCenter,
              zoom: defaultZoom,
              zoomControl: false,
            });
            mapInstance.current = map;

            L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${apiKey}`, {
              attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }).addTo(map);

            L.control.zoom({ position: 'bottomright' }).addTo(map);

            const marker = L.marker(defaultCenter, { draggable: true }).addTo(map);
            markerRef.current = marker;

            onLocationChange(defaultCenter[0], defaultCenter[1]);

            marker.on('dragend', function (event) {
              const newPosition = event.target.getLatLng();
              onLocationChange(newPosition.lat, newPosition.lng);
            });
            
            setTimeout(() => {
                map.invalidateSize();
            }, 0);
        });
      }).catch(error => {
        console.error("Error al cargar Leaflet:", error);
        toast({
          variant: 'destructive',
          title: 'Error al cargar el mapa',
          description: 'No se pudo inicializar el mapa. Intenta recargar la página.',
        });
      });
    }

    //limpia el mapa al quitar el componente
    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full rounded-md" />
  );
}
