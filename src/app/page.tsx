"use client";

import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Suspense, useEffect } from "react";
import Loading from "./loading";

let user: KindeUser<Record<string, string>> | null;

export default function Home() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    const IS_DEV = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

    if (IS_DEV) {
        //console.log("Running in development mode");
    } else {
        //console.log("Running in production mode");
    }

    const { isAuthenticated, getUser } = useKindeBrowserClient();
    if (isAuthenticated) {
        user = getUser();
        //console.log(user);
    }

    useEffect(() => {
        if (searchParams.get("toast") === "unauthorized") {
            toast({
                title: "Access Denied",
                description: "You are not authorized to access this page."
            });
            console.log("Toast shown");

            router.replace("/");
        }
    }, [searchParams]);

    return (
        <header className="bg-gradient-to-r from-gradientPrimary from-80% to-gradientSecondary shadow-md rounded-md rounded-tr-none rounded-tl-none">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Suspense fallback={<Loading />}>
                    <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
                    MyLogo
                        {/*<Image src={"https://raw.githubusercontent.com/Vencord/Vesktop/refs/heads/main/static/shiggy.gif"} unoptimized={true} alt="Logo" width={60} height={60}/> */}
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-8 font-extrabold text-lg">
                        <Link href="/" className="text-black hover:text-zinc-700 hover:underline duration-300">
                            Home
                        </Link>
                        <Link href="/about" className="text-black hover:text-zinc-700 duration-300 hover:underline">
                            About
                        </Link>
                    </nav>
                </Suspense>

                {/* CTA Button */}
                <div className="flex-wrap space-x-4 text-lg font-semibold">
                    {isAuthenticated ? (
                        <div className="flex wrap space-x-2">
                            <div>
                                <>
                                    <Link href={`/dashboard/${user?.id}`}>
                                        <Image
                                            src={`${user?.picture}`}
                                            alt={`${user?.given_name}_profile`}
                                            width={40}
                                            height={40}
                                            priority={true}
                                            className="rounded-full"
                                        />
                                    </Link>
                                </>
                            </div>
                            <LogoutLink className="text-black text-lg">Sign out</LogoutLink>
                        </div>
                    ) : (
                        <>
                            <RegisterLink
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "lg",
                                    className:
                                        "font-semibold text-[17px] text-black hover:text-white hover:font-bold shadow-xl"
                                })}
                            >
                                Sign up
                            </RegisterLink>
                            <LoginLink
                                className={buttonVariants({
                                    size: "lg",
                                    className:
                                        "font-semibold text-[17px] hover:text-white hover:font-bold hover:bg-gradient-to-r hover:from-gradientSecondary/30 hover:from-40% hover:to-gradientPrimary hover:duration-150 shadow-xl"
                                })}
                            >
                                Login
                            </LoginLink>
                        </>
                    )}
                </div>
                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>
        </header>
    );
}
