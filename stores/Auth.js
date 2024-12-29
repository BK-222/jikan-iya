import { defineStore } from 'pinia';

const useAuthenticationStore = defineStore('auth', {
  state: () => ({
    email: null,
    password: null,
    userId: null,
    token: null
  }),
  actions: {
    setEmail(email) {
      this.email = email;
    }
  }
});

export default useAuthenticationStore; 