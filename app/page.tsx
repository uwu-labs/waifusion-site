"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import MagneticStars from "./MagneticStars"
import MobileLanding from "./components/MobileLanding"
import GalleryWaifus from "./GalleryWaifus"
// Waifusion images - hero stays on Arweave; gallery + info card use local waifus (waifu1–5 in usage order)
const WAIFU_IMAGE_BASE = "https://arweave.net/ZW7NCaxFJT6IlTInn3OZc9MU1UjwmQQ0fGtbLyithEM/"
const WAIFUS_LOCAL = [
  "/waifus/waifu1.png",
  "/waifus/waifu2.png",
  "/waifus/waifu3.png",
  "/waifus/waifu4.png",
  "/waifus/waifu5.png",
  "/waifus/waifu6.jpg",
  "/waifus/waifu7.jpg",
  "/waifus/waifu8.jpg",
] as const;

// Pixel art decorations
const PIXEL_HEARTS = "/pixel-assets/pixel-hearts.gif"
const PIXEL_STARS_MIXED = "/pixel-assets/pixel-stars-mixed.gif"
const PIXEL_STAR_PURPLE = "/pixel-assets/pixel-star-purple.gif"
const PIXEL_STAR_BLUE = "/pixel-assets/pixel-star-blue.gif"
const PIXEL_STAR_YELLOW = "/pixel-assets/pixel-star-yellow.gif"
const PIXEL_STAR_ORANGE = "/pixel-assets/pixel-star-orange.gif"
const PIXEL_STAR_GREEN = "/pixel-assets/pixel-stars-green.gif"



function DesktopLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-300 to-pink-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-center relative">
          <Link href="/" className="flex items-center gap-2 no-hover">
            <span className="font-pixel font-bold text-white text-2xl">Waifusion</span>
            <span className="text-white/70 text-m">by Kusari</span>
          </Link>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <Link href="https://twitter.com/waaboratory" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Link>
            <Link href="https://discord.gg/cKWpT7HGam" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
            </Link>
            <Link href="https://opensea.io/collection/waifusion" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="OpenSea">
                <defs>
                  <mask id="opensea-cutout">
                    <rect width="360" height="360" fill="white" />
                    <path d="M252.072 212.292C245.826 220.662 232.686 234.558 225.378 234.558H191.412V212.274H218.466C222.336 212.274 226.026 210.708 228.69 207.954C242.586 193.554 250.614 176.418 250.614 158.04C250.614 126.684 227.178 98.964 191.394 82.26V67.284C191.394 60.84 186.174 55.62 179.73 55.62C173.286 55.62 168.066 60.84 168.066 67.284V73.494C158.04 70.56 147.42 68.328 136.332 67.05C154.692 86.994 165.906 113.67 165.906 142.92C165.906 169.146 156.942 193.23 141.876 212.31H168.066V234.63H129.726C124.542 234.63 120.33 230.436 120.33 225.234V215.478C120.33 213.768 118.944 212.364 117.216 212.364H66.672C65.682 212.364 64.836 213.174 64.836 214.164C64.8 254.088 96.39 284.058 134.172 284.058H240.822C266.382 284.058 277.812 251.298 292.788 230.454C298.602 222.39 312.552 215.91 316.782 214.11C317.556 213.786 318.006 213.066 318.006 212.22V199.26C318.006 197.946 316.71 196.956 315.432 197.316C315.432 197.316 253.782 211.482 253.062 211.68C252.342 211.896 252.072 212.31 252.072 212.31V212.292Z" fill="black" />
                    <path d="M146.16 142.83C146.16 122.724 139.266 104.22 127.746 89.586L69.732 189.972H132.138C141.012 176.436 146.178 160.236 146.178 142.848L146.16 142.83Z" fill="black" />
                  </mask>
                </defs>
                <circle cx="180" cy="180" r="180" fill="currentColor" mask="url(#opensea-cutout)" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - same gradient as body for consistent look */}
      <section
        className="relative pt-6 pb-12 px-5 sm:px-8 md:px-10"
        style={{
          background: "linear-gradient(to right, #FAF5FF 0%, #FDF2F8 50%, #EFF6FF 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center w-full">
            {/* Text + image grouped in center from md up */}
            <div className="w-full flex flex-col md:flex-row md:gap-8 md:items-center md:justify-center">
              {/* Text block */}
              <div className="w-full md:max-w-md md:flex-shrink-0 flex flex-col">
                <div className="order-1 overflow-hidden inline-flex items-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 text-white text-xs font-bold uppercase tracking-wider mb-2 w-64 h-[28px] animate-gradient self-center md:self-start">
                  <div className="flex whitespace-nowrap animate-slide w-max">
                    <span className="px-4">First NFT Community Takeover!</span>
                    <span className="px-4">First NFT Community Takeover!</span>
                  </div>
                </div>

                <h1
                  className="order-2 font-pixel text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 bg-clip-text text-transparent inline-block text-center md:text-left"
                  style={{ backgroundImage: 'linear-gradient(to bottom, #FF008C 0%, #DFA7FF 37%, #0894FF 100%)' }}
                >
                  Waifusion
                  <img src={PIXEL_HEARTS} alt="" width={40} height={40} className="inline-block ml-2 align-middle" />
                  <br />
                  a community-
                  <br />
                  born NFT legacy
                </h1>

                <p className="order-3 text-gray-600 mb-4 leading-relaxed text-sm sm:text-base text-center md:text-left max-w-md">
                  Waifusion is the <span className="font-semibold text-gray-900">first generative anime collection</span> born on Ethereum.
                  Although the original team neglected it, the community refused to end its story.
                </p>

                <div className="order-4 w-fit flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                  <div className="pixel-border-outer" style={{ color: '#fa4cbdff' }}>
                    <Link
                      href="https://discord.gg/cKWpT7HGam"
                      target="_blank"
                      className="h-[40px] px-5 flex items-center justify-center text-white font-medium hover:opacity-90 transition-opacity text-base pixel-box-sm"
                      style={{ backgroundColor: '#fa4cbdff' }}
                    >
                      Join our Discord
                    </Link>
                  </div>

                  <div className="pixel-border-outer" style={{ color: '#fa4cbdff' }}>
                    <Link
                      href="https://opensea.io/collection/waifusion"
                      target="_blank"
                      className="h-[40px] px-5 flex items-center justify-center text-white font-medium hover:opacity-90 transition-opacity text-base pixel-box-sm"
                      style={{ backgroundColor: '#fa4cbdff' }}
                    >
                      Buy on Opensea
                    </Link>
                  </div>
                </div>
              </div>

              {/* Hero image - sized to image, grouped in center with text */}
              <div className="w-full md:w-auto md:flex-shrink-0 flex items-center justify-center mt-4 md:mt-0">
                <img
                  src="/placeholder.png"
                  alt="Waifusion hero artwork"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-[500px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid - 4 Waifus */}
      <section className="pt-10 pb-0 sm:pt-12 sm:pb-0 px-2 sm:px-4 bg-gradient-to-b from-pink-100/50 to-pink-50/30 overflow-visible relative z-10">
        <div className="max-w-[calc(56rem*1.35)] mx-auto overflow-visible">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 items-center overflow-visible translate-y-6 sm:translate-y-8 pb-2">
            <GalleryWaifus images={WAIFUS_LOCAL} />
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-8 md:py-10 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Decorative pixel elements - scattered erratically at edges, away from text */}
          <MagneticStars>
            <img src={PIXEL_STAR_YELLOW} alt="" width={60} height={60} className="hidden md:block absolute top-[12%] left-[2%] z-30 pointer-events-none opacity-90" />
            <img src={PIXEL_STAR_PURPLE} alt="" width={55} height={55} className="hidden md:block absolute top-[58%] right-[10%] z-20 pointer-events-none opacity-85" />
            <img src={PIXEL_STAR_ORANGE} alt="" width={65} height={65} className="hidden md:block absolute bottom-[42%] left-[9%] z-20 pointer-events-none opacity-85" />
            <img src={PIXEL_STAR_YELLOW} alt="" width={60} height={60} className="hidden md:block absolute top-[80%] left-[95%] z-20 pointer-events-none opacity-95" />
          </MagneticStars>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-2 md:gap-x-4 max-w-full md:max-w-4xl md:mx-auto items-center">
            {/* Row 1: What is Waifusion | First NFT takeover — no images */}
            <div className="relative">
              <div className="pixel-border-outer" style={{ color: '#AB5BFF' }}>
                <div className="shadow-md relative pixel-box overflow-visible" style={{ backgroundColor: '#E7C8FF' }}>
                  <div className="p-4 md:p-5 relative">
                    <h3 className="font-bold text-2xl mb-4" style={{ color: '#B010FA' }}>What is Waifusion?</h3>
                    <p className="text-gray-700 leading-relaxed">The earliest generative anime NFT collection — minted in March 2021, before all the ecosystem we know now was established.</p>
                    <p className="text-gray-700 leading-relaxed mt-4">16,384 Waifusions were for sale, but the mint didn&apos;t finish, so the community invented a solution. Waifusions could be burned and swapped for new unsold ones, this resulted in only 8,918 surviving.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_PURPLE} alt="" width={44} height={44} className="absolute -top-3 -left-3 opacity-90 pointer-events-none z-30" />
            </div>
            <div className="relative">
              <div className="pixel-border-outer" style={{ color: '#F453EF' }}>
                <div className="shadow-md relative pixel-box overflow-visible" style={{ backgroundColor: '#FFE0FE' }}>
                  <div className="p-4 md:p-5 relative">
                    <h3 className="font-bold text-2xl mb-4" style={{ color: '#F453EF' }}>The First NFT Takeover</h3>
                    <p className="text-gray-700 leading-relaxed">Decentralization by necessity has carried Waifusion for over 4 years. When the original team decided to neglect it, Waifusion didn&apos;t die. The holders stepped up to make Waifusion the first NFT project fully carried forward by its community.</p>
                    <p className="text-gray-700 leading-relaxed mt-4">The first leap was the &quot;Waifusion Dungeon&quot; for the holders to burn and swap Waifus.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_BLUE} alt="" width={44} height={44} className="absolute -top-3 right-[15%] opacity-95 pointer-events-none z-30" />
              <img src={PIXEL_HEARTS} alt="" width={40} height={40} className="absolute -bottom-3 -right-2 opacity-90 pointer-events-none z-30" />
            </div>

            {/* Row 2: Why Waifusion matter (left) | From CTO to Kusari (right, 4th box) */}
            <div className="relative">
              <div className="pixel-border-outer" style={{ color: '#FFC078' }}>
                <div className="shadow-md relative pixel-box overflow-visible" style={{ backgroundColor: '#FFF5D8' }}>
                  <div className="p-4 md:p-5 relative">
                    <h3 className="font-bold text-2xl mb-4" style={{ color: '#F2A310' }}>Why does Waifusion matter?</h3>
                    <p className="text-gray-700 leading-relaxed">Waifusion matters because it proves that NFTs enable culture to survive. The first NFT CTO, the first burn-to-swap NFT collection, the beginning of Kusari and many other firsts.</p>
                    <p className="text-gray-700 leading-relaxed mt-4">Thanks to being onchain, the community was able to maintain ownership and evolve after the project was abandoned, and remain a part of NFT history.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_ORANGE} alt="" width={44} height={44} className="absolute -top-3 -right-2 opacity-90 pointer-events-none z-30" />
            </div>
            <div className="relative">
              <div className="pixel-border-outer" style={{ color: '#32AAFF' }}>
                <div className="shadow-md relative pixel-box overflow-visible" style={{ backgroundColor: '#DAF1FF' }}>
                  <div className="p-4 md:p-5 relative">
                    <h3 className="font-bold text-2xl mb-4" style={{ color: '#32AAFF' }}>From CTO to Kusari</h3>
                    <p className="text-gray-700 leading-relaxed">In March 2021, the current Kusari founders took stewardship of Waifusion to ensure it wasn&apos;t forgotten. This eventually led to where we are now.</p>
                    <p className="text-gray-700 leading-relaxed mt-4">Today, Waifusion exists as part of the Kusari Family, alongside uwucrew, Killer GF, and more, connected by a community with a passion for creativity.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_BLUE} alt="" width={44} height={44} className="absolute top-[4%] right-[10%] opacity-90 pointer-events-none z-30" />
              <img src={PIXEL_HEARTS} alt="" width={40} height={40} className="absolute -bottom-3 -left-2 opacity-90 pointer-events-none z-30" />
            </div>

            {/* Row 3: Waifu image (left) | About Kusari (right) */}
            <div className="hidden md:flex items-end justify-center h-full min-h-[200px] w-full">
              <img src="/placeholder2.png" alt="Waifu Placeholder" className="object-contain w-full h-auto max-h-[320px]" />
            </div>
            <div className="relative">
              <div className="pixel-border-outer" style={{ color: '#21D510' }}>
                <div className="shadow-md relative pixel-box overflow-visible" style={{ backgroundColor: '#DBFFE0' }}>
                  <div className="p-4 md:p-5 relative">
                    <h3 className="font-bold text-2xl mb-4" style={{ color: '#00C48C' }}>About Kusari</h3>
                    <p className="text-gray-700 leading-relaxed">Kusari is a creative collective building durable culture onchain.</p>
                    <p className="text-gray-700 leading-relaxed mt-4">We collaborate with artists and communities to create projects that aren&apos;t just part of a trend. At Kusari we create art that is meant to last.</p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Discover more about Kusari at{" "}
                      <Link href="https://kusari.org" target="_blank" rel="noopener noreferrer" className="text-[#00C48C] font-medium hover:underline">
                        kusari.org
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_GREEN} alt="" width={44} height={44} className="absolute -bottom-3 right-[8%] opacity-90 pointer-events-none z-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section — desktop: ~60% timeline / ~40% mascot; mobile: stacked */}
      <section className="pt-0 pb-0 pl-4 md:pl-8 lg:pl-12 pr-0 bg-gradient-to-b from-pink-50/30 to-pink-80 overflow-visible">
        <div className="flex w-full max-w-none flex-col md:flex-row md:items-end md:gap-0">
          {/* Timeline column — 60% on desktop; block right-aligned so event spine sits farther right */}
          <div className="w-full md:w-[60%] md:min-w-0 md:flex md:justify-end relative z-20 pb-10 md:pb-14">
            <div className="w-full md:w-[550px] md:max-w-none md:ml-auto">
              <div className="w-full mx-auto">
                <h2 className="font-pixel text-3xl font-bold text-center mb-1 text-pink-500">A timeline of Waifusion</h2>
                <p className="text-center text-gray-600 mb-8">From being neglected to becoming a community passionate for art</p>
              </div>

              {/* Timeline */}
              <div className="relative">
            {/* Vertical line - base Waifusion gradient, then turns Kusari green near the bottom */}
            <div
              className="absolute left-[52.8%] -translate-x-1/2 w-1 rounded-full top-[-20px] bottom-[-20px]"
              style={{
                background: "linear-gradient(to bottom, #f9a8d4 0%, #67e8f9 80%, #67e8f9 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            />
            {/* Kusari segment overlay – subtle shift into Kusari green near the bottom, with its own fade */}
            <div
              className="absolute left-[52.8%] -translate-x-1/2 w-1 rounded-full bottom-[-20px]"
              style={{
                top: "60%",
                background:
                  "linear-gradient(to bottom, rgba(103,232,249,0) 0%, rgba(79,209,197,0.7) 30%, rgba(34,197,94,0.8) 70%, rgba(34,197,94,0) 100%)",
                opacity: 0.85,
              }}
            />

            {/* Timeline items - spacing between events increases with time distance */}
            <div className="space-y-0">
              {[
                { date: "March 3rd 2021", title: "Waifusion Mint Begins", subline: <>15,384 Waifus are available to <br />  mint on a price curve.</>, side: "left", accent: "pink" },
                { date: "March 9th 2021", title: "Waifusion Dungeon is Built", subline: "The community innovates together after the mint stalls halfway.", side: "right", accent: "fucsia" },
                {
                  date: "March 22nd 2021",
                  title: "Waifusion Rug",
                  subline:
                    "The original devs, fed up with the community, neglect the project, taking 3,300 ETH with them.",
                  side: "left",
                  accent: "purple",
                },
                {
                  date: "March 25th 2021",
                  title: "Community Takeover",
                  subline: "Kiwi, Laur and Morello work together to maintain the project.",
                  side: "right",
                  accent: "cyan",
                  accentHex: "#0ea5e9", // slightly darker cyan to match the connector knob
                },
                { date: "September 5th 2021", title: "uwucrew Launch", subline: "A big leap taken for the team to carve their own onchain path.", side: "left", accent: "cyan" },
                {
                  date: "January 15th 2022",
                  title: "Dungeon Cleared",
                  subline: (
                    <>
                      7,300+ burns later, the Waifusion Dungeon is fully cleared out.
                    </>
                  ),
                  side: "right",
                  accent: "cyan",
                },
                {
                  date: "April 9th 2025",
                  title: "Kusari is Established",
                  subline: (
                    <>
                      Waifusion joins the Family alongside uwucrew and Killer&nbsp;GF.
                      <Link href="https://kusari.org" target="_blank" rel="noopener noreferrer" className="block leading-normal no-hover underline underline-offset-2 text-[#22c55e]">
                        Read more
                      </Link>
                    </>
                  ),
                  side: "left",
                  accent: "cyan",
                  accentHex: "#22c55e", // Kusari green on the spine and chip
                },
              ].map((event, i) => {
                // Single source of truth for each event's accent color.
                const accent = event.accent === "pink"
                  ? { border: "border-pink-400", text: "text-pink-600", hex: "#f472b6" }
                  : event.accent === "purple"
                    ? { border: "border-violet-400", text: "text-violet-600", hex: "#a78bfa" }
                    : event.accent === "fucsia"
                      ? { border: "border-fuchsia-400", text: "text-fuchsia-600", hex: "#e879f9" }
                      : event.accent === "cyan-dark"
                        ? { border: "border-cyan-500", text: "text-cyan-600", hex: "#06b6d4" }
                        : { border: "border-cyan-400", text: "text-cyan-600", hex: "#22d3ee" }

                const borderClass = accent.border
                const textClass = accent.text
                const accentHex = (event as any).accentHex ?? accent.hex

                // Keep all cards equidistant using the tightest current spacing.
                const uniformGap = -40
                const marginTop = i === 0 ? 0 : uniformGap

                return (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center"
                    style={{ marginTop }}
                  >
                    {/* Left column — fixed desktop width to avoid flex "fluff" space */}
                    <div
                      className={`w-full md:w-[270px] md:flex-none flex md:items-center md:text-right md:justify-end mb-1 md:mb-0`}
                    >
                      {event.side === "left" && (
                        <div className="pixel-border-outer h-fit relative z-20" style={{ color: accentHex }}>
                          <div className={`bg-white pixel-box p-4 shadow-lg w-full md:w-[250px]`}>
                            <span
                              className={`inline-block px-2 py-0.5 text-sm font-bold text-white mb-2 pixel-box-sm`}
                              style={{ backgroundColor: accentHex }}
                            >
                              {event.date}
                            </span>
                            <h4 className="font-bold text-lg text-gray-900 mt-1">{event.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 leading-normal">
                              {event.subline}
                              {i === 4 && <Link href="#" className={`block text-sm leading-normal ${textClass} no-hover underline underline-offset-2`}>Read more</Link>}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center stripe — fixed width, spine runs through 50% */}
                    <div className="w-full md:w-10 md:shrink-0 flex justify-center items-center mb-1 md:mb-0 relative">
                      {/* Connector line: center vertically (top-1/2 -translate-y-1/2) */}
                      <div
                        className={`hidden md:block absolute top-1/2 h-1 -translate-y-1/2 ${event.side === "left" ? "left-0 right-1/2" : "left-1/2 right-0"
                          }`}
                        style={{ backgroundColor: accentHex, opacity: 0.5 }}
                        aria-hidden="true"
                      />
                      <div
                        className="w-4 h-4 rounded-full shrink-0 border-4 border-white shadow relative z-10"
                        style={{ backgroundColor: accentHex }}
                      />
                    </div>

                    {/* Right column — fixed desktop width to avoid flex "fluff" space */}
                    <div className="w-full md:w-[270px] md:flex-none flex md:items-center md:text-left md:justify-start">
                      {event.side === "right" && (
                        <div className="pixel-border-outer h-fit relative z-20" style={{ color: accentHex }}>
                          <div className={`bg-white pixel-box p-4 shadow-lg w-full md:w-[250px]`}>
                            <span
                              className={`inline-block px-2 py-0.5 text-sm font-bold text-white mb-2 pixel-box-sm`}
                              style={{ backgroundColor: accentHex }}
                            >
                              {event.date}
                            </span>
                            <h4 className="font-bold text-lg text-gray-900 mt-1">{event.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 leading-normal">
                              {event.subline}
                              {i === 4 && <Link href="#" className={`block text-sm leading-normal ${textClass} no-hover underline underline-offset-2`}>Read more</Link>}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
            </div>
          </div>

          {/* Mascot column — 40%; flush to viewport right (no right padding) */}
          <div className="mt-10 md:mt-0 w-full md:w-[40%] md:min-w-0 flex justify-center md:justify-end md:items-end pr-0 z-0 pointer-events-none md:self-stretch">
            <img
              src="/wf.png"
              alt="Waifusion Mascot"
              className="w-64 md:w-full md:max-w-full max-h-[min(78vh,640px)] h-auto object-contain object-bottom object-center md:object-right pointer-events-auto origin-bottom-right cursor"
            />
          </div>
        </div>
      </section>

      {/* Community CTA - Kusari-style with pastel green, pixel font, logo */}
      <section
        className="py-16 md:py-24 px-4 relative overflow-hidden z-30"
        style={{ background: "linear-gradient(to bottom right, #b8e0c8, #7acba1ff)" }}
      >
        <MagneticStars>
          <img src={PIXEL_STAR_GREEN} alt="" width={80} height={80} className="absolute top-[8%] left-[6%] opacity-90" />
          <img src={PIXEL_STAR_PURPLE} alt="" width={55} height={55} className="absolute top-[25%] right-[5%] opacity-90" />
          <img src={PIXEL_STAR_BLUE} alt="" width={48} height={48} className="absolute top-[55%] left-[3%] opacity-80" />
          <img src={PIXEL_STAR_ORANGE} alt="" width={70} height={70} className="absolute top-[75%] right-[8%] opacity-80" />
          <img src={PIXEL_STAR_PURPLE} alt="" width={44} height={44} className="absolute bottom-[15%] left-[12%] opacity-80" />
          <img src={PIXEL_STAR_BLUE} alt="" width={52} height={52} className="absolute top-[40%] right-[15%] opacity-80" />
          <img src={PIXEL_STAR_YELLOW} alt="" width={60} height={60} className="absolute top-[12%] right-[22%] opacity-80" />
          <img src={PIXEL_STAR_GREEN} alt="" width={50} height={50} className="absolute bottom-[25%] left-[25%] opacity-90" />
          <img src={PIXEL_STAR_GREEN} alt="" width={40} height={40} className="absolute top-[65%] right-[30%] opacity-90" />
          <img src={PIXEL_STAR_ORANGE} alt="" width={50} height={50} className="absolute top-[30%] left-[20%] opacity-70" />
          <img src={PIXEL_STAR_BLUE} alt="" width={65} height={65} className="absolute bottom-[5%] right-[35%] opacity-90" />
          <img src={PIXEL_STAR_YELLOW} alt="" width={55} height={55} className="absolute top-[15%] left-[35%] opacity-70" />
          <img src={PIXEL_STAR_ORANGE} alt="" width={40} height={40} className="absolute bottom-[10%] left-[35%] opacity-70" />

        </MagneticStars>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Kusari logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="/kusari-logo.png"
              alt="Kusari"
              width={80}
              height={80}
              className="h-16 w-16 md:h-20 md:w-20 object-contain opacity-90"
            />
          </div>

          <h2 className="font-pixel text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            discover the kusari<br />
            <span className="text-white">community</span>
          </h2>

          <Link
            href="https://discord.gg/cKWpT7HGam"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-white hover:text-[#7acba1] transition-colors font-pixel text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
            join our discord!
          </Link>

          {/* Social icons row - like reference */}
          <div className="flex items-center justify-center gap-5 mt-6">
            <Link href="https://kusari.org" target="_blank" className="text-gray-700 hover:text-white" aria-label="Kusari website">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </Link>
            <Link href="https://x.com/bykusari" target="_blank" className="text-gray-700 hover:text-white" aria-label="X">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Link>
            <Link href="https://farcaster.xyz/bykusari" target="_blank" className="text-gray-700 hover:text-white" aria-label="Farcaster">
              <svg className="w-5 h-5" viewBox="128 156 752 688" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z" />
                <path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z" />
                <path d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z" />
              </svg>
            </Link>
            <Link href="https://instagram.com/bykusari" target="_blank" className="text-gray-700 hover:text-white" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  if (isMobile === null) return <div className="min-h-screen bg-white" />
  return isMobile ? <MobileLanding /> : <DesktopLanding />
}
