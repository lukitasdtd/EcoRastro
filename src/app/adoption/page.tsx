import AdoptionCard from "@/components/adoption-card";
import { adoptionPets } from "@/lib/data";

export default function AdoptionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Encuentra a tu Nuevo Mejor Amigo</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Estas maravillosas mascotas están buscando un hogar lleno de amor. ¿Podría ser el tuyo?
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
