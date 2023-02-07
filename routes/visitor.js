const { Router } = require('express');
const { Visitor } = require('../controllers');
const { requestSchema } = require('../schemas');
const { validate } = require('../middleware');

const router = Router();

/**
 * Use RESTful routes only
 * @see https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
 */
router.post(
  '/visitor/requests/:coachId',
  validate(requestSchema),
  Visitor.create
);

module.exports = router;
