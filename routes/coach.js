const { Coach } = require('../controllers');
const { Router } = require('express');
const { coachSchema } = require('../schemas');
const { validate } = require('../middleware');

const router = Router();

/**
 * Use RESTful routes only
 * @see https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
 */
router.post('/admin/coaches', validate(coachSchema), Coach.create);
router.get('/coaches', Coach.readMany);
router.get('/coaches/:id', Coach.readOne);
router.patch('/admin/coaches/:id', Coach.update);
router.delete('/admin/coaches/:id', Coach.remove);

module.exports = router;
