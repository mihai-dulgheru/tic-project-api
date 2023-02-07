const chance = require('../../lib/chance');

module.exports = async () => {
  return [
    {
      email: chance.email(),
      message: chance.paragraph(),
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      message: chance.paragraph(),
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      message: chance.paragraph(),
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      message: chance.paragraph(),
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      message: chance.paragraph(),
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      message: chance.paragraph(),
      createdAt: new Date(),
    },
  ];
};
