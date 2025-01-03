import { defineStore } from 'pinia';
// import { supabase } from '@/plugins/supabase';

const useAuthenticationStore = defineStore('auth', {
  state: () => ({
    userId: null,
    token: null,
    didAutoLogout: false
  }),
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getToken(state) {
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
      
      console.log('Store Auth Payload:', { email, password, mode });
      let response;
      try {
        if (mode === 'signup') {
          response = await $supabase.auth.signUp({ email, password });
        } else {
          response = await $supabase.auth.signInWithPassword({ email, password });
        }
      } catch (err) {
        console.error('Supabase API Error:', err);
        throw new Error('Something went wrong with the Supabase request.');
      }

      // const { user, session, error } = response;

      const user = response.data?.user;
      const session = response.data?.session;
      const error = response.error;

      if (error) {
        console.error('Supabase Error:', error.message); // Add this line
        throw new Error(error.message);
      }

      if (session?.access_token) { // the same as session && session.access_token
        console.log('Session obtained:', session);
        this.setAuth(session.access_token, user.id, session.expires_in);
      } else if (user) {
        throw new Error('Account created. Please check your email to confirm your account.');
      } else {
        console.error('Signup user:', user);
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