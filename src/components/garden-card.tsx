import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import type { Garden } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface GardenCardProps {
  garden: Garden;
}

export default function GardenCard({ garden }: GardenCardProps) {
    const image = PlaceHolderImages.find(img => img.id === 'garden1');
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300 rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[4/3]">
        {image && (
            <Image
                src={image.imageUrl}
                alt={garden.name}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={image.imageHint}
            />
        )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-bold text-foreground">{garden.name}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{garden.location}</span>
        </div>
        <p className="text-foreground/80 mt-4">{garden.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" variant="secondary">Ver Detalles</Button>
      </CardFooter>
    </Card>
  );
}
