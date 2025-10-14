import Image from 'next/image';
import Link from 'next/link'; // Importar Link
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone } from 'lucide-react';
import type { Garden } from '@/lib/types';

interface GardenCardProps {
    garden: Garden;
}

const formatAddress = (address: Garden['direccion']) => {
    if (typeof address === 'string') {
        try {
            const parsed = JSON.parse(address);
            return `${parsed.comuna}, ${parsed.region}`;
        } catch (e) {
            return address;
        }
    }
    if (typeof address === 'object' && address !== null) {
        return `${address.comuna}, ${address.region}`;
    }
    return 'Ubicación no disponible';
};

export default function GardenCard({ garden }: GardenCardProps) {
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
                        onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }}
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
                
                <div className="mt-4 space-y-2">
                    {garden.cont_email && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <a href={`mailto:${garden.cont_email}`} className="hover:underline">{garden.cont_email}</a>
                        </div>
                    )}
                    {garden.cont_tel && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{garden.cont_tel}</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                {/* Envolver el botón con el componente Link */}
                <Link href={`/huertas/${garden.id}`} passHref className="w-full">
                    <Button className="w-full" variant="secondary">Ver Detalles</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
