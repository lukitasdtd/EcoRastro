'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlipCard } from '@/components/ui/flip-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Heart,
  PawPrint,
  Bone,
  Home,
  FileText,
  Shield,
  ArrowRight,
  Sparkles,
  BookMarked,
  HelpCircle,
  Stethoscope,
  ShowerHead,
  Search,
  Users,
  Building,
  Scale,
  ArrowLeft,
  RotateCw
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
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: 'Ley 21.020 (Ley Cholito)',
      text: 'Establece la Tenencia Responsable, obligando a registrar e identificar a las mascotas.',
      href: 'https://www.bcn.cl/leychile/navegar?idNorma=1106037',
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Ley 20.380 (Protección)',
      text: 'Normativa sobre la protección de los animales, que establece las obligaciones de su cuidado.',
      href: 'https://www.bcn.cl/leychile/navegar?idNorma=1006858',
    },
     {
      icon: <HelpCircle className="h-8 w-8 text-green-600" />,
      title: 'Inscripción en Registro',
      text: 'Pasos para inscribir a tu mascota en el Registro Nacional, un requisito obligatorio por ley.',
      href: 'https://www.chileatiende.gob.cl/fichas/53562-inscripcion-en-el-registro-nacional-de-mascotas-o-animales-de-compania',
    },
  ];

  const faqItems = [
      {
        question: "¿Es obligatorio registrar a mi mascota?",
        answer: "Sí, la Ley 21.020 (Ley Cholito) establece que es obligatorio inscribir a perros y gatos en el Registro Nacional de Mascotas.",
      },
      {
        question: "¿Qué es y para qué sirve el microchip?",
        answer: "El microchip es un dispositivo subcutáneo del tamaño de un grano de arroz que contiene un número de identificación único de 15 dígitos. Permite asociar a la mascota con su dueño en el registro oficial.",
      },
      {
        question: "¿La placa con el QR reemplaza al microchip?",
        answer: "No, la placa es un complemento útil para una rápida identificación si alguien encuentra a tu mascota, pero no reemplaza la obligatoriedad del microchip y la inscripción en el registro oficial.",
      },
      {
        question: "¿Cómo y dónde denuncio el maltrato animal?",
        answer: "Puedes denunciar el maltrato animal en Carabineros, PDI o en la Fiscalía. Aporta todas las pruebas que puedas (fotos, videos, testigos). El maltrato es un delito.",
      },
      {
        question: "¿Qué hago si perdí el certificado de mi microchip?",
        answer: "Debes contactar al veterinario que implantó el chip para solicitar un duplicado del certificado. Si no es posible, algunos municipios o jornadas de implantación pueden leer el chip y emitir un nuevo certificado de idoneidad.",
      }
  ]
  
  const premiumCard = (title: string, description: string) => (
    <Card className="max-w-2xl mx-auto text-center p-8 flex flex-col items-center justify-center bg-green-600/5 border-dashed border-green-600/20 h-full shadow-none">
        <CardHeader>
            <div className="mx-auto bg-orange-500/10 rounded-full p-4 w-fit mb-4">
              <Sparkles className="h-8 w-8 text-orange-500" />
            </div>
            <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
            <Button variant="default" disabled className="bg-orange-500 hover:bg-orange-600">
                Accede a la Plataforma Premium
            </Button>
        </CardFooter>
    </Card>
  )

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

        {/* --- Hero Section --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
              Educación y <span className="text-orange-500">Cuidados para Mascotas</span>
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 mt-4 text-lg text-gray-600">
              Ser un dueño responsable es la mayor muestra de amor. Aquí encontrarás información clave para el bienestar de tu compañero.
            </p>
          </div>
          <div>
            {premiumCard(
                "Asistente de IA para Mascotas",
                "Obtén respuestas sobre salud, comportamiento y nutrición de nuestro asistente virtual."
            )}
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
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 cursor-pointer"
                  frontContent={(
                    <div className="relative w-full h-full flex items-center justify-center">
                      <h3 className="text-xl font-bold text-gray-800 px-4 text-center">{tip.title}</h3>
                      <RotateCw className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
                    </div>
                  )}
                  backContent={(
                    <div className="text-center p-2">
                      <div className="mx-auto bg-green-100/70 rounded-full p-3 w-fit mb-3">
                        {tip.icon}
                      </div>
                      <p className="text-gray-600 px-2">{tip.text}</p>
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
                    <CardTitle className="text-2xl font-bold">Normativas Clave en Chile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                   {regulations.map((reg) => (
                        <div key={reg.title} className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50">
                          <div className="bg-green-100/80 rounded-full p-3 flex-shrink-0 mt-1">{reg.icon}</div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-gray-800">{reg.title}</h4>
                            <p className="text-sm text-gray-600 mb-1">{reg.text}</p>
                            <Button asChild variant="link" className="p-0 h-auto text-orange-600 font-semibold hover:text-orange-700 text-sm">
                              <Link href={reg.href} target="_blank" rel="noopener noreferrer">
                                Ver fuente oficial <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
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
                  <CardTitle className="text-2xl font-bold">Consulta el Registro de tu Mascota</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-gray-600 mb-6">Verifica si el microchip de tu mascota está correctamente inscrito en la base de datos oficial.</p>
                    <Button asChild size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 w-full" aria-label="Consultar chip en registratumascota.cl">
                        <Link href="https://registratumascota.cl/consultas.xhtml" target="_blank" rel="noopener noreferrer">
                            Consultar Chip Aquí
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <p className="mt-4 text-sm text-orange-900/70">
                      O visita el sitio en <Link href="https://registratumascota.cl/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">registratumascota.cl</Link>
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
