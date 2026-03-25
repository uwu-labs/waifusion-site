"use client"

import Link from "next/link"
import MagneticStars from "../MagneticStars"
import JumpingWaifu from "../JumpingWaifu"

// Waifusion images - hero stays on Arweave; gallery + info card use local waifus (waifu1–5 in usage order)
const WAIFU_IMAGE_BASE = "https://arweave.net/ZW7NCaxFJT6IlTInn3OZc9MU1UjwmQQ0fGtbLyithEM/"
const WAIFUS_LOCAL = [
  "/waifus/waifu1.png",
  "/waifus/waifu2.png",
  "/waifus/waifu3.png",
  "/waifus/waifu4.png",
  "/waifus/waifu5.png",
  "/waifus/waifu6.jpg",
  "/waifus/waifu7.jpg"
] as const;

// Pixel art decorations
const PIXEL_HEARTS = "/pixel-assets/pixel-hearts.gif"
const PIXEL_STARS_MIXED = "/pixel-assets/pixel-stars-mixed.gif"
const PIXEL_STAR_PURPLE = "/pixel-assets/pixel-star-purple.gif"
const PIXEL_STAR_BLUE = "/pixel-assets/pixel-star-blue.gif"
const PIXEL_STAR_YELLOW = "/pixel-assets/pixel-star-yellow.gif"
const PIXEL_STAR_ORANGE = "/pixel-assets/pixel-star-orange.gif"
const PIXEL_STAR_GREEN = "/pixel-assets/pixel-stars-green.gif"

