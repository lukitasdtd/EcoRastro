import { GardenFinder } from "@/components/garden-finder";

export default function GardensPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Descubre Jardines Comunitarios</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          Conéctate con cultivadores locales, encuentra una parcela para cultivar y comparte la cosecha.
        </p>
      </section>
      
      <GardenFinder />
    </div>
  );
}
