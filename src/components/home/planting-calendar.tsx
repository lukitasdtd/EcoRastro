import { Suspense } from 'react';
import Link from 'next/link';
import { Leaf, Sun, Snowflake, Sprout } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CalendarPreview from '@/components/calendar/CalendarPreview'; // <-- Client Component

/** Tarjetas de temporadas (lado derecho) */
const seasons = [
  { icon: <Leaf className="w-6 h-6 text-primary" />, title: 'Primavera', description: 'Ideal para tomates y lechugas, da inicio a la temporada.' },
  { icon: <Sun className="w-6 h-6 text-primary" />, title: 'Verano', description: 'Tiempo de abundancia, cultiva pimientos y pepinos.' },
  { icon: <Sprout className="w-6 h-6 text-primary" />, title: 'Otoño', description: 'Siembra espinaca y coliflor para fortalecer tu huerto.' },
  { icon: <Snowflake className="w-6 h-6 text-primary" />, title: 'Invierno', description: 'Protege tus cultivos del frío, planta ajos y cebollas resistentes.' },
];

/**
 * PlantingCalendar (Server Component)
 *  - Cabecera con título/enlace.
 *  - Grid 2 columnas: calendario (izquierda) + tarjetas (derecha).
 *  - Alturas alineadas con min-h y items-stretch.
 */
export function PlantingCalendar() {
  return (
    <section className="w-full bg-background py-16 lg:py-24" aria-labelledby="planting-calendar-title">
      <div className="container mx-auto px-4">
        {/* Contenedor principal con borde y sombra */}
        <Card className="p-8 md:p-12 rounded-2xl shadow-lg border transition-all">
          {/* Cabecera de sección */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 id="planting-calendar-title" className="text-3xl md:text-4xl font-bold tracking-tight transition-colors">
              <Link href="/calendar" className="hover:text-green-600 hover:underline">
                Calendario de siembra
              </Link>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              ¡Haz clic en una temporada para descubrir qué plantar!
            </p>
          </div>

          {/* Grid principal: forzamos que ambos lados estiren a la misma altura */}
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* IZQUIERDA: calendario con fondo verde claro y borde sutil */}
            <div className="relative w-full min-h-[520px]">
              <Suspense fallback={<Skeleton className="w-full h-[520px] rounded-2xl" />}>
                {/* Mezcla todas las categorías en el preview; cambia a 'Verduras' si quieres filtrar */}
                <CalendarPreview category="Todas" />
              </Suspense>
            </div>

            {/* DERECHA: tarjetas distribuidas para igualar visualmente la altura del calendario */}
            <div className="flex flex-col gap-6 min-h-[520px] justify-between">
              {seasons.map((season, index) => (
                <Link
                  key={index}
                  href="/calendar"
                  className="block group rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <Card className="p-4 shadow-sm group-hover:shadow-md transition-shadow duration-300 h-full">
                    <CardContent className="flex items-center gap-4 p-0">
                      {/* Icono */}
                      <div className="bg-primary/10 p-3 rounded-lg">
                        {season.icon}
                      </div>
                      {/* Texto */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground">{season.title}</h3>
                        <p className="text-foreground/70">{season.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
