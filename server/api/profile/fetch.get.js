import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'auth_token'); 
  if (!sessionCookie) throw createError({ statusCode: 401, message: 'Unauthorized' });

  const auth = getAuth();
  const { uid } = await auth.verifySessionCookie(sessionCookie); // Extracts user ID from session

  try {
    const db = getFirestore();
    // Fetch completed anime
    const completedSnapshot = await db.collection(`users/${uid}/completed_anime`).get();
    const completedAnime = completedSnapshot.docs.map(doc => ({ id: +doc.id, ...doc.data() }));
    // Fetch planned anime
    const plannedSnapshot = await db.collection(`users/${uid}/planned_anime`).get();
    const plannedAnime = plannedSnapshot.docs.map(doc => ({ id: +doc.id, ...doc.data() }));

    return { success: true, data: { completedAnime, plannedAnime } }
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch profile' });
  }
});
