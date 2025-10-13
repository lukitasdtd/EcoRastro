import { ReportarMascotaForm } from "@/components/reportar-mascota-form";
import type { Metadata } from 'next';
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: 'Formulario para reportar mascota',
};

// se crea la página para reportar mascotas
export default function ReportarMascotaPage() {
  return (
    <div className="bg-muted/30 flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-16">
            <header className="text-center mb-8">
                <div className="inline-block mx-auto mb-4">
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Formulario para reportar mascota
                </h1>
            </header>
            
            <main>
                <ReportarMascotaForm />
            </main>
        </div>
    </div>
  );
}
