const { initializeFirestore } = require('../../functions');
const chance = require('../../lib/chance');

module.exports = async () => {
  const areas = ['frontend', 'backend', 'career'];
  const db = initializeFirestore();
  const identitiesRef = db.collection('identities').orderBy('createdAt');
  const identities = await identitiesRef.get();
  const identitiesData = identities.docs.map((identity) => {
    const identityData = identity.data();
    return { id: identity.id, ...identityData };
  });

  return [
    {
      id: identitiesData[0].id,
      areas: areas,
      description: chance.paragraph(),
      email: 'mihai@email.com',
      firstName: 'Mihai-Nicolae',
      hourlyRate: chance.integer({ min: 10, max: 100 }),
      lastName: 'Dulgheru',
      createdAt: new Date(),
    },
    {
      id: identitiesData[1].id,
      areas: chance.pickset(areas, 2),
      description: chance.paragraph(),
      email: chance.email(),
      firstName: chance.first(),
      hourlyRate: chance.integer({ min: 10, max: 100 }),
      lastName: chance.last(),
      createdAt: new Date(),
    },
    {
      id: identitiesData[2].id,
      areas: chance.pickset(areas, 2),
      description: chance.paragraph(),
      email: chance.email(),
      firstName: chance.first(),
      hourlyRate: chance.integer({ min: 10, max: 100 }),
      lastName: chance.last(),
      createdAt: new Date(),
    },
  ];
};
