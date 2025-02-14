import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'auth_token');
  if (!sessionCookie) {
    return {
      isAuthenticated: false
    } // non-error conditioning due to the nature of this endpoint
  }

  try {
    const auth = getAuth();
    const decodedToken = await auth.verifySessionCookie(sessionCookie);
    return { 
      isAuthenticated: true,
      userId: decodedToken.uid
    }
  } catch (error) {
    console.error("Session verification failed:", error);
    return {
      isAuthenticated: false
    }
  }
});