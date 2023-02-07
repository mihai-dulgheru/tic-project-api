const chance = require('../../lib/chance');
const { hashSync } = require('bcryptjs');

module.exports = async () => {
  // const roles = ['admin', 'client'];

  return [
    {
      email: 'mihai@email.com',
      name: 'Mihai-Nicolae Dulgheru',
      password: hashSync('supersecretpassword'),
      // role: chance.pickone(roles),
      role: 'admin',
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync(chance.string({ length: 8 })),
      role: 'admin',
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync(chance.string({ length: 8 })),
      role: 'admin',
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync(chance.string({ length: 8 })),
      role: 'client',
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync(chance.string({ length: 8 })),
      role: 'client',
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync(chance.string({ length: 8 })),
      role: 'client',
      createdAt: new Date(),
    },
  ];
};
