const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Debe ser un email válido.'),
    body('name').notEmpty().withMessage('El nombre es obligatorio.'),
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
    body('plants').isInt({ min: 0 }).withMessage('El número de plantas debe ser un entero positivo.'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

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
