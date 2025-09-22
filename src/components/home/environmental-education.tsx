
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const educationalTopics = [
    {
      title: 'Huertos Sostenibles',
      description: 'Tips para tu huerto y soberanía alimentaria',
    },
    {
      title: 'Fauna Silvestre',
      description: 'Cómo proteger y convivir con ella',
    },
    {
      title: 'Prácticas Verdes',
      description: 'Acciones sostenibles para tu día a día',
    },
    {
      title: 'Mascotas Felices',
      description: 'Guías de cuidados y tenencia responsable',
    },
  ];

export function EnvironmentalEducation() {
  const petsImage = PlaceHolderImages.find(img => img.id === 'hero-mascotas');
  const gardenImage = PlaceHolderImages.find(img => img.id === 'hero-huerta');

  return (
    <section className="w-full bg-background py-16 lg:py-24" aria-labelledby="education-title">
      <div className="container mx-auto px-4">
        <Card className="p-8 md:p-12 rounded-2xl shadow-lg border">
          <div className="text-center mb-12">
            <h2 id="education-title" className="text-3xl md:text-4xl font-bold tracking-tight">
                Aprende y Actúa: Educación Ambiental
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/60 mt-2">
                Fomentamos el respeto por la vida. Contenidos claros y visuales para un futuro sostenible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Columna de las Imágenes */}
            <div className="flex flex-col gap-6">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
                {petsImage && (
                    <Image
                    src={petsImage.imageUrl}
                    alt={petsImage.description}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={petsImage.imageHint}
                    />
                )}
                </div>
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
                {gardenImage && (
                    <Image
                    src={gardenImage.imageUrl}
                    alt={gardenImage.description}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={gardenImage.imageHint}
                    />
                )}
                </div>
            </div>

            {/* Columna de las Tarjetas */}
            <div className="flex flex-col gap-6">
              {educationalTopics.map((topic, index) => (
                <Card key={index} className="p-6 shadow-sm bg-accent/20 border-accent/30 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                      <h3 className="font-bold text-lg text-foreground">{topic.title}</h3>
                      <p className="text-foreground/70">{topic.description}</p>
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
