import { defineStore } from 'pinia';
import { supabase } from '@/plugins/supabase';

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
    signUp: async function(payload) {
      return this.auth({ ...payload, mode: 'signup' });
    },
    logIn: async function(payload) {
      return this.auth({ ...payload, mode: 'login' });
    },
    auth: async function({ email, password, mode }) {
      const supabase = useNuxtApp().$supabase;
      
      let response;
      if (mode === 'signup') {
        response = await this.$nuxt.$supabase.auth.signUp({ email, password });
      } else {
        response = await this.$nuxt.$supabase.auth.signIn({ email, password });
      }
      const { user, sessions, error } = response;

      if (error) {
        throw new Error(error.message);
      }
      if (session && session.access_token) {
        this.setAuth(session.access_token, user.id, session.expires_in);
      } else {
        throw new Error('Failed to retrieve authentication token.');
      }
    },
    logout() {
      clearTimeout(timer);
      this.$nuxt.$supabase.auth.signOut();
      this.clearAuth();
    }
  }
});

export default useAuthenticationStore;