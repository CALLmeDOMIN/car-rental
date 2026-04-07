/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        // port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
