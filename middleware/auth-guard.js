const authMiddleware = defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('No token found. Redirecting to login...');
    return navigateTo('/auth');
  }
});

export default authMiddleware;