// ─────────────────────────────────────────────────────────────────────────────
// This is the MOBILE version. Edit freely — it won't affect the desktop site.
// ─────────────────────────────────────────────────────────────────────────────
export default function MobileLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-300 to-pink-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center relative">
          <Link href="/" className="flex items-center gap-2 no-hover">
            <span className="font-pixel font-bold text-white text-2xl">Waifusion</span>
            <span className="text-white/70 text-m">by Kusari</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href="https://twitter.com/waaboratory" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Link>
            <Link href="https://discord.gg/cKWpT7HGam" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
            </Link>
            <Link href="https://opensea.io/collection/waifusion" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="OpenSea">
                <defs>
                  <mask id="opensea-cutout-mobile">
                    <rect width="360" height="360" fill="white" />
                    <path d="M252.072 212.292C245.826 220.662 232.686 234.558 225.378 234.558H191.412V212.274H218.466C222.336 212.274 226.026 210.708 228.69 207.954C242.586 193.554 250.614 176.418 250.614 158.04C250.614 126.684 227.178 98.964 191.394 82.26V67.284C191.394 60.84 186.174 55.62 179.73 55.62C173.286 55.62 168.066 60.84 168.066 67.284V73.494C158.04 70.56 147.42 68.328 136.332 67.05C154.692 86.994 165.906 113.67 165.906 142.92C165.906 169.146 156.942 193.23 141.876 212.31H168.066V234.63H129.726C124.542 234.63 120.33 230.436 120.33 225.234V215.478C120.33 213.768 118.944 212.364 117.216 212.364H66.672C65.682 212.364 64.836 213.174 64.836 214.164C64.8 254.088 96.39 284.058 134.172 284.058H240.822C266.382 284.058 277.812 251.298 292.788 230.454C298.602 222.39 312.552 215.91 316.782 214.11C317.556 213.786 318.006 213.066 318.006 212.22V199.26C318.006 197.946 316.71 196.956 315.432 197.316C315.432 197.316 253.782 211.482 253.062 211.68C252.342 211.896 252.072 212.31 252.072 212.31V212.292Z" fill="black" />
                    <path d="M146.16 142.83C146.16 122.724 139.266 104.22 127.746 89.586L69.732 189.972H132.138C141.012 176.436 146.178 160.236 146.178 142.848L146.16 142.83Z" fill="black" />
                  </mask>
                </defs>
                <circle cx="180" cy="180" r="180" fill="currentColor" mask="url(#opensea-cutout-mobile)" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Scrolling ticker — flush under header, full width */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 h-7 flex items-center md:hidden">
        <div className="flex whitespace-nowrap animate-slide w-max">
          <span className="px-6 text-white text-xs font-bold uppercase tracking-wider">First NFT Community Takeover!</span>
          <span className="px-6 text-white text-xs font-bold uppercase tracking-wider">First NFT Community Takeover!</span>
          <span className="px-6 text-white text-xs font-bold uppercase tracking-wider">First NFT Community Takeover!</span>
        </div>
      </div>

      <section
        className="relative pt-6 pb-4 md:pb-12 px-5 sm:px-8 md:px-10"
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

                {/* Mobile title (image below, not overlaid) */}
                <div className="order-2 mb-3 md:hidden">
                  <div className="relative inline-block">
                    <h1
                      className="font-pixel text-3xl font-bold bg-clip-text text-transparent inline-block text-left"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #FF008C 0%, #DFA7FF 37%, #0894FF 100%)',
                        lineHeight: '0.8'
                      }}
                    >
                      <span className="text-[40px] block leading-[0.7]">Waifusion</span>
                      <span style={{ wordSpacing: '-6px' }}>
                        <span className="inline-block">a community-</span>
                        <br />
                        born NFT legacy
                      </span>
                    </h1>
                    <img src={PIXEL_HEARTS} alt="" className="absolute right-[0px] top-[5px] w-9 h-9 pointer-events-none" />
                  </div>
                </div>

                {/* Desktop h1 (hidden on mobile) */}
                <h1
                  className="order-2 hidden md:inline-block font-pixel text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 bg-clip-text text-transparent text-left md:text-left"
                  style={{ backgroundImage: 'linear-gradient(to bottom, #FF008C 0%, #DFA7FF 37%, #0894FF 100%)' }}
                >
                  Waifusion
                  <img src={PIXEL_HEARTS} alt="" width={40} height={40} className="inline-block ml-2 align-middle" />
                  <br />
                  a community-
                  <br />
                  born NFT legacy
                </h1>

                <div className="order-3 mb-4">
                  <p className="text-gray-600 leading-relaxed text-sm text-left">
                    Waifusion is the <span className="font-semibold text-gray-900">first generative anime collection</span> born on Ethereum.
                    Although the original team neglected it, the community refused to end its story.
                  </p>
                </div>

                <div className="order-4 flex flex-row gap-3 justify-start">
                  <div className="pixel-border-outer" style={{ color: '#fa4cbdff' }}>
                    <Link
                      href="https://discord.gg/cKWpT7HGam"
                      target="_blank"
                      className="h-[26px] px-3 flex items-center justify-center text-white font-medium hover:opacity-90 transition-opacity text-xs pixel-box-sm"
                      style={{ backgroundColor: '#fa4cbdff' }}
                    >
                      Join Discord
                    </Link>
                  </div>

                  <div className="pixel-border-outer" style={{ color: '#fa4cbdff' }}>
                    <Link
                      href="https://opensea.io/collection/waifusion"
                      target="_blank"
                      className="h-[26px] px-3 flex items-center justify-center text-white font-medium hover:opacity-90 transition-opacity text-xs pixel-box-sm"
                      style={{ backgroundColor: '#fa4cbdff' }}
                    >
                      Buy on Opensea
                    </Link>
                  </div>
                </div>
              </div>

              {/* Hero image: below text on mobile, alongside on desktop */}
              <div className="mt-4 flex w-full md:w-auto md:flex-shrink-0 items-center justify-center md:mt-0">
                <img
                  src="/placeholder.png"
                  alt="Waifusion hero artwork"
                  className="w-44 sm:w-56 md:w-full md:max-w-[500px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid - 3 on mobile, 4 on sm+ */}
      <section className="pt-4 pb-0 sm:pt-12 sm:pb-0 bg-gradient-to-b from-pink-100/50 to-pink-50/30 overflow-visible relative z-10">
        {/* Mobile: full-width, 3 cols, no gap */}
        <div className="sm:hidden w-full overflow-visible">
          <div className="grid grid-cols-3 gap-0 items-center overflow-visible translate-y-2 pb-2">
            {WAIFUS_LOCAL.slice(0, 3).map((_, i) => {
              const slotImages = [
                ...WAIFUS_LOCAL.slice(i * 2),
                ...WAIFUS_LOCAL.slice(0, i * 2)
              ];
              return (
                <div
                  key={`jumping-waifu-m-${i}`}
                  className="aspect-square relative flex items-center justify-center overflow-visible"
                >
                  <JumpingWaifu
                    images={slotImages}
                    initialIndex={0}
                    delay={`${i * -0.25}s`}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* sm+: original layout, 4 cols */}
        <div className="hidden sm:block max-w-[calc(56rem*1.35)] mx-auto px-4 overflow-visible">
          <div className="grid grid-cols-4 gap-0 items-center overflow-visible translate-y-8 pb-2">
            {WAIFUS_LOCAL.slice(0, 4).map((_, i) => {
              const slotImages = [
                ...WAIFUS_LOCAL.slice(i * 2),
                ...WAIFUS_LOCAL.slice(0, i * 2)
              ];
              return (
                <div
                  key={`jumping-waifu-d-${i}`}
                  className="aspect-square relative flex items-center justify-center overflow-visible"
                >
                  <JumpingWaifu
                    images={slotImages}
                    initialIndex={0}
                    delay={`${i * -0.25}s`}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-4 md:py-10 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Info cards grid – full width on mobile, 2 cols on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-8 gap-x-2 md:gap-x-4 max-w-full md:max-w-4xl md:mx-auto items-stretch">
            {/* Row 1: What is Waifusion | First NFT takeover — no images */}
            <div className="relative h-full">
              <div className="pixel-border-outer h-full" style={{ color: '#AB5BFF' }}>
                <div className="shadow-md relative pixel-box overflow-visible h-full" style={{ backgroundColor: '#E7C8FF' }}>
                  <div className="p-3 md:p-5 relative h-full">
                    <h3 className="font-bold text-2xl md:text-2xl leading-snug mb-3" style={{ color: '#B010FA' }}>What is Waifusion?</h3>
                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-lg font-normal">The earliest generative anime NFT collection — minted in March 2021, before all the ecosystem we know now was established.</p>
                    <p className="text-gray-700 leading-relaxed mt-2 text-[15px] md:text-lg font-normal">16,384 Waifusions were for sale, but the mint didn&apos;t finish, so the community invented a solution. Waifusions could be burned and swapped for new unsold ones, this resulted in only 8,918 surviving.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_PURPLE} alt="" className="absolute w-8 h-8 md:w-[44px] md:h-[44px] -bottom-3 -right-3 md:-bottom-4 md:-right-4 opacity-90 pointer-events-none z-30" />
            </div>
            <div className="relative h-full">
              <div className="pixel-border-outer h-full" style={{ color: '#F453EF' }}>
                <div className="shadow-md relative pixel-box overflow-visible h-full" style={{ backgroundColor: '#FFE0FE' }}>
                  <div className="p-3 md:p-5 relative h-full">
                    <h3 className="font-bold text-2xl md:text-2xl leading-snug mb-3" style={{ color: '#F453EF' }}>The First NFT Takeover</h3>
                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-lg font-normal">Decentralization by necessity has carried Waifusion for over 4 years. When the original team walked away, Waifusion didn&apos;t die. The holders stepped up to make Waifusion the first NFT project fully carried forward by its community. The first leap was the &quot;Waifusion Dungeon&quot; for the holders to burn and swap Waifus.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_BLUE} alt="" className="absolute w-8 h-8 md:w-[44px] md:h-[44px] -top-4 right-4 md:-top-5 md:right-8 opacity-95 pointer-events-none z-30" />
              <img src={PIXEL_HEARTS} alt="" className="absolute w-8 h-8 md:w-[40px] md:h-[40px] bottom-2 -right-4 md:bottom-2 md:-right-5 opacity-90 pointer-events-none z-30" />
            </div>

            {/* Row 2: Why Waifusion matter (left) | From CTO to Kusari (right, 4th box) */}
            <div className="relative h-full">
              <div className="pixel-border-outer h-full" style={{ color: '#FFC078' }}>
                <div className="shadow-md relative pixel-box overflow-visible h-full" style={{ backgroundColor: '#FFF5D8' }}>
                  <div className="p-3 md:p-5 relative h-full">
                    <h3 className="font-bold text-2xl md:text-2xl leading-snug mb-3" style={{ color: '#F2A310' }}>Why does Waifusion matter?</h3>
                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-lg font-normal">Waifusion matters because it proves that NFTs enable culture to survive. The first NFT CTO, the first burn-to-swap NFT collection, the beginning of Kusari and many other firsts. Thanks to being onchain, the community was able to maintain ownership and evolve after the project was abandoned, and remain a part of NFT history.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_ORANGE} alt="" className="absolute w-8 h-8 md:w-[44px] md:h-[44px] -bottom-3 -left-2 md:-bottom-4 md:-left-3 opacity-90 pointer-events-none z-30" />
            </div>
            <div className="relative h-full">
              <div className="pixel-border-outer h-full" style={{ color: '#32AAFF' }}>
                <div className="shadow-md relative pixel-box overflow-visible h-full" style={{ backgroundColor: '#DAF1FF' }}>
                  <div className="p-3 md:p-5 relative h-full">
                    <h3 className="font-bold text-2xl md:text-2xl leading-snug mb-3" style={{ color: '#32AAFF' }}>From CTO to Kusari</h3>
                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-lg font-normal">In March 2021, the current Kusari founders took stewardship of Waifusion to ensure it wasn&apos;t forgotten. This eventually led to where we are now.</p>
                    <p className="text-gray-700 leading-relaxed mt-2 text-[15px] md:text-lg font-normal">Today, Waifusion exists as part of the Kusari Family, alongside uwucrew, Killer GF, and more, connected by a community with a passion for creativity.</p>
                  </div>
                </div>
              </div>
              <img src={PIXEL_STAR_BLUE} alt="" className="absolute w-8 h-8 md:w-[44px] md:h-[44px] top-[40%] -right-4 md:top-[40%] md:-right-5 opacity-90 pointer-events-none z-30" />
              <img src={PIXEL_HEARTS} alt="" className="absolute w-8 h-8 md:w-[40px] md:h-[40px] -bottom-4 left-[30%] md:-bottom-5 md:left-[30%] opacity-90 pointer-events-none z-30" />
            </div>

            {/* Row 3: Waifu image (left) | About Kusari (right) */}
            <div className="hidden md:flex items-end justify-center h-full min-h-[200px] w-full">
              <img src="/placeholder2.png" alt="Waifu Placeholder" className="object-contain w-full h-auto max-h-[320px]" />
            </div>
            <div className="relative h-full">
              <div className="pixel-border-outer h-full" style={{ color: '#21D510' }}>
                <div className="shadow-md relative pixel-box overflow-visible h-full" style={{ backgroundColor: '#DBFFE0' }}>
                  <div className="p-3 md:p-5 relative h-full">
                    <h3 className="font-bold text-2xl md:text-2xl leading-snug mb-3" style={{ color: '#00C48C' }}>About Kusari</h3>
                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-lg font-normal">Kusari is a creative collective building durable culture onchain.</p>
                    <p className="text-gray-700 leading-relaxed mt-2 text-[15px] md:text-lg font-normal">We collaborate with artists and communities to create projects that aren&apos;t just part of a trend. At Kusari we create art that is meant to last.</p>
                    <p className="text-gray-700 leading-relaxed mt-2 text-[15px] md:text-lg font-normal">
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

      {/* Timeline Section */}
      <section className="pt-12 pb-0 md:py-20 px-4 bg-gradient-to-b from-pink-50/30 to-pink-80 overflow-visible">
        <div className="max-w-4xl mx-auto">
          <div className="w-full md:w-[70%]">
            <h2 className="font-pixel text-3xl font-bold text-center mb-1 text-pink-500">A timeline of Waifusion</h2>
            <p className="text-center text-gray-600 mb-8">From being neglected to becoming a community passionate for art</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - fades in/out at top and bottom */}
            <div
              className="absolute left-[20px] md:left-[35%] transform -translate-x-1/2 w-1 rounded-full top-[-20px] bottom-[-20px]"
              style={{
                background: "linear-gradient(to bottom, #f9a8d4 0%, #67e8f9 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            />

            {/* Timeline items */}
            <div className="space-y-6 md:space-y-1 relative">
              {[
                { date: "March 3rd 2021", title: "Waifusion Mint Begins", subline: <>15,384 Waifus are available to <br />  mint on a price curve</>, side: "left", accent: "pink" },
                { date: "March 9th 2021", title: "Waifusion Dungeon is built", subline: "The community innovates together after the mint stalls halfway", side: "right", accent: "fucsia" },
                { date: "March 22nd 2021", title: "Waifusion Rug", subline: "The creators decide for their own reasons to neglect the project", side: "left", accent: "purple" },
                { date: "March 24th 2021", title: "Community Takeover", subline: "Kiwi, Laur and Morello work together to maintain the project", side: "right", accent: "cyan" },
                { date: "September 5th 2021", title: "uwucrew Launch", subline: "The start of Kusari, after Waifusion takeover.", side: "left", accent: "cyan" },
              ].map((event, i) => {
                const accentColor = event.accent === "pink"
                  ? { border: "border-pink-400", text: "text-pink-600", bg: "bg-pink-600", line: "bg-pink-400", dot: "bg-pink-400" }
                  : event.accent === "purple"
                    ? { border: "border-violet-400", text: "text-violet-600", bg: "bg-violet-600", line: "bg-violet-400", dot: "bg-violet-400" }
                    : event.accent === "fucsia"
                      ? { border: "border-fuchsia-400", text: "text-fuchsia-600", bg: "bg-fuchsia-600", line: "bg-fuchsia-400", dot: "bg-fuchsia-400" }
                      : event.accent === "cyan-dark"
                        ? { border: "border-cyan-500", text: "text-cyan-600", bg: "bg-cyan-600", line: "bg-cyan-500", dot: "bg-cyan-500" }
                        : { border: "border-cyan-400", text: "text-cyan-600", bg: "bg-cyan-600", line: "bg-cyan-400", dot: "bg-cyan-400" }

                const textClass = accentColor.text
                const dateBgClass = accentColor.bg
                const connectorClass = accentColor.line
                const dotClass = accentColor.dot

                const EventCard = () => (
                  <div className="pixel-border-outer h-fit relative z-20 w-full md:w-auto" style={{ color: accentColor.line.replace('bg-', '') === 'pink-400' ? '#f472b6' : accentColor.line.replace('bg-', '') === 'violet-400' ? '#a78bfa' : accentColor.line.replace('bg-', '') === 'fuchsia-400' ? '#e879f9' : '#22d3ee' }}>
                    <div className={`bg-white pixel-box p-4 shadow-lg w-full md:w-[250px]`}>
                      <span className={`inline-block px-2 py-0.5 text-base md:text-sm font-bold text-white mb-2 md:mb-2 ${dateBgClass} pixel-box-sm`}>
                        {event.date}
                      </span>
                      <h4 className="font-bold text-xl md:text-lg text-gray-900 mt-1">{event.title}</h4>
                      <p className="text-base md:text-sm text-gray-600 mt-1">
                        {event.subline}
                        {i === 4 && <Link href="#" className={`text-base md:text-sm ${textClass} hover:underline ml-1 no-hover inline`}>Learn more</Link>}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <div
                    key={i}
                    className="relative flex flex-row items-start md:items-center pl-10 md:pl-0"
                  >
                    {/* MOBILE DOT (Hidden on md+) - absolute centered on the line left-[20px] */}
                    <div
                      className={`md:hidden absolute left-[20px] mt-2 top-2 transform -translate-x-1/2 w-4 h-4 rounded-full shrink-0 ${dotClass} border-4 border-white shadow z-10`}
                    />

                    {/* MOBILE CARD (Hidden on md+) */}
                    <div className="md:hidden w-full relative z-20 flex-1 pl-2">
                      <EventCard />
                    </div>

                    {/* DESKTOP LAYOUT (Hidden on mobile) */}

                    {/* Desktop Left Column (30%) */}
                    <div className={`hidden md:flex flex-col md:w-[30%] items-center md:items-end text-center md:text-right`}>
                      {event.side === "left" && <EventCard />}
                    </div>

                    {/* Desktop Center Column (10%) - The dot and horizontal connector */}
                    <div className="hidden md:flex md:w-[10%] justify-center items-center relative">
                      <div
                        className={`absolute top-1/2 h-1 -translate-y-1/2 ${connectorClass} ${event.side === "left" ? "left-0 right-1/2" : "left-1/2 right-0"}`}
                        aria-hidden="true"
                      />
                      <div
                        className={`w-4 h-4 rounded-full shrink-0 ${dotClass} border-4 border-white shadow relative z-10`}
                      />
                    </div>

                    {/* Desktop Right Column (60%) */}
                    <div className="hidden md:flex flex-col md:w-[60%] items-center md:items-start text-center md:text-left">
                      {event.side === "right" && <EventCard />}
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Waifu illustration – sits after the timeline with breathing room, not overlapping it */}
        <div className="mt-10 md:mt-16 flex justify-center md:justify-end z-20 pointer-events-none">
          <img
            src="/wf.png"
            alt="Waifusion Mascot"
            className="w-64 md:w-[550px] h-auto object-contain pointer-events-auto origin-bottom-right cursor"
          />
        </div>
      </section>

      {/* Community CTA - Kusari-style with pastel green, pixel font, logo */}
      <section
        className="py-16 md:py-24 px-4 relative overflow-visible z-30"
        style={{ background: "linear-gradient(to bottom right, #b8e0c8, #7acba1ff)" }}
      >
        <MagneticStars className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img src={PIXEL_STAR_GREEN} alt="" className="absolute top-[8%] left-[6%] opacity-90 w-12 md:w-[80px]" />
          <img src={PIXEL_STAR_PURPLE} alt="" className="absolute top-[25%] right-[5%] opacity-90 w-8 md:w-[55px]" />
          <img src={PIXEL_STAR_BLUE} alt="" className="absolute top-[55%] left-[3%] opacity-80 w-7 md:w-[48px]" />
          <img src={PIXEL_STAR_ORANGE} alt="" className="absolute top-[75%] right-[8%] opacity-80 w-10 md:w-[70px]" />
          <img src={PIXEL_STAR_PURPLE} alt="" className="absolute bottom-[15%] left-[12%] opacity-80 w-6 md:w-[44px]" />
          <img src={PIXEL_STAR_BLUE} alt="" className="absolute top-[40%] right-[8%] opacity-80 w-8 md:w-[52px]" />
          <img src={PIXEL_STAR_YELLOW} alt="" className="absolute top-[12%] right-[22%] opacity-80 w-8 md:w-[60px]" />
          <img src={PIXEL_STAR_GREEN} alt="" className="absolute bottom-[25%] left-[25%] opacity-90 w-7 md:w-[50px]" />
          <img src={PIXEL_STAR_GREEN} alt="" className="absolute top-[65%] right-[30%] opacity-90 w-6 md:w-[40px]" />
          <img src={PIXEL_STAR_ORANGE} alt="" className="absolute top-[30%] left-[20%] opacity-70 w-7 md:w-[50px]" />
          <img src={PIXEL_STAR_BLUE} alt="" className="absolute bottom-[5%] right-[35%] opacity-90 w-10 md:w-[65px]" />
          <img src={PIXEL_STAR_YELLOW} alt="" className="absolute top-[15%] left-[30%] opacity-70 w-8 md:w-[55px]" />
          <img src={PIXEL_STAR_ORANGE} alt="" className="absolute bottom-[10%] left-[35%] opacity-70 w-6 md:w-[40px]" />
        </MagneticStars>

        <div className="max-w-3xl mx-auto text-center relative z-20 pointer-events-auto">
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
