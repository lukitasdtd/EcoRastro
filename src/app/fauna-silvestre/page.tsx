'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bird, Bug, Rabbit, Phone, ShieldCheck, Heart, Leaf, HelpCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function FaunaSilvestrePage() {

  const localFauna = [
    {
      name: "Aves Nativas",
      description: "Chile alberga una increíble diversidad de aves. Desde el majestuoso cóndor hasta el pequeño picaflor de Arica. Aprende a identificarlas y a proteger sus hábitats.",
      icon: <Bird className="w-10 h-10 text-primary" />,
    },
    {
      name: "Insectos Polinizadores",
      description: "Las abejas, mariposas y otros insectos son vitales para nuestros ecosistemas y la producción de alimentos. Crear un jardín con flores nativas es una gran forma de ayudarlos.",
      icon: <Bug className="w-10 h-10 text-primary" />,
    },
    {
      name: "Pequeños Mamíferos",
      description: "Zorros, conejos y roedores nativos como el degú cumplen roles importantes. Respeta su espacio y no los alimentes para mantener un equilibrio saludable.",
      icon: <Rabbit className="w-10 h-10 text-primary" />,
    },
  ];

  const helpTips = [
    {
      title: "No los alimentes",
      description: "Alimentar a la fauna silvestre altera su comportamiento natural, puede causarles enfermedades y generar dependencia.",
      icon: <Heart className="w-8 h-8 text-primary" />,
    },
    {
      title: "Mantén la distancia",
      description: "Observa a los animales desde lejos. Si te acercas, pueden sentirse amenazados y reaccionar de forma impredecible.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "Crea un jardín amigable",
      description: "Planta especies nativas. Ofrecen alimento y refugio a la fauna local, atrayendo aves y polinizadores beneficiosos.",
      icon: <Leaf className="w-8 h-8 text-primary" />,
    },
    {
      title: "Mascotas bajo control",
      description: "Mantén a tus mascotas con correa en áreas naturales. Incluso el perro más amigable puede estresar o dañar a la fauna.",
      icon: <AlertTriangle className="w-8 h-8 text-primary" />,
    },
  ];

  const whatToDoFAQ = [
    {
      question: "¿Qué hago si encuentro un animal silvestre herido?",
      answer: "No lo toques ni lo muevas. Podría ser peligroso para ti y para el animal. Llama inmediatamente al Servicio Agrícola y Ganadero (SAG) al número +56 2 2345 1111. Ellos son los expertos capacitados para manejar la situación.",
    },
    {
      question: "¿Es buena idea tomar un polluelo que se cayó del nido?",
      answer: "Generalmente no. Muchas veces los padres están cerca esperando a que te alejes para seguir cuidándolo. Solo si está en peligro inminente (ej. en una calle), muévelo a un arbusto cercano. Manipularlo puede hacer que sus padres lo rechacen.",
    },
    {
      question: "¿Puedo tener un animal silvestre como mascota?",
      answer: "No, es ilegal en Chile y muy perjudicial para el animal. La fauna silvestre tiene necesidades complejas que no se pueden satisfacer en un hogar y sacarlos de su hábitat daña el ecosistema.",
    },
     {
      question: "¿Cómo diferencio una culebra nativa de una peligrosa?",
      answer: "Chile tiene muy pocas serpientes venenosas y es muy raro encontrarlas. Las culebras nativas son inofensivas y beneficiosas para controlar plagas. Ante la duda, nunca la manipules. Aléjate lentamente y déjala seguir su camino.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* --- Hero --- */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Fauna Silvestre: Nuestros Vecinos Naturales
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Aprende a convivir en armonía con la vida silvestre que nos rodea, protegiendo su bienestar y nuestros ecosistemas.
        </p>
      </section>

      {/* --- Conoce la Fauna Local --- */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Conoce la Fauna de tu Entorno</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localFauna.map((fauna) => (
            <Card key={fauna.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-2">
                  {fauna.icon}
                </div>
                <CardTitle className="text-xl">{fauna.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{fauna.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- Cómo Ayudar --- */}
      <section className="bg-muted/40 py-16 rounded-3xl">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Principios para una Convivencia Respetuosa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {helpTips.map((tip) => (
                    <Card key={tip.title} className="p-6 text-center flex flex-col items-center bg-background/50 border-0 shadow-sm">
                        <div className="mb-4">{tip.icon}</div>
                        <CardTitle className="text-lg font-semibold mb-2">{tip.title}</CardTitle>
                        <p className="text-sm text-foreground/70">{tip.description}</p>
                    </Card>
                ))}
            </div>
        </div>
      </section>
      
      {/* --- Contacto de Emergencia --- */}
      <section className="my-16">
        <Card className="bg-destructive/10 border-destructive/20 max-w-4xl mx-auto p-8 text-center rounded-2xl">
            <CardHeader>
                 <div className="mx-auto bg-destructive text-destructive-foreground rounded-full p-4 w-fit mb-4">
                    <Phone className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">¿Animal Herido o en Peligro?</CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto text-destructive-foreground/90">
                    Si encuentras un animal silvestre que necesita ayuda, contacta a la autoridad competente. No intervengas directamente.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg" className="rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    <Link href="tel:+56223451111">
                        Llamar al SAG
                    </Link>
                </Button>
                <p className="mt-4 text-sm text-foreground/60">
                    Servicio Agrícola y Ganadero (SAG) - Rescate de Fauna.
                </p>
            </CardContent>
        </Card>
      </section>

      {/* --- Preguntas Frecuentes --- */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Qué Hacer en Ciertas Situaciones</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {whatToDoFAQ.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-muted/50 rounded-2xl px-6 border-b-0">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                <div className="flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span>{item.question}</span>
                </div>
                </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 pb-6 pl-9">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
