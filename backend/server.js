const app = require('./app');
const http = require('http');
const config = require('./src/config/config');

// Avvio del server
const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
