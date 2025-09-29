'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock, Sprout, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

// --- Componente de Esqueleto para el Estado de Carga ---
function HuertaPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-40" />
        </div>
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="p-0">
            <Skeleton className="w-full h-64 md:h-80 rounded-t-lg" />
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <div className="space-y-8">
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4 ml-8" />
                <Skeleton className="h-4 w-3/4 ml-8" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-full ml-8" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4 ml-8" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 md:p-8 bg-gray-50">
             <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// --- Componente Principal de la Página ---
export default function HuertaPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug) {
    return <HuertaPageSkeleton />;
  }

  const huertaName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
         <div className="mb-8">
          <Button asChild variant="outline" className="bg-white">
            <Link href="/mapa"> 
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al mapa
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="p-0">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src="/placeholder-garden.jpg"
                alt={`Imagen de ${huertaName}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="flex-grow">
                <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{huertaName}</CardTitle>
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white text-sm">Huerta Comunitaria</Badge>
                </div>

                <div className="space-y-8 text-gray-700">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-green-700" />
                      Horarios y Voluntariado
                    </h3>
                    <p className="ml-8"><strong>Lunes a Viernes:</strong> 9:00 AM - 5:00 PM</p>
                    <p className="ml-8"><strong>Sábados:</strong> 10:00 AM - 2:00 PM (Solo voluntarios)</p>
                    <p className="text-sm text-gray-500 mt-2 ml-8">Los horarios pueden variar. Se recomienda contactar antes de visitar.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3 flex items-center">
                      <Sprout className="w-5 h-5 mr-3 text-green-700" />
                      Nuestros Cultivos
                    </h3>
                    <div className="ml-8 flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-green-300">Tomates</Badge>
                      <Badge variant="outline" className="border-green-300">Lechugas</Badge>
                      <Badge variant="outline" className="border-green-300">Zanahorias</Badge>
                      <Badge variant="outline" className="border-green-300">Hierbas Aromáticas</Badge>
                      <Badge variant="outline" className="border-green-300">Pimientos</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 ml-8">Cultivamos de forma orgánica y sostenible, respetando los ciclos de la naturaleza.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-green-700" />
                      Próximos Eventos
                    </h3>
                    <p className="ml-8"><strong>Taller de Compostaje:</strong> Próximo sábado a las 11:00 AM.</p>
                    <p className="ml-8"><strong>Feria de Intercambio de Semillas:</strong> Finales de mes. ¡No te la pierdas!</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-green-700" />
                      Ubicación
                    </h3>
                    <p className="ml-8">Calle Ficticia 123, Barrio Ejemplo, Santiago.</p>
                    <div className="w-full h-48 bg-gray-200 rounded-lg mt-3 flex items-center justify-center">
                      <p className="text-gray-500">[ Simulación de Mapa Interactivo ]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 md:p-8 bg-gray-50">
            <Link href="/gardens" passHref className="w-full">
              <Button variant="ghost" className="w-full text-green-700 hover:text-green-800 hover:bg-green-100">
                 <ArrowLeft className="w-4 h-4 mr-2" />
                 Ir a conocer más huertas
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
