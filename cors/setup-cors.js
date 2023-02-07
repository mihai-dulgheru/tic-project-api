const cors = require('cors');
const origin = require('./origin');

const setupCors = () => {
  return cors({
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
    origin,
  });
};

module.exports = setupCors;
