import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Users, Target, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'garden1');

  const teamMembers = [
    { name: 'Ana González', role: 'Desarrolladora Principal' },
    { name: 'Carlos Valdés', role: 'Diseñador UI/UX' },
    { name: 'Sofía Reyes', role: 'Especialista en Comunidad' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-80 bg-secondary/30">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            style={{ objectFit: 'cover' }}
            className="brightness-75"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Sobre EcoRastro
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Conectando comunidades para un futuro más verde y solidario.
          </p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-foreground/80 text-lg mb-6">
              Facilitar la conexión entre personas, mascotas y la naturaleza a través de una plataforma tecnológica que promueve la adopción, el cuidado de mascotas perdidas y la agricultura urbana sostenible. Buscamos fortalecer los lazos comunitarios y proteger nuestros ecosistemas locales.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
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

      {/* Team Section */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Conoce al Equipo</h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 mb-12">
            Somos un grupo apasionado por la tecnología y el impacto social positivo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-semibold">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
