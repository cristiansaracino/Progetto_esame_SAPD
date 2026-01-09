const annuncio = require('../models/annuncioSchema');
const axios = require('axios');

const createAnnuncio = async (req, res) => {
    try {
        const { città, lavoro, titolo, descrizione, tariffa, orario } = req.body;
        const userId = req.userId; 

        if (!città || !lavoro || !titolo || !descrizione || !tariffa || !orario) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        const existingAnnuncio = await annuncio.findOne({ userId: userId, lavoro: lavoro, città: città });
        if (existingAnnuncio) {
            return res.status(400).json({ message: 'Annuncio già presente' });
        }

        let previsioneOttenuta = null;
        try {
            const response = await axios.post('http://ml-service:8000/prevedi', {
                città: città,
                lavoro: lavoro,
                tariffa: parseFloat(tariffa)
            });

            if (response.data && response.data.valore !== undefined) {
                previsioneOttenuta = response.data.valore;
            }
        } catch (error) {
            console.error("Errore chiamata ml-service:", error.message);
        }

        const newAnnuncio = new annuncio({
            titolo,
            descrizione,
            città,
            lavoro,
            userId,
            tariffa,
            orario,
            previsione: previsioneOttenuta
        });

        await newAnnuncio.save();
        return res.status(201).json({ message: 'Annuncio creato con successo', annuncio: newAnnuncio });

    } catch (error) {
        return res.status(500).json({ message: 'Errore interno del server' });
    }
};

module.exports = createAnnuncio;