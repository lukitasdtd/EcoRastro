'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, PawPrint, Bone, Home, FileText, Shield, ArrowRight } from 'lucide-react';

export default function PetEducationPage() {
  // Datos para las tarjetas de tips
  const careTips = [
    {
      icon: <Bone className="h-8 w-8 text-primary" />,
      title: 'Alimentación Balanceada',
      text: 'Proporciona una dieta adecuada a su edad, tamaño y nivel de actividad. El agua fresca y limpia siempre debe estar disponible.',
    },
    {
      icon: <PawPrint className="h-8 w-8 text-primary" />,
      title: 'Ejercicio Diario',
      text: 'El ejercicio regular es crucial para su salud física y mental. Adapta la intensidad y duración a las necesidades de tu mascota.',
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: 'Salud y Prevención',
      text: 'Mantén sus vacunas al día y realiza visitas periódicas al veterinario. La prevención es clave para una vida larga y saludable.',
    },
    {
      icon: <Home className="h-8 w-8 text-primary" />,
      title: 'Afecto y Socialización',
      text: 'El cariño, el juego y la interacción con otras mascotas y personas son fundamentales para su bienestar emocional y comportamiento.',
    },
  ];

  // Datos para las tarjetas de leyes
  const regulations = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Ley Cholito (N° 21.020)',
      text: 'Establece la Tenencia Responsable de Mascotas, obligando a registrar, identificar y esterilizar, además de regular la crianza y venta.',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Maltrato Animal (Código Penal)',
      text: 'El artículo 291 bis del Código Penal sanciona con presidio y multas a quienes cometan actos de maltrato o crueldad con animales.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* --- ENCABEZADO DE LA PÁGINA --- */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Educación y Cuidados para Mascotas
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Ser un dueño responsable es la mayor muestra de amor. Aquí encontrarás información clave para el bienestar de tu compañero.
        </p>
      </section>

      {/* --- SECCIÓN DE TIPS DE CUIDADO --- */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Consejos Fundamentales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {careTips.map((tip) => (
            <Card key={tip.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
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

      {/* --- SECCIÓN DE NORMATIVAS Y LEYES --- */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Normativas Importantes en Chile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {regulations.map((reg) => (
             <Card key={reg.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex-row items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                        {reg.icon}
                    </div>
                    <div>
                        <CardTitle className="text-xl mb-1">{reg.title}</CardTitle>
                        <p className="text-foreground/80">{reg.text}</p>
                    </div>
                </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* --- BOTÓN DE ENLACE EXTERNO --- */}
      <section className="text-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="https://www.tenenciaresponsablemascotas.cl" target="_blank" rel="noopener noreferrer">
            Más Información Oficial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
