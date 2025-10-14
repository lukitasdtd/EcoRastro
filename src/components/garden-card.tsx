import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import type { Garden } from '@/lib/types';

interface GardenCardProps {
    garden: Garden;
}

// Funci�n auxiliar para formatear la direcci�n
const formatAddress = (address: Garden['direccion']) => {
    if (typeof address === 'string') {
        try {
            const parsed = JSON.parse(address);
            return `${parsed.comuna}, ${parsed.region}`;
        } catch (e) {
            return address; // Devuelve el string si no es un JSON v�lido
        }
    }
    if (typeof address === 'object' && address !== null) {
        return `${address.comuna}, ${address.region}`;
    }
    return 'Ubicaci�n no disponible';
};

export default function GardenCard({ garden }: GardenCardProps) {
    // Construir la URL completa de la imagen. Asume que el backend est� en el puerto 3001.
    const imageUrl = garden.image_url ? `http://localhost:3001/${garden.image_url}` : '/placeholder.jpg';
    const location = formatAddress(garden.direccion);

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300 rounded-2xl">
            <CardHeader className="p-0">
                <div className="relative w-full aspect-[4/3]">
                    <Image
                        src={imageUrl}
                        alt={garden.nombre}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }} // Fallback por si la imagen no carga
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
                <CardTitle className="text-2xl font-bold text-foreground">{garden.nombre}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location}</span>
                </div>
                <p className="text-foreground/80 mt-4">{garden.descripcion}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button className="w-full" variant="secondary">Ver Detalles</Button>
            </CardFooter>
        </Card>
    );
}
