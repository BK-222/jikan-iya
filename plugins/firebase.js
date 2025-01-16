import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwWS_TdY3PTtNR1w_oDz6JDt45ZrH0ckc",
  authDomain: "iyashikei-anime.firebaseapp.com",
  projectId: "iyashikei-anime",
  storageBucket: "iyashikei-anime.firebasestorage.app",
  messagingSenderId: "352979045247",
  appId: "1:352979045247:web:884ae9acddffefbd2ca84a",
  measurementId: "G-4PDE8B74YN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      firestore: db
    },
  };
});
