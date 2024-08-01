/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "rtijrfzhrfovtojfqxca.supabase.co",
      },
    ],
  },
};

export default nextConfig;
