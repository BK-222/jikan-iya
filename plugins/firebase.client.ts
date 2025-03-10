import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(() => {
  const firebaseConfig = useRuntimeConfig().public.firebase as { //for useRuntimeConfig firebase file requires .client extension to prevent SSR hydration issues
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
    const app = initializeApp(firebaseConfig);

  return {
    provide: {
      auth: getAuth(app),
      firestore: getFirestore(app)
    }
  }
});
