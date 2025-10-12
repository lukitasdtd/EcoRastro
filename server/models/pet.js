class Pet {
  constructor(id, name, age, adopted) {
    // ID único
    this.id = id; // En una implementación real, esto sería generado por la base de datos. (2)

    // Validaciones básicas (3)
    if (!name) {
      throw new Error('El nombre es obligatorio.');
    }
    if (!age) {
      throw new Error('La edad es obligatoria.');
    }
    if (!adopted) {
      throw new Error('Debes indicar adoptado/ no adoptado.');
    }

    // Tipos de datos (1): 
    this.name = String(name); 
    if (age !== undefined) {
        this.age = Number(age);
    }
    this.adopted = Boolean(adopted);
  }
}

module.exports = Pet;
