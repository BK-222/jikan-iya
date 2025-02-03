import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const { idToken } = await readBody(event);

  try {
    // Verify ID token from client
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: 3600000 // 1 hour
    });

    setCookie(event, 'auth_token', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
      // path: '/'
    });

    return { success: true, userId: decodedToken.uid }
  } catch (error) {
    throw createError({ statusCode: 401, message: 'Authentication failed' });
  }
});