import Image from 'next/image';
import { Check, Leaf, PawPrint, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about');

  const features = [
    { 
      name: 'Mapeo Centralizado', 
      description: 'Visualiza reportes de mascotas y huertas en un solo mapa interactivo.',
      icon: <MapPinIcon />
    },
    { 
      name: 'Participación Comunitaria', 
      description: 'Fomentamos la colaboración vecinal para resolver problemas locales juntos.',
      icon: <Users className="w-8 h-8 text-green-600" />
    },
    { 
      name: 'Cuidado Animal', 
      description: 'Ayuda a reunir mascotas con sus dueños y a encontrar hogares para animales necesitados.',
      icon: <PawPrint className="w-8 h-8 text-orange-500" />
    },
    { 
      name: 'Sostenibilidad Urbana', 
      description: 'Promovemos la agricultura urbana y el compostaje para ciudades más verdes.',
      icon: <Leaf className="w-8 h-8 text-lime-500" />
    },
  ]

  return (
    <div className="bg-white">
      {/* Sección Hero */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-green-100/20 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-green-600/10 ring-1 ring-green-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Nuestra Misión: Fortalecer Lazos Comunitarios.
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                Creemos en el poder de la comunidad. Nuestra plataforma nació de la idea de que la tecnología puede y debe servir como un puente para conectar a las personas, resolver problemas locales y cuidar de nuestro entorno. Cada mascota reunida con su familia y cada semilla plantada en una huerta comunitaria es un paso hacia un futuro más conectado y sostenible.
              </p>
            </div>
            {aboutImage && (
              <div className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
                 <Image
                    // CORRECCIÓN FINAL: Se utiliza `imageUrl` en lugar de `src`.
                    src={aboutImage.imageUrl}
                    alt="Equipo de voluntarios trabajando en una huerta comunitaria"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* Sección de Características */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">¿Por Qué Existimos?</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Para crear un impacto positivo y tangible en nuestras comunidades.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {feature.icon}
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

// Placeholder para el ícono de MapPin que falta
function MapPinIcon() {
  return (
    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
  )
}
