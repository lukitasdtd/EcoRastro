
import Image from 'next/image';
import { Leaf, Sun, Snowflake, Sprout } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const seasons = [
  {
    icon: <Leaf className="w-6 h-6 text-primary" />,
    title: 'Primavera',
    description: 'Ideal para tomates y lechugas, da inicio a la temporada.',
  },
  {
    icon: <Sun className="w-6 h-6 text-primary" />,
    title: 'Verano',
    description: 'Tiempo de abundancia, cultiva pimientos y pepinos.',
  },
  {
    icon: <Sprout className="w-6 h-6 text-primary" />,
    title: 'Otoño',
    description: 'Siembra espinaca y coliflor para fortalecer tu huerto.',
  },
  {
    icon: <Snowflake className="w-6 h-6 text-primary" />,
    title: 'Invierno',
    description: 'Protege tus cultivos del frío, planta ajos y cebollas resistentes.',
  },
];

export function PlantingCalendar() {
  const calendarImage = PlaceHolderImages.find(img => img.id === 'calendario-huerta');

  return (
    <section className="w-full bg-background py-16 lg:py-24" aria-labelledby="planting-calendar-title">
      <div className="container mx-auto px-4">
        <Card className="p-8 md:p-12 rounded-2xl shadow-lg border">
          <div className="text-center mb-12">
            <h2 id="planting-calendar-title" className="text-3xl md:text-4xl font-bold tracking-tight">
              Calendario de siembra
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
              ¡Haz clic, Descubre qué plantar en cada temporada!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Columna de la Imagen */}
            <div className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-md">
              {calendarImage && (
                <Image
                  src={calendarImage.imageUrl}
                  alt={calendarImage.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={calendarImage.imageHint}
                />
              )}
            </div>

            {/* Columna de las Temporadas */}
            <div className="flex flex-col gap-6">
              {seasons.map((season, index) => (
                <Card key={index} className="p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="flex items-center gap-4 p-0">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      {season.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">{season.title}</h3>
                      <p className="text-foreground/70">{season.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
