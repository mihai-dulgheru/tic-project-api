const serviceAccount = require('../firebase/key/tic-project-19f4e-firebase-adminsdk-hsvmy-6e4e4260ac.json');
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require('firebase-admin/app');

initializeApp({
  credential: cert(serviceAccount),
});

let firestoreService;
const initializeFirestore = () => {
  if (!firestoreService) {
    firestoreService = getFirestore();
  }
  return firestoreService;
};

module.exports = initializeFirestore;
