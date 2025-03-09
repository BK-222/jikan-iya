import useAuthStore from '~/stores/auth'

export default defineNuxtPlugin(async() => {
  const authStore = useAuthStore() 
  if (import.meta.client && !authStore.isAuthenticated) {
    await authStore.tryLogin()
  }
})

// export default defineNuxtPlugin(async (nuxtApp) => {
//   const authStore = useAuthStore();
//   if (!authStore.isAuthenticated) {
//     // ensures server waits for login check
//     if (import.meta.server) {
//       await authStore.tryLogin();
//     } else {
//       authStore.tryLogin(); // client can run async without blocking
//     }
//   }
// });


// export default defineNuxtPlugin({
//   name: 'auto-login',
//   async setup(nuxtApp) {
//     const authStore = useAuthStore();
//     if (!authStore.isAuthenticated) {
//       await authStore.tryLogin(); // Force await in SSR
//     }
//   },
//   enforce: 'pre' // Run before other plugins
// });