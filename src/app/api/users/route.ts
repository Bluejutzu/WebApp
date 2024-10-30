import { NextResponse } from "next/server";
import { UpdateUserData, Users } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
    const { users } = await Users.getUsers();

    return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
    const { refreshTokens, getPermission } = getKindeServerSession();
    const perms = await getPermission("access_dev");

    if (!perms?.isGranted) return NextResponse.json("failed", { status: 401, statusText: "unauthorized" });

    const res = (await request.json()) as UpdateUserData;

    console.log(res);
    await refreshTokens();
    return NextResponse.json("guess it worked");
}
