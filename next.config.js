/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "uploadthing.com",
                // port: "",
                // pathname: "/account123/**",
            },
        ],
    },
};

module.exports = nextConfig;
