import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, type UserCredential, type Auth } from 'firebase/auth'

interface AuthState {
  userId: string | null
  isAuthenticated: boolean
}

interface AuthPayload {
  email: string
  password: string
}

interface SessionResponse {
  userId: string
  isAuthenticated: boolean
}

const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userId: null,
    isAuthenticated: false
  }),
  actions: {
    login(payload: AuthPayload): Promise<SessionResponse> {
      return this.auth({ ...payload, mode: 'login' })
    },
    signup(payload: AuthPayload): Promise<SessionResponse> {
      return this.auth({ ...payload, mode: 'signup' })
    },
    auth: async function({ email, password, mode }: AuthPayload & { mode: 'login' | 'signup' }): Promise<SessionResponse> {
      try {
        const { $auth } = useNuxtApp();
        const auth = $auth as Auth;

        let userCredential: UserCredential  // new .ts import { type UserCredential } from Firebase
        if (mode === 'login') {
          userCredential = await signInWithEmailAndPassword(auth, email, password)
        } else {
          userCredential = await createUserWithEmailAndPassword(auth, email, password)
        }

        const idToken = await userCredential.user.getIdToken()

        const response = await $fetch<SessionResponse>('/api/auth/session', {
          method: 'POST',
          body: { idToken }
        });

        this.userId = response.userId
        this.isAuthenticated = true

        return response
      } catch (error) {
        console.error("Auth error:", error)
        throw error
      }
    },
    logout: async function(): Promise<void> {
      try {
        await $fetch('/api/auth/session', { method: 'DELETE' })
        this.userId = null
        this.isAuthenticated = false
      } catch (error) {
        console.error("Logout error:", error)
      }
    },
    tryLogin: async function(): Promise<boolean> {
      try {
        const response = await $fetch<SessionResponse>('/api/auth/session') // Assume we add a session-check endpoint
        if (response.userId && response.isAuthenticated) {
          this.userId = response.userId
          //this.username = response.username; // double check
          this.isAuthenticated = true
          return true
        } 
      } catch (error) {
        console.error("Session check error:", error)
      }
      this.userId = null
      this.isAuthenticated = false
      return false
    }
  }
});

export type AuthStore = ReturnType<typeof useAuthStore>
export default useAuthStore
