import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';


const { auth } = NextAuth(authConfig);

export default auth( (req) => {
  console.log("ROUTE:",req.nextUrl.pathname)
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // 確認開頭是 api router
  if (isApiAuthRoute) {
    return undefined;
  }
  // 確認是否前往 登入 router
  if (isAuthRoute){
    // 如果已經登入，直接重定向前往 default
    if (isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl) )
    }
    return undefined;
  }
  // 如果 沒登入 與 前往非公開路由 就導向 登入頁面
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl) )
  }

  return undefined;  
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
