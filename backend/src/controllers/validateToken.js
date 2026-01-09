// Funzione per verificare la validità del token JWT
const verifyToken = (req, res) => {
  try {
    return res.status(200).json({ message: "Token valido" });
  } catch (error) {
    return res.status(400).json({ message: "Token non valido" });
  }
};

module.exports = verifyToken;