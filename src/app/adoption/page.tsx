import AdoptionCard from "@/components/adoption-card";
import { adoptionPets } from "@/lib/data";

export default function AdoptionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Find Your New Best Friend</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          These wonderful pets are looking for a loving home. Could it be yours?
        </p>
      </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {adoptionPets.map(pet => (
          <AdoptionCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
