'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, HelpCircle, ArrowRight, Sparkles, ArrowLeft, RotateCw, Bird, Bug, Rabbit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FlipCard } from '@/components/ui/flip-card';

const premiumCard = (title: string, description: string) => (
    <Card className="max-w-2xl mx-auto text-center p-8 flex flex-col items-center justify-center bg-blue-600/5 border-dashed border-blue-600/20 h-full shadow-none">
        <CardHeader>
            <div className="mx-auto bg-blue-500/10 rounded-full p-4 w-fit mb-4">
              <Sparkles className="h-8 w-8 text-blue-500" />
            </div>
            <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
            <Button variant="default" disabled className="bg-blue-500 hover:bg-blue-600">
                Próximamente en Premium
            </Button>
        </CardFooter>
    </Card>
)

export default function FaunaSilvestrePage() {
  const localFauna = [
    {
      name: "Aves Nativas",
      description: "Desde el cóndor al picaflor, Chile es un paraíso de aves. Aprende a identificarlas y proteger sus hábitats.",
      icon: <Bird className="w-10 h-10 text-blue-600" />
    },
    {
      name: "Pequeños Mamíferos",
      description: "Zorros, conejos y roedores nativos como el degú cumplen roles vitales en el equilibrio del ecosistema.",
      icon: <Rabbit className="w-10 h-10 text-orange-500" />
    },
    {
      name: "Insectos Polinizadores",
      description: "Abejas, mariposas y otros insectos son esenciales para la flora nativa y la producción de alimentos.",
      icon: <Bug className="w-10 h-10 text-green-600" />
    },
    {
      name: "Reptiles y Anfibios",
      description: "Descubre el mundo de las culebras, lagartijas y anfibios chilenos, muchos de ellos inofensivos y beneficiosos.",
      icon: <Sparkles className="w-10 h-10 text-teal-500" />
    },
  ];

  const whatToDoFAQ = [
    {
      question: "¿Qué hago si encuentro un animal herido?",
      answer: "No lo toques ni muevas. Llama inmediatamente al Servicio Agrícola y Ganadero (SAG).",
      icon: <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
    },
    {
      question: "¿Debo rescatar un polluelo caído?",
      answer: "Generalmente no. Sus padres suelen estar cerca. Solo interviene si está en peligro inminente.",
      icon: <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
    },
    {
      question: "¿Puedo tener un animal silvestre como mascota?",
      answer: "No, es ilegal en Chile y muy perjudicial para el animal. Deben vivir en su hábitat natural.",
      icon: <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
    },
     {
      question: "¿Cómo diferencio una culebra peligrosa?",
      answer: "Las culebras nativas son inofensivas. Ante la duda, nunca la manipules y aléjate lentamente.",
      icon: <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
    },
  ];

  return (
    <main className="bg-gradient-to-b from-blue-50 to-white">
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Button asChild variant="outline" className="bg-white">
            <Link href="/"> 
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </div>

      {/* --- Hero --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
              Fauna Silvestre: <span className="text-blue-600">Nuestros Vecinos Naturales</span>
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 mt-4 text-lg text-gray-600">
              Aprende a convivir en armonía con la vida silvestre que nos rodea, protegiendo su bienestar y nuestros ecosistemas.
            </p>
          </div>
          <div>
            {premiumCard(
                "Experto de IA en Fauna Chilena",
                "Resuelve tus dudas con nuestro experto virtual para obtener información al instante sobre la fauna de Chile."
            )}
          </div>
        </section>
      
      <div className="space-y-16 md:space-y-20">

        {/* --- Conoce la Fauna Local --- */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
              Conoce la Fauna de tu Entorno
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></div>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {localFauna.map((fauna) => (
              <FlipCard
                key={fauna.name}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 cursor-pointer"
                frontContent={(
                  <div className="relative w-full h-full flex items-center justify-center">
                    <h3 className="text-xl font-bold text-gray-800 px-4 text-center">{fauna.name}</h3>
                    <RotateCw className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
                  </div>
                )}
                backContent={(
                  <div className="text-center p-2">
                    <div className="mx-auto bg-blue-100/70 rounded-full p-3 w-fit mb-3">
                      {fauna.icon}
                    </div>
                    <p className="text-gray-600 px-2">{fauna.description}</p>
                  </div>
                )}
              />
            ))}
          </div>
        </section>
        
        {/* --- Qué Hacer y Contacto --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full">
                <CardHeader className="text-center border-b pb-4">
                    <CardTitle className="text-2xl font-bold">Qué Hacer en Ciertas Situaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                   {whatToDoFAQ.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50">
                           {item.icon}
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.question}</h4>
                            <p className="text-sm text-gray-600">{item.answer}</p>
                          </div>
                        </div>
                  ))}
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-destructive/20 h-full text-center bg-destructive/5">
                <CardHeader className="border-b pb-4 border-destructive/20">
                  <div className="mx-auto bg-destructive text-white rounded-full p-4 w-fit mb-3">
                      <Phone className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-destructive">Animal Herido o en Peligro</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-gray-600 mb-6">Si encuentras fauna silvestre que necesita ayuda, contacta a la autoridad. No intervengas directamente.</p>
                    <Button asChild size="lg" className="rounded-full bg-destructive hover:bg-destructive/90 w-full text-destructive-foreground" aria-label="Llamar al SAG">
                        <Link href="tel:+56223451111">
                            Llamar al SAG
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <p className="mt-4 text-sm text-destructive/80">
                      Servicio Agrícola y Ganadero (SAG)
                    </p>
                </CardContent>
            </Card>
          </section>

        {/* --- Footer --- */}
        <footer className="text-center border-t pt-12 mt-16">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">La naturaleza es responsabilidad de todos.</h3>
          <p className="max-w-2xl mx-auto text-gray-600 mb-6">
            Respetar a la fauna silvestre es fundamental para la salud de nuestros ecosistemas. Observa a distancia, no alimentes y reporta cualquier emergencia.
          </p>
        </footer>
      </div>
    </div>
    </main>
  );
}
