'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Map, Marker, LatLngTuple } from 'leaflet';

interface DraggableMapProps {
    onLocationChange: (lat: number, lng: number) => void;
    // Prop para controlar la posición del marcador desde el componente padre
    position: LatLngTuple | null;
}

export default function LeafletMapDraggable({ onLocationChange, position }: DraggableMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const { toast } = useToast();

  const defaultCenter: LatLngTuple = [-33.4489, -70.6693]; 
  const defaultZoom = 13;
  
  // Efecto para inicializar el mapa
  useEffect(() => {
    let isMounted = true;
    if (mapRef.current && !mapInstance.current) {
       Promise.all([
        import('leaflet'),
        import('leaflet-defaulticon-compatibility')
      ]).then(([L]) => {
        if (!isMounted || !mapRef.current) return;

        const initialCenter = position || defaultCenter;

        mapInstance.current = L.map(mapRef.current, {
          center: initialCenter,
          zoom: defaultZoom,
          zoomControl: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance.current);

        L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

        const marker = L.marker(initialCenter, { draggable: true }).addTo(mapInstance.current);
        markerRef.current = marker;

        // Informar a la Ficha de Reporte sobre la ubicación inicial
        if(!position) {
            onLocationChange(initialCenter[0], initialCenter[1]);
        }

        marker.on('dragend', function (event) {
          const newPosition = event.target.getLatLng();
          onLocationChange(newPosition.lat, newPosition.lng);
        });
      }).catch(error => {
        console.error("Error al cargar Leaflet:", error);
        toast({
          variant: 'destructive',
          title: 'Error al cargar el mapa',
          description: 'No se pudo inicializar el mapa. Por favor, intenta recargar la página.',
        });
      });
    }
    
    // Limpieza al desmontar el componente
    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Efecto para manejar actualizaciones de la posición desde el padre
  useEffect(() => {
    if (position && mapInstance.current && markerRef.current) {
      const map = mapInstance.current;
      const marker = markerRef.current;
      const currentMarkerPos = marker.getLatLng();
      
      if (position[0] !== currentMarkerPos.lat || position[1] !== currentMarkerPos.lng) {
        map.flyTo(position, 16);
        marker.setLatLng(position);
      }
    }
  }, [position]);

  // El renderizado ahora es más simple, solo muestra el div del mapa
  return (
    <div ref={mapRef} className="w-full h-full z-0 rounded-md" role="region" aria-label="Mapa para seleccionar ubicación" />
  );
}
