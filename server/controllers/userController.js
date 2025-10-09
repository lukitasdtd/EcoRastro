const pool = require('../utils/db');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await pool.query(
      'INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM "user"');
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateUser = await pool.query(
      'UPDATE "user" SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (updateUser.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [id]);

    if (deleteUser.rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ message: "Usuario eliminado correctamente." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};
