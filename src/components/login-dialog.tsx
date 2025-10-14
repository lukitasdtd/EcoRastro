'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function LoginDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email,
                    contrasena: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
            } else {
                throw new Error("El token no fue proporcionado en la respuesta del login.");
            }
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userEmail', email);

            onOpenChange(false); // Cierra el diálogo

            // --- CORRECCIÓN FINAL Y DEFINITIVA ---
            // En lugar de redirigir a otra página, forzamos la recarga de la página actual.
            // Esto asegura que cualquier componente en la página (como el FormularioHuerta)
            // se vuelva a renderizar y compruebe de nuevo el estado de autenticación.
            window.location.reload();

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex justify-center pb-4">
                        <Logo />
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold">Ingresa para Publicar</DialogTitle>
                    <DialogDescription className="text-center">
                        Necesitas iniciar sesión para poder crear una publicación.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-4 py-2">
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@correo.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <Button type="submit" className="w-full">
                            Iniciar Sesión
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
