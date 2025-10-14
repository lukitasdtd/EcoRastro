const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Corregido: Importar desde las ubicaciones correctas
const { userValidationRules, validate } = require('../middlewares/dataValidator');
const { authenticateToken } = require('../middlewares');

// --- Rutas P�blicas ---
// Registrar un nuevo usuario (con validaci�n)
router.post('/', userValidationRules(), validate, userController.createUser);

// Iniciar sesi�n
router.post('/login', userController.loginUser);

// Obtener informaci�n p�blica de todos los usuarios
router.get('/', userController.getUsers);

// Obtener informaci�n de un usuario por su correo electr�nico
router.get('/email/:email', userController.getUserByEmail);

// Obtener las mascotas reportadas por un usuario (por su RUT/ID)
router.get('/:id/reported-pets', userController.getReportedPetsByUser);

// Obtener las huertas de un usuario (por su RUT/ID)
router.get('/:id/gardens', userController.getUserGardens);

// Obtener informaci�n p�blica de un usuario por su RUT
router.get('/:id', userController.getUserById);

// --- Rutas Protegidas (Requieren Token) ---
// Actualizar un usuario (requiere token y validaci�n)
router.put('/:id', authenticateToken, userValidationRules(), validate, userController.updateUser);

// Eliminar un usuario (requiere token)
router.delete('/:id', authenticateToken, userController.deleteUser);


module.exports = router;
