import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCwWS_TdY3PTtNR1w_oDz6JDt45ZrH0ckc',
//   authDomain: 'iyashikei-anime.firebaseapp.com',
//   projectId: 'iyashikei-anime',
//   storageBucket: "iyashikei-anime.firebasestorage.app",
//   messagingSenderId: '352979045247',
//   appId: '1:352979045247:web:884ae9acddffefbd2ca84a',
//   measurementId: 'G-4PDE8B74YN'
// }
  
//   // const firebaseConfig = useRuntimeConfig().public.firebase;
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);

export default defineEventHandler(async (event) => {
  const firebaseConfig = useRuntimeConfig().public.firebase;
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 
  // get credentials from request
  const body = await readBody(event);
  const { email, password, mode } = body;

  if (!email || !password || !mode) {
    const error = new Error('Invalid request. Email, password and mode are required.');
    error.statusCode = 404;
    throw error;
  }

  try {
    // validate against database
    let userCredential;
    if (mode === 'login') {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    }

    const token = await userCredential.user.getIdToken();  // get firebase jwt
    const userId = userCredential.user.uid;

    // send auth token back
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600
    });

    return { userId };
  } catch (error) {
    console.error('Error in Firebase auth:', error);
    throw createError({
      statusCode: 401,
      message: 'Authentication failed. Please check your credentials.'
    });
  }

});