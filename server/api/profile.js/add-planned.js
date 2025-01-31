import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'auth_token');
  if (!sessionCookie) throw createError({ statusCode: 401, message: 'Unauthorized' });

  const auth = getAuth();
  const { uid } = await auth.verifySessionCookie(sessionCookie);
  const body = await readBody(event);

  try {
    const db = getFirestore();
    await db.doc(`users/${uid}/planned_anime/${body.id}`).set(body);
    return { success: true, message: 'Anime added to planned list' };
  } catch (error) {
    console.error('Error adding to planned:', error);
    throw createError({ statusCode: 500, message: 'Failed to add anime' });
  }
});