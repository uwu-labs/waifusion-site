import type { Metadata, Viewport } from "next"
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
  metadataBase: new URL("https://waifusion.io"),
  title: "The First NFT Community Takeover",
  description:
    "Waifusion is the first generative anime NFT collection on Ethereum and the first NFT community takeover, stewarded by holders and now part of Kusari.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://waifusion.io",
    siteName: "Waifusion",
    title: "The First NFT Community Takeover",
    description:
      "Waifusion is the first generative anime NFT collection on Ethereum and the first NFT community takeover, stewarded by holders and now part of Kusari.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "The First NFT Community Takeover",
    description:
      "Waifusion is the first generative anime NFT collection on Ethereum and the first NFT community takeover, stewarded by holders and now part of Kusari.",
    creator: "@uwucrewnft",
    site: "@uwucrewnft",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
