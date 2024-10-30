import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(req: NextRequest) {
    const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
    const user = await getUser();
    const access_dev = await getPermission("access_dev");
    const isAuth = await isAuthenticated();

    const url = req.nextUrl.clone();
    const match = url.pathname.match(/\/(kp_[a-f0-9]{32})/);

    /* Dev route "/dev/**" */
    if (/^\/dev(\/|$)/.test(url.pathname) && isAuth) {
        if (!access_dev?.isGranted) {
            url.pathname = "/";
            url.searchParams.set("toast", "unauthorized");
            url.searchParams.set(`dev`, "cant_access");
            return NextResponse.redirect(url);
        }
    }

    /* Dashboard route */
    if (!isAuthenticated) {
        url.pathname = "/";
        url.searchParams.set("toast", "unauthorized");
        url.searchParams.set("isAuth", isAuthenticated);

        return NextResponse.redirect(url);
        
    } else if (match) {
        const requestId = match[1];

        if (requestId !== user.id) {
            url.pathname = "/";
            url.searchParams.set("toast", "unauthorized");
            url.searchParams.set("id", `${requestId}:${user.id}`);
            console.log(requestId, user.id);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/dev/:path*", "/admin/:path*"]
};
