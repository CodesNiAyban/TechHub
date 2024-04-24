import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "./lib/prisma"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { Adapter } from "next-auth/adapters"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  theme: {
    logo: "/logo.png"
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    }
  },
  providers: [Google, Github]
})