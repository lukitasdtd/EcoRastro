import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import type { Shelter } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ShelterCardProps {
  shelter: Shelter;
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
  const image = PlaceHolderImages.find(img => img.id === shelter.imageId);

  return (
    <Card className="flex items-center gap-4 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl border">
      <CardHeader className="p-0">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
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
      <CardContent className="p-0 flex-grow space-y-2">
        <h3 className="font-bold text-lg text-foreground">{shelter.name}</h3>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-1.5" />
          <span>{shelter.location}</span>
        </div>
        <Button variant="secondary" size="sm" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
            Ver animales
        </Button>
      </CardContent>
    </Card>
  );
}
