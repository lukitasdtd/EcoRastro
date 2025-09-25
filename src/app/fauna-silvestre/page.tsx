'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const premiumCard = (title: string, description: string) => (
    <Card className="max-w-2xl mx-auto text-center p-8 flex flex-col items-center justify-center bg-primary/5 border-dashed border-primary/20 h-full shadow-none">
        <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
            <Button variant="default" disabled>
                Accede a la Plataforma Premium por $2.990 CLP
            </Button>
        </CardFooter>
    </Card>
)

export default function FaunaSilvestrePage() {
  const localFauna = [
    {
      name: "Aves Nativas",
      description: "Chile alberga una increíble diversidad de aves. Desde el majestuoso cóndor hasta el pequeño picaflor de Arica.",
      imageId: "wildlife-bird",
      question: "Háblame sobre las aves nativas más comunes en Chile y cómo proteger sus hábitats."
    },
    {
      name: "Insectos Polinizadores",
      description: "Las abejas, mariposas y otros insectos son vitales para nuestros ecosistemas y la producción de alimentos.",
      imageId: "wildlife-insect",
      question: "Explícame la importancia de los insectos polinizadores en Chile y qué flores nativas puedo plantar para ayudarlos."
    },
    {
      name: "Pequeños Mamíferos",
      description: "Zorros, conejos y roedores nativos como el degú cumplen roles importantes en el ecosistema.",
      imageId: "wildlife-mammal",
      question: "Quiero saber sobre los pequeños mamíferos comunes en Chile, como el zorro culpeo, y las precauciones que debo tener."
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
      
      {/* --- Experto con IA --- */}
      <section className="mb-16">
        {premiumCard(
            "Experto de IA en Fauna Chilena",
            "Resuelve tus dudas con nuestro experto virtual para obtener información al instante sobre la fauna de Chile."
        )}
      </section>


      {/* --- Conoce la Fauna Local --- */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Conoce la Fauna de tu Entorno</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localFauna.map((fauna) => {
             const image = PlaceHolderImages.find(img => img.id === fauna.imageId);
             return (
            <Card key={fauna.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <div className="relative w-full aspect-video">
                  {image && (
                      <Image
                        src={image.imageUrl}
                        alt={fauna.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        data-ai-hint={image.imageHint}
                      />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <CardTitle className="text-xl mb-2">{fauna.name}</CardTitle>
                <p className="text-foreground/80 flex-grow mb-4">{fauna.description}</p>
                 <Button variant="link" className="p-0 h-auto text-primary font-semibold mt-auto" disabled>
                    Aprender más <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
             )
            })}
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
                <CardDescription className="text-lg max-w-2xl mx-auto text-foreground/80">
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
