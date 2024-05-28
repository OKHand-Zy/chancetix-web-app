import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  activityInfoPath,
} from '@/routes';


const { auth } = NextAuth(authConfig);


function isAccessTime() {
  // 創建一個表示 5月12號下午12:00 UTC+8 的 Date 對象
  const targetDate = new Date(2024, 4, 12, 12, 0, 0); // 注意：月份是從0開始計算的
  // 將 targetDate 轉換為 UTC+8 時區的字符串表示
  const targetDateUTC8 = targetDate.toLocaleString("en-US", { timeZone: "Asia/Taipei" });
  // 創建一個新的 Date 對象，從 UTC+8 時區的字符串表示中解析出來
  const targetDateParsed = new Date(targetDateUTC8);

  // 獲取當前的 UTC+8 時區時間
  const nowUTC8 = new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" });
  // 創建一個新的 Date 對象，從 UTC+8 時區的字符串表示中解析出來
  const nowParsed = new Date(nowUTC8);

  return nowParsed >= targetDateParsed;
}

export default auth( (req) => {
  console.log("ROUTE:",req.nextUrl.pathname)
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || nextUrl.pathname.startsWith(activityInfoPath);;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // 指定時間開放路徑
  const isActivity2Route = nextUrl.pathname === "/Activity/info/Activity_3";

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

  // 如果 是否有登入 與 前往是否為公開路由 就導向 登入頁面
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if(nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl) )
  }

  // 如果是 Activity_3 路由且時間未到，則導向 首頁
  if (isActivity2Route && !isAccessTime()) {
    // 直接返回 首頁
    return Response.redirect(new URL("/", nextUrl) )
  }

  return undefined;
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
