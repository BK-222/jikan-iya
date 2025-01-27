import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default defineEventHandler(async (event) => { // event wrapper provides access to the request and reaponse
  const firebaseConfig = useRuntimeConfig().public.firebase;
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 
  // get credentials from request
  const body = await readBody(event);
  const { email, password, mode } = body;

  if (!email || !password || !mode) {
    const error = new Error('Invalid request. Email, password and mode are required.');
    error.statusCode = 400;
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