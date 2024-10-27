"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { generateUUID, passwordSchema, userIdSchema } from "@/db/utils";

const IS_DEV = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";
const BASE_URL = IS_DEV ? "http://localhost:3000" : "https://bluejutzu.deno.dev";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = () => {
        const passwordValidation = passwordSchema.safeParse(password);
        if (!passwordValidation.success) {
            setPasswordError(passwordValidation.error.errors[0].message);
            return;
        } else {
            setPasswordError("");
        }

        const userId = generateUUID();
        const userIdValidation = userIdSchema.safeParse(userId);
        if (!userIdValidation.success) {
            console.error("User ID validation failed:", userIdValidation.error.errors);
            return;
        }

        axios
            .post(BASE_URL + "/api/user", {
                user: {
                    email,
                    password,
                    username,
                    userId
                }
            })
            .then(v => {
                if (v.data.error) {
                    console.error(v.data);
                } else {
                    console.log(v.data);
                }
            });

        // console.log("Email:", email);
        // console.log("Password:", password);
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Max Mustermann"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
                    </div>
                    <Button type="button" className="w-full" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
