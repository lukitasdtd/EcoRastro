'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef } from 'react';
import type { Map, Marker, LatLngTuple } from 'leaflet';

// 1. La interfaz de props ahora acepta una posición opcional
interface DraggableMapProps {
    onLocationChange: (lat: number, lng: number) => void;
    position?: [number, number] | null; // Prop para controlar la posición desde fuera
}

// 2. Se añade `position` a las props del componente
export default function LeafletMapDraggable({ onLocationChange, position }: DraggableMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const defaultCenter: LatLngTuple = [-33.4489, -70.6693];
  const defaultZoom = 13;

  useEffect(() => {
    let isMounted = true;
    if (mapRef.current && !mapInstance.current) {
      const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
      if (!apiKey) {
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-muted text-destructive-foreground"><p>Error: Clave de API no configurada.</p></div>';
        }
        return;
      }

      import('leaflet').then(L => {
        import('leaflet-defaulticon-compatibility').then(() => {
            if (!isMounted || !mapRef.current) return;

            const initialCenter = position || defaultCenter;

            const map = L.map(mapRef.current, {
              center: initialCenter,
              zoom: defaultZoom,
              zoomControl: false,
            });
            mapInstance.current = map;

            L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${apiKey}`, {
              attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }).addTo(map);

            L.control.zoom({ position: 'bottomright' }).addTo(map);

            const marker = L.marker(initialCenter, { draggable: true }).addTo(map);
            markerRef.current = marker;

            onLocationChange(initialCenter[0], initialCenter[1]);

            marker.on('dragend', function (event) {
              const newPosition = event.target.getLatLng();
              onLocationChange(newPosition.lat, newPosition.lng);
            });
            
            setTimeout(() => map.invalidateSize(), 0);
        });
      });
    }

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Se ejecuta solo una vez al montar

  // 3. Este useEffect reacciona a los cambios en la prop `position`
  useEffect(() => {
    if (mapInstance.current && markerRef.current && position) {
      const map = mapInstance.current;
      const marker = markerRef.current;
      const newLatLng: LatLngTuple = [position[0], position[1]];

      // Mueve el mapa y el marcador a la nueva posición
      map.flyTo(newLatLng, 15); 
      marker.setLatLng(newLatLng);
    }
  }, [position]); // Se ejecuta cada vez que `position` cambia

  return (
    <div ref={mapRef} className="w-full h-full rounded-md" />
  );
}
