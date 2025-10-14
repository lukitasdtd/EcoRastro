'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Upload, Trash2, Mail, Phone } from 'lucide-react';
import { chileanRegions } from "@/lib/chile-locations";

const huertaSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio."),
    descripcion: z.string().min(1, "La descripción es obligatoria."),
    direccion: z.string().min(1, "La dirección es obligatoria."),
    region: z.string({ required_error: "Por favor selecciona una región." }),
    comuna: z.string({ required_error: "Por favor selecciona una comuna." }),
    gardenImage: z.any().refine(file => file, "La imagen es requerida."),
    cont_email: z.string().email({ message: "Debe ser un correo válido." }).optional().or(z.literal('')),
    cont_tel: z.string().optional().or(z.literal('')),
});

type HuertaFormValues = z.infer<typeof huertaSchema>;

export function FormularioHuerta() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [communes, setCommunes] = useState<string[]>([]);

    const form = useForm<HuertaFormValues>({
        resolver: zodResolver(huertaSchema),
        mode: 'onChange',
        defaultValues: {
            nombre: '',
            descripcion: '',
            direccion: '',
            cont_email: '',
            cont_tel: '',
        }
    });

    const handleRegionChange = (regionName: string) => {
        const region = chileanRegions.find(r => r.name === regionName);
        setCommunes(region ? region.communes : []);
        form.setValue('comuna', "");
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setImageFile(file);
            form.setValue('gardenImage', file, { shouldValidate: true });
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, [form]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/jpeg': [], 'image/png': [] }, maxSize: 5242880, maxFiles: 1, multiple: false });

    const removeFile = () => { setImagePreview(null); setImageFile(null); form.setValue('gardenImage', null, { shouldValidate: true }); };

    async function onSubmit(data: HuertaFormValues) {
        const token = localStorage.getItem('authToken');
        if (!token) {
            toast({ variant: 'destructive', title: 'Error de Autenticación', description: 'No se encontró tu sesión. Por favor, recarga la página.' });
            return;
        }
        if (!imageFile) {
            form.setError("gardenImage", { type: "manual", message: "La imagen es requerida." });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();

        formData.append('nombre', data.nombre);
        formData.append('descripcion', data.descripcion);
        formData.append('direccion', data.direccion);
        formData.append('comuna', data.comuna);
        formData.append('region', data.region);
        formData.append('gardenImage', imageFile);
        formData.append('cont_email', data.cont_email || '');
        formData.append('cont_tel', data.cont_tel || '');

        try {
            const response = await fetch('/api/gardens/create', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la respuesta del servidor');
            }

            const nuevaHuerta = await response.json();
            toast({ title: "¡Huerta registrada con éxito!", description: `La huerta "${nuevaHuerta.nombre}" ha sido guardada.` });
            router.push('/huertas');
        } catch (error: any) {
            console.error("Error al enviar el formulario:", error);
            toast({ variant: 'destructive', title: "Publicación fallida", description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <Card className="w-full max-w-2xl mx-auto my-8 shadow-lg">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardHeader><CardTitle className="mb-2">Publicar Nueva Huerta</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <FormField control={form.control} name="nombre" render={({ field }) => (<FormItem> <FormLabel>Nombre de la huerta</FormLabel> <FormControl><Input placeholder="Ej: La huerta de María" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
                        <FormField control={form.control} name="descripcion" render={({ field }) => (<FormItem> <FormLabel>Descripción</FormLabel> <FormControl><Textarea placeholder="Describe tu huerta, qué la hace especial..." {...field} /></FormControl> <FormMessage /> </FormItem>)} />

                        <div className="space-y-6 rounded-md border p-6">
                            <h3 className="font-semibold">Ubicación</h3>
                            <FormField control={form.control} name="direccion" render={({ field }) => (<FormItem> <FormLabel>Dirección</FormLabel> <FormControl><Input placeholder="Ej: Av. Siempre Viva 123" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="region" render={({ field }) => (<FormItem> <FormLabel>Región</FormLabel> <Select onValueChange={(value) => { field.onChange(value); handleRegionChange(value); }} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger></FormControl> <SelectContent>{chileanRegions.map(r => (<SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>))}</SelectContent> </Select> <FormMessage /> </FormItem>)} />
                                <FormField control={form.control} name="comuna" render={({ field }) => (<FormItem> <FormLabel>Comuna</FormLabel> <Select onValueChange={field.onChange} value={field.value} disabled={!communes.length}> <FormControl><SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger></FormControl> <SelectContent>{communes.map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent> </Select> <FormMessage /> </FormItem>)} />
                            </div>
                        </div>

                        <div className="space-y-6 rounded-md border p-6">
                            <h3 className="font-semibold">Datos de Contacto (Opcional)</h3>
                            <FormDescription>Esta información se mostrará públicamente en la página de la huerta.</FormDescription>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="cont_email" render={({ field }) => (<FormItem> <FormLabel className='flex items-center'> <Mail className='mr-2 h-4 w-4' /> Email</FormLabel> <FormControl><Input type="email" placeholder="tu@correo.com" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
                                <FormField control={form.control} name="cont_tel" render={({ field }) => (<FormItem> <FormLabel className='flex items-center'> <Phone className='mr-2 h-4 w-4' /> Teléfono</FormLabel> <FormControl><Input placeholder="+56 9 1234 5678" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
                            </div>
                        </div>

                        <div>
                            <FormLabel>Imagen Principal</FormLabel>
                            <FormDescription className="mb-2">Sube una foto que represente tu huerta (máx 5MB).</FormDescription>
                            <div {...getRootProps()} className={`relative mt-2 flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer ${isDragActive ? 'border-primary' : 'border-input'}`}>
                                <input {...getInputProps()} />
                                {imagePreview ? <img src={imagePreview} alt="Vista previa" className="h-full w-full rounded-lg object-cover" /> : <div className="text-center text-muted-foreground flex flex-col items-center"><Upload className="h-10 w-10 mb-2" /><p>Arrastra una imagen o haz clic</p></div>}
                            </div>
                            {imagePreview && <Button type="button" size="sm" variant="destructive" className="mt-2" onClick={removeFile}><Trash2 className="h-4 w-4 mr-2" />Quitar Imagen</Button>}
                            <FormField control={form.control} name="gardenImage" render={({ field }) => <FormMessage className="mt-2" />} />
                        </div>
                    </CardContent>
                    <CardContent><Button type="submit" disabled={isSubmitting || !form.formState.isValid} className="w-full text-lg font-semibold">{isSubmitting ? <><LoaderCircle className="animate-spin mr-2" /> Publicando...</> : 'Publicar Huerta'}</Button></CardContent>
                </form>
            </Card>
        </Form>
    );
}
