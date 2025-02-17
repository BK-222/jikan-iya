// import { getAuth } from 'firebase-admin/auth'

// export default defineNuxtPlugin(async (nuxtApp) => {
//   // Use the server-side request event to get cookies, etc.
//   const event = nuxtApp.ssrContext?.event; // available in Nuxt 3 SSR context
  
//   try {
//     const authData = await $fetch('/api/auth/session', { event });
//     // Attach this data to a global state using Nuxt’s useState
//     const globalAuth = useState('globalAuth', () => ({
//       userId: null,
//       isAuthenticated: false
//     }));
//     globalAuth.value = authData;
//   } catch (error) {
//     console.error("Error seeding auth state on server:", error);
//   }
// });
export default defineNuxtPlugin(() => {})