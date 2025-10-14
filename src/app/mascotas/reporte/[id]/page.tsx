
// TAREA 9: Página de Detalle Dinámica (CRUD - Read)
// Esta es una página de "Ruta Dinámica" en Next.js. El `[id]` en el nombre de la carpeta
// significa que la página puede manejar cualquier ruta como `/mascotas/reporte/rp1`, `/mascotas/reporte/rp2`, etc.
// El `id` se extrae de la URL y se usa para obtener los datos específicos de esa mascota.

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { reportedPets } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CommentForm } from '@/components/pets/comment-form'; // Importamos el nuevo componente
import {
  MapPin, CalendarDays, PawPrint, CheckCircle, XCircle, Phone, MessageSquare, Award, Info
} from 'lucide-react';

// `generateStaticParams` es una función de Next.js que pre-renderiza estas páginas en el momento de la construcción (build).
// Esto mejora el rendimiento y el SEO, ya que las páginas de mascotas más importantes se generan como HTML estático.
export function generateStaticParams() {
  return reportedPets.map(pet => ({
    id: pet.id,
  }));
}

// El componente de la página recibe `params`, que contiene el `id` de la mascota desde la URL.
export default function ReporteDetallePage({ params }: { params: { id: string } }) {
  // --- Lógica de "Read" ---
  // Se busca en el array `reportedPets` la mascota que coincida con el `id` de la URL.
  // Esto simula una consulta a una base de datos para obtener un registro específico.
  const pet = reportedPets.find(p => p.id === params.id);

  // Si no se encuentra la mascota, se muestra la página 404 de Next.js.
  if (!pet) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === pet.imageId);

  // Helper para renderizar los detalles en tarjetas
  const DetailCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card className="bg-background/60">
      <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
        {icon}
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-muted/30 flex-grow">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        {/* --- Encabezado --- */}
        <header className="mb-8">
            <Badge 
                variant={pet.status === 'Perdido' ? 'destructive' : 'default'}
                className="mb-2"
            >
                {pet.status}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {pet.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{pet.location}</span>
            </div>
            <p className="text-sm text-muted-foreground/80 mt-2">
                Reportado el {new Date(pet.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Columna Izquierda: Imagen, Contacto y Comentarios --- */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="overflow-hidden shadow-lg">
                <div className="relative w-full aspect-video">
                {image && (
                    <Image
                    src={image.imageUrl}
                    alt={`Foto de ${pet.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={pet.species.toLowerCase()}
                    priority
                    />
                )}
                </div>
            </Card>

             <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                    <CardDescription>
                        Si tienes información sobre {pet.name}, contacta a {pet.contactName}.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button className="w-full justify-start gap-3" asChild>
                        <a href={`tel:${pet.contactPhone}`}>
                            <Phone className="h-5 w-5" /> Llamar a {pet.contactName}
                        </a>
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3" asChild>
                        <a href={`https://wa.me/${pet.contactPhone?.replace(/\+/g, '')}`} target="_blank">
                            <MessageSquare className="h-5 w-5" /> Enviar WhatsApp
                        </a>
                    </Button>
                    <div className="text-xs text-muted-foreground text-center pt-2">
                        El medio de contacto preferido es: <strong>{pet.preferredContact}</strong>.
                    </div>
                </CardContent>
            </Card>

            {/* --- Historial de Comentarios --- */}
            {pet.comments && pet.comments.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Historial de comentarios</CardTitle>
                  <CardDescription>
                    Estas personas han visto a {pet.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {pet.comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-primary pl-4">
                        <p className="font-semibold text-sm text-foreground">
                            {comment.location} - {new Date(comment.date).toLocaleString('es-CL', { timeStyle: 'short', dateStyle: 'short' })}
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">
                            "{comment.comment}"
                        </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* --- Columna Derecha: Detalles y Formulario de Comentarios --- */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Detalles del Reporte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <p className="text-foreground/80">{pet.description}</p>
                   <div className="grid grid-cols-2 gap-4">
                       <DetailCard icon={<PawPrint className="h-6 w-6 text-primary"/>} title="Características">
                            <ul className="list-disc list-inside text-sm space-y-1 text-foreground/80">
                                <li><strong>Especie:</strong> {pet.species}</li>
                                <li><strong>Raza:</strong> {pet.breed}</li>
                                <li><strong>Tamaño:</strong> {pet.size}</li>
                            </ul>
                       </DetailCard>
                       <DetailCard icon={<Info className="h-6 w-6 text-primary"/>} title="Señas Particulares">
                            <p className="text-sm text-foreground/80">{pet.distinguishingMarks}</p>
                       </DetailCard>
                        <DetailCard icon={pet.wearsCollar ? <CheckCircle className="h-6 w-6 text-green-600"/> : <XCircle className="h-6 w-6 text-destructive"/>} title="Collar">
                           <p className="text-sm text-foreground/80">{pet.wearsCollar ? 'Sí llevaba' : 'No llevaba'}</p>
                       </DetailCard>
                        <DetailCard icon={pet.reward ? <Award className="h-6 w-6 text-amber-500"/> : <XCircle className="h-6 w-6 text-destructive"/>} title="Recompensa">
                           <p className="text-sm text-foreground/80">{pet.reward ? 'Se ofrece' : 'No se ofrece'}</p>
                       </DetailCard>
                   </div>
                   {pet.temperament && pet.temperament.length > 0 && (
                        <DetailCard icon={<PawPrint className="h-6 w-6 text-primary"/>} title="Temperamento">
                            <div className="flex flex-wrap gap-2">
                                {pet.temperament.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                       </DetailCard>
                   )}
                </CardContent>
            </Card>

            {/* --- Formulario de Comentarios (reemplazado por el componente de cliente) --- */}
            <CommentForm petName={pet.name} />

          </div>

        </div>
      </div>
    </div>
  );
}
