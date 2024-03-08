import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Line from "next-auth/providers/line";
import bcrypt from 'bcryptjs';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';


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
    GitHub({ // change to line
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }), 
    Line({
      clientId: process.env.LINE_ID,
      clientSecret: process.env.LINE_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }), 
  ],

} satisfies NextAuthConfig