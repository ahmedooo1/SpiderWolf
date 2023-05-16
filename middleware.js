import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: ({ token }) => token?.role === "ADMIN",
        },
    }
);

export const config = { matcher: ["/admin/:path*"] };