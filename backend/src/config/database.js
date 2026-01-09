const mongoose = require('mongoose');
const config = require('./config');

// Connessione al database MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(config.mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectToDatabase;