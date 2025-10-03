
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapFeatures } from '@/components/home/map-features';
import { PlantingCalendar } from '@/components/home/planting-calendar';
import { EnvironmentalEducation } from '@/components/home/environmental-education';
import { HomeFooter } from '@/components/home/home-footer';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

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

      <EnvironmentalEducation />

      <HomeFooter />
      
    </main>
  );
}
