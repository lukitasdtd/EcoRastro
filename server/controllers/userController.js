const pool = require('../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const controllerName = "userController";

// ---- VERIFICACIÓN DE SEGURIDAD CRÍTICA AL INICIO ----
if (!process.env.JWT_SECRET) {
    console.error('\n---\n');
    console.error('¡ERROR FATAL! La variable de entorno JWT_SECRET no está definida.');
    console.error('El servidor no puede firmar tokens de autenticación de forma segura.');
    console.error('Añada la variable JWT_SECRET a su archivo .env para continuar.');
    console.error('\n---\n');
    process.exit(1);
}
// --------------------------------------------------

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { rut, nombre, apellido, correo, contrasena } = req.body;
        if (!contrasena) {
            return res.status(400).json({ message: 'El campo contrasena es requerido y no puede estar vacío.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);
        const newUser = await pool.query(
            'INSERT INTO "usuarios" (rut, nombre, apellido, correo, psswd) VALUES ($1, $2, $3, $4, $5) RETURNING rut, nombre, correo',
            [rut, nombre, apellido, correo, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al crear usuario - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo crear el usuario.` });
    }
};

// Iniciar sesión (Seguro)
exports.loginUser = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        if (!contrasena) {
            return res.status(400).json({ message: 'El campo contrasena es requerido y no puede estar vacío.' });
        }
        const user = await pool.query('SELECT * FROM "usuarios" WHERE correo = $1', [correo]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
        const validPassword = await bcrypt.compare(contrasena, user.rows[0].psswd);
        if (!validPassword) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
        const token = jwt.sign({ rut: user.rows[0].rut }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.rows[0].rut });
    } catch (err) {
        console.error(`${controllerName}: Error al iniciar sesión - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo iniciar sesión.` });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT rut, nombre, apellido, correo FROM "usuarios"');
        res.json(allUsers.rows);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener usuarios - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo obtener los usuarios.` });
    }
};

// Obtener usuario por RUT
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT rut, nombre, apellido, correo FROM "usuarios" WHERE rut = $1', [id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.json(user.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener usuario por ID - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo obtener el usuario.` });
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const requesterRut = req.user.rut;
        const { nombre, apellido, correo } = req.body;
        const updateUser = await pool.query(
            'UPDATE "usuarios" SET nombre = $1, apellido = $2, correo = $3 WHERE rut = $4 AND rut = $5 RETURNING rut, nombre, apellido, correo',
            [nombre, apellido, correo, id, requesterRut]
        );
        if (updateUser.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado o no tienes permiso para modificarlo." });
        }
        res.json(updateUser.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al actualizar usuario - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo actualizar el usuario.` });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const requesterRut = req.user.rut;
        const deleteUser = await pool.query(
            'DELETE FROM "usuarios" WHERE rut = $1 AND rut = $2 RETURNING rut, correo',
            [id, requesterRut]
        );
        if (deleteUser.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado o no tienes permiso para eliminarlo." });
        }
        res.json({ message: "Usuario eliminado correctamente." });
    } catch (err) {
        console.error(`${controllerName}: Error al eliminar usuario - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo eliminar el usuario.` });
    }
};

// Obtener usuario por Email
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await pool.query('SELECT rut, nombre, apellido, correo FROM "usuarios" WHERE correo = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.json(user.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener usuario por Email - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo obtener el usuario.` });
    }
};

// Obtener mascotas reportadas por un usuario
exports.getReportedPetsByUser = async (req, res) => {
    try {
        const { rut } = req.params;
        const userPets = await pool.query('SELECT * FROM "pets" WHERE user_rut = $1', [rut]);
        res.json(userPets.rows);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener mascotas reportadas por usuario - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo obtener los reportes de mascotas.` });
    }
};

// Obtener huertas de un usuario
exports.getUserGardens = async (req, res) => {
    try {
        const { rut } = req.params;
        const userGardens = await pool.query('SELECT * FROM "huertas" WHERE user_rut = $1 ORDER BY fecha_c DESC', [rut]);
        res.json(userGardens.rows);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener huertas del usuario - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo obtener las huertas del usuario.` });
    }
};