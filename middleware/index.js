const authenticate = require('./authenticate');
const authorize = require('./authorize');
const error = require('./error');
const errorHandler = require('./error-handler');
const loading = require('./loading');
const notFound = require('./not-found');
const speedLimiter = require('./speed-limiter');
const validate = require('./validate');

module.exports = {
  authenticate,
  authorize,
  error,
  errorHandler,
  loading,
  notFound,
  speedLimiter,
  validate,
};
