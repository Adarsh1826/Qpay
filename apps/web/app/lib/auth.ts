import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@repo/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        const { username, password } = credentials;
        const existingUser = await prisma.user.findUnique({
          where: { username },
        });

        if (existingUser) {
          const isValid = await bcrypt.compare(password, existingUser.password);
          if (!isValid) return null;
          return { id: existingUser.id.toString(), name: existingUser.username };
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await prisma.user.create({
            data: { username, password: hashedPassword },
          });
          return { id: newUser.id.toString(), name: newUser.username };
          console.log(newUser);
          
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    
  },
};

export default NextAuth(authOptions);
