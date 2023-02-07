const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  if (!req.user?.me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(req.user.me);
  const doc = await identityRef.get();
  if (!doc.exists) {
    throw error(404, 'Account not found');
  }

  return res.status(200).json(doc.data());
};
