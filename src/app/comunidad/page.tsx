'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, Heart, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

// Se definen interfaces para tipar los datos
interface Event {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

interface SuccessStory {
  title: string;
  story: string;
  imageUrl: string;
}

export default function ComunidadPage() {
  // Se utiliza useState para manejar el estado de los eventos y las historias
  const [events, setEvents] = useState<Event[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Aquí es donde harías la llamada a tu API para obtener los datos
    // Por ahora, usamos los datos que teníamos definidos localmente
    const initialEvents: Event[] = [
      {
        title: 'Jornada de Adopción Responsable',
        date: 'Sábado, 25 de Mayo | 11:00 AM',
        description: '¡Encuentra a tu nuevo mejor amigo! Estaremos en el Parque Central con perritos y gatitos que buscan un hogar para siempre.',
        imageUrl: '/jornadaadopcion.jpg', 
      },
      {
        title: 'Taller de Primeros Auxilios para Mascotas',
        date: 'Domingo, 26 de Mayo | 4:00 PM',
        description: 'Aprende maniobras básicas para salvar la vida de tu mascota en una emergencia. Charla dictada por veterinarios locales.',
        imageUrl: '/talleraux.jpg',
      },
      {
        title: 'Día de Limpieza Comunitaria',
        date: 'Sábado, 1 de Junio | 9:00 AM',
        description: 'Juntos podemos hacer de nuestro barrio un lugar más limpio y seguro. Nos reuniremos en la plaza principal para organizar las cuadrillas.',
        imageUrl: '/limpieza.jpg',
      },
    ];

    const initialSuccessStories: SuccessStory[] = [
      {
        title: 'Luna encontró su hogar',
        story: 'Después de ser rescatada de la calle, la pequeña Luna pasó varias semanas en un hogar temporal. Gracias a la difusión en nuestra red, una familia maravillosa la adoptó. ¡Ahora vive feliz y rodeada de amor!',
        imageUrl: '/luna-adoptada.jpg',
      },
      {
        title: 'El reencuentro de Max',
        story: 'Max se perdió durante una tormenta, y su familia estaba desesperada. Un vecino lo vio gracias a un reporte en nuestra plataforma y lo resguardó hasta que sus dueños pudieron ir por él. ¡Un final feliz para todos!',
        imageUrl: '/max-reencuentro.jpg',
      },
    ];
    
    setEvents(initialEvents);
    setSuccessStories(initialSuccessStories);

  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    <div className="bg-[#E5E5E5] min-h-screen">
      {/* Hero Section con fondo blanco */}
      <section className="bg-white">
        <div className="relative w-full h-96">
          <Image
            src="/comunidad2.png"
            alt="Banner de la Comunidad EcoRastro"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center py-10 px-4">
          <h1 className="text-5xl font-bold text-gray-800">Nuestra Comunidad</h1>
          <p className="text-xl mt-4 text-gray-600">Donde la acción y la solidaridad transforman realidades.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        
        {/* Próximos Eventos */}
        <section id="eventos" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.title} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative h-56 w-full">
                   <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-sm text-gray-500 mb-2"><Calendar size={16}/> {event.date}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Historias de Éxito */}
        <section id="historias-exito" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Historias de Éxito</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {successStories.map((story) => (
              <div key={story.title} className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                 <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                    <Image src={story.imageUrl} alt={story.title} fill className="object-cover" />
                 </div>
                <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-3"><Heart size={22} className="text-primary"/> {story.title}</h3>
                <p className="text-lg text-gray-700">{story.story}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Llamado a la Acción - Voluntariado */}
        <section id="voluntariado" className="bg-white p-12 rounded-lg shadow-xl text-center transform transition-all duration-300 hover:shadow-2xl mb-16">
          <Users className="mx-auto text-primary mb-4" size={48} />
          <h2 className="text-4xl font-bold text-gray-800">Conviértete en Voluntario</h2>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">Tu tiempo y tus habilidades pueden marcar la diferencia. Únete a nuestro equipo para organizar eventos, cuidar animales temporalmente o ayudar en la difusión de casos.</p>
          <Link href="/contacto" className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full text-lg transform transition-transform duration-300 hover:scale-110">
            ¡Quiero ser parte!
          </Link>
        </section>
        
        {/* Code Hunters Section */}
        <section className="bg-white p-12 rounded-lg shadow-xl text-center">
            <div className="flex justify-center items-center mb-6">
                 <Image src="/logo-code-h.jpeg" alt="Logo de Code Hunters" width={100} height={100} className="rounded-full"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Desarrollado con ❤️ por Code Hunters</h3>
            <p className="text-lg text-gray-600 mt-2">El equipo de desarrollo detrás de la plataforma EcoRastro.</p>
        </section>

      </main>
    </div>
  );
}
