'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Twitter, Mail, X } from 'lucide-react';
import { useState } from 'react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Geraldine Garces',
      nickname: 'Airï',
      imageUrl: '/Geraldine.jpeg',
      description: 'Aporta su conocimiento técnico y ambiental, además de estudios previos en programación. Tiene una comunicación asertiva y calmada, que ayuda a equilibrar y guiar al equipo. Su proactividad y capacidad de recolectar información fortalecen la parte investigativa y técnica del proyecto. Siempre optimista y clara en ideas, se convierte en una guía confiable en el área técnica y ambiental.',
    },
    {
      name: 'Angelo Jimenez',
      nickname: 'Ukitas',
      imageUrl: '/ukitas.jpg',
      description: 'Se destaca por su rapidez de aprendizaje, pensamiento analítico y atención al detalle. Tiene un liderazgo natural, compartiendo sus conocimientos con humildad y empatía. Con gran capacidad de programación y comunicación asertiva, transmite ideas claras y mantiene la calma en situaciones de presión. Es autodidacta, resolutivo y motivador de equipos, aportando tanto en la parte técnica como en el espíritu del grupo.',
    },
    {
      name: 'Javiera Lopez',
      nickname: 'Javii',
      imageUrl: '/javii.jpg',
      description: 'Se caracteriza por su rapidez de reacción, motivación y energía positiva. No teme expresar lo que piensa y aporta siempre una mirada empática al grupo. Su pensamiento analítico y capacidad de investigación la hacen una pieza clave en la toma de decisiones. Destaca en la gestión de equipo, coordinación y motivación, siendo motor y referente en momentos clave.',
    },
    {
      name: 'Carolina Fernandez',
      nickname: 'Carolin',
      imageUrl: '/carolin.jpg',
      description: 'Destaca por su claridad y firmeza al exponer ideas. Tiene un estilo directo y honesto, lo que aporta transparencia al equipo. Su creatividad en presentaciones, diseño gráfico y marketing le da un sello distintivo al proyecto. Optimista, detallista y con gran capacidad ejecutiva, es nuestra diseñadora oficial y quien potencia lo visual y lo atractivo de nuestras propuestas.',
    },
    {
      name: 'Diego Alfaro',
      nickname: 'Dego',
      imageUrl: '/dego.jpg',
      description: 'Con gran orientación al cliente y visión en ventas y análisis comercial, aporta ideas frescas y creativas al proyecto. Su capacidad en diseño y modelado 3D potencia la visualización de propuestas. Destaca como vocero del equipo, siempre con actitud positiva, aportando organización y creatividad en cada etapa.',
    },
  ];

  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="relative bg-[#E5E5E5] min-h-screen">
      <Image
        src="/three.png"
        alt="Fondo de página"
        fill
        className="object-cover opacity-10 -z-10"
      />
      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <div className="inline-block">
            <Image
              src="/ecorastro logo transparente.png"
              alt="EcoRastro Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mt-4">Quienes Somos</h1>
          <p className="text-3xl text-gray-600 mt-2">
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

        <section className="mt-16 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
             <Image
              src="/huertas.jpg"
              alt="Huertas de la comunidad"
              width={500}
              height={500}
              className="rounded-lg shadow-md object-contain transform transition-transform duration-300 hover:scale-105"
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
              className="rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Conoce al Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
            {teamMembers.map((member) => (
              <div key={member.nickname} onClick={() => setSelectedMember(member)} className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center cursor-pointer">
                <div className="relative h-32 w-32 mb-4">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-md text-gray-600">({member.nickname})</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Contactanos</h2>
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
              className="mx-auto"
            />
        </section>
      </main>

      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full m-4 relative transform transition-all duration-300 scale-100">
            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="relative h-40 w-40 mb-4">
                <Image
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{selectedMember.name}</h2>
              <p className="text-xl text-gray-600">({selectedMember.nickname})</p>
              <p className="text-lg text-gray-700 mt-4">{selectedMember.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
