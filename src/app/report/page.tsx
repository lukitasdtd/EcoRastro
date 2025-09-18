import { ReportForm } from "@/components/report-form";

export default function ReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Reportar una Mascota Perdida o Encontrada</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          Ayuda a reunir a las mascotas con sus dueños. Tu reporte será resumido al instante y agregado a nuestro mapa comunitario.
        </p>
      </section>
      
      <ReportForm />
    </div>
  );
}
