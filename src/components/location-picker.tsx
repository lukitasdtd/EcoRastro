'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Carga dinámica del mapa para evitar problemas de renderizado en el servidor (SSR)
const LeafletMapDraggable = dynamic(() => import('@/components/leaflet-map-draggable'), {
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground p-4 bg-muted rounded-md mt-2">Cargando mapa...</p>,
});

interface LocationPickerProps {
    onLocationChange: (lat: number, lng: number) => void;
}

export function LocationPicker({ onLocationChange }: LocationPickerProps) {
    const { toast } = useToast();
    // Estado para guardar la posición actual del marcador del mapa
    const [position, setPosition] = useState<[number, number] | null>(null);
    // Estado para controlar si se está buscando la ubicación
    const [isLocating, setIsLocating] = useState(false);

    // Manejador para cuando la ubicación cambia en el mapa (al arrastrar o al hacer clic)
    const handleLocationChange = useCallback((lat: number, lng: number) => {
        setPosition([lat, lng]);
        onLocationChange(lat, lng);
    }, [onLocationChange]);

    // Función para obtener la geolocalización del navegador
    const handleGetCurrentLocation = () => {
        setIsLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    toast({
                        title: "Ubicación encontrada",
                        description: "El mapa se ha centrado en tu ubicación actual.",
                    });
                    // Actualizamos la posición, lo que hará que el mapa se actualice
                    handleLocationChange(latitude, longitude);
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error al obtener la geolocalización:", error);
                    toast({
                        variant: 'destructive',
                        title: "Error de ubicación",
                        description: error.code === error.PERMISSION_DENIED 
                            ? "Permiso denegado. Por favor, activa la geolocalización en tu navegador."
                            : "No se pudo obtener tu ubicación. Inténtalo de nuevo.",
                    });
                    setIsLocating(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000, // 10 segundos de tiempo de espera
                    maximumAge: 0, // Forzar una nueva lectura de la ubicación
                }
            );
        } else {
            toast({ variant: 'destructive', title: "Navegador no compatible", description: "Tu navegador no soporta geolocalización." });
            setIsLocating(false);
        }
    };
    
    return (
        <div className="relative">
             <div className="h-[400px] mt-2 w-full rounded-md overflow-hidden z-0">
                <LeafletMapDraggable 
                    onLocationChange={handleLocationChange} 
                    /* Corregido: Usar una prop reactiva como `position` en lugar de `initialPosition` */
                    position={position}
                />
            </div>
            <Button 
                type="button" // Importante para que no envíe el formulario
                size="sm"
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/95"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
            >
                <LocateFixed className={`mr-2 h-4 w-4 ${isLocating ? 'animate-pulse' : ''}`} />
                {isLocating ? 'Buscando...' : 'Usar mi ubicación'}
            </Button>
        </div>
    );
}
