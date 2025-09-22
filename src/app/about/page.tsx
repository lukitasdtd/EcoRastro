// TAREA 5: Proyecto Base React - Componentes
// Este archivo demuestra la creación de un componente de React para la página "Acerca de Nosotros".
// Cumple con los siguientes requisitos del sprint:
// - Es un componente de React funcional, no una página HTML estática (Punto 5).
// - Utiliza componentes reutilizables de ShadCN/UI como Card, lo que demuestra la modularidad (Punto 6).
// - El diseño es responsivo gracias a las clases de Tailwind CSS (ej. `grid`, `md:grid-cols-2`), cumpliendo con el avance en responsividad (Punto 4).
// - Renderiza dinámicamente una lista de miembros del equipo a partir de un array, una práctica común en React.

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Users, Target, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  // Se busca la imagen de héroe desde un archivo de datos centralizado.
  const heroImage = PlaceHolderImages.find(img => img.id === 'garden1');

  // Se define un array de objetos para los miembros del equipo.
  // Esto permite renderizar la sección dinámicamente usando `map`.
  const teamMembers = [
    { name: 'Javiera López', role: 'Miembro del Equipo' },
    { name: 'Geraldine Garces', role: 'Miembro del Equipo' },
    { name: 'Diego Alfaro', role: 'Miembro del Equipo' },
    { name: 'Carolina Fernandez', role: 'Miembro del Equipo' },
    { name: 'Angelo Jimenez', role: 'Miembro del Equipo' },
  ];

  // La estructura de la página utiliza JSX, que es similar a HTML pero permite incrustar lógica de JavaScript.
  return (
    <div className="flex flex-col">
      {/* --- Sección Héroe --- */}
      {/* El uso de `relative` y `absolute` es una técnica estándar para superponer texto sobre una imagen. */}
      <section className="relative w-full h-80 bg-secondary/30">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill // `fill` hace que la imagen cubra todo el contenedor padre.
            style={{ objectFit: 'cover' }} // `object-fit` asegura que la imagen no se deforme.
            className="brightness-75" // Clase de Tailwind para oscurecer la imagen y mejorar la legibilidad del texto.
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre EcoRastro
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Conectando comunidades para un futuro más verde y solidario.
          </p>
        </div>
      </section>

      {/* --- Sección Misión y Visión --- */}
      {/* Se utiliza `grid` y `md:grid-cols-2` para crear un diseño de dos columnas en pantallas medianas y grandes, y una sola columna en móviles. */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-foreground/80 text-lg mb-6">
              Facilitar la conexión entre personas, mascotas y la naturaleza a través de una plataforma tecnológica que promueve la adopción, el cuidado de mascotas perdidas y la agricultura urbana sostenible. Buscamos fortalecer los lazos comunitarios y proteger nuestros ecosistemas locales.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
             {/* Se reutiliza el componente `Card` para mostrar la Visión y los Valores. */}
             <Card>
              <CardHeader className="flex-row items-center gap-4">
                <Target className="w-8 h-8 text-primary" />
                <CardTitle>Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">Ser la plataforma líder que inspire y movilice a las comunidades a crear entornos más conscientes, empáticos y ecológicos.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex-row items-center gap-4">
                <Leaf className="w-8 h-8 text-primary" />
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>Comunidad</li>
                    <li>Sostenibilidad</li>
                    <li>Empatía</li>
                    <li>Innovación</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Sección Equipo --- */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Conoce al Equipo</h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 mb-12">
            Somos un grupo apasionado por la tecnología y el impacto social positivo.
          </p>
          {/* Diseño de cuadrícula responsiva para los miembros del equipo. */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {/* Se itera sobre el array `teamMembers` con `.map()` para renderizar una tarjeta por cada miembro. */}
            {teamMembers.map((member) => {
              // Lógica para separar nombre y apellido.
              const nameParts = member.name.split(' ');
              const firstName = nameParts[0];
              const lastName = nameParts.slice(1).join(' ');
              return (
                <Card key={member.name} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl leading-tight">
                      {firstName}
                      <br />
                      {lastName}
                    </CardTitle>
                    <p className="text-primary font-semibold mt-1">{member.role}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}