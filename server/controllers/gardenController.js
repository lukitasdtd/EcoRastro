const pool = require('../utils/db');

// Crear una nueva huerta
exports.createGarden = async (req, res) => {
  try {
    const { name, size } = req.body;
    const newGarden = await pool.query(
      'INSERT INTO "huertas" (name, size) VALUES ($1, $2) RETURNING *',
      [name, size]
    );
    res.status(201).json(newGarden.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
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
    const { id } = req.params;
    const garden = await pool.query('SELECT * FROM "huertas" WHERE id = $1', [id]);

    if (garden.rows.length === 0) {
      return res.status(404).json({ message: "Huerta no encontrada." });
    }

    res.json(garden.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar una huerta
exports.updateGarden = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, size } = req.body;
    const updateGarden = await pool.query(
      'UPDATE "huertas" SET name = $1, size = $2 WHERE id = $3 RETURNING *',
      [name, size, id]
    );

    if (updateGarden.rows.length === 0) {
      return res.status(404).json({ message: "Huerta no encontrada." });
    }

    res.json(updateGarden.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar una huerta
exports.deleteGarden = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGarden = await pool.query('DELETE FROM "huertas" WHERE id = $1 RETURNING *', [id]);

    if (deleteGarden.rows.length === 0) {
        return res.status(404).json({ message: "Huerta no encontrada." });
    }

    res.json({ message: "Huerta eliminada correctamente." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};
