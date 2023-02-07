const { error, initializeFirestore } = require('../../functions');

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

  const { email, message } = req.body;
  const requestsRef = db.collection('requests');

  const payload = {
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date(),
  };

  const response = await requestsRef
    .doc(coachId)
    .collection('messages')
    .add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create request');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res
    .status(200)
    .json({ data, message: 'Request created successfully', success: true });
};
