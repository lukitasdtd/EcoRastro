'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef, useState } from 'react';
import { LocateFixed, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Map, Marker, LatLngTuple } from 'leaflet';


interface DraggableMapProps {
    onLocationChange: (lat: number, lng: number) => void;
}

export default function LeafletMapDraggable({ onLocationChange }: DraggableMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const { toast } = useToast();

  const initialCenter: LatLngTuple = [-33.4489, -70.6693]; 
  const initialZoom = 13;
  
  useEffect(() => {
    let isMounted = true;
    if (mapRef.current && !mapInstance.current) {
       Promise.all([
        import('leaflet'),
        import('leaflet-defaulticon-compatibility')
      ]).then(([L]) => {
        if (!isMounted || !mapRef.current) return;

        mapInstance.current = L.map(mapRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          zoomControl: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance.current);

        L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

        const marker = L.marker(initialCenter, { draggable: true }).addTo(mapInstance.current);
        markerRef.current = marker;
        onLocationChange(initialCenter[0], initialCenter[1]);

        marker.on('dragend', function (event) {
          const position = event.target.getLatLng();
          onLocationChange(position.lat, position.lng);
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
    
    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [onLocationChange, toast]);

  const handleGeolocate = () => {
    if (navigator.geolocation && mapInstance.current && markerRef.current) {
      const map = mapInstance.current;
      const marker = markerRef.current;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos: LatLngTuple = [position.coords.latitude, position.coords.longitude];
          map.flyTo(pos, 16);
          marker.setLatLng(pos);
          onLocationChange(pos[0], pos[1]);
        },
        () => {
          toast({
            variant: 'destructive',
            title: 'Permiso de ubicación denegado',
            description: 'No pudimos acceder a tu ubicación. Puedes arrastrar el marcador manualmente.',
          });
        }
      );
    }
  };

  return (
    <div className="w-full h-full relative">
        <div ref={mapRef} className="w-full h-full z-0 rounded-md" role="region" aria-label="Mapa para seleccionar ubicación" />
        <div className="absolute top-2 right-2 z-10">
           <Button type="button" size="icon" onClick={handleGeolocate} aria-label="Usar mi ubicación actual">
                <LocateFixed className="w-5 h-5"/>
           </Button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none">
            <MapPin className="w-8 h-8 text-primary drop-shadow-lg" />
        </div>
    </div>
  );
}