import { defineStore } from 'pinia';
// import useProfileStore from '~/stores/profile';

let timer;

const useAuthenticationStore = defineStore('auth', {
  state: () => ({
    userId: null,
    token: null,
    autoLogout: false
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
      return state.autoLogout;
    }
  },
  actions: {
    login: async function(payload) {
      return this.auth({ ...payload, mode: 'login' });
    },
    signup: async function(payload) {
      return this.auth({ ...payload, mode: 'signup' });
    },
    auth: async function({ email, password, mode }) {
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwWS_TdY3PTtNR1w_oDz6JDt45ZrH0ckc';

      if (mode === 'signup') {
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwWS_TdY3PTtNR1w_oDz6JDt45ZrH0ckc';
        } 
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      this.setAuth(responseData.idToken, responseData.localId, expirationDate, expiresIn);
    },
    setAuth(token, userId, tokenExpiration, expiresIn) {
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('tokenExpiration', tokenExpiration);

      timer = setTimeout(() => { //arrow function binds 'this' to the store (avoids issues of the global object)
        this.autoLogout();
      }, expiresIn);

      console.log("Setting userId:", userId);
      this.token = token;
      this.userId = userId;
    },
    tryLogin() {
      const token = localStorage.getItem('token');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const userId = localStorage.getItem('userId');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function() {
        this.autoLogout();
      }, expiresIn);

      if (token && userId) {
        this.token = token;
        this.userId = userId;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      this.token = null;
      this.userId = null;
      this.autoLoguot = false // resets the flag on manual logout

      // const profileStore = useProfileStore();
      // profileStore.clearState();
    },
    autoLogout() {
      this.logout();
      this.autoLogout = true;
    }
  }
});

export default useAuthenticationStore;
