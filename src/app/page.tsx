import InteractiveMap from "@/components/interactive-map";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Welcome to EcoTrack</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          Your community hub for tracking lost pets, discovering local gardens, finding adorable pets for adoption, and planning your planting season.
        </p>
      </section>
      
      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-6 text-primary">Community Activity Map</h2>
        <InteractiveMap />
      </section>
    </div>
  );
}
