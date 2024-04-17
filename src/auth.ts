import NextAuth, { type DefaultSession} from 'next-auth'
import authConfig  from '@/auth.config'

import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'

import { getUserByEmail, getUserById } from '@/data/user'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getAccountByUserId } from '@/data/account'

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

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
    user: ExtendedUser
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
    //update,
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
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true ;

      // Prevent sing in without email verification
      if (user.id == undefined) return false ;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false ;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        if (!twoFactorConfirmation) {
          return false;
        }
        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id
          }
        });
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
        // 如果 token 中的 sub 與 session 中的 user.id 都存在的話，將 token.sub 值給予 seesion.user.id 以确保会话对象中的用户ID是正确的
      if (token.sub && session.user)  {
          session.user.id = token.sub
      }

      //
      if (token.role && session.user) {
          session.user.role = token.role as UserRole ;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.OAuth as boolean
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

      const existingAccount = await getAccountByUserId(
        existingUser.id
      )

      token.OAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt' ,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // ref: https://next-auth.js.org/configuration/options#jwt
  },
  ...authConfig
})

// can review https://authjs.dev/getting-started/typescript
