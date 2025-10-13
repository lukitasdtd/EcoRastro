class Pet {
  constructor(id, name, age, adopted) {
    // ID único
    this.id = id; // En una implementación real, esto sería generado por la base de datos

    //validaciones para los modelos mascotas
    if (!name) {
      throw new Error('El nombre es obligatorio.');
    }

    // Tipos de datos
    this.name = String(name);
    if (age !== undefined) {
        this.age = Number(age);
    }
    this.adopted = Boolean(adopted);
  }
}

module.exports = Pet;
