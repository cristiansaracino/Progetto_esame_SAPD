const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./src/config/database');
const path = require('path');

// Importo le route
const userRoutes = require('./src/routes/userRoutes');
const annunciRoutes = require('./src/routes/annunciRoutes');

// Inizializzo l'applicazione
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

// Servi la cartella "uploads" come file statici
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Connessione al database
connectToDatabase();

// Route principale
app.get('/', (req, res) => {
  res.send('API in funzione...');
});

// Route per gli utenti
app.use('/users', userRoutes);

// Route per gli annunci
app.use('/annunci', annunciRoutes);

module.exports = app;
