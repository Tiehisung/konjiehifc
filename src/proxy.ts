// /proxy.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";


export type AuthenticatedRequest = NextRequest & {
  nextauth?: {
    token?: {
      role?: string;
      [key: string]: unknown;
    } | null;
  };
};
export default withAuth(
  function proxy(request: AuthenticatedRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth?.token;

    if (pathname.startsWith("/admin")) {
      if (typeof token?.role !== "string" || !token.role.includes("admin")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
  // optionally specify runtime, e.g. if you want Node.js runtime
  // runtime: "nodejs",
};
