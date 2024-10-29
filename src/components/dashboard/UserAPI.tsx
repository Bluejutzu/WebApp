"use client";

import React from "react";
import { UpdateUser } from "../DrawerDialog/UpdateUserDialog";

const UserAPI = () => {
    return (
        <div className="space-y-4 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <UpdateUser />
        </div>
    );
};

export default UserAPI;
