const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id: coachId } = req.params;
  if (!coachId) {
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

  return res.status(200).json(data);
};
