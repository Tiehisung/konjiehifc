import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { EUserRole, ISession } from "./types/user";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = (await auth()) as ISession | null;

    // console.log({ session });

    //   Only protect /admin
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    if (!session) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }

    //  Signed in but not authorized
    if (!session.user.role?.includes(EUserRole.ADMIN)) {
        return NextResponse.redirect(
            new URL("/auth/not-authorized", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
    ],
};

