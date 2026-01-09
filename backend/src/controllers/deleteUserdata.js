const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Annunci = require('../models/annuncioSchema');

const deleteUserdata = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID utente non valido o mancante' });
        }

        const objectId = new mongoose.Types.ObjectId(userId);

        //Cerco l'utente
        const user = await User.findOne({ _id: objectId });

        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        
        try {
            const result = await Annunci.deleteMany({ userId: objectId });
            
            console.log(`Eliminati ${result.deletedCount} annunci per l'utente ${userId}`);

            await User.deleteOne({ _id: objectId });

            res.clearCookie("token");
            return res.status(200).json({ 
                message: 'Account e annunci eliminati con successo',
                adsDeleted: result.deletedCount
            });
        }
        catch (error) {
            console.error("Errore DB:", error);
            return res.status(500).json({ message: 'Errore durante l\'eliminazione nel database' });
        }
    } catch (error) {
        console.error("Errore Server:", error);
        return res.status(500).json({ message: 'Errore interno del server' });
    }
};

module.exports = deleteUserdata;