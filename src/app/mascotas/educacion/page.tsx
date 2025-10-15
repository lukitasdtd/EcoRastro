'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Shield,
  ArrowRight,
  HelpCircle,
  Search,
  Building,
  Scale,
  ArrowLeft,
  CheckSquare,
  HeartPulse,
  Utensils,
  Smile,
  PawPrint,
} from 'lucide-react';

export default function PetEducationPage() {
  // --- Datos para las secciones ---
  const fundamentalTips = [
    {
      icon: <Search className="h-8 w-8 text-orange-500" />,
      title: 'Si pierdes una mascota',
      points: [
        'Actúa de inmediato: revisa tu casa, patio y alrededores.',
        'Comunicación con vecinos: pregunta puerta a puerta y deja tu número de contacto.',
        'Redes sociales: publica fotos recientes con descripción en grupos locales.',
        'Carteles físicos: coloca avisos con foto y datos en lugares concurridos.',
        'Oficinas y veterinarios: avisa a municipalidad, clínicas y refugios.',
        'Constancia: realiza reportes periódicos durante al menos 30 días.',
      ],
    },
    {
      icon: <HelpCircle className="h-8 w-8 text-blue-500" />,
      title: 'Si encuentras una mascota',
      points: [
        'Asegúrala: evita que se lastime o escape; dale agua y alimento.',
        'Identificación: revisa si tiene collar o placa y llévala a un veterinario para escanear el microchip.',
        'Difunde responsablemente: publica en redes sociales sin dar información sensible.',
        'Contacto oficial: informa en la municipalidad o Registro Nacional de Mascotas.',
        'Entrega segura: pide pruebas de propiedad antes de devolverla (fotos, carnet de vacunas).',
      ],
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-green-500" />,
      title: 'Consejos Prácticos',
      points: [
        'Mantén el chip y los datos de tus mascotas siempre actualizados.',
        'Guarda los teléfonos de emergencias veterinarias de tu zona.',
        'Usa siempre un collar con una placa de identificación visible.',
      ],
    },
  ];

  const dailyPractices = [
    {
      icon: <Utensils className="h-8 w-8 text-cyan-500" />,
      title: 'Alimentación',
      bgColor: 'bg-cyan-100/70',
      points: [
        'Proporciona alimento balanceado de acuerdo con la especie, edad y estado de salud.',
        'Mantén agua fresca y limpia disponible todo el día.',
        'Evita dar comida casera dañina (chocolate, cebolla, uvas, etc.).',
      ],
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-rose-500" />,
      title: 'Salud',
      bgColor: 'bg-rose-100/70',
      points: [
        'Vacunas al día según el calendario veterinario.',
        'Desparasitación interna y externa periódica.',
        'Chequeos veterinarios anuales y atención inmediata en caso de enfermedad o accidente.',
        'Esterilización/castración para controlar la población y mejorar la salud del animal.',
      ],
    },
    {
      icon: <Smile className="h-8 w-8 text-amber-500" />,
      title: 'Afecto y Recreación',
      bgColor: 'bg-amber-100/70',
      points: [
        'Paseos diarios, juegos y socialización con otros animales y personas.',
        'Tiempo de calidad con la mascota para reforzar el vínculo afectivo.',
        'Espacio adecuado y seguro, con sombra y protección contra el frío o calor extremo.',
      ],
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {fundamentalTips.map((tip) => (
                <Card key={tip.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 bg-orange-100/70 p-3 rounded-full">{tip.icon}</div>
                        <CardTitle className="text-xl font-bold text-gray-800">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-gray-600 text-sm text-left pl-5">
                      {tip.points.map((point) => (
                        <li key={point} className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* --- Buenas Prácticas Diarias --- */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
                Buenas Prácticas Diarias
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {dailyPractices.map((practice) => (
                <Card key={practice.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className={`flex-shrink-0 ${practice.bgColor} p-3 rounded-full`}>{practice.icon}</div>
                        <CardTitle className="text-xl font-bold text-gray-800">{practice.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-gray-600 text-sm text-left pl-5">
                      {practice.points.map((point) => (
                        <li key={point} className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* --- Sección de Adopción y Refugios --- */}
<section>
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
      Busca un Refugio y Adopta
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full"></div>
    </h2>
  </div>
  <div className="max-w-2xl mx-auto px-4 sm:px-0">
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100">
      <CardHeader className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex-shrink-0 bg-orange-100/70 p-3 rounded-full">
            <PawPrint className="h-8 w-8 text-orange-500" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            Encuentra a tu nuevo mejor amigo
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-6">
          ¿Estás pensando en agrandar tu familia? La adopción es una de las mejores formas de hacerlo. Hay miles de mascotas esperando un hogar lleno de amor. Encuentra refugios cerca de ti y conoce a tu futuro compañero.
        </p>
        <Button asChild size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
          <Link href="https://www.petmatch.cl/refugios" target="_blank" rel="noopener noreferrer">
            Buscar Refugios y Mascotas para Adoptar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  </div>
</section>


          {/* --- Normativas y Consulta --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 flex flex-col">
                <CardHeader className="text-center border-b pb-4">
                    <CardTitle className="text-2xl font-bold">Leyes y Normativas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6 flex-grow">
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

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 flex flex-col text-center">
                <CardHeader className="border-b pb-4">
                  <div className="mx-auto bg-orange-500 text-white rounded-full p-4 w-fit mb-3">
                      <Search className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Verifica el Registro del Microchip</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex flex-col items-center flex-grow">
                    <p className="text-gray-600 mb-6">
                        Mantén tus datos actualizados en la plataforma oficial del gobierno de Chile para asegurar que puedan contactarte si encuentran a tu mascota.
                    </p>
                    <Button asChild size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 w-full mt-auto">
                        <Link href="https://registratumascota.cl/inicio.xhtml" target="_blank" rel="noopener noreferrer">
                            Ir al Registro Nacional (Chile)
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <p className="mt-4 text-xs text-orange-900/70">
                      Plataforma oficial del gobierno de Chile para el registro de mascotas.
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
