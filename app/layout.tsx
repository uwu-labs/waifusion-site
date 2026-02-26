import type { Metadata } from "next"
import { Inter, Pixelify_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pixelify = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixelify", weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Waifusion | Community-Born NFT Legacy",
  description:
    "Waifusion is the first generative anime collection on Ethereum. Created March 2021, now community-owned under Kusari.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${pixelify.variable} font-sans antialiased min-h-screen`}
        style={{
          background: "linear-gradient(to right, #FAF5FF 0%, #FDF2F8 50%, #EFF6FF 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </body>
    </html>
  )
}
