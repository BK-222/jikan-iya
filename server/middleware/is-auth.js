

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, 'auth_token');
  if (!sessionCookie) return;

  try {
    const auth = getAuth();
    const decoded = await auth.verifySessionCookie(sessionCookie);

    event.context.user = { uid: decoded.uid }
  } catch (error) {
    deleteCookie(event, 'auth_token');
  }
})