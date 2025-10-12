const pool = require('../utils/db');

// Crear una nueva huerta
exports.createGarden = async (req, res) => {
  try {
    const {
      name,
      location,
      region,
      commune,
      lat,
      lng,
      surface,
      description,
      crops,
      nombreContacto,
      telefono,
      correo,
      cont_type,
      photos,
      visible,
      comments,
      userEmail
    } = req.body;

    // Obtener el RUT del usuario a partir del email
    const userResult = await pool.query('SELECT rut FROM "users" WHERE correo = $1', [userEmail]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado para el email proporcionado." });
    }
    const userRut = userResult.rows[0].rut;

    const newGarden = await pool.query(
      'INSERT INTO "huertas" (gardenName, address, region, commune, lat, lng, surface, description, crops, nombreContacto, telefono, correo, cont_type, photos, visible, comments, user_rut) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
      [name, location, region, commune, lat, lng, surface, description, JSON.stringify(crops), nombreContacto, telefono, correo, cont_type, photos, visible, comments, userRut]
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
    const { 
      name, 
      location,
      region,
      commune,
      surface,
      description,
      crops,
      nombreContacto,
      telefono,
      correo,
      cont_type,
      photos,
      visible,
      comments
    } = req.body;

    const updateGarden = await pool.query(
      'UPDATE "huertas" SET gardenName = $1, address = $2, region = $3, commune = $4, surface = $5, description = $6, crops = $7, nombreContacto = $8, telefono = $9, correo = $10, cont_type = $11, photos = $12, visible = $13, comments = $14 WHERE id = $15 RETURNING *',
      [name, location, region, commune, surface, description, JSON.stringify(crops), nombreContacto, telefono, correo, cont_type, photos, visible, comments, id]
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