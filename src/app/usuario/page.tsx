
'use client';
import Link from 'next/link';
import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reportedPets } from "@/lib/data";
import ReportedPetCard from "@/components/reported-pet-card";
import { PawPrint, Sprout, MessageSquare } from "lucide-react";
import { EditProfileDialog } from "@/components/edit-profile-dialog";

export default function UserProfilePage() {

    // Estado del usuario que puede ser modificado por el diálogo de edición
    const [user, setUser] = useState({
        firstName: "Juan",
        lastName: "Pérez",
        rut: "12.345.678-9",
        email: "juan.perez@example.com",
        memberSince: "2023-05-15",
        avatarUrl: "https://github.com/shadcn.png"
    });

    // Datos de ejemplo para las mascotas reportadas por el usuario
    const userReports = reportedPets.slice(0, 2);
    // Contador de ejemplo para las huertas (será dinámico en el futuro)
    const gardenPublicationsCount = 0;
    
    // Función para actualizar el estado del usuario desde el diálogo
    const handleProfileUpdate = (updatedData: Partial<typeof user>) => {
        setUser(currentUser => ({...currentUser, ...updatedData}));
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            
            {/* Encabezado del Perfil */}
            <header className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
                    <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">Miembro desde {new Date(user.memberSince).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })}</p>
                </div>
                <div className="md:ml-auto flex items-center gap-4">
                    <Button
                        className="rounded-lg bg-primary text-white hover:bg-primary/90"
                        asChild
                    >
                        <Link href="/mensajes">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Mensajes
                        </Link>
                    </Button>
                    <EditProfileDialog user={user} onSaveChanges={handleProfileUpdate} />
                    <Button asChild>
                        <Link href="/mensajes">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Mis Mensajes
                        </Link>
                    </Button>
                </div>
            </header>

            {/* Sección de Contadores */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card className="flex flex-col items-center justify-center p-6 bg-secondary/10">
                    <CardTitle className="text-4xl font-bold">{userReports.length}</CardTitle>
                    <p className="text-muted-foreground mt-2">Publicaciones de Mascotas</p>
                </Card>
                <Card className="flex flex-col items-center justify-center p-6 bg-secondary/10">
                    <CardTitle className="text-4xl font-bold">{gardenPublicationsCount}</CardTitle>
                    <p className="text-muted-foreground mt-2">Publicaciones de Huertas</p>
                </Card>
            </section>

            {/* Contenido Principal con Pestañas para Mascotas y Huertas */}
            <main>
                <Tabs defaultValue="mascotas" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto mb-8">
                        <TabsTrigger value="mascotas">
                            <PawPrint className="mr-2 h-4 w-4" />
                            Mis Mascotas
                        </TabsTrigger>
                        <TabsTrigger value="huertas">
                            <Sprout className="mr-2 h-4 w-4" />
                            Mis Huertas
                        </TabsTrigger>
                    </TabsList>

                    {/* Pestaña de Mascotas */}
                    <TabsContent value="mascotas">
                        <Card>
                            <CardHeader>
                                <CardTitle>Publicaciones de Mascotas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userReports.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {userReports.map(pet => (
                                            <ReportedPetCard key={pet.id} pet={pet} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <p>Aún no has realizado publicaciones sobre mascotas.</p>
                                        <Button variant="link" className="mt-2">Crear una nueva publicación</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Pestaña de Huertas */}                    <TabsContent value="huertas">
                         <Card>
                            <CardHeader>
                                <CardTitle>Publicaciones de Huertas</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center py-12 text-muted-foreground">
                                <p>Aún no has realizado publicaciones sobre huertas.</p>
                                <p className="text-sm">Aquí aparecerán las huertas que registres en la comunidad.</p>
                                <Button variant="link" className="mt-2">Crear una nueva publicación</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
