import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "../../../server/auth/user";
import { prisma } from "../../../server/db/client";
import { enforceRateLimit } from "../../../server/common/rate-limit";
import { verifyPassword } from "../../../server/auth/password";
import { loginSchema } from "../../../utils/validations/auth";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          await enforceRateLimit(
            "login",
            String(req.headers?.["cf-connecting-ip"] ?? "local"),
            20,
            600,
          );
        } catch {
          return null;
        }
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await findUserByEmail(prisma, parsed.data.email);
        if (
          !user ||
          !(await verifyPassword(parsed.data.password, user.passwordHash))
        )
          return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
