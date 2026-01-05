import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { EUserRole, ISession } from "./types/user";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = (await auth()) as ISession | null;

    // console.log({ session });
    // Define protected paths
    const isAdminPath = pathname.startsWith("/admin");
    const isPlayerDashboardPath = pathname.startsWith("/players/dashboard");

    // Check if path is protected
    const isProtectedPath = isAdminPath || isPlayerDashboardPath;

    // If NOT a protected path, allow access
    if (!isProtectedPath) {
        return NextResponse.next();
    }

    // If no session, redirect to login
    if (!session?.user) {
        return NextResponse.redirect(
            new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url)
        );
    }

    const role = session.user.role;

    // Check admin authorization
    // Player trying to access admin
    if (isAdminPath && role !== EUserRole.ADMIN) {
        if (role === EUserRole.PLAYER) {
            return NextResponse.redirect(new URL("/players/dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/auth/not-authorized", request.url));
    }

    // Check player authorization
    // Admin trying to access player dashboard
    if (isPlayerDashboardPath && role !== EUserRole.PLAYER) {
        if (role === EUserRole.ADMIN) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/auth/not-authorized", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/players/dashboard/:path*",
    ],
};

