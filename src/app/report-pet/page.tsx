import { ReportForm } from "@/components/report-form";

export default function ReportPetPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Reportar Mascota</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          Ayuda a reunir a las mascotas con sus dueños. Tu reporte será resumido por nuestra IA y agregado a nuestro mapa comunitario.
        </p>
      </section>
      
      <ReportForm />
    </div>
  );
}
