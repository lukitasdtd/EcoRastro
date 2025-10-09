const pool = require('../utils/db');

// Crear una nueva mascota
exports.createPet = async (req, res) => {
  try {
    const { name, age, adopted } = req.body;
    const newPet = await pool.query(
      'INSERT INTO "pets" (name, age, adopted) VALUES ($1, $2, $3) RETURNING *',
      [name, age, adopted]
    );
    res.status(201).json(newPet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener todas las mascotas
exports.getPets = async (req, res) => {
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
