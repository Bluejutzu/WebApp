"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { UpdateUserData } from "@kinde/management-api-js";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const IS_DEV = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";
const BASE_URL = IS_DEV ? "http://localhost:3000" : "https://bluejutzu.deno.dev";

export function UpdateUser() {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
    const res = React.useRef("");
    const username = React.useRef("");

    const { getUser } = useKindeBrowserClient();
    const user = getUser();

    const handleOnClick = () => {
        if (user?.id) {
            const inputbody: UpdateUserData = {
                id: user.id,
                requestBody: {
                    given_name: username.current,
                    family_name: username.current
                }
            };

            axios
                .patch(BASE_URL + "/api/users", inputbody)
                .then(v => {
                    res.current = v.data;
                })
                .catch(e => {
                    res.current = e.message;
                });
        } else {
            res.current = "User ID missing";
        }
        console.log(res.current);
    };

    return (
        <form onSubmit={handleOnClick} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input onChange={e => (username.current = e.target.value)} id="username" defaultValue="@shadcn" />
            </div>
            <Button type="submit">
                Save changes
            </Button>
            <div>{res.current ? res.current : "No response yet"}</div>
        </form>
    );
}
