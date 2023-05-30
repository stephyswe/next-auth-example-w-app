import { AuthOptions, User } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import prisma from "@/lib/prisma"
import axios from "axios"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("no credentials")
        }

        if (!credentials.email) {
          throw new Error("Invalid email")
        }

        if (!credentials.password) {
          throw new Error("Invalid password")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("no user found")
        }

        if (!user?.hashedPassword) {
          throw new Error("no hashedPassword found")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error("incorrect password")
        }

        const { hashedPassword, createdAt, ...dbUserWithoutPassword } = user

        return dbUserWithoutPassword
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: process.env.GITHUB_REDIRECT_URI as string,
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("is this ever called")
      console.log("what is account provider", account?.provider)
      if (account?.provider === "github") {
        // Retrieve the authorization code from the URL query parameters
        const { code } = account.params

        try {
          // Exchange the authorization code for an access token
          const response = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
              code,
              client_id: process.env.GITHUB_CLIENT_ID,
              client_secret: process.env.GITHUB_CLIENT_SECRET,
            }
          )

          // Parse the response to extract the access token
          const accessToken = new URLSearchParams(response.data).get(
            "access_token"
          )

          // Perform any additional logic with the access token if needed

          console.log("GitHub authentication successful")
        } catch (error) {
          console.error("GitHub authentication failed", error)
          throw new Error("GitHub authentication failed")
        }
      }
      return true
    },
    async session({ session, token }) {
      session.user.role = "USER"
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
