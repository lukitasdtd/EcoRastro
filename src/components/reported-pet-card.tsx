import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ReportedPet } from '@/lib/types';
import { MapPin, CalendarDays, PawPrint } from 'lucide-react';

interface ReportedPetCardProps {
    pet: ReportedPet;
}

// componente de tarjeta de mascota reportada
export default function ReportedPetCard({ pet }: ReportedPetCardProps) {
    // Construir la URL completa de la imagen. Asume que el backend sirve los archivos est�ticos.
    const imageUrl = pet.image_url ? `http://localhost:3001/${pet.image_url}` : '/placeholder.jpg';

    // Formatear la fecha para que sea legible
    const formattedDate = new Date(pet.fecha_reporte).toLocaleDateString('es-CL', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 rounded-2xl bg-card">
            <CardHeader className="p-0 relative">
                <div className="relative w-full aspect-video">
                    <Image
                        src={imageUrl}
                        alt={`Foto de ${pet.nombre_mascota}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }} // Fallback por si la imagen no carga
                    />
                    <Badge
                        variant={pet.estado_reporte === 'perdido' ? 'destructive' : 'default'}
                        className="absolute top-2 right-2 text-xs"
                    >
                        {pet.estado_reporte.charAt(0).toUpperCase() + pet.estado_reporte.slice(1)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col">
                <CardTitle className="text-xl font-bold text-foreground mb-1">{pet.nombre_mascota}</CardTitle>
                <p className="text-sm text-muted-foreground">{pet.raza}</p>

                <div className="mt-4 space-y-2 text-sm text-foreground/80">
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{[pet.especie, pet.tamano].filter(Boolean).join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="truncate">{pet.ultimo_lugar_visto}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                <p className="text-sm text-foreground/60 mt-4 line-clamp-2 flex-grow">{pet.descripcion}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                    <Link href={`/mascotas/reporte/${pet.id}`}>Ver Detalles</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
