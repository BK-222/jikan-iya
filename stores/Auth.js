import { defineStore } from 'pinia';

let timer;
const useAuthenticationStore = defineStore('auth', {
  state: () => ({
    userId: null,
    token: null,
    didAutoLogout: false
  }),
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    }
  },
  actions: {
    signUp: async function(email, password) {
      return this.auth({ email, password, mode: 'signup' });
    },
    logIn: async function(email, password) {
      return this.auth({ email, password, mode: 'login' });
    }
  }
});

export default useAuthenticationStore;