import InteractiveMap from "@/components/interactive-map";

export default function InteractiveMapPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <section className="text-center w-full max-w-4xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Mapa Interactivo de la Comunidad</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Explora los reportes de mascotas, encuentra huertas comunitarias y descubre puntos de adopción en tu área.
        </p>
      </section>
      
      <div className="w-full max-w-6xl h-[600px]">
        <InteractiveMap />
      </div>
    </div>
  );
}
