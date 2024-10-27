import Link from "next/link";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
    const IS_DEV = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

    if (IS_DEV) {
        console.log("Running in development mode");
    } else {
        console.log("Running in production mode");
    }
    return (
        <header className="bg-gradient-to-r from-primary to-secondary shadow-md rounded-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
                    MyLogo
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8 font-semibold">
                    <Link href="/" className="text-black hover:text-blue-500">
                        Home
                    </Link>
                    <Link href="/about" className="text-black hover:text-blue-500">
                        About
                    </Link>
                </nav>

                {/* CTA Button */}

                <RegisterLink>Sign up</RegisterLink>
                <LoginLink>Login in</LoginLink>

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
