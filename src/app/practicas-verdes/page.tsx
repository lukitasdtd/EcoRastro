'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlipCard } from '@/components/ui/flip-card';
import { Recycle, Droplets, Trash2, Leaf, ShoppingCart, Lightbulb, ArrowLeft, RotateCw, Sparkles, CheckCircle, Calculator } from 'lucide-react';
import Link from 'next/link';

const premiumCard = (title: string, description: string) => (
    <Card className="max-w-2xl mx-auto text-center p-8 flex flex-col items-center justify-center bg-teal-600/5 border-dashed border-teal-600/20 h-full shadow-none">
        <CardHeader>
            <div className="mx-auto bg-teal-500/10 rounded-full p-4 w-fit mb-4">
              <Sparkles className="h-8 w-8 text-teal-500" />
            </div>
            <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
            <Button variant="default" disabled className="bg-teal-500 hover:bg-teal-600">
                Próximamente en Premium
            </Button>
        </CardFooter>
    </Card>
)

export default function PracticasVerdesPage() {

  const greenPractices = [
    {
      title: "Compostaje",
      description: "Transforma residuos orgánicos en abono lleno de vida para tus plantas.",
      icon: <Recycle className="w-10 h-10 text-green-600" />
    },
    {
      title: "Riego Inteligente",
      description: "Usa técnicas como el goteo y riega en horas de baja evaporación para cuidar el agua.",
      icon: <Droplets className="w-10 h-10 text-blue-500" />
    },
    {
      title: "Las 3R",
      description: "Reduce, Reutiliza y Recicla. El pilar para un consumo consciente y menos basura.",
      icon: <Trash2 className="w-10 h-10 text-orange-500" />
    },
    {
      title: "Apoya lo Local",
      description: "Compra a productores locales para reducir la huella de carbono y fortalecer tu comunidad.",
      icon: <ShoppingCart className="w-10 h-10 text-purple-500" />
    },
  ];

  const compostSteps = [
    { 
        icon: <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />,
        text: "Empieza con una capa de material seco (hojas, cartón)."
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />,
        text: "Alterna con capas de residuos húmedos (restos de fruta, verdura)."
    },
    { 
        icon: <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />,
        text: "Mantén la humedad como una esponja estrujada, no empapada."
    },
    { 
        icon: <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />,
        text: "Airea la mezcla semanalmente para acelerar el proceso."
    },
  ]

  return (
    <main className="bg-gradient-to-b from-teal-50 to-white">
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
                Prácticas Verdes para un <span className="text-teal-600">Futuro Sostenible</span>
              </h1>
              <p className="max-w-xl mx-auto md:mx-0 mt-4 text-lg text-gray-600">
                Cada pequeña acción cuenta. Descubre cómo puedes integrar hábitos sostenibles en tu vida diaria para cuidar nuestro planeta.
              </p>
            </div>
            <div>
              {premiumCard(
                  "Analiza tu Impacto Ambiental",
                  "Nuestras herramientas premium te ayudarán a medir y reducir tu huella de carbono personal."
              )}
            </div>
        </section>

        <div className="space-y-16 md:space-y-20">

          {/* --- Prácticas Clave --- */}
          <section>
              <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
                    Pilares de un Hogar Sostenible
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-teal-500 rounded-full"></div>
                  </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {greenPractices.map((practice) => (
                  <FlipCard
                    key={practice.title}
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 cursor-pointer"
                    frontContent={(
                      <div className="relative w-full h-full flex items-center justify-center">
                        <h3 className="text-xl font-bold text-gray-800 px-4 text-center">{practice.title}</h3>
                        <RotateCw className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
                      </div>
                    )}
                    backContent={(
                      <div className="text-center p-2">
                        <div className="mx-auto bg-teal-100/70 rounded-full p-3 w-fit mb-3">
                          {practice.icon}
                        </div>
                        <p className="text-gray-600 px-2">{practice.description}</p>
                      </div>
                    )}
                  />
                ))}
              </div>
          </section>

          {/* --- Guía y Calculadora --- */}
           <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full">
                <CardHeader className="text-center border-b pb-4">
                    <CardTitle className="text-2xl font-bold">Guía Rápida de Compostaje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                   {compostSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50">
                           {step.icon}
                          <p className="text-gray-700">{step.text}</p>
                        </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 h-auto text-teal-600 font-semibold hover:text-teal-700 mx-auto">
                      <Link href="/huerta/educacion">Ver más sobre huertas</Link>
                  </Button>
                </CardFooter>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full text-center">
                <CardHeader className="border-b pb-4">
                  <div className="mx-auto bg-teal-500/10 text-white rounded-full p-4 w-fit mb-3">
                      <Calculator className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Calculadora de Huella de Carbono</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex flex-col items-center h-full">
                    <p className="text-gray-600 mb-6 flex-grow">Mide el impacto de tus hábitos diarios y descubre cómo reducir tu huella de carbono de manera efectiva.</p>
                    <Button variant="default" disabled className="bg-teal-500 hover:bg-teal-600 w-full mt-auto">
                      Herramienta Premium - Próximamente
                    </Button>
                </CardContent>
            </Card>
          </section>

          {/* --- Footer --- */}
          <footer className="text-center border-t pt-12 mt-16">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">El cambio empieza contigo.</h3>
            <p className="max-w-2xl mx-auto text-gray-600">
              Cada elección que hacemos, por pequeña que sea, tiene el poder de contribuir a un planeta más sano. Sigue explorando, aprendiendo y actuando.
            </p>
          </footer>
        </div>
    </div>
    </main>
  );
}
