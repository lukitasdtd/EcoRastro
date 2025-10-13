'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocateFixed, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Map, Marker, CircleMarker } from 'leaflet';
import type { MapPoint } from '@/lib/data';

//componente de mapa interactivo con leaflet
interface LeafletMapProps {
  points: MapPoint[];
  activeFilter: 'mascotas' | 'huertas';
}

//componente de mapa interactivo con leaflet
export default function LeafletMap({ points, activeFilter }: LeafletMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const userMarker = useRef<CircleMarker | null>(null);
    const markersRef = useRef<Marker[]>([]);
    const { toast } = useToast();

    const initialCenter: [number, number] = [-33.4489, -70.6693];
    const initialZoom = 11;

    //se inicializa el mapa con leaflet
    useEffect(() => {
        let isMounted = true;
        if (typeof window === 'undefined' || !mapRef.current) return;

        const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

        if (!apiKey) {
            console.error("MapTiler API key no encontrada.");
            toast({ variant: 'destructive', title: 'Error de mapa', description: 'Falta la clave de API.' });
            return;
        }

        import('leaflet').then(L => {
            import('leaflet-defaulticon-compatibility').then(() => {
                if (!isMounted || !mapRef.current || mapInstance.current) return;

                const map = L.map(mapRef.current, {
                    center: initialCenter,
                    zoom: initialZoom,
                    zoomControl: false, 
                });
                mapInstance.current = map;

                L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${apiKey}`, {
                    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
                }).addTo(map);

                L.control.zoom({ position: 'bottomright' }).addTo(map);

                markersRef.current.forEach(marker => marker.remove());
                markersRef.current = [];

                points.forEach(point => {
                    const marker = L.marker([point.lat, point.lng]).addTo(map);
                    marker.bindPopup(`<b>${point.title}</b><br>${point.desc}`);
                    markersRef.current.push(marker);
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
                description: 'No se pudo inicializar el mapa.',
            });
        });

        return () => {
            isMounted = false;
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [toast]);

// se actualiza el mapa cuando cambia el filtro
    useEffect(() => {
        if (!mapInstance.current) return;
        
        const map = mapInstance.current;
        const pointType = activeFilter === 'mascotas' ? 'pet' : 'garden';

        markersRef.current.forEach(marker => map.removeLayer(marker));

        const filteredPoints = points.filter(p => p.type === pointType);

        import('leaflet').then(L => {
            filteredPoints.forEach(point => {
                const marker = L.marker([point.lat, point.lng]).addTo(map);
                marker.bindPopup(`<b>${point.title}</b><br>${point.desc}`);
                markersRef.current.push(marker);
            });
        });

    }, [activeFilter, points]);
    
    //se actualiza el mapa cuando cambia el tamaño de la ventana
    useEffect(() => {
        const handleResize = () => {
            if (mapInstance.current) {
                mapInstance.current.invalidateSize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //se actualiza el mapa cuando cambia el centro del mapa
    const handleGeolocate = () => {
        if (navigator.geolocation && mapInstance.current) {
            const map = mapInstance.current;
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos: [number, number] = [position.coords.latitude, position.coords.longitude];
                    map.flyTo(pos, 15);

                    if (userMarker.current) {
                        userMarker.current.setLatLng(pos);
                    } else {
                        import('leaflet').then(L => {
                            userMarker.current = L.circleMarker(pos, {
                                radius: 8, color: '#fff', weight: 2, fillColor: '#4285F4', fillOpacity: 1,
                            }).addTo(map);
                        });
                    }
                    userMarker.current?.bindPopup('<b>Estás aquí</b>').openPopup();
                },
                () => {
                    ({ variant: 'destructive', title: 'Ubicación denegada', description: 'No pudimos acceder a tu ubicación.' });
                }
            );
        }
    };

    //se actualiza el mapa cuando se hace click en el mapa
    const handleRecenter = () => {
        mapInstance.current?.flyTo(initialCenter, initialZoom);
    };

    return (
        <Card className="w-full h-full rounded-2xl shadow-lg border-4 border-muted overflow-hidden">
            <CardContent className="p-0 h-full relative">
                <div ref={mapRef} className="w-full h-full" role="region" aria-label="Mapa interactivo" />
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
                    <Button size="icon" onClick={handleGeolocate} aria-label="Mi ubicación">
                        <LocateFixed className="w-5 h-5" />
                    </Button>
                    <Button size="icon" onClick={handleRecenter} aria-label="Recentrar mapa">
                        <Home className="w-5 h-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
