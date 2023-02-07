/* eslint-disable no-console */
const { initializeFirestore } = require('../../functions');
const identities = require('../resources/identities');

exports.seed = async () => {
  try {
    console.log('Planting seeds for identities');

    const seeds = await identities();
    const db = initializeFirestore();
    for (const seed of seeds) {
      await db.collection('identities').add(seed);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add identities');
    console.error(err);
  }
};
