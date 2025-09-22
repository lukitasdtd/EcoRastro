import { ReportarMascotaForm } from "@/components/reportar-mascota-form";
import type { Metadata } from 'next';
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: 'Formulario para reportar a la mascota',
};

export default function ReportarMascotaPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center mb-8">
        <div className="inline-block mx-auto mb-4">
            <Logo />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Formulario para reportar a la mascota
        </h1>
      </header>
      
      <main>
        <ReportarMascotaForm />
      </main>
    </div>
  );
}
