import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC6j1qSSEilIYV54pu3KV4lS4LTwuOuzw",
  authDomain: "restaurant-b89c9.firebaseapp.com",
  databaseURL: "https://restaurant-b89c9-default-rtdb.firebaseio.com",
  projectId: "restaurant-b89c9",
  storageBucket: "restaurant-b89c9.appspot.com",
  messagingSenderId: "1032032095802",
  appId: "1:1032032095802:web:4c9806d195888d32bcaf03",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
