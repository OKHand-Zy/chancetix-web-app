import init from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export default init({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 在這裡處理身份驗證邏輯
        const user = { id: 1, name: 'Lin' }; // 用實際的用戶對象替換這裡

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
    // 根據需要添加其他提供者
  ],
  // 根據需要添加其他配置選項
});