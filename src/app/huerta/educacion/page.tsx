'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FlipCard } from '@/components/ui/flip-card';
import {
  Sprout, Sun, Droplets, Bug, Recycle, Lightbulb, Tractor, Users, Leaf, CheckSquare, Heart, Sparkles, ArrowRight, ArrowLeft, RotateCw
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
        id: "suelo", 
        title: "1. Suelo", 
        icon: <Leaf className="w-8 h-8 text-green-600"/>,
        content: "Mezcla tierra con compost para una base rica en nutrientes y con buen drenaje."
    },
    { 
        id: "siembra", 
        title: "2. Siembra", 
        icon: <Sprout className="w-8 h-8 text-green-600"/>,
        content: "Entierra la semilla al doble de su tamaño y trasplanta al atardecer para evitar estrés."
    },
    { 
        id: "cuidados", 
        title: "3. Cuidado", 
        icon: <Droplets className="w-8 h-8 text-green-600"/>,
        content: "Riega profundo pero sin exceso. Poda hojas viejas para dar más fuerza a la planta."
    },
    { 
        id: "cosecha", 
        title: "4. Cosecha", 
        icon: <Tractor className="w-8 h-8 text-green-600"/>,
        content: "Cosecha por la mañana para mayor frescura y almacena según el tipo de hortaliza."
    },
  ]

  const checklistItems = [
    "Sustrato de buena calidad (tierra de hojas, turba)",
    "Compost o humus de lombriz para nutrir la tierra",
    "Macetas o contenedores con buen drenaje",
    "Semillas o almácigos de tus cultivos preferidos",
    "Pala y rastrillo de mano",
    "Regadera o manguera con riego suave",
    "Guantes de jardinería",
    "Tijeras de podar",
  ];

  const handleDownload = () => {
    const title = "Checklist del Hortelano - EcoRastro\n";
    const divider = "========================================\n\n";
    const content = checklistItems.map(item => `[ ] ${item}`).join("\n");
    const textToSave = title + divider + content;
    const blob = new Blob([textToSave], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "checklist-huerta.txt";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const premiumCard = (title: string, description: string, cta: string) => (
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
                {cta}
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
              Educación y <span className="text-green-600">Cultivo para tu Huerta</span>
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 mt-4 text-lg text-gray-600">
              Cultivar tus propios alimentos es una experiencia gratificante. Aquí encontrarás todo lo que necesitas para empezar y llevar tu huerta al siguiente nivel.
            </p>
          </div>
          <div>
            {premiumCard(
                "Experto de IA para tu Huerta",
                "Resuelve tus dudas con nuestro experto virtual para obtener consejos personalizados sobre tu huerta.",
                "Próximamente en Premium"
            )}
          </div>
        </section>

        <Tabs defaultValue="essentials" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="essentials">Guías Esenciales</TabsTrigger>
            <TabsTrigger value="tools">Herramientas</TabsTrigger>
            <TabsTrigger value="advanced">Contenido Avanzado</TabsTrigger>
            <TabsTrigger value="community">Comunidad</TabsTrigger>
          </TabsList>

          {/* --- GUÍAS ESENCIALES --- */}
          <TabsContent value="essentials" className="mt-8">
              <div className="space-y-16">
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
                            className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100 cursor-pointer"
                            frontContent={(
                              <div className="relative w-full h-full flex items-center justify-center">
                                <h3 className="text-xl font-bold text-gray-800 px-4 text-center">{type.title}</h3>
                                <RotateCw className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            backContent={(
                              <div className="text-center p-2">
                                <div className="mx-auto bg-green-100/70 rounded-full p-3 w-fit mb-3">
                                  {type.icon}
                                </div>
                                <p className="text-gray-600">{type.description}</p>
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
                  
                  {/* --- Paso a paso para cultivar tu huerta --- */}
                  <section>
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
                              Paso a paso para cultivar tu huerta
                              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></div>
                          </h2>
                      </div>
                      <div className="flex flex-col items-center md:flex-row md:justify-between max-w-6xl mx-auto">
                          {stepByStepGuides.map((guide, index) => (
                              <React.Fragment key={guide.id}>
                                  <div className="flex flex-col items-center text-center w-44 mb-8 md:mb-0">
                                      <div className="h-16 w-16 rounded-full bg-green-100/70 flex items-center justify-center mb-3 border-2 border-white shadow-md">{guide.icon}</div>
                                      <h3 className="font-semibold text-lg text-gray-800">{guide.title}</h3>
                                      <p className="text-sm text-gray-500 mt-1 px-1">{guide.content}</p>
                                  </div>
                                  {index < stepByStepGuides.length - 1 && (
                                    <>
                                      <ArrowRight className="w-12 h-12 text-gray-300 mx-4 hidden md:block" />
                                      <div className="h-8 w-px bg-gray-300 my-2 md:hidden"></div>
                                    </>
                                  )}
                              </React.Fragment>
                          ))}
                      </div>
                  </section>


                  {/* --- Checklist del Hortelano --- */}
                  <section>
                      <Card className="max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-gray-100">
                          <CardHeader>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-green-100/70 flex items-center justify-center flex-shrink-0">
                                  <CheckSquare className="w-8 h-8 text-green-600"/>
                                </div>
                                <div>
                                  <CardTitle className="text-2xl font-bold">Checklist del Hortelano</CardTitle>
                                  <CardDescription>Todo lo que necesitas para empezar tu huerta con el pie derecho.</CardDescription>
                                </div>
                              </div>
                              <Button className="mt-4 md:mt-0 w-full md:w-auto bg-orange-500 hover:bg-orange-600" onClick={handleDownload}>
                                Descargar Checklist
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                {checklistItems.map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckSquare className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                          </CardContent>
                      </Card>
                  </section>
              </div>
          </TabsContent>

          {/* --- HERRAMIENTAS, AVANZADO, COMUNIDAD --- */}
          <TabsContent value="tools" className="mt-8 grid place-items-center">
             {premiumCard(
                "Herramientas Interactivas Premium",
                "Accede a nuestra calculadora de siembra, notificaciones de riego y más para optimizar tu huerta.",
                "Acceder a Herramientas Premium"
            )}
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-8 grid place-items-center">
             {premiumCard(
                "Contenido Avanzado Premium",
                "Desbloquea guías sobre permacultura, salud del suelo y huertas medicinales con tu suscripción.",
                "Desbloquear Contenido Avanzado"
            )}
        </TabsContent>
        
        <TabsContent value="community" className="mt-8 grid place-items-center">
            {premiumCard(
                "Comunidad Premium EcoRastro",
                "Únete a foros exclusivos, participa en talleres y conecta con otros hortelanos expertos.",
                "Unirse a la Comunidad"
            )}
        </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
