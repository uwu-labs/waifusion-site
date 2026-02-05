import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Pixel art decorations
const PIXEL_HEARTS = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ixxGcJLOLjacFU56GRP1PRoqOFchc9.png"
const PIXEL_STAR_YELLOW = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VXUbdtdxRLeFM337WPrMRHbUk1TbNF.png"
const PIXEL_STAR_BLUE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Eyi3WlghIKvjZGNfBVaMj9qvNQpsWy.png"
const PIXEL_STAR_PURPLE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KvhHjrRNihsmyRn70Mmgj5HVvJdOX5.png"

const WAIFUS = [
  "https://waifusion.io/api/v1/eth/image/1",
  "https://waifusion.io/api/v1/eth/image/42",
  "https://waifusion.io/api/v1/eth/image/100",
  "https://waifusion.io/api/v1/eth/image/200",
  "https://waifusion.io/api/v1/eth/image/300",
  "https://waifusion.io/api/v1/eth/image/400",
  "https://waifusion.io/api/v1/eth/image/500",
  "https://waifusion.io/api/v1/eth/image/600",
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Floating Pixel Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Image src={PIXEL_HEARTS} alt="" width={80} height={80} className="absolute top-20 right-[10%] opacity-60" />
        <Image src={PIXEL_STAR_YELLOW} alt="" width={60} height={60} className="absolute top-40 left-[5%] opacity-50" />
        <Image src={PIXEL_STAR_BLUE} alt="" width={50} height={50} className="absolute top-[60%] right-[8%] opacity-40" />
        <Image src={PIXEL_STAR_PURPLE} alt="" width={70} height={70} className="absolute bottom-[30%] left-[3%] opacity-50" />
        <Image src={PIXEL_HEARTS} alt="" width={50} height={50} className="absolute bottom-20 right-[15%] opacity-40" />
        <Image src={PIXEL_STAR_YELLOW} alt="" width={40} height={40} className="absolute top-[30%] right-[25%] opacity-30" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={PIXEL_HEARTS} alt="WaiFusion" width={32} height={32} />
            <span className="font-semibold text-lg">WaiFusion</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Gallery
            </Link>
            <Link href="#story" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Story
            </Link>
            <Link href="#community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://opensea.io/collection/waifusion" target="_blank" rel="noopener noreferrer">
                OpenSea
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="https://discord.gg/kusari" target="_blank" rel="noopener noreferrer">
                Join Discord
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <Image src={PIXEL_STAR_YELLOW} alt="" width={16} height={16} />
              First NFT Community Takeover
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
              A community-born{" "}
              <span className="text-primary">NFT legacy</span>
              <Image src={PIXEL_HEARTS} alt="" width={48} height={48} className="inline-block ml-3 align-middle" />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              WaiFusion began as the first generative anime collection on Ethereum. 
              When the original team stepped away, the community took over.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="https://discord.gg/kusari" target="_blank" rel="noopener noreferrer">
                  Join the Community
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://opensea.io/collection/waifusion" target="_blank" rel="noopener noreferrer">
                  View on OpenSea
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">16,384 Unique Waifus</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Each WaiFusion is a unique piece of digital art, generated from hundreds of traits.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WAIFUS.map((url, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden bg-muted group"
                style={{ position: "relative" }}
              >
                <Image
                  src={url}
                  alt={`WaiFusion #${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="https://opensea.io/collection/waifusion" target="_blank" rel="noopener noreferrer">
                Browse Full Collection
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  WaiFusion is the earliest generative anime collection in Web3, consisting of 
                  16,384 unique NFTs on Ethereum. Created shortly after Hashmasks in March 2021.
                </p>
                <p>
                  After the original team stepped away, WaiFusion evolved into a community-governed 
                  effort. Today, each WaiFu exists as both a digital artwork and a symbol of 
                  decentralization.
                </p>
                <p>
                  It became one of the earliest NFT projects to be fully carried forward by its 
                  holders, redefining what decentralization really means.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Kusari</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Kusari is a creative collective and onchain platform dedicated to building a 
                  positive future for decentralized culture.
                </p>
                <p>
                  In 2021, the current founders of Kusari took stewardship of WaiFusion, ensuring 
                  the collection{"'"}s continuity and evolution.
                </p>
                <p>
                  Today, WaiFusion lives under the Kusari family umbrella, shaped by collaboration, 
                  community, and a long-term vision for onchain art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Timeline</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { date: "March 3rd 2021", title: "WaiFusion Minted Out", desc: "16,384 waifus land on the blockchain" },
              { date: "March 24th 2021", title: "Community Takeover", desc: "Holders unite to carry the project forward" },
              { date: "March 22nd 2021", title: "Original Team Departs", desc: "The project is left to its community" },
              { date: "September 2021", title: "Kusari Formed", desc: "A new collective takes stewardship" },
            ].map((event, i) => (
              <div key={i} className="p-6 rounded-xl bg-background border border-border">
                <span className="text-sm text-primary font-medium">{event.date}</span>
                <h3 className="text-lg font-semibold mt-2 mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section id="community" className="py-32 px-6 relative">
        <div className="absolute inset-0 pointer-events-none">
          <Image src={PIXEL_STAR_BLUE} alt="" width={60} height={60} className="absolute top-10 left-[10%] opacity-60" />
          <Image src={PIXEL_STAR_PURPLE} alt="" width={50} height={50} className="absolute bottom-10 right-[10%] opacity-60" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Image src={PIXEL_HEARTS} alt="" width={80} height={80} className="mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Join the Kusari Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Connect with fellow collectors, artists, and enthusiasts. 
            Be part of the WaiFusion legacy.
          </p>
          <Button size="lg" asChild>
            <Link href="https://discord.gg/kusari" target="_blank" rel="noopener noreferrer">
              Join Discord
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image src={PIXEL_HEARTS} alt="WaiFusion" width={24} height={24} />
            <span className="font-medium">WaiFusion</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://twitter.com/waaboratory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link
              href="https://discord.gg/kusari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </Link>
            <Link
              href="https://opensea.io/collection/waifusion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.629 0 12 0ZM5.92 12.403l.051-.081 3.123-4.884a.107.107 0 0 1 .187.014c.52 1.169.972 2.623.76 3.528-.088.372-.335.876-.614 1.342a2.405 2.405 0 0 1-.117.199.106.106 0 0 1-.09.045H6.013a.106.106 0 0 1-.091-.163Zm13.914 1.68a.109.109 0 0 1-.065.101c-.243.103-1.07.485-1.414.962-.878 1.222-1.548 2.97-3.048 2.97H9.053a4.019 4.019 0 0 1-4.013-4.028v-.072c0-.058.048-.106.108-.106h3.485c.07 0 .12.063.115.132-.026.226.017.459.125.67.206.42.636.682 1.099.682h1.726v-1.347H9.99a.11.11 0 0 1-.089-.173l.063-.09c.16-.231.391-.586.621-.992.156-.274.308-.566.43-.86.024-.052.043-.107.065-.16.033-.094.067-.182.091-.269a4.57 4.57 0 0 0 .065-.223c.057-.25.081-.514.081-.787 0-.108-.004-.221-.014-.327-.005-.117-.02-.235-.034-.352a3.415 3.415 0 0 0-.048-.312 6.494 6.494 0 0 0-.098-.468l-.014-.06c-.03-.108-.056-.21-.09-.317a11.824 11.824 0 0 0-.328-.972 5.212 5.212 0 0 0-.142-.355c-.072-.178-.146-.339-.213-.49a3.564 3.564 0 0 1-.094-.197 4.658 4.658 0 0 0-.103-.213c-.024-.053-.053-.104-.072-.152l-.211-.388c-.029-.053.019-.118.077-.101l1.32.357h.01l.173.05.192.054.07.019v-.783c0-.379.302-.686.679-.686a.66.66 0 0 1 .477.202.69.69 0 0 1 .2.484V6.65l.141.039c.01.005.022.01.031.017.034.024.084.062.147.11.05.038.103.086.165.137a10.351 10.351 0 0 1 .574.504c.214.199.454.432.684.691.065.074.127.146.192.226.062.079.132.156.19.232.079.104.16.212.235.324.033.053.074.108.105.161.096.142.178.288.257.435.034.067.067.141.096.213.089.197.159.396.202.598a.65.65 0 0 1 .029.132v.01c.014.057.019.12.024.184a2.057 2.057 0 0 1-.106.874c-.031.084-.06.17-.098.254-.075.17-.161.343-.264.502-.034.06-.075.122-.113.182-.043.063-.089.123-.127.18a3.823 3.823 0 0 1-.173.221c-.053.072-.106.144-.166.209-.081.098-.16.19-.245.278-.048.058-.1.118-.156.17-.052.06-.108.113-.156.161-.084.084-.15.147-.208.202l-.137.122a.102.102 0 0 1-.072.03h-1.051v1.346h1.322c.295 0 .576-.104.804-.298.077-.067.415-.36.816-.802a.094.094 0 0 1 .05-.03l3.65-1.057a.108.108 0 0 1 .138.103Z" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Part of the Kusari family
          </p>
        </div>
      </footer>
    </main>
  )
}
