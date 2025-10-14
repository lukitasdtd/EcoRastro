'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlipCard } from '@/components/ui/flip-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Bone,
  Home,
  Shield,
  ArrowRight,
  HelpCircle,
  Stethoscope,
  ShowerHead,
  Search,
  Users,
  Building,
  Scale,
  ArrowLeft,
  RotateCw,
  PawPrint
} from 'lucide-react';

export default function PetEducationPage() {
  // --- Datos para las secciones ---
  const careTips = [
    {
      icon: <Bone className="h-8 w-8 text-orange-500" />,
      title: 'Alimentación Balanceada',
      text: 'Una dieta adecuada a su edad, tamaño y nivel de actividad es la base de su salud. Siempre con agua fresca disponible.',
    },
    {
      icon: <PawPrint className="h-8 w-8 text-green-600" />,
      title: 'Ejercicio Diario',
      text: 'El ejercicio regular es crucial para su salud física y mental. Adapta la rutina a las necesidades específicas de tu mascota.',
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-orange-500" />,
      title: 'Salud y Prevención',
      text: 'Mantén sus vacunas y desparasitaciones al día. Las visitas periódicas al veterinario previenen problemas a largo plazo.',
    },
     {
      icon: <ShowerHead className="h-8 w-8 text-green-600" />,
      title: 'Higiene y Aseo',
      text: 'El cepillado regular, baños adecuados y cuidado dental son esenciales para su comodidad y para prevenir enfermedades.',
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: 'Socialización',
      text: 'Una correcta socialización desde cachorro con personas y otros animales previene miedos y comportamientos agresivos.',
    },
    {
      icon: <Home className="h-8 w-8 text-green-600" />,
      title: 'Un Espacio Seguro',
      text: 'Tu mascota necesita un lugar propio donde se sienta segura y protegida, especialmente durante ruidos fuertes o visitas.',
    },
  ];

  const regulations = [
    {
      icon: <Scale className="h-8 w-8 text-green-600" />,
      title: 'Leyes de Tenencia Responsable',
      text: 'Infórmate sobre las leyes locales sobre correa, registro y bienestar para garantizar una convivencia armónica.',
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Normativas de Bienestar Animal',
      text: 'Conoce tus obligaciones para prevenir el maltrato, el abandono y asegurar una vida digna para tu mascota.',
    },
     {
      icon: <Building className="h-8 w-8 text-green-600" />,
      title: 'Regulaciones Comunitarias',
      text: 'Respeta las normas de tu comunidad o edificio sobre mascotas, como el uso de ascensores o áreas comunes.',
    },
  ];

  const faqItems = [
      {
        question: "¿Es obligatorio registrar a mi mascota?",
        answer: "En muchos países y ciudades, sí. El registro a través de un microchip y una base de datos oficial es la forma más segura de demostrar quién es el dueño y facilitar el reencuentro en caso de pérdida. Consulta la normativa de tu localidad.",
      },
      {
        question: "¿Qué es y para qué sirve el microchip?",
        answer: "El microchip es un dispositivo subcutáneo del tamaño de un grano de arroz con un número de identificación único. No tiene GPS, pero si alguien encuentra a tu mascota, un veterinario o refugio puede escanear el chip, buscar el número en una base de datos y contactarte.",
      },
      {
        question: "¿La placa con QR reemplaza al microchip?",
        answer: "No. La placa es un complemento excelente para una identificación rápida y visible, pero puede caerse o dañarse. El microchip es un método de identificación permanente y más fiable. Lo ideal es usar ambos.",
      },
      {
        question: "¿Cómo y dónde denuncio el maltrato animal?",
        answer: "Debes contactar a las autoridades locales, como la policía, el departamento de control animal o una organización de protección animal reconocida. Proporciona toda la evidencia posible, como fotos, videos y detalles del incidente.",
      },
      {
        question: "¿Qué hago si perdí los documentos del microchip?",
        answer: "Contacta al veterinario que implantó el chip; es posible que tengan el registro. También puedes visitar a un veterinario para que escanee el chip y te ayude a identificar el número y la base de datos en la que está registrado para actualizar tu información.",
      }
  ]
  
  return (
    <main className="bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-8">
          <Button asChild variant="outline" className="bg-white">
            <Link href="/"> 
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </div>

        {/* --- sección del hero --- */}
        <section className="text-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
              Educación y <span className="text-orange-500">Cuidados para Mascotas</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
              Ser un dueño responsable es la mayor muestra de amor. Aquí encontrarás información clave para el bienestar de tu compañero.
            </p>
          </div>
        </section>
        
        <div className="space-y-16 md:space-y-20">

          {/* --- Tips --- */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
                Consejos Fundamentales
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {careTips.map((tip) => (
                <FlipCard
                  key={tip.title}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 cursor-pointer h-40"
                  frontContent={(
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                      <h3 className="text-xl font-bold text-gray-800 px-4 text-center">{tip.title}</h3>
                      <RotateCw className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
                    </div>
                  )}
                  backContent={(
                    <div className="text-center p-4 flex flex-col items-center justify-center h-full">
                      <div className="mx-auto bg-green-100/70 rounded-full p-3 w-fit mb-3">
                        {tip.icon}
                      </div>
                      <p className="text-gray-600 text-sm">{tip.text}</p>
                    </div>
                  )}
                />
              ))}
            </div>
          </section>

          {/* --- Normativas y Consulta --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full">
                <CardHeader className="text-center border-b pb-4">
                    <CardTitle className="text-2xl font-bold">Leyes y Normativas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                   {regulations.map((reg) => (
                        <div key={reg.title} className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50">
                          <div className="bg-green-100/80 rounded-full p-3 flex-shrink-0 mt-1">{reg.icon}</div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-gray-800">{reg.title}</h4>
                            <p className="text-sm text-gray-600 mb-1">{reg.text}</p>
                          </div>
                        </div>
                  ))}
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full text-center">
                <CardHeader className="border-b pb-4">
                  <div className="mx-auto bg-orange-500 text-white rounded-full p-4 w-fit mb-3">
                      <Search className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Verifica el Registro del Microchip</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex flex-col items-center">
                    <p className="text-gray-600 mb-6">
                        Es vital que tus datos de contacto estén actualizados en la base de datos del microchip. Si no recuerdas dónde lo registraste, puedes usar un buscador universal.
                    </p>
                    <Button asChild size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 w-full mt-auto">
                        <Link href="https://petmicrochiplookup.org/" target="_blank" rel="noopener noreferrer">
                            Buscador Universal (AAHA)
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <p className="mt-4 text-xs text-orange-900/70">
                      Esta herramienta ayuda a identificar la base de datos del registro de un chip.
                    </p>
                </CardContent>
            </Card>
          </section>
          
          {/* --- FAQ --- */}
          <section className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
                Preguntas Frecuentes
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full"></div>
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white/60 rounded-2xl px-6 border-b-0 shadow-sm">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline text-gray-800">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* --- Footer --- */}
          <footer className="text-center border-t pt-12">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">El amor es un compromiso.</h3>
            <p className="max-w-2xl mx-auto text-gray-600 mb-6">
              La tenencia responsable es un acto de amor que dura toda la vida. Investiga, edúcate y prepárate para darle a tu mascota el hogar que merece.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
                <Button variant="outline" className="bg-white/80" asChild>
                    <Link href="/adoption">Ver Mascotas en Adopción</Link>
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                    <Link href="/reportar-mascota">Reportar una Mascota</Link>
                </Button>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
