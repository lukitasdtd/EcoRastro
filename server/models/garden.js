class Garden {
  constructor(id, name, location, plants) {
    // ID único
    this.id = id; // En una implementación real, esto sería generado por la base de datos

    // Validaciones básicas
    if (!name) {
      throw new Error('El nombre es obligatorio.');
    }

    // Tipos de datos
    this.name = String(name);
    this.location = String(location);
    this.plants = Number(plants);
  }
}

module.exports = Garden;
