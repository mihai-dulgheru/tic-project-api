const validator = require('validator');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { coachId, requestId } = req.params;
  const { me } = req.user;
  if (!coachId || !requestId || !me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const coachRef = db.collection('coaches').doc(coachId);
  let doc = await coachRef.get();
  if (!doc.exists) {
    throw error(404, 'Coach not found');
  }

  const updates = req.body;
  const allowedUpdates = ['email', 'message'];
  const isValidUpdate = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    throw error(400, 'Invalid updates');
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

  for (const [key, value] of Object.entries(updates)) {
    if (key === 'email') {
      if (!validator.isEmail(value)) {
        throw error(400, 'Invalid email');
      }
    } else if (key === 'message') {
      if (!validator.isLength(value, { min: 2, max: 300 })) {
        throw error(400, 'Invalid message');
      }
    }
  }
  await requestRef.update({ ...updates, updatedAt: new Date() });
  doc = await requestRef.get();
  const data = doc.data();
  data.id = doc.id;

  return res
    .status(200)
    .json({ data, message: 'Request updated successfully', success: true });
};
