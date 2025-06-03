import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjISzif2QtEffLuf9yYm0x-kenyEN4c0U",
  authDomain: "psychologists-40a99.firebaseapp.com",
  databaseURL: "https://psychologists-40a99-default-rtdb.firebaseio.com",
  projectId: "psychologists-40a99",
  storageBucket: "psychologists-40a99.appspot.com",
  messagingSenderId: "586316647969",
  appId: "1:586316647969:web:19ab86c045a8215dfe5d60",
};

const app = initializeApp(firebaseConfig);

export default app;
