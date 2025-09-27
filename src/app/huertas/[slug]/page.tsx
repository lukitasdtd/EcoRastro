import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

// --- Definición de datos ---
// En una aplicación real, esto vendría de una API o una base de datos.
const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const mapPoints = [
  { lat: -33.48, lng: -70.58, title: 'Huerta Comunitaria Ñuñoa', desc: 'Cultivos orgánicos en Ñuñoa.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Huerta Comunitaria Ñuñoa')}` },
  { lat: -33.43, lng: -70.62, title: 'Jardín Vertical Santiago', desc: 'Iniciativa vecinal en Santiago Centro.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Jardín Vertical Santiago')}` },
  { lat: -33.49, lng: -70.70, title: 'Huerta Escolar Maipú', desc: 'Proyecto educativo en Maipú.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Huerta Escolar Maipú')}` },
  { lat: -33.51, lng: -70.61, title: 'Composta Comunitaria La Florida', desc: 'Centro de compostaje en La Florida.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Composta Comunitaria La Florida')}` },
];

// --- Generación de Páginas Estáticas (Server-Side) ---
// Esto le dice a Next.js que cree estas páginas durante el build, haciéndolas súper rápidas.
// ESTA FUNCIÓN REQUIERE QUE EL COMPONENTE SEA UN SERVER COMPONENT (sin 'use client').
export async function generateStaticParams() {
  return mapPoints.map(garden => ({
    slug: slugify(garden.title),
  }));
}

// --- Componente de la Página de Detalle (Server Component) ---
export default function HuertaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Buscar la información de la huerta usando el slug de la URL
  const garden = mapPoints.find(p => slugify(p.title) === slug);

  // Si no se encuentra la huerta, mostrar la página 404 de Next.js
  if (!garden) {
    notFound();
  }

  return (
    <div className="bg-[#F7F9F7] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="mb-8">
          <Button asChild variant="outline" className="bg-white">
            <Link href="/mapa">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al mapa
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden rounded-2xl shadow-lg border-2 border-gray-200">
          <CardHeader className="p-0">
             {/* Usamos el componente Image de Next.js para optimización automática */}
            <div className="relative w-full h-64 md:h-80">
                 <Image
                    src={garden.image}
                    alt={`Imagen de ${garden.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="bg-gray-200"
                />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold text-[#1F3D2A] mb-2">{garden.title}</h1>
            <CardDescription className="text-xl text-gray-600 mb-6">
              {garden.desc}
            </CardDescription>
            
            <div className="prose prose-lg max-w-none text-gray-800">
                <p>Esta es la página de detalle para la <strong>{garden.title}</strong>. Aquí puedes encontrar toda la información relevante sobre esta iniciativa.</p>
                <p>En el futuro, cuando se conecte a una base de datos, esta sección podría contener:</p>
                <ul>
                    <li>Horarios de apertura y voluntariado.</li>
                    <li>Una galería de fotos actualizada.</li>
                    <li>Tipos de plantas que se cultivan en la temporada.</li>
                    <li>Noticias y eventos de la comunidad.</li>
                    <li>Un mapa detallado de la ubicación exacta.</li>
                </ul>
                <p>Por ahora, esto sirve como una plantilla robusta, demostrando que la navegación y la obtención de datos para una página específica funcionan correctamente utilizando los datos de ejemplo.</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
