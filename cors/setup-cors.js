const cors = require('cors');
const origin = require('./origin');

const setupCors = () => {
  return cors({
    // origin,
    origin: true,
    credentials: true,
    exposedHeaders: [
      'Content-Disposition',
      // add exposed headers here
    ],
  });
};

module.exports = setupCors;
