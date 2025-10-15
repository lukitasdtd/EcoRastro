
import Image from 'next/image';
import { Instagram, Twitter, Mail } from 'lucide-react';

// componente para la página "acerca de nosotros"//
export default function AboutPage() {
  return (
    <div className="relative bg-[#E5E5E5] min-h-screen">
      {/* Fondo de página con opacidad */}
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

        {/* Sección "Quienes Somos" con imagen y texto */}
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

        {/* Sección de Huertas con texto al lado */}
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

        {/* Sección para la imagen que se superpone al footer */}
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
    </div>
  );
}
