const { coffee } = require('../functions');

module.exports = async (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }

  const { test, wait = 5000 } = req.query;
  if (test === 'loading') {
    await coffee(wait);
  }

  return next();
};
