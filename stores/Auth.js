import { defineStore } from 'pinia';
import { supabase } from '@/plugins/supabase';

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
    logIn: async function(payload) {
      return this.auth({ ...payload, mode: 'login' });
    },
    signUp: async function(payload) {
      return this.auth({ ...payload, mode: 'signup' });
    },
    auth: async function({ email, password, mode }) {
      const { $supabase } = useNuxtApp();
      
      let response;
      if (mode === 'signup') {
        response = await this.$nuxt.$supabase.auth.signUp({ email, password });
      } else {
        response = await this.$nuxt.$supabase.auth.signIn({ email, password });
      }

      // const { user, sessions, error } = response;

      // if (error) {
      //   throw new Error(error.message);
      // }

      const { user, session, error } = response;
     
      if (error) {
        throw new Error(error.message);
      }
      // if (session && session.access_token) {
      //   this.setAuth(session.access_token, user.id, session.expires_in);
      // } else {
      //   throw new Error('Failed to retrieve authentication token.');
      // }

      if (session?.access_token) {
        this.setAuth(session.access_token, user.id, session.expires_in);
      } else {
        throw new Error('Failed to retrieve authentication token.');
      }
    },
    setAuth(token, userId) {
      this.token = token;
      this.userId = userId;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    },
    tryLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        return this.logout();
      }

      this.token = token;
      this.userId = userId;
    },
    logout(context) {
      const { $supabase } = useNuxtApp();
      $supabase.auth.signOut();

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
  
      this.token = null;
      this.userId = null;
    }
  }
});

export default useAuthenticationStore;