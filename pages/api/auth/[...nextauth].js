// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import prisma from '../../../lib/prismadb';
// import bcrypt from 'bcrypt';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({ where: { email: credentials.email } });
//         if (!user) {
//           throw new Error('Invalid email or password');
//         }
//         const isValidPassword = await bcrypt.compare(credentials.password, user.password);
//         if (!isValidPassword) {
//           throw new Error('Invalid email or password');
//         }
//         return { email: user.email };
//       },
//     }),
//   ],
//   // pages: {
//   //   signIn: '/login'
//   // },
//   callbacks: {
//     async jwt(token, user) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session(session, token) {
//       if (token.role) {
//         session.role = token.role;
//       }
//       return session;
//     },
//   },
// });



import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({ where: { email: credentials.email } });
        if (!user) {
          throw new Error('Invalid email or password');
        }
        try {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            throw new Error('Invalid email or password');
          }
          return { email: user.email };
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session(session, token) {
      if (token.role) {
        session.role = token.role;
      }
      return session;
    },
  },
});
