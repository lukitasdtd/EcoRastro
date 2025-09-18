import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Pet } from '@/lib/types';

interface AdoptionCardProps {
  pet: Pet;
}

export default function AdoptionCard({ pet }: AdoptionCardProps) {
  const image = PlaceHolderImages.find(img => img.id === pet.imageId);

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300 rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[4/3]">
          {image && (
            <Image
              src={image.imageUrl}
              alt={`Una foto de ${pet.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-bold text-foreground">{pet.name}</CardTitle>
        <CardDescription>{pet.breed}</CardDescription>
        <p className="text-sm text-muted-foreground mt-2">{pet.age} años</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full">Adoptar</Button>
      </CardFooter>
    </Card>
  );
}
