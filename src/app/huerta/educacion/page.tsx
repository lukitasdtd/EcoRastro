
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sprout,
  Sun,
  Droplets,
  Bug,
  Recycle,
  Lightbulb,
  ArrowRight,
  MapPin,
  CalendarDays,
  Search,
  BookOpen,
} from 'lucide-react';

export default function HuertaEducationPage() {
  // --- Datos para las secciones ---
  const careTips = [
    {
      icon: <Sun className="h-8 w-8 text-primary" />,
      title: 'Luz Solar Adecuada',
      text: 'La mayoría de las hortalizas necesitan al menos 6-8 horas de sol directo al día. Observa tu espacio antes de plantar.',
    },
    {
      icon: <Droplets className="h-8 w-8 text-primary" />,
      title: 'Riego Inteligente',
      text: 'Es mejor regar profundamente con menos frecuencia que superficialmente todos los días. Evita mojar las hojas.',
    },
    {
      icon: <Sprout className="h-8 w-8 text-primary" />,
      title: 'Un Suelo Fértil',
      text: 'Un buen suelo es la base de todo. Enriquece la tierra con compost y materia orgánica para nutrir tus plantas.',
    },
     {
      icon: <Bug className="h-8 w-8 text-primary" />,
      title: 'Control de Plagas Natural',
      text: 'Fomenta la biodiversidad con flores que atraigan insectos beneficiosos. Usa remedios caseros antes que químicos.',
    },
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      title: 'Compostaje Casero',
      text: 'Recicla tus desechos orgánicos para crear un abono rico en nutrientes. Es el mejor alimento para tu huerta.',
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'Asociación de Cultivos',
      text: 'Algunas plantas se benefician mutuamente al crecer juntas, repeliendo plagas o mejorando el suelo.',
    },
  ];

  const firstSteps = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: '1. Elige el Lugar Correcto',
      text: 'Busca el lugar con más horas de sol. Puede ser un balcón, una terraza o un rincón de tu patio. ¡Incluso una ventana funciona!',
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: '2. Decide Qué Plantar',
      text: 'Comienza con cultivos fáciles y rápidos como lechugas, rábanos o hierbas aromáticas. Consulta nuestro calendario de siembra.',
    },
     {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: '3. Prepara el Contenedor y Suelo',
      text: 'Puedes usar macetas, cajones de madera o jardineras. Llénalos con una mezcla de tierra de hojas y compost.',
    },
  ];

  const faqItems = [
      {
        question: "¿Puedo tener una huerta si vivo en un departamento?",
        answer: "¡Por supuesto! Las huertas verticales, macetas colgantes y jardineras de ventana son excelentes opciones para espacios pequeños. Solo asegúrate de tener suficiente luz solar.",
      },
      {
        question: "¿Qué es el compost y cómo lo hago?",
        answer: "El compost es un abono natural que se obtiene de la descomposición de materia orgánica (restos de frutas, verduras, hojas secas). Puedes hacerlo en una compostera o en un montón en tu jardín.",
      },
      {
        question: "¿Cuánta agua necesitan mis plantas?",
        answer: "Depende de la planta, el clima y el tamaño de la maceta. La mejor regla es tocar la tierra: si los primeros 2-3 cm están secos, es hora de regar. Riega por la mañana o al atardecer.",
      },
      {
        question: "¿Cómo sé cuándo cosechar?",
        answer: "Cada hortaliza tiene su momento. Investiga los tiempos promedio de cada una. Generalmente, es mejor cosechar por la mañana cuando las plantas están más frescas.",
      },
      {
        question: "¿Qué hago con las plagas como pulgones?",
        answer: "Para empezar, puedes rociar una mezcla de agua con jabón potásico. También puedes plantar flores como caléndulas o albahaca, que repelen naturalmente a muchos insectos.",
      }
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* --- Hero --- */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Educación y Cultivo para tu Huerta
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Cultivar tus propios alimentos es una experiencia gratificante. Aquí encontrarás todo lo que necesitas para empezar.
        </p>
      </section>

      {/* --- Tips --- */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Consejos Fundamentales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {careTips.map((tip) => (
            <Card key={tip.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-2">
                  {tip.icon}
                </div>
                <CardTitle className="text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{tip.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- Primeros Pasos --- */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Tus Primeros Pasos en la Huerta</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {firstSteps.map((step) => (
             <Card key={step.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl flex flex-col">
                <CardHeader className="flex-row items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0 mt-1">
                        {step.icon}
                    </div>
                    <div>
                        <CardTitle className="text-xl mb-1">{step.title}</CardTitle>
                        <CardDescription>{step.text}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* --- Recursos --- */}
      <section className="mb-20">
        <Card className="bg-primary/10 border-primary/20 max-w-4xl mx-auto p-8 text-center rounded-2xl">
            <CardHeader>
                 <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit mb-4">
                    <Search className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Encuentra Recursos Útiles</CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                    Explora nuestras herramientas para planificar tu siembra y encontrar espacios verdes en tu comunidad.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="rounded-full" aria-label="Ver Calendario de Siembra">
                    <Link href="/calendar">
                        <CalendarDays className="mr-2 h-5 w-5" />
                        Calendario de Siembra
                    </Link>
                </Button>
                 <Button asChild size="lg" variant="secondary" className="rounded-full" aria-label="Buscar Huertas Comunitarias">
                    <Link href="/gardens#finder">
                        <MapPin className="mr-2 h-5 w-5" />
                        Buscar Huertas
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>

      {/* --- FAQ --- */}
      <section className="max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-muted/50 rounded-2xl px-6 border-b-0">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.question}</AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* --- Footer --- */}
      <footer className="text-center border-t pt-12">
        <h3 className="text-2xl font-bold mb-2">Manos a la tierra.</h3>
        <p className="max-w-2xl mx-auto text-foreground/60 mb-6">
          Empezar una huerta es un viaje de aprendizaje y conexión con la naturaleza. ¡No tengas miedo de experimentar y disfrutar del proceso!
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
            <Button variant="outline" asChild>
                <Link href="/gardens">Explorar Huertas</Link>
            </Button>
            <Button variant="default" asChild>
                <Link href="/about">Conoce Nuestra Misión</Link>
            </Button>
        </div>
      </footer>
    </div>
  );
}

    