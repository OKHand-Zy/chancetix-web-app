import NextAuth from 'next-auth'
import authConfig  from '@/auth.config'

import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'


export const { 
    handlers: { GET, POST},
    signIn, 
    signOut,
    auth, 
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
})