/* eslint-disable @typescript-eslint/no-explicit-any */

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async (params: any) => {
    //const dashboardId = pathname.match(/\/dashboard\/(kp_[\w\d]+)/)?.[1] as string;
    const { id } = await params;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (id !== user.id) {
        console.log("IDs do not match", id, user.id);
        return redirect("/");
    }
    console.log("IDs do not match", id, user.id);
    return <div>lmao</div>;
};

export default page;
