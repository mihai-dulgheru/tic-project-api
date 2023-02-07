const { initializeFirestore, error } = require('../../functions');

module.exports = async (req, res) => {
  const { coachId } = req.params;
  if (!coachId) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const coachRef = db.collection('coaches').doc(coachId);
  const doc = await coachRef.get();
  if (!doc.exists) {
    throw error(404, 'Coach not found');
  }

  const requestsRef = db
    .collection('requests')
    .doc(coachId)
    .collection('messages');
  const snapshot = await requestsRef.get();
  const data = snapshot.docs.map((doc) => {
    const request = doc.data();
    request.id = doc.id;
    return request;
  });

  return res.status(200).json(data);
};
