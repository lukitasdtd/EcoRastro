const { Pet } = require('../models');

// Datos en memoria para mascotas
let pets = [];
let nextId = 1;

//creación de mascota
exports.createPet = (req, res) => {
  try {
    const { name, age, adopted } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio.' });
    }
    const newPet = new Pet(nextId++, name, age, adopted);
    pets.push(newPet);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

//obtener mascota
exports.getPets = (req, res) => {
  try {
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

//obtener mascota por id
exports.getPetById = (req, res) => {
  try {
    const pet = pets.find(p => p.id === parseInt(req.params.id));
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada.' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

//actualizar mascota
exports.updatePet = (req, res) => {
  try {
    const { name, age, adopted } = req.body;
    const petIndex = pets.findIndex(p => p.id === parseInt(req.params.id));
    if (petIndex === -1) {
      return res.status(404).json({ message: 'Mascota no encontrada.' });
    }
    const updatedPet = { ...pets[petIndex], name: name || pets[petIndex].name, age: age !== undefined ? age : pets[petIndex].age, adopted: adopted !== undefined ? adopted : pets[petIndex].adopted };
    pets[petIndex] = updatedPet;
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

//eliminar mascota
exports.deletePet = (req, res) => {
  try {
    const petIndex = pets.findIndex(p => p.id === parseInt(req.params.id));
    if (petIndex === -1) {
      return res.status(404).json({ message: 'Mascota no encontrada.' });
    }
    pets.splice(petIndex, 1);
    res.status(200).json({ message: 'Mascota eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};
