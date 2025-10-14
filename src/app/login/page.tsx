'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

//importación de iconos y se agregan los textos correspondientes
export default function LoginPage() {
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

            // Opcional: guardar token o info de sesión en localStorage/sessionStorage
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            localStorage.setItem('userEmail', email); // Guardar el email en lugar del ID

            // Redirigir a la página de perfil del usuario
            router.push('/usuario');

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <Card className="mx-auto max-w-sm w-full shadow-lg border-0">
                <CardHeader className="text-center space-y-2">
                    <div className="inline-block mx-auto">
                        <Logo />
                    </div>
                    <CardTitle className="text-2xl font-bold">Bienvenido de Vuelta</CardTitle>
                    <CardDescription>Ingresa tus datos para acceder a tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
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
                    <div className="mt-4 text-center text-sm">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/signup" className="underline text-primary font-semibold">
                            Regístrate
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
