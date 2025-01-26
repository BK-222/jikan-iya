import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(() => {

  const firebaseConfig = useRuntimeConfig().public.firebase;  //for useRuntimeConfig firebase file requires .client extension to prevent SSR hydration issues
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return {
    provide: {
      firestore: db
    },
  };
});
