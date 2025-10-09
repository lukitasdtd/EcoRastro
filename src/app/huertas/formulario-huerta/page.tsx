      import { FormularioHuerta } from "@/components/formulario-huerta";
      import type { Metadata } from 'next';
      import { Logo } from "@/components/logo";
      
      export const metadata: Metadata = {
        title: 'Formulario para registrar una huerta',
      };
      
      export default function FormularioHuertaPage() {
       return (
         <div className="bg-muted/30 flex-grow">
             <div className="container mx-auto px-4 py-8 md:py-16">
                 <header className="text-center mb-6">
                     <div className="inline-block mx-auto mb-4">
                         <Logo />
                     </div>
                     <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                     Formulario de Huerta
                     </h1>
                 </header>
                 
                 <main>
                     <FormularioHuerta />
                 </main>
             </div>
         </div>
       );
     }
