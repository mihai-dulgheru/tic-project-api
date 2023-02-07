const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { email, me } = req.user;
  if (!email || !me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const coachesRef = db.collection('coaches');
  const coachRef = coachesRef.doc(me);
  if ((await coachRef.get()).exists) {
    throw error(409, 'Coach already exists');
  }

  const { areas, description, firstName, hourlyRate, lastName } = req.body;
  const payload = {
    areas,
    description: description.trim(),
    email,
    firstName: firstName.trim(),
    hourlyRate,
    lastName: lastName.trim(),
    createdAt: new Date(),
  };

  try {
    await coachRef.set(payload);
  } catch (error) {
    throw error(500, 'Error creating coach');
  }

  const doc = await coachRef.get();
  if (!doc.exists) {
    throw error(404, 'Coach not found');
  }
  const data = doc.data();
  data.id = doc.id;

  const identityRef = db.collection('identities').doc(me);
  if (!(await identityRef.get()).exists) {
    throw error(404, 'Account not found');
  }

  await identityRef.update({
    role: 'admin',
    updatedAt: new Date(),
  });

  return res.status(200).json({
    data,
    message: 'Coach created successfully',
    success: true,
  });
};
