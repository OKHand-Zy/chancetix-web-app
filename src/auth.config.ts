import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google";
import Line from "next-auth/providers/line";
import bcrypt from 'bcryptjs';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

// /api/auth/providers
export default {
  providers: [ 
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          // 確認 User 跟 User Password 是否存在
          if (!user || !user.password) {
            return null;
          }
          // 輸入 Password 加密 跟 DB 裡的 Password 比較
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        
        return null;
      }
  }),  
    Line({
      clientId: process.env.REACT_APP_LINE_ID,
      clientSecret: process.env.REACT_APP_LINE_SECRET,
      checks: ["state"],
    }),
    Google({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    }), 
  ],

} satisfies NextAuthConfig