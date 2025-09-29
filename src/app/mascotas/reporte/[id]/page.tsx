'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft, PawPrint, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { allMapPoints } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

// --- Componente de Esqueleto para el Estado de Carga ---
function ReporteMascotaPageSkeleton() {
  return (
    <div className="bg-[#F7F9F7] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Skeleton className="h-10 w-40" />
        </div>
        <Card className="overflow-hidden rounded-2xl shadow-lg border-2 border-gray-200">
          <Skeleton className="w-full h-64 md:h-80" />
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Skeleton className="h-8 w-8 rounded-full mr-3" />
              <Skeleton className="h-10 w-3/4" />
            </div>
            <Skeleton className="h-6 w-1/2 mb-6 ml-11" />
            <div className="prose prose-lg max-w-none text-gray-800 ml-11 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// --- Componente de Página de Detalle ---
export default function ReporteMascotaPage() {
  const params = useParams();
  const id = params.id as string;

  // Muestra el esqueleto mientras el id no esté disponible
  if (!id) {
    return <ReporteMascotaPageSkeleton />;
  }

  const numericId = parseInt(id, 10);
  const pet = allMapPoints.find(p => p.type === 'pet' && p.id === numericId);

  // Si no se encuentra la mascota, muestra un mensaje amigable
  if (!pet) {
     return (
      <div className="bg-[#F7F9F7] min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Reporte no encontrado</h1>
          <p className="text-gray-600 mb-8">El reporte de mascota que buscas no existe o fue eliminado.</p>
          <Button asChild>
            <Link href="/mapa">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al mapa
            </Link>
          </Button>
        </div>
      </div>
    );
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

        <Card className="overflow-hidden rounded-2xl shadow-lg border-2 border-gray-200 flex flex-col">
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
          <CardContent className="p-8 flex-grow">
            <div className="flex items-center mb-2">
              <PawPrint className="w-8 h-8 text-[#F58220] mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">{pet.title}</h1>
            </div>
            <CardDescription className="text-xl text-gray-600 mb-6 ml-11">
              {pet.desc}
            </CardDescription>
            <div className="prose prose-lg max-w-none text-gray-800 ml-11">
              <p>Este es un reporte de mascota. La información aquí es crucial para ayudar a reunir a una mascota con su familia o para encontrarle un nuevo hogar.</p>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50">
            <Link href="/mascotas/buscar" passHref className="w-full">
              <Button variant="ghost" className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-100">
                <Search className="w-4 h-4 mr-2" />
                Buscar otras mascotas
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
