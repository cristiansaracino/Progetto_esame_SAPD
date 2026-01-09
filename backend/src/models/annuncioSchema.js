const mongoose=require("mongoose");
const User = require('./userSchema');

// Schema per gli annunci
const annuncioSchema=mongoose.Schema({
      titolo: String,
      città: String,
      lavoro: String,
      tariffa: Number, 
      descrizione: String,
      orario: String,
      previsione: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

// Modello per gli annunci
const annuncio=mongoose.model("annuncio", annuncioSchema, "Annunci");

module.exports = annuncio;