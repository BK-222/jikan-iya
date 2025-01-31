import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'auth_token');
  if (!sessionCookie) return;

  try {
    const auth = getAuth();
    const decoded = await auth.verifySessionCookie(sessionCookie);
    event.context.user = { uid: decoded.uid }
  } catch (error) {

    console.error('Auth middleware error:', error);
    
    // Don't delete cookie for network/timeout errors
    // if (error.code === 'auth/network-error' || error.code === 'auth/timeout') {
    //   return;
    // }

    deleteCookie(event, 'auth_token');
  }
})