/* eslint-disable no-console */
const { initializeFirestore } = require('../../functions');
const coaches = require('../resources/coaches');

exports.seed = async () => {
  try {
    console.log('Planting seeds for coaches');

    const seeds = await coaches();
    const db = initializeFirestore();
    for (const seed of seeds) {
      const { id, ...data } = seed;
      await db.collection('coaches').doc(id).set(data);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add coaches');
    console.error(err);
  }
};
