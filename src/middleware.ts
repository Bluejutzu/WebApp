import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(req: NextRequest) {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const userId = (await getUser()).id;
    const requestId = req.nextUrl.pathname.split("/").pop(); // Assumes user ID is the last part of path

    if (!isAuthenticated) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("toast", "unauthorized");
        return NextResponse.redirect(url);
    } else if (requestId !== userId) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("toast", "unauthorized");
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};
