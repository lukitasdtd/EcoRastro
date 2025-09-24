import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ReportedPet } from '@/lib/types';
import { MapPin, CalendarDays, PawPrint } from 'lucide-react';

interface ReportedPetCardProps {
  pet: ReportedPet;
}

export default function ReportedPetCard({ pet }: ReportedPetCardProps) {
  const image = PlaceHolderImages.find(img => img.id === pet.imageId);

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 rounded-2xl bg-card">
      <CardHeader className="p-0 relative">
        <div className="relative w-full aspect-video">
          {image && (
            <Image
              src={image.imageUrl}
              alt={`Foto de ${pet.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={pet.species.toLowerCase()}
            />
          )}
           <Badge 
              variant={pet.status === 'Perdido' ? 'destructive' : 'default'}
              className="absolute top-2 right-2 text-xs"
            >
              {pet.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-xl font-bold text-foreground mb-1">{pet.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{pet.breed}</p>
        
        <div className="mt-4 space-y-2 text-sm text-foreground/80">
            <div className="flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{pet.species}, {pet.size}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="truncate">{pet.location}</span>
            </div>
             <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{new Date(pet.date).toLocaleDateString('es-CL')}</span>
            </div>
        </div>

        <p className="text-sm text-foreground/60 mt-4 line-clamp-2 flex-grow">{pet.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/mascotas/reporte/${pet.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
