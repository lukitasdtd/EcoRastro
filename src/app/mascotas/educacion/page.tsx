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
} from 'lucide-react';

export default function PetEducationPage() {
  // --- Datos para las secciones ---
  const careTips = [
    {
      icon: <Bone className="h-8 w-8 text-primary" />,
      title: 'Alimentación Balanceada',
      text: 'Una dieta adecuada a su edad, tamaño y nivel de actividad es la base de su salud. Siempre con agua fresca disponible.',
    },
    {
      icon: <PawPrint className="h-8 w-8 text-primary" />,
      title: 'Ejercicio Diario',
      text: 'El ejercicio regular es crucial para su salud física y mental. Adapta la rutina a las necesidades específicas de tu mascota.',
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: 'Salud y Prevención',
      text: 'Mantén sus vacunas y desparasitaciones al día. Las visitas periódicas al veterinario previenen problemas a largo plazo.',
    },
     {
      icon: <ShowerHead className="h-8 w-8 text-primary" />,
      title: 'Higiene y Aseo',
      text: 'El cepillado regular, baños adecuados y cuidado dental son esenciales para su comodidad y para prevenir enfermedades.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Socialización',
      text: 'Una correcta socialización desde cachorro con personas y otros animales previene miedos y comportamientos agresivos.',
    },
    {
      icon: <Home className="h-8 w-8 text-primary" />,
      title: 'Un Espacio Seguro',
      text: 'Tu mascota necesita un lugar propio donde se sienta segura y protegida, especialmente durante ruidos fuertes o visitas.',
    },
  ];

  const regulations = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Ley 21.020 (Ley Cholito)',
      text: 'Establece la Tenencia Responsable de Mascotas, obligando a registrar, identificar y esterilizar. Regula la crianza y venta.',
      href: 'https://www.bcn.cl/leychile/navegar?idNorma=1106037',
    },
    {
      icon: <HelpCircle className="h-8 w-8 text-primary" />,
      title: 'Trámite Ley Cholito',
      text: 'Guía oficial de ChileAtiende para cumplir con los requisitos de la ley de tenencia responsable de mascotas.',
      href: 'https://www.chileatiende.gob.cl/fichas/51436-ley-de-tenencia-responsable-de-mascotas-y-animales-de-compania-ley-cholito',
    },
     {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'Inscripción en Registro',
      text: 'Pasos para inscribir a tu perro o gato en el Registro Nacional de Mascotas, un requisito obligatorio por ley.',
      href: 'https://www.chileatiende.gob.cl/fichas/53562-inscripcion-en-el-registro-nacional-de-mascotas-o-animales-de-compania',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Ley 20.380 (Protección)',
      text: 'Normativa sobre la protección de los animales, que establece las obligaciones generales para su cuidado y bienestar.',
      href: 'https://www.bcn.cl/leychile/navegar?idNorma=1006858',
    },
  ];

  const officialResources = [
      {
        icon: <Building className="w-8 h-8 text-primary" />,
        title: "SUBDERE",
        text: "La Subsecretaría de Desarrollo Regional y Administrativo es el organismo gubernamental a cargo del programa de tenencia responsable.",
        href: "https://www.subdere.gov.cl/",
      },
      {
        icon: <Scale className="w-8 h-8 text-primary" />,
        title: "SAG Normativas",
        text: "El Servicio Agrícola y Ganadero regula el bienestar animal en el transporte, establecimientos y espectáculos.",
        href: "https://www.sag.gob.cl/ambitos-de-accion/bienestar-animal/normativas",
      }
  ]

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

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* --- Hero --- */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Educación y Cuidados para Mascotas
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Ser un dueño responsable es la mayor muestra de amor. Aquí encontrarás información clave para el bienestar de tu compañero.
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

      {/* --- Leyes --- */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Normativas Clave en Chile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {regulations.map((reg) => (
             <Card key={reg.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl flex flex-col">
                <CardHeader className="flex-row items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0 mt-1">
                        {reg.icon}
                    </div>
                    <div>
                        <CardTitle className="text-xl mb-1">{reg.title}</CardTitle>
                        <CardDescription>{reg.text}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="mt-auto">
                     <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
                        <Link href={reg.href} target="_blank" rel="noopener noreferrer" aria-label={`Leer más sobre ${reg.title}`}>
                           Ver fuente oficial <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- Consulta Chip --- */}
      <section className="mb-20">
        <Card className="bg-primary/10 border-primary/20 max-w-4xl mx-auto p-8 text-center rounded-2xl">
            <CardHeader>
                 <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit mb-4">
                    <Search className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Consulta el Registro de tu Mascota</CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                    Verifica si el microchip de tu mascota está correctamente inscrito en la base de datos oficial.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg" className="rounded-full" aria-label="Consultar chip en registratumascota.cl">
                    <Link href="https://registratumascota.cl/consultas.xhtml" target="_blank" rel="noopener noreferrer">
                        Consultar Chip Aquí
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <p className="mt-4 text-sm text-foreground/60">
                    O visita el sitio principal en <Link href="https://registratumascota.cl/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">registratumascota.cl</Link>
                </p>
            </CardContent>
        </Card>
      </section>

      {/* --- Recursos --- */}
       <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Recursos Oficiales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {officialResources.map((res) => (
             <Card key={res.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                        {res.icon}
                    </div>
                    <div>
                        <CardTitle className="text-xl mb-1">{res.title}</CardTitle>
                        <CardDescription>{res.text}</CardDescription>
                    </div>
                </CardHeader>
                 <CardContent className="mt-auto">
                     <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
                        <Link href={res.href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar sitio de ${res.title}`}>
                           Ir al sitio <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
          ))}
        </div>
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
        <h3 className="text-2xl font-bold mb-2">El amor es un compromiso.</h3>
        <p className="max-w-2xl mx-auto text-foreground/60 mb-6">
          La tenencia responsable es un acto de amor que dura toda la vida. Investiga, edúcate y prepárate para darle a tu mascota el hogar que merece.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
            <Button variant="outline" asChild>
                <Link href="/adoption">Ver Mascotas en Adopción</Link>
            </Button>
            <Button variant="default" asChild>
                <Link href="/report-pet">Reportar una Mascota</Link>
            </Button>
        </div>
      </footer>
    </div>
  );
}
