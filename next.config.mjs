/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "mvxm2cnmiust5cevgitz644zopjrjvki6cmqind4nnns6kfnqrbq.arweave.net",
      },
    ],
  },
}

export default nextConfig
