const pool = require('../utils/db');

// Datos en memoria (simulando una base de datos)
let pets = [];
let nextId = 1;

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

exports.getPets = (req, res) => {
  try {
    const allPets = await pool.query('SELECT * FROM "pets"');
    res.json(allPets.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener una mascota por ID
exports.getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await pool.query('SELECT * FROM "pets" WHERE id = $1', [id]);

    if (pet.rows.length === 0) {
      return res.status(404).json({ message: "Mascota no encontrada." });
    }

    res.json(pet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar una mascota
exports.updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, adopted } = req.body;
    const updatePet = await pool.query(
      'UPDATE "pets" SET name = $1, age = $2, adopted = $3 WHERE id = $4 RETURNING *',
      [name, age, adopted, id]
    );

    if (updatePet.rows.length === 0) {
      return res.status(404).json({ message: "Mascota no encontrada." });
    }

    res.json(updatePet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar una mascota
exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePet = await pool.query('DELETE FROM "pets" WHERE id = $1 RETURNING *', [id]);

    if (deletePet.rows.length === 0) {
        return res.status(404).json({ message: "Mascota no encontrada." });
    }

    res.json({ message: "Mascota eliminada correctamente." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};
