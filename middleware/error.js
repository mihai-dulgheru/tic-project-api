const { error } = require('../functions');

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }

  const { test } = req.query;
  if (test === 'error') {
    throw error(429, 'Will always trigger an error');
  }

  return next();
};
