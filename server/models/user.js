class User {
  constructor(id, name, email) {
    // ID único
    this.id = id; // En una implementación real, esto sería generado por la base de datos

    //validaciones de datos
    if (!name) {
      throw new Error('El nombre es obligatorio.');
    }
    if (!email) {
      throw new Error('El email es obligatorio.');
    }

    // Tipos de datos
    this.name = String(name);
    this.email = String(email);
    // En una implementación real, la unicidad del email se manejaría a nivel de base de datos.
  }
}

module.exports = User;
