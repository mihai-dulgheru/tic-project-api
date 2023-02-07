const jwt = require('jsonwebtoken');
const { error, initializeFirestore } = require('../../functions');
const { hashSync } = require('bcryptjs');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const identitiesRef = db.collection('identities');
  const snapshot = await identitiesRef.where('email', '==', email).get();
  if (!snapshot.empty) {
    throw error(409, 'Identity already exists');
  }

  const payload = {
    email,
    name: '',
    password: hashSync(password),
    role: 'client',
    createdAt: new Date(),
  };

  const doc = await identitiesRef.add(payload);
  const { id } = doc;
  if (!id) {
    throw error(500, 'Error creating identity');
  }

  delete payload.createdAt;
  delete payload.password;
  payload.me = id;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '60m',
  });

  const oneDay = 1 * 24 * 60 * 60 * 1000;
  res.cookie('jwt_refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: oneDay,
    sameSite: 'lax',
    secure: true,
    signed: true,
  });

  return res.status(200).json({
    email,
    expiresIn: 15 * 60 * 1000,
    idToken: token,
    isCoach: false,
    localId: id,
    refreshToken,
  });
};
