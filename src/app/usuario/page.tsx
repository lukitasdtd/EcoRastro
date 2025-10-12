'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportedPetCard from "@/components/reported-pet-card";
import { PawPrint, Sprout } from "lucide-react";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import type { ReportedPet } from "@/lib/types";
import GardenCard from "@/components/garden-card"; // Asumiendo que este componente existe

// Define un tipo para el estado del usuario para mayor claridad
type UserProfile = {
    firstName: string;
    lastName: string;
    rut: string;
    email: string;
    avatarUrl: string;   // Este campo no viene del backend, usaremos un valor por defecto
};

export default function UserProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [userReports, setUserReports] = useState<ReportedPet[]>([]);
    const [userGardens, setUserGardens] = useState<any[]>([]); // Reemplazar 'any' con el tipo de dato de huerta
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        router.push('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                setError('No se encontró el correo del usuario. Por favor, inicie sesión de nuevo.');
                setLoading(false);
                router.push('/login');
                return;
            }

            try {
                // Obtener datos del usuario por email
                const userResponse = await fetch(`/api/users/email/${userEmail}`);
                if (!userResponse.ok) throw new Error('No se pudo cargar la información del usuario.');
                const userData = await userResponse.json();
                setUser({
                    firstName: userData.nombre,
                    lastName: userData.apellido,
                    email: userData.correo,
                    rut: userData.rut,
                    avatarUrl: "https://github.com/shadcn.png"
                });

                // Obtener mascotas reportadas usando el RUT del usuario obtenido
                const petsResponse = await fetch(`/api/users/${userData.rut}/reported-pets`);
                if (petsResponse.ok) {
                    const pets = await petsResponse.json();
                    setUserReports(pets);
                }

                // Obtener huertas del usuario usando el RUT
                const gardensResponse = await fetch(`/api/users/${userData.rut}/gardens`);
                if (gardensResponse.ok) {
                    const gardens = await gardensResponse.json();
                    setUserGardens(gardens);
                }

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleProfileUpdate = (updatedData: Partial<UserProfile>) => {
        if (user) {
            setUser(currentUser => ({...currentUser!, ...updatedData}));
        }
    };

    if (loading) {
        return <div className="container mx-auto text-center py-12">Cargando perfil...</div>;
    }

    if (error) {
        return <div className="container mx-auto text-center py-12 text-red-500">Error: {error}</div>;
    }

    if (!user) {
        return <div className="container mx-auto text-center py-12">No se encontró el perfil del usuario.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <header className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
                    <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="mt-4 flex items-center gap-2">
                        <EditProfileDialog user={user} onSaveChanges={handleProfileUpdate} />
                        <Button variant="outline" onClick={handleLogout}>Desconectar</Button>
                    </div>
                </div>
            </header>

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

                    <TabsContent value="huertas">
                         <Card>
                            <CardHeader>
                                <CardTitle>Publicaciones de Huertas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userGardens.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {userGardens.map(garden => (
                                            <GardenCard key={garden.id} garden={garden} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <p>Aún no has realizado publicaciones sobre huertas.</p>
                                        <Button variant="link" className="mt-2">Crear una nueva publicación</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
