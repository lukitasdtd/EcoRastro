const pool = require('../utils/db');

// Crear una nueva huerta
exports.createGarden = async (req, res) => {
  try {
    const { name, size } = req.body;
    const newGarden = new Garden(nextId++, name, size);
    gardens.push(newGarden);
    res.status(201).json(newGarden);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

// Obtener todas las huertas
exports.getGardens = async (req, res) => {
  try {
    const allGardens = await pool.query('SELECT * FROM "huertas"');
    res.json(allGardens.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener una huerta por ID
exports.getGardenById = async (req, res) => {
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

// Actualizar una huerta
exports.updateGarden = async (req, res) => {
  try {
    const { name, size } = req.body;
    const gardenIndex = gardens.findIndex(g => g.id === parseInt(req.params.id));
    if (gardenIndex === -1) {
      return res.status(404).json({ message: 'Jardín no encontrado.' });
    }
    const updatedGarden = { ...gardens[gardenIndex], name: name || gardens[gardenIndex].name, size: size || gardens[gardenIndex].size };
    gardens[gardenIndex] = updatedGarden;
    res.status(200).json(updatedGarden);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

// Eliminar una huerta
exports.deleteGarden = async (req, res) => {
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