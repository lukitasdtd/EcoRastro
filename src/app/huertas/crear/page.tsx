'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function CreateGardenPage() {
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [calle, setCalle] = useState('');
    const [comuna, setComuna] = useState('');
    const [region, setRegion] = useState('');
    const [contEmail, setContEmail] = useState('');
    const [contTel, setContTel] = useState('');
    const [image, setImage] = useState<File | null>(null);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!image) {
            setError("Por favor, selecciona una imagen para la huerta.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('direccion', calle); // El backend espera 'direccion' para la calle
        formData.append('comuna', comuna);
        formData.append('region', region);
        formData.append('cont_email', contEmail);
        formData.append('cont_tel', contTel);
        formData.append('gardenImage', image);

        try {
            const response = await fetch('http://localhost:3001/api/gardens/create', {
                method: 'POST',
                headers: {
                    // El token JWT debe ser obtenido de forma segura (ej. desde el contexto de autenticación)
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Ocurrió un error al crear la huerta.');
            }
        } catch (err) {
            setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Crea una Nueva Huerta</h1>
            
            {success ? (
                <div className="text-center p-6 bg-green-100 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-green-800">¡Huerta creada con éxito!</h2>
                    <p className="mt-2 text-gray-700">Tu huerta ha sido añadida a nuestra comunidad.</p>
                    <Button onClick={() => router.push('/huertas')} className="mt-6">Ver todas las huertas</Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-lg shadow-md">
                    <div>
                        <Label htmlFor="nombre">Nombre de la Huerta</Label>
                        <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ej: Huerta El Sol" />
                    </div>

                    <div>
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required placeholder="Describe la huerta, su propósito, qué se cultiva, etc." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="calle">Dirección (Calle y Número)</Label>
                            <Input id="calle" value={calle} onChange={(e) => setCalle(e.target.value)} required placeholder="Ej: Av. Principal 123" />
                        </div>
                        <div>
                            <Label htmlFor="comuna">Comuna</Label>
                            <Input id="comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} required placeholder="Ej: Providencia" />
                        </div>
                    </div>
                    
                    <div>
                        <Label htmlFor="region">Región</Label>
                        <Input id="region" value={region} onChange={(e) => setRegion(e.target.value)} required placeholder="Ej: Metropolitana" />
                    </div>

                    <hr/>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="contEmail">Email de Contacto (Opcional)</Label>
                            <Input id="contEmail" type="email" value={contEmail} onChange={(e) => setContEmail(e.target.value)} placeholder="ejemplo@correo.com" />
                        </div>
                        <div>
                            <Label htmlFor="contTel">Teléfono de Contacto (Opcional)</Label>
                            <Input id="contTel" type="tel" value={contTel} onChange={(e) => setContTel(e.target.value)} placeholder="+56912345678" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="image">Imagen de la Huerta</Label>
                        <Input id="image" type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required accept="image/*" />
                    </div>
                    
                    <Button type="submit" className="w-full !mt-8 py-3" disabled={loading}>
                        {loading ? 'Creando Huerta...' : 'Crear Huerta'}
                    </Button>
                    
                    {error && <p className="text-red-600 bg-red-100 p-3 rounded-md text-center mt-4">{error}</p>}
                </form>
            )}
        </div>
    );
}
