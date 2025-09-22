import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    const halfStar = shelter.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-accent text-accent" />);
    }
    // Note: No half-star icon in Lucide, so we'll just use full/empty for now.
    // To implement half-stars, a custom SVG or a different icon library would be needed.
    for (let i = 0; i < 5 - fullStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/50" />);
    }
    return stars;
  };

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
        <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars()}
            </div>
            <span className="text-xs text-muted-foreground">({shelter.reviewCount} reseñas)</span>
        </div>
        <Button variant="secondary" size="sm" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
            Ver animales
        </Button>
      </CardContent>
    </Card>
  );
}