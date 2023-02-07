const { Request } = require('../controllers');
const { Router } = require('express');
const { requestSchema } = require('../schemas');
const { validate } = require('../middleware');

const router = Router();

/**
 * Use RESTful routes only
 * @see https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
 */
router.post(
  '/admin/requests/:coachId',
  validate(requestSchema),
  Request.create
);
router.get('/requests/:coachId', Request.readMany);
router.get('/requests/:coachId/:requestId', Request.readOne);
router.patch('/admin/requests/:coachId/:requestId', Request.update);
router.delete('/admin/requests/:coachId/:requestId', Request.remove);

module.exports = router;
