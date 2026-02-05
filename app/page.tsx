import Link from "next/link"
import Image from "next/image"

// Pixel art decorations
const PIXEL_HEARTS = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ixxGcJLOLjacFU56GRP1PRoqOFchc9.png"
const PIXEL_STAR_YELLOW = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VXUbdtdxRLeFM337WPrMRHbUk1TbNF.png"
const PIXEL_STAR_BLUE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Eyi3WlghIKvjZGNfBVaMj9qvNQpsWy.png"
const PIXEL_STAR_PURPLE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KvhHjrRNihsmyRn70Mmgj5HVvJdOX5.png"
const PIXEL_STARS_MIXED = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jD2WjIl7kwI3p7dOw6Ow1NOLwVgd5q.png"



export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pink-50/30 overflow-x-hidden">
      {/* Floating Pixel Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Image src={PIXEL_HEARTS} alt="" width={60} height={60} className="absolute top-24 right-[8%]" loading="eager" priority />
        <Image src={PIXEL_STAR_YELLOW} alt="" width={50} height={50} className="absolute top-32 left-[5%]" />
        <Image src={PIXEL_STAR_BLUE} alt="" width={40} height={40} className="absolute top-[50%] right-[5%]" />
        <Image src={PIXEL_STAR_PURPLE} alt="" width={55} height={55} className="absolute top-[70%] left-[3%]" />
        <Image src={PIXEL_HEARTS} alt="" width={40} height={40} className="absolute bottom-[25%] right-[12%]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-white text-lg tracking-wide">Waifusion</span>
            <span className="text-white/70 text-xs">by Kusari</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="https://twitter.com/waaboratory" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Link>
            <Link href="https://discord.gg/kusari" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
            </Link>
            <Link href="https://opensea.io/collection/waifusion" target="_blank" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.629 0 12 0ZM5.92 12.403l.051-.081 3.123-4.884a.107.107 0 0 1 .187.014c.52 1.169.972 2.623.76 3.528-.088.372-.335.876-.614 1.342a2.405 2.405 0 0 1-.117.199.106.106 0 0 1-.09.045H6.013a.106.106 0 0 1-.091-.163Z" /></svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left content */}
            <div className="flex-1 max-w-xl">
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs font-bold uppercase tracking-wider rounded mb-6">
                First NFT Community Takeover
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                WaiFusion
                <Image src={PIXEL_HEARTS} alt="" width={40} height={40} className="inline-block ml-2 align-middle" />
                <br />
                <span className="text-pink-400">a community-</span>
                <Image src={PIXEL_HEARTS} alt="" width={32} height={32} className="inline-block mx-1 align-middle" />
                <br />
                <span className="text-pink-400">born NFT legacy</span>
              </h1>

              <p className="text-gray-600 mb-6 leading-relaxed">
                WaiFusion began as the <span className="font-semibold text-gray-900">first generative anime collection</span> on Ethereum.
                When the original team stepped away, the community took over!
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://discord.gg/kusari"
                  target="_blank"
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity text-sm"
                >
                  Visit our Discord
                </Link>
                <Link
                  href="https://opensea.io/collection/waifusion"
                  target="_blank"
                  className="px-6 py-2.5 bg-gradient-to-r from-green-400 to-green-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity text-sm"
                >
                  Buy on Opensea
                </Link>
              </div>
            </div>

            {/* Right - placeholder for 3D/image viewer */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-600 text-sm p-8 border-2 border-dashed border-pink-200 rounded-xl bg-white/50">
                SHOW MORE BODY<br />HERE, or zoom in
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid - Placeholder */}
      <section className="py-12 px-4 bg-gradient-to-b from-pink-100/50 to-pink-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden bg-white shadow-lg border-4 border-white flex items-center justify-center"
              >
                <span className="text-pink-300 text-xs">Waifu #{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* What is WaiFusion */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-pink-200">
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-400 px-6 py-3">
                <h3 className="text-white font-bold text-lg">What is WaiFusion?</h3>
              </div>
              <div className="p-6 text-sm text-gray-600 leading-relaxed">
                <p>WaiFusion is the earliest generative anime collection in Web3, consisting of 16,384 unique NFTs on Ethereum. Created shortly after Hashmasks in March 2021.</p>
                <p className="mt-3">After the original team stepped away, WaiFusion evolved into a community-governed effort. Today, each WaiFu exists as both a digital artwork and a symbol of decentralization.</p>
              </div>
            </div>

            {/* First NFT Community Takeover */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-pink-200">
              <div className="bg-gradient-to-r from-pink-300 to-pink-400 px-6 py-3">
                <h3 className="text-white font-bold text-lg">The first ever NFT community takeover</h3>
              </div>
              <div className="p-6 text-sm text-gray-600 leading-relaxed">
                <p>The original team stepped away shortly after launch, leading to a community take over. WaiFusion became one of the earliest NFT projects to be fully carried forward by its holders, redefining what decentralization really means.</p>
              </div>
            </div>

            {/* Why WaiFusion */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-pink-200">
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-400 px-6 py-3">
                <h3 className="text-white font-bold text-lg">Why WaiFusion</h3>
              </div>
              <div className="p-6 text-sm text-gray-600 leading-relaxed">
                <p>WaiFusion matters because it proves that due to the power of NFTs, communities can preserve, evolve, and own culture without relying on its creators. It{"'"}s not just an NFT collection. It{"'"}s a monumental moment in Web3 and NFT history!</p>
              </div>
            </div>

            {/* About Kusari */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-pink-200">
              <div className="bg-gradient-to-r from-pink-300 to-pink-400 px-6 py-3">
                <h3 className="text-white font-bold text-lg">About Kusari</h3>
              </div>
              <div className="p-6 text-sm text-gray-600 leading-relaxed">
                <p>Kusari is a creative collective and onchain platform dedicated to building a positive future for decentralized culture. Through collaboration with artists and communities around the world, Kusari creates, curates, and sustains crypto-native art projects that push the boundaries of digital ownership.</p>
                <p className="mt-3">In 2021, the current founders of Kusari took stewardship of WaiFusion, ensuring the collection{"'"}s continuity and evolution. Today, WaiFusion lives under the Kusari family umbrella, shaped by collaboration, community, and a long-term vision for onchain art.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-pink-50/30 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-cyan-500">The First ever NFT</h2>
          <h3 className="text-xl font-bold text-center mb-12 text-cyan-500">community takeover</h3>
          <p className="text-center text-gray-600 mb-12">Something else you might wanna say idk</p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 to-cyan-300 h-full rounded-full" />

            {/* Timeline items */}
            <div className="space-y-8">
              {[
                { date: "March 3rd 2021", title: "WaiFusion minted out", side: "left", color: "pink" },
                { date: "March 24th 2021", title: "community takeover", side: "right", color: "pink" },
                { date: "March 22nd 2021", title: "WaiFusion rug lol", side: "left", color: "cyan" },
                { date: "September 2021", title: "uwucrew", side: "right", color: "cyan" },
              ].map((event, i) => (
                <div key={i} className={`flex items-center ${event.side === "left" ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-5/12 ${event.side === "left" ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className={`inline-block bg-white rounded-xl p-4 shadow-lg border-2 ${event.color === "pink" ? "border-pink-300" : "border-cyan-300"}`}>
                      <span className={`text-xs font-bold ${event.color === "pink" ? "text-pink-500" : "text-cyan-500"}`}>{event.date}</span>
                      <h4 className="font-bold text-gray-900 mt-1">{event.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">Apollo 11 successfully lands on the Moon</p>
                      <Link href="#" className={`text-xs ${event.color === "pink" ? "text-pink-500" : "text-cyan-500"} hover:underline`}>Click to read more</Link>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className={`w-4 h-4 rounded-full ${event.color === "pink" ? "bg-pink-400" : "bg-cyan-400"} border-4 border-white shadow`} />
                  </div>
                  <div className="w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-pink-200 via-pink-100 to-cyan-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image src={PIXEL_STARS_MIXED} alt="" width={200} height={200} className="absolute top-10 left-[10%] opacity-80" />
          <Image src={PIXEL_HEARTS} alt="" width={60} height={60} className="absolute top-20 right-[15%]" />
          <Image src={PIXEL_STAR_BLUE} alt="" width={40} height={40} className="absolute bottom-20 left-[20%]" />
          <Image src={PIXEL_STAR_PURPLE} alt="" width={50} height={50} className="absolute bottom-10 right-[25%]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Large pixel art logo */}
          <div className="mb-8">
            <Image src={PIXEL_HEARTS} alt="" width={120} height={120} className="mx-auto" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            discover the kusari<br />community
          </h2>

          <Link
            href="https://discord.gg/kusari"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
            join our discord!
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-pink-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <Link href="https://instagram.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </Link>
            <Link href="https://twitter.com/waaboratory" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Link>
            <Link href="https://opensea.io/collection/waifusion" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.629 0 12 0ZM5.92 12.403l.051-.081 3.123-4.884a.107.107 0 0 1 .187.014c.52 1.169.972 2.623.76 3.528-.088.372-.335.876-.614 1.342a2.405 2.405 0 0 1-.117.199.106.106 0 0 1-.09.045H6.013a.106.106 0 0 1-.091-.163Z" /></svg>
            </Link>
            <Link href="https://discord.gg/kusari" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
