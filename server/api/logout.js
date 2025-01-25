export default defineEventHandler((event) => {
  // Clear the auth_token cookie
  deleteCookie(event, "auth_token");
  return { message: "Logged out successfully." }
});