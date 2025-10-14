const { body, validationResult } = require('express-validator');

// REGLAS DE VALIDACIÓN DE USUARIO (AHORA EN ESPAÑOL)
const userValidationRules = () => {
    return [
        // El RUT no debe estar vacío
        body('rut').notEmpty().withMessage('El RUT es obligatorio.'),

        // El nombre no debe estar vacío
        body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),

        // El apellido no debe estar vacío
        body('apellido').notEmpty().withMessage('El apellido es obligatorio.'),

        // El correo debe ser un formato de correo válido
        body('correo').isEmail().withMessage('Debe proporcionar un correo válido.'),

        // La contraseña debe tener al menos 6 caracteres
        body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
    ];
};

const petValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('El nombre es obligatorio.'),
        body('age').optional().isInt({ min: 0 }).withMessage('La edad debe ser un número positivo.'),
        body('adopted').optional().isBoolean().withMessage('Adoptado debe ser un valor booleano.'),
    ];
};

const gardenValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('El nombre es obligatorio.'),
        body('location').notEmpty().withMessage('La ubicación es obligatoria.'),
    ];
};

// Función que ejecuta la validación
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    // Mapeamos los errores a un formato más limpio: { campo: 'mensaje de error' }
    errors.array().forEach(err => {
        // Evita duplicados si un campo tiene múltiples errores, muestra solo el primero.
        if (!extractedErrors.some(e => e[err.param])) {
            extractedErrors.push({ [err.param]: err.msg });
        }
    });

    return res.status(400).json({
        errors: extractedErrors,
    });
};

module.exports = {
    userValidationRules,
    petValidationRules,
    gardenValidationRules,
    validate,
};
