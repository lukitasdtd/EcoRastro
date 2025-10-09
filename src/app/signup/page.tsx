'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { RutInput } from '@/components/ui/rut-input';
import { validateRut } from '@/lib/rut-validator';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Estados para todos los campos del formulario
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rutValue, setRutValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para la validación del RUT
  const [isRutValid, setIsRutValid] = useState(true);
  const [error, setError] = useState('');

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rut = e.target.value;
    setRutValue(rut);
    
    // Validar solo si el campo no está vacío
    if (rut) {
      setIsRutValid(validateRut(rut));
    } else {
      // Considerar válido si está vacío para no mostrar error al inicio
      setIsRutValid(true); 
    }
  };

  const isFormValid = firstName && lastName && email && password && rutValue && isRutValid;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="mx-auto max-w-sm w-full shadow-lg border-0">
        <CardHeader className="text-center space-y-2">
           <div className="inline-block mx-auto">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Crea tu Cuenta</CardTitle>
          <CardDescription>Únete a la comunidad de EcoRastro hoy</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Nombre</Label>
                <Input 
                  id="first-name" 
                  placeholder="Juan" 
                  required 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Apellido</Label>
                <Input 
                  id="last-name" 
                  placeholder="Pérez" 
                  required 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="rut">RUT</Label>
                <RutInput 
                  id="rut" 
                  required 
                  value={rutValue}
                  onChange={handleRutChange}
                  className={!isRutValid && rutValue ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {!isRutValid && rutValue && <p className="text-xs text-red-500">El RUT ingresado no es válido.</p>}
            </div>
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
            <Button type="submit" className="w-full" disabled={!isFormValid}>
              Crear Cuenta
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="underline text-primary font-semibold">
              Inicia Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
