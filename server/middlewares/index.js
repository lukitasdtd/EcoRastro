// archivo de configuración para el servidor
const dataValidator = require('./dataValidator');
const auth = require('./auth');
const errorHandler = require('./errorHandler');

//exportamos los middlewares
module.exports = {
  ...dataValidator,
  ...auth,
  ...errorHandler,
};
