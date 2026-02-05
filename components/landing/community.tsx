import { Button } from "@/components/ui/button"
import { MessageCircle, Twitter, ExternalLink } from "lucide-react"

export function Community() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-12 text-center md:p-20">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-4 font-mono text-sm uppercase tracking-wider text-primary">Join Us</p>
            <h2 className="mx-auto max-w-2xl text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Discover the Kusari Community
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
              Connect with fellow collectors, artists, and Web3 enthusiasts who believe in community-owned culture.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="https://discord.gg/kusari" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Join Discord
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="https://twitter.com/waikitoken" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  Follow on Twitter
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <a
                href="https://opensea.io/collection/waifusion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                OpenSea <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://etherscan.io/address/0x2216d47494e516d8206b70fca8585820ed3c4946"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Etherscan <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
