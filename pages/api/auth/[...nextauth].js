import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Role } from '@prisma/client';
import prisma from '../../../lib/prismadb';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({ where: { email: credentials.email } });
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword || !user) {
          throw new Error('Invalid email or password');
        }
        prisma.$disconnect();
        return {
          email: user.email,
          name: user.pseudo,
          role: user.role
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token;
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/',
  }

});
