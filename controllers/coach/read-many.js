const { initializeFirestore } = require('../../functions');

module.exports = async (_req, res) => {
  const db = initializeFirestore();
  const coachesRef = db.collection('coaches');
  const snapshot = await coachesRef.get();
  const data = snapshot.docs.map((doc) => {
    const coach = doc.data();
    coach.id = doc.id;
    return coach;
  });

  return res.status(200).json(data);
};
