const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(userId);
  const identityDoc = await identityRef.get();
  if (!identityDoc.exists) {
    throw error(404, 'Identity not found');
  }

  const messageRef = db.collection('messages').doc(userId);
  const messageDoc = await messageRef.get();
  if (!messageDoc.exists) {
    return res.status(200).json([]);
  }
  const snapshot = await messageRef.collection('messages').get();
  if (snapshot.empty) {
    return res.status(200).json([]);
  }

  const data = [];
  for (const doc of snapshot.docs) {
    const message = doc.data();
    const {
      coach: { id: coachId },
    } = message;
    const { email, firstName, lastName } = (
      await db.collection('coaches').doc(coachId).get()
    ).data();
    message.id = doc.id;
    message.coach = { id: coachId, email, firstName, lastName };
    data.push(message);
  }

  return res.status(200).json(data);
};
