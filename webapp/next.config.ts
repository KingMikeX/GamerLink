import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: "https://gamerlinkfrontend.vercel.app", // für client UND server
  },
};

export default nextConfig;
