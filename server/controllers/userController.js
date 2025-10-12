const pool = require('../utils/db');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { nombre, apellido, rut, correo, psswd } = req.body;
    const newUser = await pool.query(
      'INSERT INTO "users" (nombre, apellido, rut, correo, psswd) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellido, rut, correo, psswd]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error en el servidor al crear el usuario." });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM "users"');
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM "users" WHERE id = $1', [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateUser = await pool.query(
      'UPDATE "users" SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (updateUser.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query('DELETE FROM "users" WHERE id = $1 RETURNING *', [id]);

    if (deleteUser.rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ message: "Usuario eliminado correctamente." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// Obtener un usuario por email
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await pool.query('SELECT * FROM "users" WHERE correo = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error en el servidor al buscar usuario por email." });
  }
};

// Iniciar sesión de un usuario
exports.loginUser = async (req, res) => {
  try {
    const { correo, psswd } = req.body;
    const user = await pool.query('SELECT * FROM "users" WHERE correo = $1', [correo]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // En una aplicación real, deberías usar bcrypt para comparar contraseñas
    if (user.rows[0].psswd !== psswd) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json({ message: "Inicio de sesión exitoso", userId: user.rows[0].id, token: "un-token-muy-seguro" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error en el servidor durante el inicio de sesión." });
  }
};
