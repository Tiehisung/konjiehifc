import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const pathname = request.nextUrl.pathname; // The current request path
    const token = request.nextauth?.token; // The token from NextAuth

    // Check if the user is trying to access an admin page
    if (pathname.startsWith("/admin")) {
      // If the user is not an admin, redirect to the home page
      if (!(token?.role as string)?.includes("admin")) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If already on the correct path, do not redirect
      return NextResponse.next();
    }

    return NextResponse.next(); // Allow other requests to proceed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure the user is authorized if a token exists
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // Apply this middleware to admin paths
};
