const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { coachId } = req.params;
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

  const { email, message } = req.body;
  const requestsRef = db.collection('requests');

  const payload = {
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date(),
  };

  const requestRef = requestsRef.doc(coachId);
  try {
    await requestRef.set({
      createdAt: payload.createdAt,
    });
  } catch (error) {
    throw error(500, 'Error creating request');
  }
  const response = await requestRef.collection('messages').add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create request');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  try {
    const messagesRef = db.collection('messages');
    await messagesRef.doc(me).set({
      createdAt: payload.createdAt,
    });
    await messagesRef
      .doc(me)
      .collection('messages')
      .doc(response.id)
      .set({
        ...payload,
        coach: {
          id: coachId,
        },
      });
  } catch (error) {
    throw error(500, 'Error creating message');
  }

  return res
    .status(200)
    .json({ data, message: 'Request created successfully', success: true });
};
