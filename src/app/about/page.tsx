'use client';

import Image from 'next/image';
import { Instagram, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';

// Definición del tipo para los miembros del equipo para mayor seguridad de tipos
type TeamMember = {
  id: string;
  name: string;
  image: string;
  role: string;
  nickname: string;
  description: string;
};

// Componente para la página "acerca de nosotros"
export default function AboutPage() {
  // Estado para manejar qué miembro del equipo está seleccionado para el modal
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 'diego',
      name: 'Diego Alfaro',
      nickname: 'DEGO',
      image: '/Dego.jpg',
      role: 'Diseño Front-End & UI/UX',
      description: 'Con una fuerte orientación al usuario y visión comercial, aporta ideas frescas y creativas al proyecto. Su trabajo en diseño y desarrollo front-end, junto con su enfoque en experiencia e interfaz de usuario (UI/UX), permite transformar conceptos en productos visualmente atractivos y funcionales. Destaca por su actitud positiva, organización y capacidad para comunicar ideas, convirtiéndose en un vocero natural del equipo y un impulsor constante de la mejora continua.',
    },
    {
      id: 'angelo',
      name: 'Angelo Jimenez',
      nickname: 'Ukitas',
      image: '/Ukitas.jpg',
      role: 'Programación & Liderazgo Técnico',
      description: 'Se destaca por su rapidez de aprendizaje, pensamiento analítico y atención al detalle. Tiene un liderazgo natural, compartiendo sus conocimientos con humildad y empatía. Con gran capacidad de programación y comunicación asertiva, transmite ideas claras y mantiene la calma en situaciones de presión. Es autodidacta, resolutivo y motivador de equipos, aportando tanto en la parte técnica como en el espíritu del grupo.',
    },
    {
      id: 'geraldine',
      name: 'Geraldine Garces',
      nickname: 'Airï',
      image: '/Geraldine.jpeg',
      role: 'Técnica & Ambiental',
      description: 'Aporta su conocimiento técnico y ambiental, además de estudios previos en programación. Tiene una comunicación asertiva y calmada, que ayuda a equilibrar y guiar al equipo. Su proactividad y capacidad de recolectar información fortalecen la parte investigativa y técnica del proyecto. Siempre optimista y clara en ideas, se convierte en una guía confiable en el área técnica y ambiental.',
    },
    {
      id: 'carolina',
      name: 'Carolina Fernandez',
      nickname: 'Carolin',
      image: '/Carolin.jpg',
      role: 'Marketing & Backend',
      description: 'Destaca por su claridad y firmeza al exponer ideas. Tiene un estilo directo y honesto, lo que aporta transparencia al equipo. Su capacidad analítica y técnica en el área de backend, junto con su experiencia en marketing, le da un sello distintivo al proyecto. Optimista, detallista y con gran capacidad ejecutiva, impulsa la organización interna y la estructura técnica que sostiene nuestras propuestas.',
    },
    {
      id: 'javiera',
      name: 'Javiera Lopez',
      nickname: 'Javii',
      image: '/Javii.jpg',
      role: 'Gestión & Coordinación',
      description: 'Se caracteriza por su rapidez de reacción, motivación y energía positiva. No teme expresar lo que piensa y aporta siempre una mirada empática al grupo. Su pensamiento analítico y capacidad de investigación la hacen una pieza clave en la toma de decisiones. Destaca en la gestión de equipo, coordinación y motivación, siendo motor y referente en momentos clave.',
    },
  ];

  return (
    <div className="relative bg-[#E5E5E5] min-h-screen">
      <Image src="/three.png" alt="Fondo de página" fill className="object-cover opacity-10 -z-10" sizes="100vw" />
      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <div className="inline-block">
            <Image
              src="/favicon3.png"
              alt="EcoRastro Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          <h1 className="text-8xl font-bold mt-4 bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Quienes Somos</h1>
          <p className="text-xl text-gray-600 mt-2">
            "Unimos corazones para devolver a las mascotas su hogar".
          </p>
        </section>

        <section className="mt-12 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 h-64 md:h-auto">
            <Image
              src="/catcito.png"
              alt="Gato de la comunidad"
              width={400}
              height={400}
              className="rounded-lg object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="md:w-2/3 bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
            <p className="text-lg text-gray-700">
              En EcoRastro creemos que cada mascota es parte de la familia. Nacimos con el propósito de ayudar en la búsqueda y rescate de animales perdidos, conectando a dueños y comunidad a través de la tecnología y la solidaridad.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Nuestra misión es brindar un espacio seguro y confiable donde compartir información, difundir casos y movilizar a las personas para que ninguna mascota quede atrás.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Soñamos con una comunidad unida, donde la empatía, la responsabilidad y el amor por los animales nos guíen en cada paso.
            </p>
          </div>
        </section>

        <section id="sobre-ecorastro" className="mt-16 bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Qué es EcoRastro?</h2>
          <p className="text-lg text-gray-700">
            EcoRastro es una plataforma dedicada al rescate y reencuentro de mascotas. 
            Nuestro objetivo es darles visibilidad a los animales perdidos para que puedan 
            regresar a sus hogares, y también apoyar a aquellos que buscan un nuevo 
            comienzo en una familia responsable y cariñosa.
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">¿Qué buscamos?</h2>
          <p className="text-lg text-gray-700">
            Buscamos crear una red de apoyo entre personas, rescatistas y organizaciones, 
            para que ninguna mascota se quede atrás. Queremos facilitar la conexión entre 
            quienes han perdido a sus compañeros y quienes los encuentran, además de 
            fomentar la adopción consciente y el respeto hacia todos los seres vivos.
          </p>
        </section>

        <section className="mt-16 flex flex-col md:flex-row items-stretch gap-12">
          <div className="md:w-1/2">
             <Image
              src="/huertas.jpg"
              alt="Huertas de la comunidad"
              width={500}
              height={500}
              className="rounded-lg shadow-md w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestras Huertas Comunitarias</h2>
            <p className="text-lg text-gray-700">
              Las huertas no solo nos entregan alimentos frescos y saludables, sino que 
              también fortalecen los lazos entre vecinos, promueven el respeto por la 
              naturaleza y nos enseñan el valor de la autogestión. Queremos motivar a cada 
              persona a reconectarse con la tierra, aprovechar los recursos disponibles y 
              compartir los frutos con la comunidad.
            </p>
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Nuestro Equipo</h2>
          <div className="flex justify-center">
            <Image
              src="/team-photo.jpg"
              alt="Equipo de desarrollo de EcoRastro"
              width={800}
              height={600}
              className="rounded-lg shadow-md w-2/3 h-auto transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>
        
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-4 text-center transform transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer flex flex-col items-center aspect-square"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative w-36 h-36">
                <Image
                    src={member.image}
                    alt={`Foto de ${member.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <div className="flex flex-col justify-center flex-grow mt-2">
                  <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600 text-sm">({member.nickname})</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Contáctanos</h2>
          <div className="flex justify-center gap-8 mt-6">
            <a href="https://www.instagram.com/ecorastro_cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary">
              <Instagram />
              <span>Ecorastro_cl</span>
            </a>
            <a href="https://twitter.com/ecorastro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary">
              <Twitter />
              <span>Ecorastro</span>
            </a>
            <a href="mailto:contacto@ecorastro.cl" className="flex items-center gap-2 text-lg text-gray-700 hover:text-primary">
              <Mail />
              <span>Contacto@ecorastro.cl</span>
            </a>
          </div>
        </section>

        <section className="relative z-10 -mb-16 flex justify-center">
            <Image
              src="/cat-dog2.png"
              alt="Gatos y Perros de la comunidad"
              width={720}
              height={180}
              className="mx-auto w-2/3 h-auto"
            />
        </section>
      </main>

      {/* Modal para mostrar la descripción del miembro del equipo */}
      {selectedMember && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-in fade-in-0 duration-300"
            onClick={() => setSelectedMember(null)} // Cierra el modal al hacer clic en el fondo
        >
          <div 
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-xl w-full relative transform transition-all duration-300 animate-in slide-in-from-bottom-10 zoom-in-95"
            onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
          >
            <button
              onClick={() => setSelectedMember(null)} // Cierra el modal
              className="absolute -top-4 -right-4 bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-accent transition-transform hover:scale-110"
            >
              &times;
            </button>
            <div className="text-center">
              <Image
                src={selectedMember.image}
                alt={`Foto de ${selectedMember.name}`}
                width={150}
                height={150}
                className="rounded-full mx-auto border-4 border-gray-200 shadow-xl"
              />
              <h2 className="text-3xl font-bold text-gray-800 mt-4">{selectedMember.name}</h2>
              <p className="text-primary font-semibold mt-1">{selectedMember.role}</p>
              <p className="mt-6 text-left text-gray-700 text-base leading-relaxed">{selectedMember.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
