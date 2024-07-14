## 主要技術列表
- 語言：Typescript
- 網頁框架：React 18
- 全端框架：Next.js 14 (App Router)
- CSS：TailwindCSS
- UI：shadcn
- Auth：Next-auth@^5.0.0-beta.15
- ORM：Prisma
- State Maneger：zustand
- Deployment：Vercel
- DNS：Cloudflare

## Getting Started Local Development
1. setting .env
    ```bash
    # You must create custom environment variables beginning with REACT_APP_
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

    # NextAuth : 用於 JWT JWE 加密
    # Linux openssl rand -base64 32 自動產生
    NEXTAUTH_SECRET="..."

    # 第三方驗證
    # Google Oauth2 Api : 需要自己去 GCP 上申請一個 Web Api 來用
    REACT_APP_GOOGLE_CLIENT_ID="..."
    REACT_APP_GOOGLE_CLIENT_SECRET="..."

    # Line Oauth2
    REACT_APP_LINE_ID="..."
    REACT_APP_LINE_SECRET="..."

    # Resend 寄送驗證信系統
    # Resend API Key
    REACT_APP_RESEND_API_KEY="..."

    # Neon DB Cloud DB 系統
    # Cloud DB
    DATABASE_URL="..."

    # 如果要用本地資料庫
    # Local DB
    #DATABASE_URL="mysql://user:password@localhost:3306/mydb"
    ```
2. run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
