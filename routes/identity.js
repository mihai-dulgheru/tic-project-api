const { Identity } = require('../controllers');
const { Router } = require('express');
const { identitySchema } = require('../schemas');
const { validate } = require('../middleware');

const router = Router();

router.delete('/admin/account', Identity.deleteAccount);
router.get('/admin/profile', Identity.profile);
router.patch('/admin/profile', Identity.updateProfile);
router.post(
  '/admin/change-password',
  validate(identitySchema),
  Identity.changePassword
);
router.post('/login', Identity.login);
router.post('/logout', Identity.logout);
router.post('/refresh-token', Identity.refreshToken);
router.post('/signup', Identity.signup);

module.exports = router;
