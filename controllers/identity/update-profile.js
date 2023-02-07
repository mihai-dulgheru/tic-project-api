const validator = require('validator');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  if (!req.user?.me) {
    throw error(404, 'Missing required params');
  }

  const { email, name } = req.body;
  if (!email || !name) {
    throw error(400, 'Missing required params');
  }

  if (!validator.isEmail(email.trim())) {
    throw error(400, 'Invalid email');
  }
  if (!validator.isLength(name.trim(), { min: 2, max: 300 })) {
    throw error(400, 'Invalid name');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(req.user.me);
  const doc = await identityRef.get();
  if (!doc.exists) {
    throw error(404, 'Account not found');
  }

  await identityRef.update({
    email: email.trim(),
    name: name.trim(),
    updatedAt: new Date(),
  });

  const data = (await identityRef.get()).data();

  return res.status(200).json({
    data,
    message: 'Profile was updated successfully',
    success: true,
  });
};
