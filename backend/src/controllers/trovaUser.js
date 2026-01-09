const User = require('../models/userSchema');

// Funzione per inviare i dati dell'utente
const trovaUser = async (req, res) => {
    try {
        // Estrae l'id dell'utente dall'oggetto req.userId
        const userId = req.userId;

        // Cerca l'utente nel database
        const user = await User.findOne ({_id: userId});

        // Verifica se l'utente è presente
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        // Invia le informazioni sull'utente
        return res.status(200).json({ message: 'Utente trovato', user });        
    } catch (error) {
        return res.status(500).json({message: "Errore interno al server"});
    };
}

module.exports = trovaUser;