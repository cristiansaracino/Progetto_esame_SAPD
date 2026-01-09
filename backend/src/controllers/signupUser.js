const validateNumber = require("../validators/validateNumber");
const generateOTP = require("../utils/generateOTP");
const User = require("../models/userSchema");
const sendOTP = require("../utils/sendOTP");

// Funzione che verifica se un utente è registrato e invia un OTP
const signupUser = async (req, res) => {

  // Verifica che il numero sia presente nella richiesta
  try {
    const number = req.body.number;
    if (!number) {
      return res.status(400).json({ message: "Il numero è obbligatorio" });
    }
 
    // Verifica se il numero è valido
    if (!validateNumber(number)) {
      return res.status(400).json({ message: "Numero non valido" });
    }
     
    // Cerca l'utente nel database
    let user;
    try {
      user = await User.findOne({ number });
    } catch (error) {
      return res.status(500).json({ message: "Errore interno del server" });
    }
  
    // Genera un OTP e la data di scadenza (da modificare)
    const {otp, otpExpiresAt} = generateOTP();
  
    if (user) {
      // Se l'utente esiste, aggiorna il campo otp
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
    } else {
      // Se l'utente non esiste, crea un nuovo utente
      user = new User({ number, otp, otpExpiresAt });
    }
      
    // Salva l'utente nel database
    try {
      await user.save();
    } catch (error) {
      return next({ statusCode: 500, message: "Errore durante il salvataggio dell'utente" });
    }
      
    // Invia l'OTP all'utente
    //try {
     // await sendOTP(number, otp);
    //} catch (error) {
      //return next({ statusCode: 500, message: "Errore durante l'invio dell'OTP" });
    //}
  
    // Invia una risposta di successo
    return res.status(200).json({ message: "OTP inviato con successo" });
  } catch (error) {
    return res.status(500).json({ message: "Errore interno del server" });
  }
};
  
module.exports = signupUser;