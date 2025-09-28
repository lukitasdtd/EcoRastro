import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { gardenPoints, slugify } from '@/lib/data'; // 1. Importar datos y función de utilidad

// La lista de puntos y la función slugify se han eliminado de aquí.
// Ahora provienen de `src/lib/data.ts` para garantizar la coherencia.

// --- Generación de Páginas Estáticas (Server-Side) ---
// Usamos la lista pre-filtrada de huertas para generar las páginas.
export async function generateStaticParams() {
  return gardenPoints.map(garden => ({
    slug: slugify(garden.title),
  }));
}

// --- Componente de la Página de Detalle (Server Component) ---
export default function HuertaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 2. Buscar en la lista de huertas importada
  const garden = gardenPoints.find(p => slugify(p.title) === slug);

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
