const pinoLogger = require('pino');
const pretty = require('pino-pretty');

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

const stream = pretty({
  colorize: true,
  translateTime: 'yyyy-mm-dd HH:MM:ss',
  ignore: 'pid,hostname',
});

module.exports = pinoLogger(
  {
    enabled:
      !process.env.NODE_ENV === 'production' ||
      process.env.LOG_EVERYWHERE === 'yes',
    level: process.env.PINO_LOG_LEVEL || 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
  },
  // pinoLogger.destination(`${__dirname}/../logs/combined.log`)
  stream
);
