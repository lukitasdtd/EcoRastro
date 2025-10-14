import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import type { Shelter } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface ShelterCardProps {
  shelter: Shelter;
  className?: string;
}

//componente de tarjeta de albergue en el mapa de EcoRastro 
export default function ShelterCard({ shelter, className }: ShelterCardProps) {
  const image = PlaceHolderImages.find(img => img.id === shelter.imageId);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(shelter.rating);
    const hasHalfStar = shelter.rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={`star-full-${i}`} className="w-4 h-4 fill-accent text-accent" />
        );
      } else {
        stars.push(
          <Star key={`star-empty-${i}`} className="w-4 h-4 text-muted-foreground/30" />
        );
      }
    }
    return stars;
  };

  
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border overflow-hidden bg-card flex flex-col", className)}>
      <div className="relative w-full aspect-video">
        {image && (
          <Image
            src={image.imageUrl}
            alt={`Logo de ${shelter.name}`}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={image.imageHint}
            className="rounded-t-xl"
          />
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base text-foreground leading-tight">{shelter.name}</h3>
        <div className="flex items-center text-muted-foreground text-xs mt-1">
          <MapPin className="h-3 w-3 mr-1.5 flex-shrink-0" />
          <span className="truncate">{shelter.location}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {renderStars()}
          </div>
          <span className="text-xs text-muted-foreground">({shelter.reviewCount} reseñas)</span>
        </div>
        <div className="mt-auto pt-4">
            <Button variant="secondary" size="sm" className="bg-accent/20 text-accent-foreground hover:bg-accent/30 w-full text-xs h-8">
                Ver animales
            </Button>
        </div>
      </div>
    </Card>
  );
}
