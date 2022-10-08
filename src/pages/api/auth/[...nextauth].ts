import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { loginSchema } from "../../../utils/validations/auth";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user, token }) {
      // Login with Google
      if (session.user && !token) {
        session.user.id = user.id;
      }

      // login with Credentials
      if (session.user && token.role) {
        session.user.role = token.role;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = true; //await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  events: {
    createUser: async (m) => {
      const user = m.user;
      const userDB = await prisma.user.findFirstOrThrow({
        where: { id: user.id },
      });
      const cart = await prisma.cart.create({
        data: {},
      });
      await prisma.client.create({
        data: { userId: userDB.id, cartId: cart.id },
      });
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
