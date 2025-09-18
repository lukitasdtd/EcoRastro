import InteractiveMap from "@/components/interactive-map";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Bienvenido a EcoTrack</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          Tu centro comunitario para rastrear mascotas perdidas, descubrir jardines locales, encontrar adorables mascotas para adopción y planificar tu temporada de siembra.
        </p>
      </section>
      
      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-6 text-primary">Mapa de Actividad Comunitaria</h2>
        <InteractiveMap />
      </section>
    </div>
  );
}
