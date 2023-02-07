const { Message } = require('../controllers');
const { Router } = require('express');

const router = Router();

/**
 * Use RESTful routes only
 * @see https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
 */
router.get('/messages/:userId', Message.readMany);
router.get('/messages/:userId/:messageId', Message.readOne);
router.patch('/admin/messages/:userId/:messageId', Message.update);
router.delete('/admin/messages/:userId/:messageId', Message.remove);

module.exports = router;
