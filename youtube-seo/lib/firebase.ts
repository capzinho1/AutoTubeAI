//configuracion de Firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTWFGASD2xA3JHY1lXeHfmklFdnRRYSnk",
  authDomain: "seo-38840.firebaseapp.com",
  projectId: "seo-38840",
  storageBucket: "seo-38840.firebasestorage.app",
  messagingSenderId: "912612564691",
  appId: "1:912612564691:web:609cddd776033ef829be26",
  measurementId: "G-WVKRYZ1NYQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
