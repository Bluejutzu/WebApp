"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

const Header = () => {
    const searchParams = useSearchParams();
    //const router = useRouter();
    const { toast } = useToast();
    const canShowToast = useRef(false);

    useEffect(() => {
        canShowToast.current = searchParams.get("toast") === "unauthorized";
        console.log(canShowToast.current);
        
        if (canShowToast.current) {
            toast({
                title: "Access Denied",
                description: "You are not authorized to access this page."
            });
            console.log("Toast shown");

            // router.replace("/");
            canShowToast.current = false;
        }
    }, [canShowToast, toast, searchParams]);

    return (
        <header className=" h-16 bg-gradient-to-r from-gradientPrimary from-80% to-gradientSecondary shadow-md rounded-md rounded-tr-none rounded-tl-none rounded-bl-none">
            <div className=" container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
                    MyLogo
                    {/*<Image src={"https://raw.githubusercontent.com/"} unoptimized={true} alt="Logo" width={60} height={60}/> */}
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8 font-bold text-lg">
                    <Link href="/" className="text-black hover:text-zinc-700 hover:underline duration-300">
                        Home
                    </Link>
                    <Link href="/" className="text-black hover:text-zinc-700 duration-300 hover:underline">
                        About
                    </Link>
                </nav>

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
};

export default Header;
