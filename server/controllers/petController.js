
const Pet = require('../models/pet');

async function searchPets(req, res) {
  try {
    const filters = {
      palabrasClave: req.query.palabrasClave,
      especie: req.query.especie,
      estado: req.query.estado,
      tamaño: req.query.tamaño,
    };

    const pets = await Pet.findPets(filters);
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar las mascotas' });
  }
}

module.exports = {
  searchPets,
};
