const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw error(400, 'Missing required params');
  }

  const db = initializeFirestore();
  const identitiesRef = db.collection('identities');
  const snapshot = await identitiesRef.where('email', '==', email).get();
  if (snapshot.empty) {
    throw error(400, 'No matching documents.');
  }

  const documents = [];
  snapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });

  const identity = documents[0];
  if (!identity) {
    throw error(400, 'Your email or password are invalid');
  }

  const { id, name, password: passwordFromDb, role } = identity;
  const passwordsMatch = await bcrypt.compare(password, passwordFromDb);
  if (!passwordsMatch) {
    throw error(400, 'Your username or password are invalid');
  }

  // the JWT public data payload
  const payload = { name, email, role, me: id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '60m',
  });

  // set refresh token as cookie
  const oneDay = 1 * 24 * 60 * 60 * 1000;
  res.cookie('jwt_refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: oneDay,
    sameSite: 'lax',
    secure: true,
    signed: true,
  });

  return res.status(200).json({
    displayName: name,
    email,
    expiresIn: 15 * 60 * 1000,
    idToken: token,
    isCoach: role === 'admin',
    kind: 'identitytoolkit#VerifyPasswordResponse',
    localId: id,
    refreshToken,
    registered: true,
  });
};
