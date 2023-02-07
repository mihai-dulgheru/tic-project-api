const validator = require('validator');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id: coachId } = req.params;
  const { me } = req.user;
  if (!coachId || !me) {
    throw error(404, 'Missing required params');
  }

  const updates = req.body;
  const allowedUpdates = [
    'areas',
    'description',
    'email',
    'firstName',
    'hourlyRate',
    'lastName',
  ];
  const isValidUpdate = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    throw error(400, 'Invalid updates');
  }

  const db = initializeFirestore();
  const coachRef = db.collection('coaches').doc(coachId);
  let doc = await coachRef.get();
  if (!doc.exists) {
    throw error(404, 'Coach not found');
  }

  for (const [key, value] of Object.entries(updates)) {
    if (key === 'email') {
      if (!validator.isEmail(value)) {
        throw error(400, 'Invalid email');
      }
    } else if (key === 'hourlyRate') {
      if (
        typeof value !== 'number' ||
        !validator.isInt(value.toString(), { min: 10, max: 100 })
      ) {
        throw error(400, 'Invalid hourly rate');
      }
    } else if (key === 'areas') {
      if (!Array.isArray(value) || value.length === 0) {
        throw error(400, 'Invalid areas');
      }
    } else if (
      key === 'description' ||
      key === 'firstName' ||
      key === 'lastName'
    ) {
      if (!validator.isLength(value, { min: 2, max: 300 })) {
        throw error(400, 'Invalid ' + key);
      }
    }
  }
  await coachRef.update({ ...updates, updatedAt: new Date() });
  doc = await coachRef.get();
  const data = doc.data();
  data.id = doc.id;

  return res
    .status(200)
    .json({ data, message: 'Coach updated successfully', success: true });
};
