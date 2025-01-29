import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    isAuthenticated: false,
  }),
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getToken(state) {
      return state.token;
    }
  },
  actions: {
    login(payload) {
      return this.auth({ ...payload, mode: 'login' });
    },
    signup(payload) {
      return this.auth({ ...payload, mode: 'signup' });
    },
    auth: async function({ email, password, mode }) {
      try {
        const { $auth } = useNuxtApp();

        const userCredential = mode === 'login' 
        ? await signInWithEmailAndPassword($auth, email, password)
        : await createUserWithEmailAndPassword($auth, email, password);

        const idToken = await userCredential.user.getIdToken();

        const response = await $fetch('/api/auth', {
          method: 'POST',
          body: { idToken }
        });

        this.userId = response.userId;
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        console.error("Auth error:", error);
        throw error;
        }
    },
    logout: async function() {
      try {
        await $fetch('/api/logout', { method: 'POST' });
        this.userId = null;
        this.isAuthenticated = false;
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    // tryLogin: async function() {
    //   try {
    //     const response = await $fetch('/api/auth/session'); // Assume we add a session-check endpoint
    //     if (response.userId) {
    //       this.userId = response.userId;
    //       this.isAuthenticated = true;
    //     }
    //   } catch {
    //     this.logout(); // Clear state if session check fails
    //   }
    // }
  }
});

export default useAuthStore;
