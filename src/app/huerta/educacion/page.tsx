

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sprout, Sun, Droplets, Bug, Recycle, Lightbulb, MapPin, Search, BookOpen, Tractor, Users, Leaf, CheckSquare, Heart
} from 'lucide-react';

export default function HuertaEducationPage() {

  const gardenTypes = [
    {
      title: "Huerta Urbana",
      description: "Aprovecha al máximo los espacios pequeños en la ciudad, como balcones, terrazas o patios. Ideal para cultivar en macetas, jardineras o mesas de cultivo. Es el punto de partida perfecto para principiantes.",
      icon: <Tractor className="w-10 h-10 text-primary" />,
    },
    {
      title: "Huerta Vertical",
      description: "Cultiva hacia arriba usando paredes o estructuras para maximizar tu producción en espacios limitados. Perfecto para hierbas aromáticas, frutillas y hortalizas de hoja como lechugas.",
      icon: <Sprout className="w-10 h-10 text-primary" />,
    },
    {
      title: "Hidroponía",
      description: "Cultiva plantas sin suelo, usando soluciones minerales en agua. Es una técnica de alta eficiencia ideal para interiores y para un control total sobre los nutrientes y el ambiente de las plantas.",
      icon: <Droplets className="w-10 h-10 text-primary" />,
    },
    {
      title: "Huerta Comunitaria",
      description: "Únete a un espacio colectivo para cultivar alimentos, compartir conocimientos y fortalecer lazos con tus vecinos. Una gran forma de aprender en grupo y acceder a un terreno más grande.",
      icon: <Users className="w-10 h-10 text-primary" />,
    },
  ];

  const gardenBenefits = [
      {
        title: "Nutrición y Salud",
        description: "Consume alimentos frescos, sin pesticidas y llenos de nutrientes. Sabrás exactamente qué estás comiendo y mejorarás tu dieta.",
        icon: <Heart className="w-8 h-8 text-primary" />,
      },
      {
        title: "Bienestar Mental",
        description: "La jardinería es una terapia probada. Reduce el estrés, mejora el ánimo, aumenta la concentración y te conecta con la naturaleza y sus ciclos.",
        icon: <Sun className="w-8 h-8 text-primary" />,
      },
      {
        title: "Economía y Ahorro",
        description: "Ahorra dinero en el supermercado cultivando tus propias verduras, hierbas y frutas. ¡Y el sabor de lo recién cosechado no tiene comparación!",
        icon: <Recycle className="w-8 h-8 text-primary" />,
      },
      {
        title: "Biodiversidad",
        description: "Atrae polinizadores como abejas y mariposas a tu jardín, creando un pequeño ecosistema que beneficia al entorno urbano y apoya la flora local.",
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
        content: "Un buen suelo es la base de todo. Mezcla tierra de hojas con compost o humus de lombriz para asegurar una base rica en nutrientes y con buena aireación. Un buen drenaje es clave; si cultivas en macetas, asegúrate de que tengan agujeros y puedes agregar una capa de gravilla al fondo. Para tierra de jardín, considera camas de cultivo elevadas si el drenaje es malo."
    },
    { 
        id: "siembra", 
        title: "Siembra y trasplante", 
        icon: <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Sprout className="w-6 h-6 text-primary"/></div>,
        content: "Revisa la profundidad recomendada para cada semilla; una regla general es enterrarla a una profundidad de 2-3 veces su tamaño. Para almácigos, usa bandejas con sustrato liviano. Al trasplantar, hazlo en un día nublado o al atardecer para evitar el estrés por calor en la planta. Riega bien después del trasplante. Consulta nuestro calendario de siembra para saber qué plantar cada mes."
    },
    { 
        id: "cuidados", 
        title: "Cuidado de las plantas", 
        icon: <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Droplets className="w-6 h-6 text-primary"/></div>,
        content: "El riego debe ser profundo pero no demasiado frecuente, es mejor regar bien un par de veces por semana que un poco todos los días. La poda de hojas viejas o enfermas ayuda a dar fuerza a la planta y a mejorar la ventilación. Para las plagas, empieza con remedios naturales como jabón potásico, aceite de neem o introduciendo insectos beneficiosos como las chinitas."
    },
    { 
        id: "cosecha", 
        title: "Cosecha y almacenamiento", 
        icon: <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Tractor className="w-6 h-6 text-primary"/></div>,
        content: "Cosecha por la mañana, cuando las plantas están más hidratadas y frescas. Investiga cómo se ve cada vegetal cuando está maduro para cosechar en su punto óptimo de sabor. Para almacenar, las hortalizas de hoja se conservan bien en el refrigerador en bolsas perforadas, mientras que las de raíz como zanahorias o papas prefieren lugares frescos, oscuros y secos."
    },
  ]

  const checklistItems = [
    "Sustrato y Compost de buena calidad", 
    "Macetas, jardineras o contenedores con buen drenaje", 
    "Semillas o almácigos de tus cultivos preferidos", 
    "Pala y rastrillo pequeños", 
    "Regadera o manguera con pistola de riego suave", 
    "Guantes de jardinería para proteger tus manos", 
    "Tijeras de podar para mantenimiento y cosecha",
    "Etiquetas para identificar lo que siembras"
  ];

  const comingSoonCard = (title: string, description: string) => (
    <Card className="text-center p-8 flex flex-col items-center justify-center bg-muted/50 border-dashed h-full">
        <CardHeader>
            <CardTitle className="text-2xl text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
            <Button variant="secondary" disabled>Próximamente</Button>
        </CardFooter>
    </Card>
  )

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
                     <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
                        {stepByStepGuides.map(guide => (
                            <AccordionItem key={guide.id} value={guide.id} className="bg-muted/30 rounded-lg border px-4">
                                <AccordionTrigger className="text-left hover:no-underline">
                                    <div className="flex items-center gap-4">
                                        {guide.icon}
                                        <h3 className="text-xl font-semibold">{guide.title}</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-4 text-base text-foreground/80">
                                    {guide.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        <AccordionItem value="checklist" className="bg-muted/30 rounded-lg border px-4">
                            <AccordionTrigger className="text-left hover:no-underline">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><CheckSquare className="w-6 h-6 text-primary"/></div>
                                    <h3 className="text-xl font-semibold">Checklist del Hortelano</h3>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 text-base">
                                <CardDescription>Todo lo que necesitas para empezar tu huerta con el pie derecho.</CardDescription>
                                <div className="space-y-3 mt-4">
                                    {checklistItems.map(item => (
                                        <div key={item} className="flex items-center gap-3">
                                            <CheckSquare className="w-5 h-5 text-primary" />
                                            <span className="text-foreground/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-6">
                                    Descargar Checklist PDF
                                </Button>
                            </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                </section>
            </div>
        </TabsContent>

        {/* --- HERRAMIENTAS --- */}
        <TabsContent value="tools" className="mt-8 text-center grid place-items-center">
             {comingSoonCard(
                "Herramientas Interactivas",
                "Estamos construyendo herramientas como una calculadora de siembra y notificaciones para ayudarte a tener éxito en tu huerta."
            )}
        </TabsContent>
        
        {/* --- CONTENIDO AVANZADO --- */}
        <TabsContent value="advanced" className="mt-8 grid place-items-center">
             {comingSoonCard(
                "Contenido Avanzado",
                "Pronto encontrarás guías sobre permacultura, salud del suelo, huertas medicinales y mucho más para llevar tu conocimiento al siguiente nivel."
            )}
        </TabsContent>
        
        {/* --- COMUNIDAD --- */}
        <TabsContent value="community" className="mt-8 text-center grid place-items-center">
            {comingSoonCard(
                "Comunidad EcoRastro",
                "Estamos creando un espacio para que puedas conectar con otros hortelanos, compartir tus logros y resolver dudas en comunidad."
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
