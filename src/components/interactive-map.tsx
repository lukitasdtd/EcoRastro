import Image from 'next/image';
import { MapPin, PawPrint, Sprout } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function InteractiveMap() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map');

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="relative w-full h-[400px] md:h-[600px] bg-muted">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              fill
              style={{ objectFit: 'cover' }}
              className="opacity-70"
              data-ai-hint={mapImage.imageHint}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Mock Map Pins */}
            <div className="absolute top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center animate-pulse">
                <PawPrint className="h-8 w-8 text-destructive fill-destructive/20" />
                <span className="text-xs font-bold bg-background/80 px-2 py-1 rounded-full shadow-md">Lost Pet</span>
              </div>
            </div>
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
               <div className="flex flex-col items-center">
                <Sprout className="h-10 w-10 text-primary fill-primary/20" />
                <span className="text-xs font-bold bg-background/80 px-2 py-1 rounded-full shadow-md">Garden</span>
              </div>
            </div>
            <div className="absolute top-[60%] left-[75%] transform -translate-x-1/2 -translate-y-1/2">
               <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-accent fill-accent/20" />
                <span className="text-xs font-bold bg-background/80 px-2 py-1 rounded-full shadow-md">Adoption</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
