'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, Droplets, Trash2, Leaf, ShoppingCart, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function PracticasVerdesPage() {

  const greenPractices = [
    {
      title: "Compostaje: Transforma Residuos en Vida",
      description: "No tires los restos de frutas y verduras. El compostaje los convierte en un abono increíble para tus plantas, reduce la basura y nutre la tierra. Es más fácil de lo que crees.",
      icon: <Recycle className="w-10 h-10 text-primary" />,
      href: "/huerta/educacion"
    },
    {
      title: "Riego Inteligente",
      description: "Riega tus plantas temprano en la mañana o al atardecer para evitar la evaporación. Usa técnicas como el riego por goteo para maximizar cada gota y proteger este recurso vital.",
      icon: <Droplets className="w-10 h-10 text-primary" />,
      href: "/huerta/educacion"
    },
    {
      title: "Reduce, Reutiliza, Recicla",
      description: "El principio fundamental de la sostenibilidad. Antes de comprar, piensa si lo necesitas. Antes de tirar, piensa si puedes darle un nuevo uso. Y si no, recicla correctamente.",
      icon: <Trash2 className="w-10 h-10 text-primary" />,
      href: "#"
    },
    {
      title: "Apoya lo Local",
      description: "Compra alimentos y productos de agricultores y artesanos locales. Reduces la huella de carbono del transporte y fortaleces la economía de tu comunidad.",
      icon: <ShoppingCart className="w-10 h-10 text-primary" />,
      href: "#"
    },
     {
      title: "Prefiere Plantas Nativas",
      description: "En tu jardín o balcón, elige plantas nativas. Están adaptadas al clima local, requieren menos agua y son el hogar y alimento perfecto para la fauna nativa como abejas y aves.",
      icon: <Leaf className="w-10 h-10 text-primary" />,
      href: "/fauna-silvestre"
    },
     {
      title: "Conciencia Energética",
      description: "Pequeños cambios como usar ampolletas de bajo consumo, desenchufar aparatos que no usas y aprovechar la luz natural tienen un gran impacto en el consumo de energía.",
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
      href: "#"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* --- Hero --- */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Prácticas Verdes para un Futuro Sostenible
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Cada pequeña acción cuenta. Descubre cómo puedes integrar hábitos sostenibles en tu vida diaria para cuidar nuestro planeta.
        </p>
      </section>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-10">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="hogar">En Casa</TabsTrigger>
          <TabsTrigger value="huerta">En la Huerta</TabsTrigger>
          <TabsTrigger value="comunidad">En Comunidad</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {greenPractices.map((practice) => (
              <Card key={practice.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {practice.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{practice.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80 text-center">{practice.description}</p>
                </CardContent>
                <CardContent className="flex justify-center">
                    {practice.href !== "#" && (
                        <Button asChild variant="link">
                            <Link href={practice.href}>Aprender más</Link>
                        </Button>
                    )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="hogar" className="text-center">
            <p className="text-muted-foreground">Sección en construcción. ¡Vuelve pronto!</p>
        </TabsContent>
        <TabsContent value="huerta" className="text-center">
             <p className="text-muted-foreground">Sección en construcción. ¡Vuelve pronto!</p>
        </TabsContent>
        <TabsContent value="comunidad" className="text-center">
             <p className="text-muted-foreground">Sección en construcción. ¡Vuelve pronto!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
