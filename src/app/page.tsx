
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Heart, ShieldCheck, Sprout } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapFeatures } from '@/components/home/map-features';
import { PlantingCalendar } from '@/components/home/planting-calendar';
import { EnvironmentalEducation } from '@/components/home/environmental-education';
import { HomeFooter } from '@/components/home/home-footer';
import { Card } from '@/components/ui/card';

// página principal de EcoRastro
export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <main className="bg-white">
      {/* Sección de Hero */}
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
          {/* Se inserta imagen del hero */}
              <Image
                src="/foto_hero.png"
                alt="Comunidad unida por mascotas y huertas"
                fill
                priority 
                className=" !rounded-none object-contain object-[20%_50%]"
            />
          </div>
        </div>
      </section>

      <MapFeatures />

      <PlantingCalendar />

      {/* Sección Post comuntarios */}
      <section className="w-full bg-background py-16 lg:py-24"  aria-labelledby="post-title">
        <div className="container mx-auto px-4 text-center">
          <Card className='p-8 md:p-12 rounded-2xl shadow-lg border'> 
          <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
            <Link href='/post-comunitarios' className='hover:text-green-600 hover:underline'> 
            Historias que Conectan: Posteos Comunitarios
            </Link>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
           Únete y comparte con la comunidad, cada historia hace la diferencia.
          </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Fila 1 */}
                <div className="relative h-40 rounded-2xl shadow-lg overflow-hidden">
                  <Image src="/perro_dueña.png" alt="Adopción exitosa" fill className="object-cover transition duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1" />
                </div>
                <div className="relative h-40 rounded-2xl shadow-lg overflow-hidden">
                  <Image src="/cultivos_casa.jpg" alt="Huerto en casa" fill className="object-cover transition duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1" />
                </div>
                <div className="relative h-40 rounded-2xl shadow-lg overflow-hidden">
                  <Image src="/familia_adopta.jpg" alt="Mujer en su huerta" fill className="object-cover transition duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1" />
                </div>

                {/* Fila 2 */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative h-40 rounded-2xl shadow-lg overflow-hidden sm:col-span-1">
                        <Image src="/cultivos-10.jpg" alt="Gata con sus bebés" fill className="object-cover transition duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1" />
                    </div>
                    <div className="relative h-40 rounded-2xl shadow-lg overflow-hidden sm:col-span-1">
                        <Image src="/gata_bebes.jpg" alt="Familia adoptando" fill className="object-cover transition duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1" />
                    </div>
                </div>
            </div>
          </div>
          </Card>
        </div>
      </section>

      <EnvironmentalEducation />

      <HomeFooter />
      
    </main>
  );
}
