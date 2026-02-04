import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

const apiKey = process.env.FIREBASE_API_KEY
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.FIREBASE_APP_ID
const measurementId = process.env.FIREBASE_MEASUREMENT_ID

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "venlearn-staging.firebaseapp.com",
  databaseURL: "https://scholarly-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "venlearn-staging",
  storageBucket: "venlearn-staging.firebasestorage.app",
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app }