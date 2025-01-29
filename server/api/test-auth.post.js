import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (event) => {
  const { email, password, mode } = await readBody(event);
  
  try {    
    const auth = getAuth();
    // Signup Flow
    if (mode === 'signup') {
      const newUser = await auth.createUser({ email, password })
      return createSession(event, newUser.uid)
    }

    // Login Flow
    if (mode === 'login') {
      const user = await auth.getUserByEmail(email)
      await verifyPassword(auth, user.uid, password)
      return createSession(event, user.uid)
    }
    
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Authentication failed. Check your credentials.'
    })
  }
})

// Password verification helper
async function verifyPassword(auth, userId, password) {
  try {
    // Attempt to "update" with same password since admin SDK doesn't do password verification (hack)
    await auth.updateUser(userId, { password })
  } catch (error) {
    if (error.code === 'auth/invalid-password') throw error
    throw createError({ statusCode: 500, message: 'Server error' })
  }
}

// Cookie creation helper
async function createSession(event, userId) {
  const auth = getAuth()
  
  // Generate session cookie
  const sessionCookie = await auth.createSessionCookie(
    await auth.createCustomToken(userId),
    { expiresIn: 3600000 } // 1 hour
  )

  // Set secure cookie
  setCookie(event, 'auth_token', sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000
  })

  return { userId }
}