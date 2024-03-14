import NextAuth, {DefaultSession} from 'next-auth'
import authConfig  from '@/auth.config'

import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'

import { getUserByEmail, getUserById } from '@/data/user'

// Declare your framework library
declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {

    }
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {

    }
    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
        user: {
            role: string
        } & DefaultSession['user']
    }
}

// jwt module Error : https://github.com/nextauthjs/next-auth/issues/9645
declare module "@auth/core/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
      /** OpenID ID Token */
        role?: "ADMIN" | "USER"
    }
}

export const { 
    handlers: { GET, POST},
    signIn, 
    signOut,
    auth, 
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount( { user } ) {
      await db.user.update({
        where: { id: user.id},
        data: { emailVerified: new Date() }
      })
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
        // 如果 token 中的 sub 與 session 中的 user.id 都存在的話，將 token.sub 值給予 seesion.user.id 以确保会话对象中的用户ID是正确的
      if (token.sub && session.user){
          session.user.id = token.sub
      }
      // 
      if (token.role && session.user){
          session.user.role = token.role as UserRole ;
      }
      return session
    },
    async jwt({ token }) {
      // 
      if (!token.sub) {
        return token
      }
      // 
      const existingUser = await getUserById(token.sub)
      if (!existingUser) {
        return token
      }
      token.role = existingUser.role
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})

// can review https://authjs.dev/getting-started/typescript