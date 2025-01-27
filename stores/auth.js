import { defineStore } from 'pinia';

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
    // login: async function(payload) {
    //   try {
    //     const { email, password } = payload;
    //     const response = await $fetch('/api/auth', {
    //       method: 'POST',
    //       body: { email, password, mode: 'login' },
    //     });
    //     this.userId = response.userId;
    //     this.isAuthenticated = true;
    //   } catch (error) {
    //     console.error("Login error:", error);
    //     throw error;
    //   }
    // },
    // signup: async function(payload) {
    //   try {
    //     const { email, password } = payload;
    //     const response = await $fetch('/api/auth', {
    //       method: 'POST',
    //       body: { email, password, mode: 'signup' },
    //     });
    //     this.userId = response.userId;
    //     this.isAuthenticated = true;
    //   } catch (error) {
    //     console.error("Signup error:", error);
    //     throw error;
    //   }
    // },
    login(payload) {
      return this.auth({ ...payload, mode: 'login' });
    },
    signup(payload) {
      return this.auth({ ...payload, mode: 'signup' });
    },
    auth: async function({ email, password, mode }) {
      try {
        const response = await $fetch('/api/auth', {
          method: 'POST',
          body: { email, password, mode }
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
