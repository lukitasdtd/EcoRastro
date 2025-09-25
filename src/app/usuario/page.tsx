
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reportedPets } from "@/lib/data";
import ReportedPetCard from "@/components/reported-pet-card";
import { Heart, Bell } from "lucide-react";
import { EditProfileDialog } from "@/components/edit-profile-dialog";

export default function UserProfilePage() {

    // Updated user state that can be changed by the dialog
    const [user, setUser] = useState({
        firstName: "Juan",
        lastName: "Pérez",
        rut: "12.345.678-9",
        email: "juan.perez@example.com",
        memberSince: "2023-05-15",
        avatarUrl: "https://github.com/shadcn.png"
    });

    const userReports = reportedPets.slice(0, 2);
    
    // This function will be called by the dialog to update the user state
    const handleProfileUpdate = (updatedData: Partial<typeof user>) => {
        setUser(currentUser => ({...currentUser, ...updatedData}));
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            
            {/* Encabezado del Perfil */}
            <header className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
                    <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">Miembro desde {new Date(user.memberSince).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })}</p>
                </div>
                <div className="md:ml-auto flex gap-2">
                    {/* Replace the old button with the new Dialog component */}
                    <EditProfileDialog user={user} onSaveChanges={handleProfileUpdate} />
                </div>
            </header>

            {/* Contenido Principal con Pestañas - Se elimina la de configuracion */}
            <main>
                <Tabs defaultValue="reports" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto mb-8">
                        <TabsTrigger value="reports">
                            <Bell className="mr-2 h-4 w-4" />
                            Mis Reportes
                        </TabsTrigger>
                        <TabsTrigger value="favorites">
                            <Heart className="mr-2 h-4 w-4" />
                            Mis Favoritos
                        </TabsTrigger>
                    </TabsList>

                    {/* Pestaña de Reportes */}
                    <TabsContent value="reports">
                        <Card>
                            <CardHeader>
                                <CardTitle>Mascotas Reportadas</CardTitle>
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
                                        <p>Aún no has reportado ninguna mascota.</p>
                                        <Button variant="link" className="mt-2">Reportar una mascota</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Pestaña de Favoritos */}
                    <TabsContent value="favorites">
                         <Card>
                            <CardHeader>
                                <CardTitle>Mis Favoritos</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center py-12 text-muted-foreground">
                                <p>Aún no has guardado ningún favorito.</p>
                                <p className="text-sm">Explora las mascotas en adopción o las huertas para agregar a tus favoritos.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
