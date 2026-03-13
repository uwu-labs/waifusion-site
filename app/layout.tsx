import type { Metadata } from "next"
import localFont from "next/font/local"
import { Inter } from "next/font/google"
import { CursorEffect } from "./components/CursorEffect"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const boldPixels = localFont({
  src: "../public/BoldPixels.ttf",
  variable: "--font-pixelify",
})

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
        className={`${inter.variable} ${boldPixels.variable} font-sans antialiased min-h-screen`}
        style={{
          background: "linear-gradient(to right, #FAF5FF 0%, #FDF2F8 50%, #EFF6FF 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <CursorEffect />
        {children}

      </body>
    </html>
  )
}
