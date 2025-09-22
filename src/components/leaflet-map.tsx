'use client';

// TAREA 8: Integración de API Externa (Leaflet)
// Este componente encapsula el mapa de Leaflet.
// Puntos clave para la exposición:
// - La directiva 'use client' es fundamental porque Leaflet interactúa con el DOM del navegador, algo que solo existe en el cliente.
// - Las importaciones de CSS se hacen al principio para asegurar que los estilos del mapa se carguen correctamente.
// - `useEffect` se usa para inicializar el mapa de forma segura solo después de que el componente se haya montado en el cliente.
// - Se maneja la limpieza del mapa en la función de retorno de `useEffect` para evitar fugas de memoria.
// - Se muestra cómo añadir elementos interactivos como marcadores (`L.marker`) y popups (`bindPopup`).

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocateFixed, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Map, Marker } from 'leaflet';

export default function LeafletMap() {
  // `useRef` se usa para mantener una referencia al elemento DIV del mapa y a la instancia del mapa de Leaflet
  // sin provocar que el componente se vuelva a renderizar cuando cambian.
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const userMarker = useRef<Marker | null>(null);
  const { toast } = useToast();

  const initialCenter: [number, number] = [-33.4489, -70.6693];
  const initialZoom = 11;

  // `useEffect` para inicializar el mapa de forma segura en el cliente.
  useEffect(() => {
    let isMounted = true;
    // Se verifica que estemos en el navegador (`window` existe) y que el div del mapa esté listo.
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Importa Leaflet dinámicamente solo en el cliente para evitar errores de SSR.
    Promise.all([
        import('leaflet'),
        import('leaflet-defaulticon-compatibility'),
    ]).then(([L]) => {
      // Se asegura de que el componente todavía esté montado y que el mapa no se haya inicializado ya.
      if (!isMounted || !mapRef.current || mapInstance.current) return;

      // Crea la instancia del mapa y la guarda en `mapInstance.current`.
      mapInstance.current = L.map(mapRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false, // Desactivamos el control por defecto para añadir el nuestro.
      });

      // Añade la capa de teselas de OpenStreetMap.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Añade el control de zoom en la posición deseada.
      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

      // Marcadores de ejemplo para demostrar la funcionalidad del mapa.
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

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove(); // Destruye la instancia del mapa para liberar memoria.
        mapInstance.current = null;
      }
    };
  }, [toast]); // `toast` se incluye como dependencia, aunque rara vez cambia.

  const handleGeolocate = () => {
    // Usa la API de geolocalización del navegador.
    if (navigator.geolocation && mapInstance.current) {
      const map = mapInstance.current;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos: [number, number] = [position.coords.latitude, position.coords.longitude];
          
          map.flyTo(pos, 15); // Anima el mapa hacia la nueva posición.

          // Actualiza o crea el marcador de la ubicación del usuario.
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
          // Manejo de errores si el usuario deniega el permiso de ubicación.
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
    <Card className="w-full h-full rounded-2xl shadow-lg border-4 border-muted overflow-hidden">
      <CardContent className="p-0 h-full relative">
        <div ref={mapRef} className="w-full h-full z-0" role="region" aria-label="Mapa interactivo de la comunidad" />
        
        {/* Controles personalizados sobre el mapa */}
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
