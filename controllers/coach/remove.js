const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id: coachId } = req.params;
  const { me } = req.user;
  if (!coachId || !me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const coachRef = db.collection('coaches').doc(coachId);
  const doc = await coachRef.get();
  if (!doc.exists) {
    throw error(404, 'Coach not found');
  }
  const data = doc.data();
  data.id = doc.id;
  await coachRef.delete();

  const requestsRef = db
    .collection('requests')
    .doc(coachId)
    .collection('messages');
  const snapshot = await requestsRef.get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  await db.collection('requests').doc(coachId).delete();

  return res
    .status(200)
    .json({ data, message: 'Coach removed successfully', success: true });
};
