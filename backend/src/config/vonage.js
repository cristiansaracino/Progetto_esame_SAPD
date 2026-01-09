const config = require('./config')

// Importazione e inizializzazione del modulo Vonage come da documentazione del pacchetto
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: config.vonageApiKey,
  apiSecret: config.vonageApiSecret,
})

module.exports = vonage