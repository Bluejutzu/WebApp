/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/**"
            },
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
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**"
            }
        ]
    },
    webpack: c => {
        c.experiments = { ...c.experiments, topLevelAwait: true };
        return c;
    }
};

export default nextConfig;
