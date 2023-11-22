/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gxofqswgvpwamruhdboy.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
