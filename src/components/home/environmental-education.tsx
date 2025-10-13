
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

// sección de educación ambiental
const educationalTopics = [
    {
      title: 'Huertos Sostenibles',
      description: 'Tips para tu huerto y soberanía alimentaria',
      href: '/huerta/educacion',
    },
    {
      title: 'Fauna Silvestre',
      description: 'Cómo proteger y convivir con ella',
      href: '/fauna-silvestre',
    },
    {
      title: 'Prácticas Verdes',
      description: 'Acciones sostenibles para tu día a día',
      href: '/practicas-verdes',
    },
    {
      title: 'Mascotas Felices',
      description: 'Guías de cuidados y tenencia responsable',
      href: '/mascotas/educacion',
    },
  ];

export function EnvironmentalEducation() {
  return (
    <section className="w-full bg-background py-16 lg:py-24" aria-labelledby="education-title">
      <div className="container mx-auto px-4">
        <Card className="p-8 md:p-12 rounded-2xl shadow-lg border">
          <div className="text-center mb-12">
            <h2 id="education-title" className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                <Link href="/educacion" className='hover:text-green-600 hover:underline'> 
                Aprende y Actúa: Educación Ambiental
                </Link>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                Fomentamos el respeto por la vida. Contenidos claros y visuales para un futuro sostenible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Columna de las Imágenes */}
            <div className="flex flex-col gap-6">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
                    <Image
                        src="/adopcion.webp"
                        alt="Una manada de cachorros en un entorno natural"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
                    <Image
                        src="/cultivo_lechuga.jpg"
                        alt="Un cultivo de lechugas frescas en un huerto"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Columna de las Tarjetas */}
            <div className="flex flex-col gap-6">
              {educationalTopics.map((topic, index) => (
                <Link key={index} href={topic.href} className="block group">
                  <Card className="p-6 shadow-sm bg-accent/20 border-accent/30 group-hover:shadow-lg group-hover:bg-accent/30 transition-shadow duration-300 h-full">
                    <CardContent className="p-0">
                        <h3 className="font-bold text-lg text-foreground">{topic.title}</h3>
                        <p className="text-foreground/70">{topic.description}</p>
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
