import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'auth_token');
  if (!sessionCookie) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const auth = getAuth();
  const { uid } = await auth.verifySessionCookie(sessionCookie);
  const { id } = await readBody(event); // Get anime ID from request

  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing anime ID' });
  }

  try {
    const db = getFirestore();
    await db.doc(`users/${uid}/planned_anime/${id}`).delete();
    
    return { success: true, message: 'Anime removed from planned list' }
  } catch (error) {
    console.error('Error removing from planned:', error);
    throw createError({ statusCode: 500, message: 'Failed to remove from planned list' });
  }
});