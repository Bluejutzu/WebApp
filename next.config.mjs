/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "cdn.discord.com",
                port: "",
                pathname: "/**"
            }
        ]
    },
    experimental: {
        reactCompiler: true
    }
};

export default nextConfig;
