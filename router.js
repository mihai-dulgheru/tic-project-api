const { Router } = require('express');
const {
  authenticate,
  error,
  errorHandler,
  loading,
  notFound,
} = require('./middleware');
const { coach, identity, message, request, visitor } = require('./routes');

const router = Router();

// protect all non-public routes
router.all('/admin', authenticate);
router.all('/admin/*', authenticate);

// useful middleware for testing
router.use(loading);
router.use(error);

// use the router instances defined
router.use(coach);
router.use(identity);
router.use(message);
router.use(request);
router.use(visitor);

// matches any other HTTP method and route not matched before
router.all('*', notFound);

// finally, an error handler
router.use(errorHandler);

module.exports = router;
