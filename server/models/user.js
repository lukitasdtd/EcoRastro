class User {
    constructor(id, nombre, apellido, rut, correo, contrasena) {
        this.id = id;

        // Validaciones básicas para asegurar que los campos esenciales no sean nulos
        if (!nombre) throw new Error('El nombre es obligatorio.');
        if (!apellido) throw new Error('El apellido es obligatorio.');
        if (!rut) throw new Error('El RUT es obligatorio.');
        if (!correo) throw new Error('El correo es obligatorio.');
        if (!contrasena) throw new Error('La contraseña es obligatoria.');

        // Asignación de propiedades
        this.nombre = String(nombre);
        this.apellido = String(apellido);
        this.rut = String(rut);
        this.correo = String(correo);
        // IMPORTANTE: En una aplicación real, la contraseña nunca se guarda como texto plano.
        // Debería ser "hasheada" (cifrada de forma irreversible) antes de llegar aquí.
        this.contrasena = String(contrasena);
    }
}

module.exports = User;
