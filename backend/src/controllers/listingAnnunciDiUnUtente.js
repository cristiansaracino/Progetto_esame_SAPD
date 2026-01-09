const Annuncio = require('../models/annuncioSchema');

const listingAnnunciDiUnUtente = async (req, res) => {
    const userId = req.userId || req.query.userId; // funzione usata sio per un utente loggato che per uno non loggato

    try{
        const annunci = await Annuncio.find({userId: userId}).populate('userId', 'profileImageUrl nome cognome biografia number');

        // Se non ci sono annunci per un determinato utente
        if (annunci.length === 0) {
            return res.status(404).json({ message: 'Nessun annuncio trovato per l\' utente' });
        }

        // Restituisce la lista degli annunci come risposta HTTP
        res.json(annunci);
    } catch (error) {
        // Restituisce un errore HTTP 500 al client in caso di fallimento
        return res.status(500).json({message: 'Errore nel recupero degli annunci'});
    }
}

module.exports = listingAnnunciDiUnUtente;