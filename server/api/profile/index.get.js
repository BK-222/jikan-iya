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
    const completedRef = db.collection(`users/${uid}/completed_anime`);
    const completedSnapshot = await completedRef.get();
    const completedAnime = completedSnapshot.docs.map(doc => ({ id: +doc.id, ...doc.data() }));
    // Fetch planned anime
    const plannedRef = db.collection(`users/${uid}/planned_anime`);
    const plannedSnapshot = await plannedRef.get();
    const plannedAnime = plannedSnapshot.docs.map(doc => ({ id: +doc.id, ...doc.data() }));

    return { completedAnime, plannedAnime };
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch profile' });
  }
});
