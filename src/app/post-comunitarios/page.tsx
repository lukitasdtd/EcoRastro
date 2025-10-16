import Link from 'next/link';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';

// aquí se crea la vista post comunitarios con ejemplos visuales 
export default function PostComunitarios() {
  const posts = [
    {
      tipo: 'huerta',
      imagen_url: '/huertas.jpg',
      titulo: 'Creando una huerta comunitaria',
      autor: 'Diego Gonzales',
      ubicacion: 'Valparaíso, Chile',
      fecha: 'hace 3 días',
      contenido: 'Comenzamos un proyecto de huerta comunitaria en nuestro barrio. ¡Todos son bienvenidos a participar y aprender sobre agricultura urbana!',
      likes: 256,
      comentarios: 34,
    },
    {
      tipo: 'mascota',
      imagen_url: '/manada_cachorros.jpg',
      titulo: 'Cachorros en adopción responsable',
      autor: 'Carolina',
      ubicacion: 'Concepción, Chile',
      fecha: 'hace 5 días',
      contenido: 'Estos hermosos cachorros buscan un hogar lleno de amor. Son muy juguetones y se entregan con compromiso de esterilización.',
      likes: 342,
      comentarios: 58,
    },
    {
      tipo: 'huerta',
      imagen_url: '/mujer_huerta.jpg',
      titulo: 'Intercambio de semillas y plantas',
      autor: 'Ukitas',
      ubicacion: 'La Serena, Chile',
      fecha: 'hace 1 semana',
      contenido: 'Este fin de semana tendremos un evento para intercambiar semillas y plantas de nuestras huertas. ¡No te lo pierdas!',
      likes: 189,
      comentarios: 23,
    },
    {
        tipo: 'mascota',
        imagen_url: '/perro_dueña.png',
        titulo: '¡Encontramos a Luna!',
        autor: 'Geraldine',
        ubicacion: 'Temuco, Chile',
        fecha: 'hace 2 semanas',
        contenido: 'Gracias a todos los que compartieron, Luna está de vuelta en casa sana y salva. ¡Estamos muy agradecidos por su ayuda!',
        likes: 476,
        comentarios: 97,
    },
    {
        tipo: 'mascota',
        imagen_url: '/gata_bebes.jpg',
        titulo: 'Gatitos buscan hogar',
        autor: 'CodeHunters',
        ubicacion: 'Valdivia, Chile',
        fecha: 'hace 1 día',
        contenido: 'Estos pequeños necesitan un hogar lleno de amor, ayúdanos a encontrarles una familia.',
        likes: 500,
        comentarios: 100,
    },
    {
      tipo: 'huerta',
      imagen_url: '/cultivos-10.jpg',
      titulo: 'Mi primera cosecha de tomates',
      autor: 'Eco Rastro',
      ubicacion: 'Quillota, Chile',
      fecha: 'hace 6 días',
      contenido: '¡Feliz de compartir mi primera cosecha de tomates orgánicos! Anímense a cultivar en casa, es una experiencia increíble.',
      likes: 412,
      comentarios: 67,
    },
    {
      tipo: 'mascota',
      imagen_url: '/gato-naranjo.jpg',
      titulo: 'Gato perdido en el centro',
      autor: 'Javiera Paz',
      ubicacion: 'Santiago, Chile',
      fecha: 'hace 1 día',
      contenido: 'Se busca gatito naranjo perdido en el centro de la ciudad. Responde al nombre de "Acelga". Si lo ves, por favor contáctame.',
      likes: 112,
      comentarios: 12,
    },
    {
        tipo: 'mascota',
        imagen_url: '/familia_adopta.jpg',
        titulo: 'Final feliz: ¡Familia crece!',
        autor: 'Equipo Eco Rastro',
        ubicacion: 'Osorno, Chile',
        fecha: 'hace 1 semana',
        contenido: '¡Nos llena de alegría compartir que encontraron un hogar! La adopción es un acto de amor que cambia vidas.',
        likes: 620,
        comentarios: 150,
    },
    {
      tipo: 'huerta',
      imagen_url: '/cultivos-14.jpg',
      titulo: 'Cosecha de zanahorias',
      autor: 'Javiera Paz',
      ubicacion: 'Puerto Montt, Chile',
      fecha: 'hace 8 días',
      contenido: 'Cultivar tus propias zanahorias es más fácil de lo que crees. ¡Y el sabor es incomparable!',
      likes: 315,
      comentarios: 55,
    },
    {
        tipo: 'mascota',
        imagen_url: '/mascotas-1.jpg',
        titulo: 'Día de adopción',
        autor: 'Fundación Patitas',
        ubicacion: 'Arica, Chile',
        fecha: 'hace 10 días',
        contenido: 'Este sábado tendremos una jornada de adopción en el parque principal. ¡Te esperamos para que conozcas a tu futuro mejor amigo!',
        likes: 720,
        comentarios: 210,
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Post Comunitarios</h1>
        <p className="text-gray-600 text-lg mb-8">
    Aquí podrás explorar historias compartidas por la comunidad. Desde mascotas que encontraron su camino a casa hasta vecinos que transformaron espacios en huertas urbanas. Cada post es un testimonio de amor, solidaridad y compromiso con el medio ambiente. ¡Inspírate y comparte tu propia historia!
  </p>

        {/* Botones para crear nuevos posts */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button asChild className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
            <Link href="/reportar-mascota">Reportar una Mascota</Link>
          </Button>
          <Button asChild className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
            <Link href="/huertas/formulario-huerta">Crear Post de Huerta</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
