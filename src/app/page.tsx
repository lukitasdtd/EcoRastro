import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, PawPrint, Leaf } from 'lucide-react';
import { allMapPoints } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ClientMap from '@/components/client-map';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');
  const petCardImage = PlaceHolderImages.find(img => img.id === 'petCard');
  const gardenCardImage = PlaceHolderImages.find(img => img.id === 'gardenCard');

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white pt-16 md:pt-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
              Conectando <span className="text-green-600">Comunidades</span>,
              <br />
              Cuidando <span className="text-orange-500">Vidas</span>.
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              Encuentra mascotas perdidas y únete a huertas comunitarias en tu barrio. Una plataforma para fortalecer los lazos vecinales y cuidar nuestro entorno.
            </p>
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/mapa">Explorar el Mapa <MapPin className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Saber Más <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt="Comunidad unida por mascotas y huertas"
                fill
                className="object-cover rounded-2xl shadow-xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Mapa Interactivo</h2>
            <p className="mt-2 text-gray-600">Visualiza los últimos reportes y las huertas activas en tu zona.</p>
          </div>
          <div className="mt-8 h-[500px] w-full rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
            <ClientMap points={allMapPoints} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Mascotas Perdidas y Encontradas</h3>
                <p className="mt-1 text-gray-600">Reporta una mascota perdida o encontrada en segundos. Ayuda a reunir a una familia o a encontrar un nuevo hogar para un amigo peludo.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Huertas Comunitarias</h3>
                <p className="mt-1 text-gray-600">Descubre espacios verdes en tu comunidad. Conéctate con otros, aprende sobre cultivo urbano y disfruta de alimentos frescos y locales.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {petCardImage && (
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md group">
                    {/* CORRECCIÓN: Se añade la clase de borde redondeado a la imagen directamente */}
                    <Image src={petCardImage.imageUrl} alt="Mascota" fill className="object-cover rounded-lg"/>
                    <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                        <h4 className="text-white font-bold text-lg">Reportes de Mascotas</h4>
                    </div>
                </div>
            )}
             {gardenCardImage && (
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md group">
                    {/* CORRECCIÓN: Se añade la clase de borde redondeado a la imagen directamente */}
                    <Image src={gardenCardImage.imageUrl} alt="Huerta" fill className="object-cover rounded-lg"/>
                    <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                        <h4 className="text-white font-bold text-lg">Huertas Urbanas</h4>
                    </div>
                </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
