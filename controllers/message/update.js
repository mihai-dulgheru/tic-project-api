const validator = require('validator');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { userId, messageId } = req.params;
  const { me } = req.user;
  if (!userId || !messageId || !me) {
    throw error(404, 'Missing required params');
  }

  const updates = req.body;
  const allowedUpdates = ['email', 'message'];
  const isValidUpdate = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    throw error(400, 'Invalid updates');
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

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(userId);
  const identityDoc = await identityRef.get();
  if (!identityDoc.exists) {
    throw error(404, 'Identity not found');
  }

  const messageRef = db
    .collection('messages')
    .doc(userId)
    .collection('messages')
    .doc(messageId);
  const messageDoc = await messageRef.get();
  if (!messageDoc.exists) {
    throw error(404, 'Message not found');
  }

  const updatedAt = new Date();
  await messageRef.update({ ...updates, updatedAt });

  const data = messageDoc.data();
  const {
    coach: { id: coachId },
  } = data;
  const { email, firstName, lastName } = (
    await db.collection('coaches').doc(coachId).get()
  ).data();
  data.id = messageDoc.id;
  data.coach = { id: coachId, email, firstName, lastName };

  const requestRef = db
    .collection('requests')
    .doc(coachId)
    .collection('messages')
    .doc(messageId);
  const requestDoc = await requestRef.get();
  if (!requestDoc.exists) {
    throw error(404, 'Request not found');
  }

  await requestRef.update({ ...updates, updatedAt });

  return res
    .status(200)
    .json({ data, message: 'Message updated successfully', success: true });
};
