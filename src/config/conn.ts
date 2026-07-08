import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

const apiKey = process.env.FIREBASE_API_KEY
const authDomain = process.env.FIREBASE_AUTH_DOMAIN
const projectId = process.env.FIREBASE_PROJECT_ID
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.FIREBASE_APP_ID
const measurementId = process.env.FIREBASE_MEASUREMENT_ID

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  // databaseURL: "https://scholarly-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app }