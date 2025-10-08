'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserProfile {
    firstName: string;
    lastName: string;
    rut: string;
    email: string;
}

interface EditProfileDialogProps {
    user: UserProfile;
    onSaveChanges: (updatedUser: Partial<UserProfile>) => void;
}

export function EditProfileDialog({ user, onSaveChanges }: EditProfileDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State to control if the current password has been verified
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const handlePasswordVerification = () => {
    // In a real app, you would make an API call here to verify the password.
    // For this simulation, we'll just check if the password field is not empty.
    if (currentPassword) {
      // alert("Contraseña actual verificada."); // Optional: give user feedback
      setIsPasswordVerified(true);
    } else {
      alert("Por favor, ingresa tu contraseña actual.");
    }
  };

  const handleSave = () => {
    if (isPasswordVerified && newPassword && newPassword !== confirmPassword) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }
    
    onSaveChanges({ firstName, lastName, email });
    // Here you would also include the logic to send the new password to the server.
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-11 px-5">Editar Perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Realiza cambios en tu perfil. Haz clic en guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          
          {/* User Profile Fields */}
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rut">RUT</Label>
            <Input id="rut" value={user.rut} readOnly className="bg-gray-200 dark:bg-gray-800 cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white" />
          </div>

          <hr className="my-2" />

          {/* Password Change Section */}
          <div>
             <h4 className="font-semibold mb-4">Cambiar Contraseña</h4>
             <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña Actual</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="current-password"
                            type="password"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="bg-white"
                            disabled={isPasswordVerified} // Disable after verification
                        />
                        <Button type="button" variant="secondary" onClick={handlePasswordVerification} disabled={isPasswordVerified}>
                            Verificar
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-white"
                        disabled={!isPasswordVerified} // Disabled until password is verified
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-white"
                        disabled={!isPasswordVerified} // Disabled until password is verified
                    />
                </div>
             </div>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t">
          <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button type="submit" onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
