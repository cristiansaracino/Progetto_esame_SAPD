const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware per verificare il token
const authMiddleware = (req, res, next) => {
  
  // Estrae il token dalla richiesta
  const token = req.cookies.token;

  // Verifica se il token è presente
  if (!token) {
    return res.status(401).json({ error: 'Token mancante, accesso non autorizzato' });
  }

  // Verifica il token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    next(); // Passa alla prossima funzione middleware o alla route handler
  } catch (error) {
    return res.status(401).json({ error: 'Token non valido, accesso non autorizzato' });
  }
};

module.exports = authMiddleware;
