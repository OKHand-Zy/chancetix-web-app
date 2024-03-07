import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google";
import { resolve } from 'path'

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
        async authorize(credentials) {
            await new Promise((resolve) => setTimeout(resolve, 5000))
            const email = 'user@nextemail.com'
            return credentials.email === email && credentials.password === '123456'
                ? { id: 'userId', email }
                : null
            },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user
        const isOnDashboard = nextUrl.pathname.startsWith('/')
        if (isOnDashboard) {
            if (isLoggedIn) return true
            return false
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl))
        }
        return true
    },
  },
}