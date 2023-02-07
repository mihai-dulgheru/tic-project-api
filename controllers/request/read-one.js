const { initializeFirestore, error } = require('../../functions');

module.exports = async (req, res) => {
  const { coachId, requestId } = req.params;
  if (!coachId || !requestId) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const coachRef = db.collection('coaches').doc(coachId);
  let doc = await coachRef.get();
  if (!doc.exists) {
    throw error(404, 'Coach not found');
  }

  const requestRef = db
    .collection('requests')
    .doc(coachId)
    .collection('messages')
    .doc(requestId);
  doc = await requestRef.get();
  if (!doc.exists) {
    throw error(404, 'Request not found');
  }
  const data = doc.data();
  data.id = doc.id;

  return res.status(200).json(data);
};
