const config = require('../config/config');
const jwt = require("jsonwebtoken");

// Funzione per generare un token JWT
function generateToken(id){
    return jwt.sign(
        {id: id}, // Payload
        config.jwtSecret, // Chiave segreta
        {expiresIn: 6 * 60 * 60} // Scadenza del token in secondi e aggiunge exp al payload
    );
}

module.exports = generateToken;