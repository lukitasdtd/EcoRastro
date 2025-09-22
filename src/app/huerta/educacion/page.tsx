
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sprout, Sun, Droplets, Bug, Recycle, Lightbulb, ArrowRight, MapPin, CalendarDays, Search, BookOpen, Tractor, Microscope, Wind, Heart, Calculator, Bell, Gamepad, Users, Leaf, CheckSquare, Flower2
} from 'lucide-react';

export default function HuertaEducationPage() {

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
  
  const gardenTypes = [
    {
      title: "Huerta Urbana",
      description: "Aprovecha al máximo los espacios pequeños en la ciudad, como balcones, terrazas o patios.",
      icon: <Tractor className="w-10 h-10 text-primary" />,
    },
    {
      title: "Huerta Vertical",
      description: "Cultiva hacia arriba usando paredes o estructuras para maximizar tu producción en espacios limitados.",
      icon: <Sprout className="w-10 h-10 text-primary" />,
    },
    {
      title: "Hidroponía",
      description: "Cultiva plantas sin suelo, usando soluciones minerales en agua. Ideal para interiores y control total del ambiente.",
      icon: <Droplets className="w-10 h-10 text-primary" />,
    },
    {
      title: "Huerta Comunitaria",
      description: "Únete a un espacio colectivo para cultivar alimentos, compartir conocimientos y fortalecer la comunidad.",
      icon: <Users className="w-10 h-10 text-primary" />,
    },
  ];

  const gardenBenefits = [
      {
        title: "Nutrición y Salud",
        description: "Consume alimentos frescos, sin pesticidas y llenos de nutrientes.",
        icon: <Heart className="w-8 h-8 text-primary" />,
      },
      {
        title: "Bienestar Mental",
        description: "Reduce el estrés, mejora el ánimo y conecta con la naturaleza.",
        icon: <Sun className="w-8 h-8 text-primary" />,
      },
      {
        title: "Economía y Ahorro",
        description: "Ahorra dinero en el supermercado cultivando tus propias verduras y hierbas.",
        icon: <Recycle className="w-8 h-8 text-primary" />,
      },
      {
        title: "Biodiversidad",
        description: "Atrae polinizadores como abejas y mariposas, creando un pequeño ecosistema.",
        icon: <Bug className="w-8 h-8 text-primary" />,
      }
  ]

  const lifeCycle = [
      { title: "Semilla", icon: <Lightbulb className="w-8 h-8 mx-auto text-primary"/>, description: "El punto de partida. Contiene toda la información genética para crear una nueva planta." },
      { title: "Germinación", icon: <Sprout className="w-8 h-8 mx-auto text-primary"/>, description: "La semilla 'despierta' con agua y calor, desarrollando sus primeras raíces y brotes." },
      { title: "Crecimiento", icon: <Leaf className="w-8 h-8 mx-auto text-primary"/>, description: "La planta desarrolla hojas, tallos y raíces, realizando la fotosíntesis para alimentarse." },
      { title: "Cosecha", icon: <Tractor className="w-8 h-8 mx-auto text-primary"/>, description: "Recolectamos los frutos, hojas o raíces en su punto óptimo de madurez y sabor." },
      { title: "Compostaje", icon: <Recycle className="w-8 h-8 mx-auto text-primary"/>, description: "Los restos de la planta se descomponen para convertirse en abono y nutrir futuras siembras." },
  ]
  
  const stepByStepGuides = [
    { 
        id: "suelo", 
        title: "Preparación del suelo", 
        icon: <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Leaf className="w-6 h-6 text-primary"/></div>,
        content: "Un buen suelo es la base de todo. Mezcla tierra de hojas con compost o humus de lombriz para asegurar una base rica en nutrientes. Un buen drenaje es clave; puedes agregar perlita o arena gruesa."
    },
    { 
        id: "siembra", 
        title: "Siembra y trasplante", 
        icon: <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Sprout className="w-6 h-6 text-primary"/></div>,
        content: "Revisa la profundidad recomendada para cada semilla, generalmente es 2-3 veces su tamaño. Al trasplantar, hazlo en un día nublado o al atardecer para evitar el estrés por calor. Consulta nuestro calendario de siembra para saber qué plantar cada mes."
    },
    { 
        id: "cuidados", 
        title: "Cuidado de las plantas", 
        icon: <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Droplets className="w-6 h-6 text-primary"/></div>,
        content: "Riega de forma profunda pero no tan frecuente. La poda ayuda a dar fuerza a la planta y a mejorar la ventilación. Para plagas, empieza con remedios naturales como jabón potásico o aceite de neem."
    },
    { 
        id: "cosecha", 
        title: "Cosecha y almacenamiento", 
        icon: <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Tractor className="w-6 h-6 text-primary"/></div>,
        content: "Cosecha por la mañana para obtener productos más frescos y crujientes. Investiga cómo se ve cada vegetal cuando está maduro. Almacena en lugares frescos y secos para prolongar su duración."
    },
  ]

  const interactiveTools = [
      { title: "Calculadora de Siembra", icon: <Calculator />, description: "Descubre qué y cuándo plantar según tu zona." },
      { title: "Recordatorios de Cuidado", icon: <Bell />, description: "Recibe notificaciones para regar, fertilizar y más." },
      { title: "Seguimiento de Huerta", icon: <BookOpen />, description: "Registra tu progreso con fotos y notas." },
      { title: "Logros y Recompensas", icon: <Gamepad />, description: "Completa tareas y gana insignias por tus logros." },
  ]
  
  const advancedContent = [
    { id: "permacultura", title: "Permacultura y Sostenibilidad", content: "Diseña ecosistemas agrícolas sostenibles, eficientes y resilientes. Aprende sobre la rotación de cultivos, asociación de plantas y el uso eficiente del agua." },
    { id: "microorganismos", title: "Microorganismos y Salud del Suelo", content: "Descubre el universo bajo tus pies. Hongos micorrícicos, bacterias fijadoras de nitrógeno y lombrices son tus mejores aliados para un suelo vivo y fértil." },
    { id: "medicinales", title: "Huertas Medicinales y Aromáticas", content: "Cultiva tu propia farmacia natural. Plantas como lavanda, menta, manzanilla o romero tienen propiedades curativas y repelen plagas." },
    { id: "impacto", title: "Impacto Ambiental de la Agricultura", content: "Entiende cómo la agricultura a pequeña escala reduce la huella de carbono, disminuye el uso de pesticidas y fomenta la biodiversidad local." },
  ];

  const communityContent = [
      { title: "Foro de Hortelanos", icon: <Users />, description: "Comparte tus éxitos y dudas con otros miembros." },
      { title: "Intercambio de Semillas", icon: <Recycle />, description: "Encuentra y comparte semillas con tu comunidad." },
      { title: "Retos Mensuales", icon: <Gamepad />, description: "Únete a desafíos de cultivo y gana premios." },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* --- Hero --- */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Educación y Cultivo para tu Huerta
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Cultivar tus propios alimentos es una experiencia gratificante. Aquí encontrarás todo lo que necesitas para empezar y llevar tu huerta al siguiente nivel.
        </p>
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
                    <h2 className="text-3xl font-bold text-center mb-10">Tipos de Huertas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {gardenTypes.map((type) => (
                        <Card key={type.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-2">
                                {type.icon}
                            </div>
                            <CardTitle className="text-xl">{type.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80">{type.description}</p>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                </section>

                {/* --- Beneficios --- */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-10">Beneficios de la Huerta</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gardenBenefits.map((benefit) => (
                            <Card key={benefit.title} className="p-6 text-center flex flex-col items-center shadow-sm bg-muted/50 border-0">
                                <div className="mb-4">{benefit.icon}</div>
                                <CardTitle className="text-lg font-semibold mb-2">{benefit.title}</CardTitle>
                                <p className="text-sm text-foreground/70">{benefit.description}</p>
                            </Card>
                        ))}
                    </div>
                </section>
                
                {/* --- Ciclo de Vida --- */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-10">Ciclo de Vida de los Cultivos</h2>
                    <div className="relative grid grid-cols-2 md:grid-cols-5 gap-y-8 items-start justify-items-center">
                        {lifeCycle.map((stage, index) => (
                           <React.Fragment key={stage.title}>
                                <div className="text-center w-32">
                                    {stage.icon}
                                    <h3 className="font-bold mt-2">{stage.title}</h3>
                                    <p className="text-xs text-muted-foreground">{stage.description}</p>
                                </div>
                                {index < lifeCycle.length - 1 && (
                                    <div className="absolute top-1/3 left-0 right-0 h-0.5 w-full bg-border -z-10 hidden md:block" style={{ left: `${(100 / lifeCycle.length) / 2}%`, width: `${100 - (100 / lifeCycle.length)}%` }}></div>
                                )}
                           </React.Fragment>
                        ))}
                    </div>
                </section>

                {/* --- Guías Paso a Paso --- */}
                <section>
                     <h2 className="text-3xl font-bold text-center mb-10">Guías Paso a Paso</h2>
                     <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            {stepByStepGuides.map(guide => (
                                <Card key={guide.id} className="shadow-sm border-0">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        {guide.icon}
                                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-foreground/80">{guide.content}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Card className="shadow-lg rounded-2xl sticky top-24">
                            <CardHeader>
                                <CardTitle>Checklist del Hortelano</CardTitle>
                                <CardDescription>Todo lo que necesitas para empezar tu huerta con el pie derecho.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {["Sustrato y Compost", "Macetas o Contenedores", "Semillas o Almácigos", "Pala y Rastrillo pequeños", "Regadera o Manguera"].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckSquare className="w-5 h-5 text-primary" />
                                        <span className="text-foreground/90">{item}</span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    Descargar Checklist PDF
                                </Button>
                            </CardFooter>
                        </Card>
                     </div>
                </section>
            </div>
        </TabsContent>

        {/* --- HERRAMIENTAS --- */}
        <TabsContent value="tools" className="mt-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Herramientas Interactivas</h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/60 mb-10">
                Potencia tu experiencia de cultivo con estas herramientas inteligentes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {interactiveTools.map(tool => (
                    <Card key={tool.title} className="p-6 flex flex-col items-center justify-center text-center bg-muted/30">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                            {React.cloneElement(tool.icon, { className: "w-8 h-8" })}
                        </div>
                        <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground flex-grow">{tool.description}</p>
                        <Button variant="outline" className="mt-4 w-full" disabled>Próximamente</Button>
                    </Card>
                ))}
            </div>
        </TabsContent>
        
        {/* --- CONTENIDO AVANZADO --- */}
        <TabsContent value="advanced" className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-10">Contenido Avanzado</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
                {advancedContent.map(item => (
                    <AccordionItem key={item.id} value={item.id} className="bg-muted/50 rounded-2xl px-6 border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.title}</AccordionTrigger>
                        <AccordionContent className="text-base text-foreground/80 pb-6">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </TabsContent>
        
        {/* --- COMUNIDAD --- */}
        <TabsContent value="community" className="mt-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Únete a la Comunidad</h2>
             <p className="max-w-2xl mx-auto text-lg text-foreground/60 mb-10">
                Conecta, comparte y aprende con otros apasionados por las huertas.
            </p>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {communityContent.map(item => (
                    <Card key={item.title} className="p-6 flex flex-col items-center justify-center text-center bg-muted/30">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                            {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                        </div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground flex-grow">{item.description}</p>
                        <Button variant="secondary" className="mt-4 w-full" disabled>Ir</Button>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    