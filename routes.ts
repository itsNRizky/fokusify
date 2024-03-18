/**
 * An array of routes that are public for unauthenticated user
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are for authenticated user
 * These routes will redirect authenticated user to /settings
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * The prefix for API authentication routes. Which doesn't required an authenticated user
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/app";
