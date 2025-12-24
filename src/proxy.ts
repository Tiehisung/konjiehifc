import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { EUserRole, ISession } from "./types/user";

export async function proxy(request: NextRequest) {
    const session = (await auth()) as ISession | null;

    // console.log({ session });

    // 1️⃣ Not signed in → redirect to login
    if (!session) {
        return NextResponse.redirect(
            new URL("/api/auth/signin", request.url)
        );
    }

    // 2️⃣ Signed in but not authorized
    if (!session.user.role?.includes(EUserRole.ADMIN)) {
        return NextResponse.redirect(
            new URL("/auth/not-authorized", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
