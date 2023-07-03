import dotenv from "dotenv";

dotenv.config();

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
  databaseURL: process.env.databaseURL,
};

// Initialize Firebase

const connectDB = () => {
  initializeApp(firebaseConfig);
};

export default connectDB;
