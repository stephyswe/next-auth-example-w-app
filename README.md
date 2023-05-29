This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# AUTH NEXTJS

## update refresh token (jwt)
https://www.youtube.com/watch?v=gDsCueKkFEk


https://github.com/joschan21?tab=repositories
https://github.com/vahid-nejad/update-next-auth-session/blob/main/src/app/api/auth/%5B...nextauth%5D/route.ts
https://www.sammeechward.com/next-auth-and-prisma
https://github.com/Sam-Meech-Ward/code_snippets_prisma_next_demo/tree/auth
https://stackoverflow.com/questions/69068495/how-to-get-the-provider-access-token-in-next-auth
https://www.prisma.io/docs/concepts/components/prisma-client/middleware/session-data-middleware
https://authjs.dev/guides/basics/role-based-access-control

https://github.com/nextauthjs/next-auth/issues/4477

How to add JWT to Next-Auth:
https://www.youtube.com/watch?v=0eu4_lLFkGk&t=1362s

session: {
    strategy: "jwt",
  },

otherwise remove and add in prisma/schema.prisma

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id             Int       @id @default(autoincrement())
  name           String
  email          String    @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  role           String? // New column

  accounts Account[]
  sessions Session[]
}

model Account {
  id                Int     @id @default(autoincrement())
  userId            Int // Changed to Int type
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id                  String   @id @default(cuid())
  sessionToken        String   @unique
  userId              Int
  expires             DateTime
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```
