const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No autorizado: No se proporcionó token.' });
  }

  // Ejemplo de token estático: "Bearer un-token-muy-seguro"
  const token = authHeader.split(' ')[1];

  if (token === 'un-token-muy-seguro') {
    // Para una implementación real, aquí se verificaría el token (por ejemplo, con JWT)
    next();
  } else {
    return res.status(403).json({ message: 'Prohibido: Token inválido.' });
  }
};

module.exports = { basicAuth };
