'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FormularioHuerta } from "@/components/formulario-huerta";
import { LoginDialog } from '@/components/login-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Metadata se mantiene para el SEO
// export const metadata: Metadata = {
//   title: 'Registrar una Huerta',
// };

export default function FormularioHuertaPage() {
    const [isClient, setIsClient] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    useEffect(() => {
        // Se ejecuta solo en el navegador
        setIsClient(true);
    }, []);

    // Mientras no estemos seguros de estar en el cliente, no renderizamos nada
    // para evitar errores de hidratacion con localStorage.
    if (!isClient) {
        return null;
    }

    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <div className="bg-muted/30 flex-grow">
            <div className="container mx-auto px-4 py-8 md:py-16">
                <header className="text-center mb-6">
                    <div className="inline-block mx-auto mb-4">
                        <Image
                            src="/favicon3.png"
                            alt="EcoRastro Logo"
                            width={240}
                            height={124}
                            priority
                            className="h-28 w-auto mt-2"
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Formulario de Huerta
                    </h1>
                </header>

                <main>
                    {isAuthenticated ? (
                        // Si el usuario esta autenticado, muestra el formulario
                        <FormularioHuerta />
                    ) : (
                        // Si no, muestra el mensaje de acceso restringido y el dialogo
                        <>
                            <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
                            <Card className="w-full max-w-2xl mx-auto my-8 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Acceso Restringido</CardTitle>
                                    <CardDescription>Debes iniciar sesión para poder registrar una huerta.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full" onClick={() => setIsLoginDialogOpen(true)}>
                                        Iniciar Sesión para Publicar
                                    </Button>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
