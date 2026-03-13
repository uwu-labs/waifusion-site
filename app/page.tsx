import Link from "next/link"
import MagneticStars from "./MagneticStars"
import JumpingWaifu from "./JumpingWaifu"
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



export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-300 to-pink-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center relative">
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 no-hover">
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.629 0 12 0ZM5.92 12.403l.051-.081 3.123-4.884a.107.107 0 0 1 .187.014c.52 1.169.972 2.623.76 3.528-.088.372-.335.876-.614 1.342a2.405 2.405 0 0 1-.117.199.106.106 0 0 1-.09.045H6.013a.106.106 0 0 1-.091-.163Z" /></svg>
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
            {WAIFUS_LOCAL.slice(0, 4).map((_, i) => {
              // Rotate array by i*2 to ensure different starting points and sequences
              const slotImages = [
                ...WAIFUS_LOCAL.slice(i * 2),
                ...WAIFUS_LOCAL.slice(0, i * 2)
              ];
              return (
                <div
                  key={`jumping-waifu-${i}`}
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
      <section className="py-8 md:py-10 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Decorative pixel elements - scattered erratically at edges, away from text */}
          <MagneticStars>
            <img src={PIXEL_STARS_MIXED} alt="" width={180} height={180} className="hidden md:block absolute top-[12%] left-[-5%] z-20 pointer-events-none opacity-90" />
            <img src={PIXEL_STAR_PURPLE} alt="" width={55} height={55} className="hidden md:block absolute top-[58%] right-[10%] z-20 pointer-events-none opacity-85" />
            <img src={PIXEL_STAR_ORANGE} alt="" width={65} height={65} className="hidden md:block absolute bottom-[42%] left-[9%] z-20 pointer-events-none opacity-85" />
            <img src={PIXEL_STARS_MIXED} alt="" width={180} height={180} className="hidden md:block absolute top-[80%] left-[95%] z-20 pointer-events-none opacity-95" />
          </MagneticStars>

          <div className="grid md:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-2 md:gap-x-4 max-w-4xl mx-auto items-center">
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
                    <p className="text-gray-700 leading-relaxed">Decentralization by necessity has carried Waifusion for over 4 years. When the original team walked away, Waifusion didn&apos;t die. The holders stepped up to make Waifusion the first NFT project fully carried forward by its community.</p>
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

      {/* Timeline Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-pink-50/30 to-pink-80 relative overflow-visible">
        <div className="max-w-4xl mx-auto">
          <div className="w-full md:w-[70%]">
            <h2 className="font-pixel text-3xl font-bold text-center mb-1 text-pink-500">A timeline of Waifusion</h2>
            <p className="text-center text-gray-600 mb-8">From being neglected to becoming a community passionate for art</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - fades in/out at top and bottom */}
            <div
              className="absolute left-[35%] transform -translate-x-1/2 w-1 rounded-full top-[-20px] bottom-[-20px]"
              style={{
                background: "linear-gradient(to bottom, #f9a8d4 0%, #67e8f9 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            />

            {/* Timeline items */}
            <div className="space-y-0 md:space-y-1">
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

                const borderClass = accentColor.border
                const textClass = accentColor.text
                const dateBgClass = accentColor.bg
                const connectorClass = accentColor.line
                const dotClass = accentColor.dot

                return (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center"
                  >
                    {/* Left Column (30%) - Box for left side events */}
                    <div
                      className={`w-full md:w-[30%] flex md:items-center md:text-right md:justify-end mb-1 md:mb-0`}
                    >
                      {event.side === "left" && (
                        <div className="pixel-border-outer h-fit relative z-20" style={{ color: accentColor.line.replace('bg-', '') === 'pink-400' ? '#f472b6' : accentColor.line.replace('bg-', '') === 'violet-400' ? '#a78bfa' : accentColor.line.replace('bg-', '') === 'fuchsia-400' ? '#e879f9' : '#22d3ee' }}>
                          <div className={`bg-white pixel-box p-4 shadow-lg w-full md:w-[250px]`}>
                            <span className={`inline-block px-2 py-0.5 text-sm font-bold text-white mb-2 ${dateBgClass} pixel-box-sm`}>
                              {event.date}
                            </span>
                            <h4 className="font-bold text-lg text-gray-900 mt-1">{event.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {event.subline}
                              {i === 4 && <Link href="#" className={`text-sm ${textClass} hover:underline ml-1 no-hover inline`}>Learn more</Link>}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center Column (10%) - The dot (centered at 35%) */}
                    <div className="w-full md:w-[10%] flex justify-center items-center mb-1 md:mb-0 relative">
                      {/* Connector line: center vertically (top-1/2 -translate-y-1/2) */}
                      <div
                        className={`hidden md:block absolute top-1/2 h-1 -translate-y-1/2 ${connectorClass} ${event.side === "left" ? "left-0 right-1/2" : "left-1/2 right-0"
                          }`}
                        aria-hidden="true"
                      />
                      <div
                        className={`w-4 h-4 rounded-full shrink-0 ${dotClass} border-4 border-white shadow relative z-10`}
                      />
                    </div>

                    {/* Right Column (60%) - Box for right side events */}
                    <div className="w-full md:w-[60%] flex md:items-center md:text-left md:justify-start">
                      {event.side === "right" && (
                        <div className="pixel-border-outer h-fit relative z-20" style={{ color: accentColor.line.replace('bg-', '') === 'pink-400' ? '#f472b6' : accentColor.line.replace('bg-', '') === 'violet-400' ? '#a78bfa' : accentColor.line.replace('bg-', '') === 'fuchsia-400' ? '#e879f9' : '#22d3ee' }}>
                          <div className={`bg-white pixel-box p-4 shadow-lg w-full md:w-[250px]`}>
                            <span className={`inline-block px-2 py-0.5 text-sm font-bold text-white mb-2 ${dateBgClass} pixel-box-sm`}>
                              {event.date}
                            </span>
                            <h4 className="font-bold text-lg text-gray-900 mt-1">{event.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {event.subline}
                              {i === 4 && <Link href="#" className={`text-sm ${textClass} hover:underline ml-1 no-hover inline`}>Learn more.</Link>}
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

        <div className="absolute bottom-0 right-0 z-20 pointer-events-none">
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9.234 0C4.126 0 0 4.126 0 9.234v5.532C0 19.974 4.126 24 9.234 24h5.532c5.108 0 9.234-4.026 9.234-9.234V9.234C24 4.126 19.974 0 14.766 0H9.234zm.552 5.766h1.932v1.932h-1.932V5.766zm3.864 0h1.932v1.932h-1.932V5.766zm-3.864 3.864h1.932v1.932h-1.932V9.63zm3.864 0h1.932v1.932h-1.932V9.63zm-3.864 3.864h1.932v1.932h-1.932v-1.932zm3.864 0h1.932v1.932h-1.932v-1.932z" /></svg>
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
