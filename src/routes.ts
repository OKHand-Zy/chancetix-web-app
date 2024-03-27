/*
    An array of public routes that are accessible to the public
    These routes do not require authentication
    @type {string[]}
*/
export const publicRoutes = [
    "/",
    "/About",
    "/Activity",
    "/FAQ",
    "/News",
    "/SwitchTix",
    "/auth/new-verification",
    "/tasks",
    "/Activity/info/Activity_1",
    "/Activity/info/Activity_2",
    "/Activity/info/Activity_3",
];

/*
    An array of public routes that are use for authentication
    These routes are will require logged in users to /settings
    @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/*
    The prefix for API authentication routes
    Route that starts with this prefix prefix are used for API authentication purposes
    @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/*
    The default redirect path after logging in
    @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/settings";

