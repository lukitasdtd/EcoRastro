import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import type { Shelter } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ShelterCardProps {
  shelter: Shelter;
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
  const image = PlaceHolderImages.find(img => img.id === shelter.imageId);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(shelter.rating);
    // Logic for half-star can be added here if a half-star icon is available
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className={`w-4 h-4 ${i < fullStars ? 'fill-accent text-accent' : 'text-muted-foreground/50'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl border overflow-hidden">
      <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-4">
        <div className="relative w-full h-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={`Logo de ${shelter.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={image.imageHint}
              className="rounded-l-xl"
            />
          )}
        </div>
        <div className="p-4 flex flex-col justify-center">
          <h3 className="font-bold text-lg text-foreground leading-tight">{shelter.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className="truncate">{shelter.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {renderStars()}
            </div>
            <span className="text-xs text-muted-foreground">({shelter.reviewCount} reseñas)</span>
          </div>
          <Button variant="secondary" size="sm" className="bg-accent/20 text-accent-foreground hover:bg-accent/30 mt-3 self-start">
              Ver animales
          </Button>
        </div>
      </div>
    </Card>
  );
}
