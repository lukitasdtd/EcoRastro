const dataValidator = require('./dataValidator');
const auth = require('./auth');
const errorHandler = require('./errorHandler');

module.exports = {
  ...dataValidator,
  ...auth,
  ...errorHandler,
};
