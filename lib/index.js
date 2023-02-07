const chance = require('./chance');
const pino = require('./pino');

module.exports = {
  chance,
  logger: pino,
};
