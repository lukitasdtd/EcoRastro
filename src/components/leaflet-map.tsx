'use client';

// CSS para Leaflet y MarkerCluster
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocateFixed, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Map, Marker, MarkerClusterGroup, CircleMarker } from 'leaflet';

// Creamos una promesa "singleton" para Leaflet.
let leafletPromise: Promise<any> | null = null;

const getInitializedLeaflet = () => {
  if (!leafletPromise) {
    leafletPromise = (async () => {
      const LeafletModule = await import('leaflet');
      const L = { ...LeafletModule };
      (window as any).L = L;
      await import('leaflet.markercluster');
      return L;
    })();
  }
  return leafletPromise;
};


// --- Interfaces ---
interface MapPoint {
  lat: number;
  lng: number;
  title: string;
  desc: string;
  type: 'pet' | 'garden';
  image?: string;
  link: string;
}

interface LeafletMapProps {
  points: MapPoint[];
  activeFilter: 'mascotas' | 'huertas';
}

// --- Componente ---
export default function LeafletMap({ points, activeFilter }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const userMarker = useRef<CircleMarker | null>(null);
  const markerClusterGroup = useRef<MarkerClusterGroup | null>(null);
  const LRef = useRef<any | null>(null);

  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const { toast } = useToast();

  const initialCenter: [number, number] = [-33.4489, -70.6693];
  const initialZoom = 11;

  useEffect(() => {
    let isMounted = true;
    if (!mapRef.current) return;

    const initializeMap = async () => {
      try {
        const L = await getInitializedLeaflet();
        
        if (!isMounted || !mapRef.current || mapInstance.current) return;

        LRef.current = L;

        const petIcon = L.icon({
            iconUrl: '/map-icons/pin-red.svg',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        const gardenIcon = L.icon({
            iconUrl: '/map-icons/pin-green.svg',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        LRef.current.icons = { petIcon, gardenIcon };
        
        // --- SOLUCIÓN AL ERROR DE TYPESCRIPT ---
        // 1. Crear una instancia local del mapa.
        const map = L.map(mapRef.current, { center: initialCenter, zoom: initialZoom, zoomControl: false });
        
        // 2. Usar la instancia local, sobre la cual TypeScript no tiene dudas.
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);
        
        markerClusterGroup.current = (L as any).markerClusterGroup();
        
        if (markerClusterGroup.current) {
          map.addLayer(markerClusterGroup.current);
        }

        // 3. Asignar la instancia local al ref al final.
        mapInstance.current = map;

        setIsMapInitialized(true);

      } catch (error) {
        console.error("Error fatal al inicializar el mapa:", error);
        toast({ variant: 'destructive', title: 'No se pudo cargar el mapa' });
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMapInitialized || !markerClusterGroup.current || !LRef.current?.icons) return;

    const L = LRef.current;
    const { petIcon, gardenIcon } = L.icons;
    const clusterGroup = markerClusterGroup.current;
    clusterGroup.clearLayers();

    const filteredPoints = points.filter(p => activeFilter === 'mascotas' ? p.type === 'pet' : p.type === 'garden');
    
    const markers = filteredPoints.map(point => {
        const icon = point.type === 'pet' ? petIcon : gardenIcon;
        const marker = L.marker([point.lat, point.lng], { icon });
        marker.bindPopup(`<div class="p-1"><h3 class="font-bold">${point.title}</h3><p>${point.desc}</p></div>`);
        return marker;
    });

    clusterGroup.addLayers(markers);

  }, [isMapInitialized, points, activeFilter]);

  const handleGeolocate = () => {
    const L = LRef.current;
    if (navigator.geolocation && mapInstance.current && L) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos: [number, number] = [position.coords.latitude, position.coords.longitude];
          mapInstance.current?.flyTo(pos, 15);

          if (!userMarker.current) {
            userMarker.current = L.circleMarker(pos, { 
              radius: 8, 
              color: '#fff', 
              weight: 2, 
              fillColor: '#4285F4', 
              fillOpacity: 1 
            })
            .addTo(mapInstance.current!)
            .bindPopup('<b>Estás aquí</b>');
          } else {
            userMarker.current.setLatLng(pos);
          }

          if (userMarker.current) {
            userMarker.current.openPopup();
          }
        },
        () => toast({ variant: 'destructive', title: 'Permiso de ubicación denegado' })
      );
    }
  };

  const handleRecenter = () => {
    mapInstance.current?.flyTo(initialCenter, initialZoom);
  };

  return (
    <Card className="w-full h-full rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
      <CardContent className="p-0 h-full relative">
        <div ref={mapRef} className="w-full h-full z-0" />
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
           <Button size="icon" onClick={handleGeolocate}><LocateFixed className="w-5 h-5"/></Button>
           <Button size="icon" onClick={handleRecenter}><Home className="w-5 h-5"/></Button>
        </div>
      </CardContent>
    </Card>
  );
}
