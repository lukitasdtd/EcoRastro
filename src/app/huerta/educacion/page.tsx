'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlipCard } from '@/components/ui/flip-card';
import {
  Sprout, Sun, Droplets, Bug, Recycle, Lightbulb, Tractor, Users, Leaf, Heart, ArrowLeft, RotateCw, ListChecks, Shovel
} from 'lucide-react';

export default function HuertaEducationPage() {
  const gardenTypes = [
    {
      title: "Huerta Urbana",
      description: "Aprovecha al máximo los espacios pequeños en la ciudad. Ideal para cultivar en macetas, jardineras o mesas de cultivo.",
      icon: <Tractor className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Huerta Vertical",
      description: "Cultiva hacia arriba usando paredes o estructuras para maximizar tu producción en espacios limitados.",
      icon: <Sprout className="w-10 h-10 text-orange-500" />,
    },
    {
      title: "Hidroponía",
      description: "Cultiva plantas sin suelo, usando soluciones minerales en agua. Una técnica de alta eficiencia para interiores.",
      icon: <Droplets className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Huerta Comunitaria",
      description: "Únete a un espacio colectivo para cultivar, compartir conocimientos y fortalecer lazos con tus vecinos.",
      icon: <Users className="w-10 h-10 text-orange-500" />,
    },
  ];

  const gardenBenefits = [
      {
        title: "Nutrición y Salud",
        description: "Consume alimentos frescos, sin pesticidas y llenos de nutrientes.",
        icon: <Heart className="w-8 h-8 text-green-600" />,
      },
      {
        title: "Bienestar Mental",
        description: "La jardinería reduce el estrés, mejora el ánimo y te conecta con la naturaleza.",
        icon: <Sun className="w-8 h-8 text-orange-500" />,
      },
      {
        title: "Economía y Ahorro",
        description: "Ahorra dinero en el supermercado cultivando tus propias verduras, hierbas y frutas.",
        icon: <Recycle className="w-8 h-8 text-green-600" />,
      },
      {
        title: "Biodiversidad",
        description: "Atrae polinizadores como abejas y mariposas, creando un pequeño ecosistema.",
        icon: <Bug className="w-8 h-8 text-orange-500" />,
      }
  ]

  const lifeCycle = [
      { title: "Semilla", icon: <Lightbulb className="w-8 h-8 mx-auto text-green-600"/>, description: "El punto de partida de toda planta." },
      { title: "Germinación", icon: <Sprout className="w-8 h-8 mx-auto text-orange-500"/>, description: "La semilla 'despierta' y brota." },
      { title: "Crecimiento", icon: <Leaf className="w-8 h-8 mx-auto text-green-600"/>, description: "La planta desarrolla hojas y tallos." },
      { title: "Cosecha", icon: <Tractor className="w-8 h-8 mx-auto text-orange-500"/>, description: "Recolectamos los frutos maduros." },
      { title: "Compostaje", icon: <Recycle className="w-8 h-8 mx-auto text-green-600"/>, description: "Los restos se reciclan como abono." },
  ]
  
  const stepByStepGuides = [
    { 
        title: "1. Prepara el Suelo", 
        content: "Mezcla tierra con compost para una base rica en nutrientes y con buen drenaje."
    },
    { 
        title: "2. Siembra o Trasplanta", 
        content: "Entierra la semilla al doble de su tamaño y trasplanta al atardecer para evitar estrés."
    },
    { 
        title: "3. Riega y Cuida", 
        content: "Riega profundo pero sin exceso. Poda hojas viejas para dar más fuerza a la planta."
    },
    { 
        title: "4. Cosecha y Disfruta", 
        content: "Cosecha por la mañana para mayor frescura y almacena según el tipo de hortaliza."
    },
  ]

  const checklistItems = [
    "Sustrato de buena calidad",
    "Compost o humus de lombriz",
    "Macetas con buen drenaje",
    "Semillas o almácigos",
    "Pala y rastrillo de mano",
    "Regadera o manguera",
    "Guantes de jardinería",
    "Tijeras de podar",
  ];

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
        <section className="text-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
              Educación y <span className="text-green-600">Cultivo para tu Huerta</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
              Cultivar tus propios alimentos es una experiencia gratificante. Aquí encontrarás todo lo que necesitas para empezar y llevar tu huerta al siguiente nivel.
            </p>
          </div>
        </section>

        <div className="space-y-16 md:space-y-20">
            {/* --- Tipos de Huertas --- */}
            <section>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
                        Tipos de Huertas
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></div>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {gardenTypes.map((type) => (
                    <FlipCard
                      key={type.title}
                      className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 cursor-pointer h-48"
                      frontContent={(
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                          <h3 className="text-xl font-bold text-gray-800 px-4 text-center">{type.title}</h3>
                          <RotateCw className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      backContent={(
                        <div className="text-center p-4 flex flex-col items-center justify-center h-full">
                          <div className="mx-auto bg-green-100/70 rounded-full p-3 w-fit mb-3">
                            {type.icon}
                          </div>
                          <p className="text-gray-600 text-sm">{type.description}</p>
                        </div>
                      )}
                    />
                  ))}
                </div>
            </section>

            {/* --- Beneficios y Ciclo de Vida --- */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full">
                  <CardHeader className="text-center border-b pb-4">
                      <CardTitle className="text-2xl font-bold">Beneficios de la Huerta</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-6">
                      {gardenBenefits.map((benefit) => (
                        <div key={benefit.title} className="flex items-start gap-3 p-2">
                            <div className="bg-green-100/70 rounded-full p-3 flex-shrink-0 mt-1">{benefit.icon}</div>
                            <div>
                              <h4 className="font-semibold mb-1 text-gray-800">{benefit.title}</h4>
                              <p className="text-sm text-gray-600">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                  </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full">
                  <CardHeader className="text-center border-b pb-4">
                      <CardTitle className="text-2xl font-bold">Ciclo de Vida de los Cultivos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-6">
                      {lifeCycle.map((stage) => (
                          <div key={stage.title} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                              <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center flex-shrink-0">{stage.icon}</div>
                              <div>
                                <h4 className="font-bold text-gray-800">{stage.title}</h4>
                                <p className="text-sm text-gray-500">{stage.description}</p>
                              </div>
                          </div>
                    ))}
                  </CardContent>
              </Card>
            </section>
            
            {/* --- Primeros Pasos y Herramientas --- */}
            <section>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
                        Primeros Pasos y Herramientas
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></div>
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full">
                        <CardHeader className="flex-row items-center gap-4 border-b pb-4">
                            <div className="h-12 w-12 rounded-full bg-green-100/70 flex items-center justify-center flex-shrink-0"><Sprout className="w-7 h-7 text-green-600"/></div>
                            <CardTitle className="text-2xl font-bold">Guía de Primeros Pasos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                           {stepByStepGuides.map((step, index) => (
                                <div key={index} className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50">
                                  <div>
                                    <h4 className="font-semibold text-gray-800">{step.title}</h4>
                                    <p className="text-sm text-gray-600">{step.content}</p>
                                  </div>
                                </div>
                          ))}
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 h-full">
                         <CardHeader className="flex-row items-center gap-4 border-b pb-4">
                            <div className="h-12 w-12 rounded-full bg-orange-100/70 flex items-center justify-center flex-shrink-0"><ListChecks className="w-7 h-7 text-orange-600"/></div>
                            <CardTitle className="text-2xl font-bold">Herramientas Esenciales</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {checklistItems.map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <Shovel className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
      </div>
    </main>
  );
}
