/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "glustay-bucket.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
