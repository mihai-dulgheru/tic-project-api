const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(me);
  const doc = await identityRef.get();
  if (!doc.exists) {
    throw error(404, 'Account not found');
  }

  await identityRef.delete();
  const data = doc.data();
  data.id = doc.id;

  if (data?.role === 'admin') {
    const coachRef = db.collection('coaches').doc(me);
    const coachDoc = await coachRef.get();
    if (coachDoc.exists) {
      await coachRef.delete();
    }
    const requestsRef = db
      .collection('requests')
      .doc(me)
      .collection('messages');
    const snapshot = await requestsRef.get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    await db.collection('requests').doc(me).delete();
  }

  return res.status(200).json({
    data,
    message: 'Account deleted',
    success: true,
  });
};
