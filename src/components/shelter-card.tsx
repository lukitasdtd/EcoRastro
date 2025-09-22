import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Shelter } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ShelterCardProps {
  shelter: Shelter;
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
  const image = PlaceHolderImages.find(img => img.id === shelter.imageId);

  return (
    <Card className="flex items-center gap-4 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
          {image && (
            <Image
              src={image.imageUrl}
              alt={`Logo de ${shelter.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <h3 className="font-bold text-lg text-foreground">{shelter.name}</h3>
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{shelter.location}</span>
        </div>
        <Button variant="link" className="p-0 h-auto text-primary font-semibold mt-2">
            Ver animales
            <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
