import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

// --- Definición de datos ---
// Esto se duplicaría desde la página del mapa. En una app real, vendría de una API.
const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const allPoints = [
  { lat: -33.45, lng: -70.65, title: 'Perro Perdido Providencia', desc: 'Golden Retriever encontrado.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Perro Perdido Providencia')}` },
  { lat: -33.48, lng: -70.58, title: 'Huerta Comunitaria Ñuñoa', desc: 'Cultivos orgánicos en Ñuñoa.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Huerta Comunitaria Ñuñoa')}` },
  { lat: -33.50, lng: -70.68, title: 'Gato Encontrado La Cisterna', desc: 'Gato naranja visto en paradero 21.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Gato Encontrado La Cisterna')}` },
  { lat: -33.43, lng: -70.62, title: 'Jardín Vertical Santiago', desc: 'Iniciativa vecinal en Santiago Centro.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Jardín Vertical Santiago')}` },
  { lat: -33.46, lng: -70.60, title: 'Punto de Adopción Las Condes', desc: 'Jornada de adopción de cachorros.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Punto de Adopción Las Condes')}` },
  { lat: -33.49, lng: -70.70, title: 'Huerta Escolar Maipú', desc: 'Proyecto educativo en Maipú.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Huerta Escolar Maipú')}` },
  { lat: -33.42, lng: -70.66, title: 'Canario Perdido Recoleta', desc: 'Canario amarillo visto cerca del cerro.', type: 'pet' as const, image: '/gato-naranjo.jpg', link: `/mascotas/${slugify('Canario Perdido Recoleta')}` },
  { lat: -33.51, lng: -70.61, title: 'Composta Comunitaria La Florida', desc: 'Centro de compostaje en La Florida.', type: 'garden' as const, image: '/gato-naranjo.jpg', link: `/huertas/${slugify('Composta Comunitaria La Florida')}` },
];

const petPoints = allPoints.filter(p => p.type === 'pet');

// --- Generación de Páginas Estáticas (Server-Side) ---
export async function generateStaticParams() {
  return petPoints.map(pet => ({
    slug: slugify(pet.title),
  }));
}

// --- Componente de la Página de Detalle (Server Component) ---
export default function MascotaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Buscar la mascota usando el slug de la URL
  const pet = petPoints.find(p => slugify(p.title) === slug);

  if (!pet) {
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
                    src={pet.image}
                    alt={`Imagen de ${pet.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="bg-gray-200"
                />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex items-center mb-2">
              <PawPrint className="w-8 h-8 text-[#F58220] mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">{pet.title}</h1>
            </div>
            <CardDescription className="text-xl text-gray-600 mb-6 ml-11">
              {pet.desc}
            </CardDescription>
            
            <div className="prose prose-lg max-w-none text-gray-800 ml-11">
                <p>Este es un reporte de mascota. La información aquí es crucial para ayudar a reunir a una mascota con su familia o para encontrarle un nuevo hogar.</p>
                <p>En una versión futura, esta página podría incluir:</p>
                <ul>
                    <li>Fecha y hora en que fue vista por última vez.</li>
                    <li>Un formulario de contacto para la persona que hizo el reporte.</li>
                    <li>Comentarios de la comunidad con posibles avistamientos.</li>
                    <li>Estado del reporte (Ej: Aún perdido, Ya en casa).</li>
                </ul>
                <p>Por ahora, esta plantilla confirma que la navegación y la carga de datos funcionan para los reportes de mascotas.</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
