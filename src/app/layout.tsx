import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Header from "@/components/main/Header";
import { Suspense } from "react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900"
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900"
});

export const metadata: Metadata = {
    title: "DenoNextJSApp",
    description: "Testing environment for the usage of Deno and NextJS"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
                <Suspense>
                    <Header />
                    <SidebarProvider className="z-0" defaultOpen={false}>
                        <AppSidebar />
                        <SidebarTrigger className="absolute right-[-.01px] bg-black rounded-tr-none z-50" /> {children}{" "}
                        <Toaster />
                    </SidebarProvider>
                </Suspense>
            </body>
        </html>
    );
}
