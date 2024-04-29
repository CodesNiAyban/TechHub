import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { getUserByID } from "../data/user"
import authConfig from "./auth.config"
import prisma from "./lib/prisma"
import { UserRole } from "@prisma/client"

declare module "@auth/core" {
  interface Session {
    user: {
      role: "ADMIN" | "GUEST"
    } & DefaultSession["user"]
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  trustHost: true,
  callbacks: {
    async session({ token, session }) {

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserByID(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    }
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  ...authConfig,
})