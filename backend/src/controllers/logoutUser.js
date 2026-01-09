// Funzione che permette di effettuare il logout dell'utente
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout effettuato con successo" });
    } catch (error) {
        return res.status(500).json({ message: "Errore interno del server" });
    }
}

module.exports = logoutUser;    