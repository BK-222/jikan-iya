import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'auth_token');
  if (!sessionCookie) return { isAuthenticated: false };

  try {
    const auth = getAuth();
    const decoded = await auth.verifySessionCookie(sessionCookie);
    return { isAuthenticated: true, userId: decoded.uid };
  } catch {
    console.error("Session verification failed:", error);
    return { isAuthenticated: false };
  }
});