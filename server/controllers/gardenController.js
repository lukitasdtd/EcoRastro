const { Garden } = require('../models');

// Datos en memoria (simulando una base de datos)
let gardens = [];
let nextId = 1;

exports.createGarden = (req, res) => {
  try {
    const { name, location, plants } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio.' });
    }
    const newGarden = new Garden(nextId++, name, location, plants);
    gardens.push(newGarden);
    res.status(201).json(newGarden);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.getGardens = (req, res) => {
  try {
    res.status(200).json(gardens);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.getGardenById = (req, res) => {
  try {
    const garden = gardens.find(g => g.id === parseInt(req.params.id));
    if (!garden) {
      return res.status(404).json({ message: 'Jardín no encontrado.' });
    }
    res.status(200).json(garden);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.updateGarden = (req, res) => {
  try {
    const { name, location, plants } = req.body;
    const gardenIndex = gardens.findIndex(g => g.id === parseInt(req.params.id));
    if (gardenIndex === -1) {
      return res.status(404).json({ message: 'Jardín no encontrado.' });
    }
    const updatedGarden = { ...gardens[gardenIndex], name: name || gardens[gardenIndex].name, location: location || gardens[gardenIndex].location, plants: plants !== undefined ? plants : gardens[gardenIndex].plants };
    gardens[gardenIndex] = updatedGarden;
    res.status(200).json(updatedGarden);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.deleteGarden = (req, res) => {
  try {
    const gardenIndex = gardens.findIndex(g => g.id === parseInt(req.params.id));
    if (gardenIndex === -1) {
      return res.status(404).json({ message: 'Jardín no encontrado.' });
    }
    gardens.splice(gardenIndex, 1);
    res.status(200).json({ message: 'Jardín eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};
