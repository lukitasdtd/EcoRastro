'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocateFixed, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Map, Marker } from 'leaflet';

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const userMarker = useRef<Marker | null>(null);
  const { toast } = useToast();

  const initialCenter: [number, number] = [-33.4489, -70.6693];
  const initialZoom = 11;

  useEffect(() => {
    let isMounted = true;
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Importa Leaflet y sus CSS dinámicamente solo en el cliente
    Promise.all([
        import('leaflet'),
        import('leaflet-defaulticon-compatibility'),
    ]).then(([L]) => {
      if (!isMounted || !mapRef.current || mapInstance.current) return;

      // Crea la instancia del mapa
      mapInstance.current = L.map(mapRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false, // Desactivamos el control por defecto para poner el nuestro
      });

      // Añade la capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Añade control de zoom en la posición deseada
      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

      // Marcadores de ejemplo
      const points = [
        { lat: -33.45, lng: -70.65, title: 'Mascota Perdida', desc: 'Perro pequeño encontrado.', icon: 'paw' },
        { lat: -33.48, lng: -70.58, title: 'Huerta Comunitaria', desc: 'Huerta Greenleaf.', icon: 'sprout' },
        { lat: -33.50, lng: -70.68, title: 'Punto de Adopción', desc: 'Adopta un amigo fiel.', icon: 'heart' },
      ];
      
      points.forEach(point => {
        const marker = L.marker([point.lat, point.lng]).addTo(mapInstance.current!);
        marker.bindPopup(`<b>${point.title}</b><br>${point.desc}`);
      });
      
    }).catch(error => {
      console.error("Error al cargar Leaflet:", error);
      toast({
        variant: 'destructive',
        title: 'Error al cargar el mapa',
        description: 'No se pudo inicializar el mapa. Por favor, intenta recargar la página.',
      });
    });

    // Limpieza al desmontar el componente
    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [toast]);

  const handleGeolocate = () => {
    if (navigator.geolocation && mapInstance.current) {
      const map = mapInstance.current;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos: [number, number] = [position.coords.latitude, position.coords.longitude];
          
          map.flyTo(pos, 15);

          // Si ya existe el marcador de usuario, solo actualiza su posición
          if (userMarker.current) {
            userMarker.current.setLatLng(pos);
          } else {
             import('leaflet').then(L => {
                userMarker.current = L.circleMarker(pos, {
                    radius: 8,
                    color: '#fff',
                    weight: 2,
                    fillColor: '#4285F4',
                    fillOpacity: 1,
                }).addTo(map);
             });
          }
          userMarker.current?.bindPopup('<b>Estás aquí</b>').openPopup();
        },
        () => {
          toast({
            variant: 'destructive',
            title: 'Permiso de ubicación denegado',
            description: 'No pudimos acceder a tu ubicación. Puedes activarlo en la configuración de tu navegador.',
          });
        }
      );
    }
  };

  const handleRecenter = () => {
    mapInstance.current?.flyTo(initialCenter, initialZoom);
  };

  return (
    <Card className="w-full h-full rounded-2xl shadow-lg border-[10px] border-[#1F3D2A] overflow-hidden">
      <CardContent className="p-0 h-full relative">
        <div ref={mapRef} className="w-full h-full z-0" role="region" aria-label="Mapa interactivo de la comunidad" />
        
        {/* Controles personalizados del Mapa */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
           <Button size="icon" onClick={handleGeolocate} aria-label="Centrar en mi ubicación">
                <LocateFixed className="w-5 h-5"/>
           </Button>
           <Button size="icon" onClick={handleRecenter} aria-label="Recentrar mapa a la vista inicial">
                <Home className="w-5 h-5"/>
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}
