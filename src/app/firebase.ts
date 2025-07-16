import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2LGHifsEzn34SG-IY6gbzegLUcUvdTwk",
  authDomain: "dota-web-2024-fisck.firebaseapp.com",
  projectId: "dota-web-2024-fisck",
  storageBucket: "dota-web-2024-fisck.firebasestorage.app",
  messagingSenderId: "251015390508",
  appId: "1:251015390508:web:fe50eebcafd21f3ce53889"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
