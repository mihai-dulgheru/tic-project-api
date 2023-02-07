const identities = require('./seeders/001_identities');
const coaches = require('./seeders/002_coaches');
const requests = require('./seeders/003_requests');

const seed = async () => {
  await identities.seed();
  await coaches.seed();
  await requests.seed();
};

(async () => {
  try {
    await seed();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = seed;
