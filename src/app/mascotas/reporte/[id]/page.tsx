// TAREA 9: Página de Detalle Dinámica (CRUD - Read)
import { notFound } from 'next/navigation';
import Image from 'next/image';
// CORRECCIÓN FINAL: Se importa `reportedPets` que ahora sí existe en data.ts
import { reportedPets } from '@/lib/data'; 
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MapPin, CalendarDays, PawPrint, CheckCircle, XCircle, Phone, MessageSquare, Mail, Award, Info
} from 'lucide-react';

// TAREA 10: Generación de Páginas Estáticas (getStaticPaths)
export async function generateStaticParams() {
  // Se utiliza la lista correcta con los datos detallados.
  return reportedPets.map(pet => ({
    id: pet.id,
  }));
}

// --- Componente de la Página de Detalle ---
export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Se busca la mascota en la lista correcta `reportedPets`.
  const pet = reportedPets.find(p => p.id === id);

  if (!pet) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === pet.imageId);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Columna Izquierda: Imagen y Estado */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="relative w-full aspect-square">
                  <Image 
                    src={image?.src ?? '/placeholder.jpg'} 
                    alt={pet.name}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute top-2 right-2 flex items-center gap-1 text-white px-2 py-1 rounded-full text-xs font-semibold ${pet.status === 'lost' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {pet.status === 'lost' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                    {pet.status === 'lost' ? 'Perdido' : 'Encontrado'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TAREA 11: Componente de Acciones (Botones de Contacto) */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Phone size={18}/> Contactar al Reportante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600">
                  <MessageSquare size={16}/> Enviar Mensaje
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Mail size={16}/> Enviar Email
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha: Detalles del Reporte */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800">{pet.name}</CardTitle>
                    <CardDescription className="text-lg text-gray-500 mt-1">{pet.breed}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1.5 text-sm">
                    <PawPrint size={14}/> {pet.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400"/>
                    <span>Visto por última vez en: <strong>{pet.lastSeenLocation}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-gray-400"/>
                    <span>Fecha: <strong>{pet.lastSeenDate}</strong></span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Descripción</h3>
                  <p className="text-gray-600 whitespace-pre-line">{pet.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <Award size={18}/>
                  <p><strong>Recompensa:</strong> {pet.reward ? `$${pet.reward}` : 'No especificada'}</p>
                </div>
              </CardContent>
            </Card>

            {/* TAREA 12: Componente Interactivo (Comentarios/Avistamientos) */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Info size={18}/> Avistamientos de la Comunidad</CardTitle>
                <CardDescription>¿Has visto a {pet.name}? ¡Deja un comentario aquí!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <img src="/placeholder-user.jpg" alt="user" className="w-10 h-10 rounded-full"/>
                    <div className="flex-1 bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Lo vi cerca del parque principal esta mañana. Parecía asustado.</p>
                      <p className="text-xs text-gray-400 mt-1">- Vecino de la zona, hace 2 horas</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment">Agregar un avistamiento</Label>
                    <Textarea id="comment" placeholder={`Ej: Acabo de ver a ${pet.name} corriendo hacia...`} />
                    <Button>Publicar comentario</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
