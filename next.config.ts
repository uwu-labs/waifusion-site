import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "waifusion.io",
      },
      {
        protocol: "https",
        hostname: "mvxm2cnmiust5cevgitz644zopjrjvki6cmqind4nnns6kfnqrbq.arweave.net",
      },
    ],
  },
}

export default nextConfig
