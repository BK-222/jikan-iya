import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    isAuthenticated: false
  }),
  getters: {
    getUserId(state) {
      return state.userId;
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

        let userCredential;
        if (mode === 'login') {
          userCredential = await signInWithEmailAndPassword($auth, email, password);
        } else {
          userCredential = await createUserWithEmailAndPassword($auth, email, password);
        }

        const idToken = await userCredential.user.getIdToken();

        const response = await $fetch('/api/auth/session', {
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
        await $fetch('/api/auth/session', { method: 'DELETE' });
        this.userId = null;
        this.isAuthenticated = false;
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    tryLogin: async function() {
      try {
        const response = await $fetch('/api/auth/session'); // Assume we add a session-check endpoint
        if (response.userId && response.isAuthenticated) {
          this.userId = response.userId;
          this.username = response.username; // double check
          this.isAuthenticated = true;
          return true;
        } 
      } catch (error) {
        console.error("Session check error:", error);
      }
      this.userId = null;
      this.isAuthenticated = false;
      return false;
    }
  }
});

export default useAuthStore;
