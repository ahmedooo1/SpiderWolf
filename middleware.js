import { Role } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.auth;
    if (req.url.startsWith('/admin/') && role !== Role.ADMIN) {
      return NextResponse.rewrite(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.role === Role.USER || token?.role === Role.ADMIN;
      },
    },
  },
);


