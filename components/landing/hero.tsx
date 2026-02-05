"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-2 font-mono text-xs uppercase tracking-wider">
          First NFT Community Takeover
        </Badge>

        <h1 className="mx-auto max-w-4xl text-balance font-mono text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          A community-born
          <span className="block text-primary">NFT legacy</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          WaiFusion is the first generative anime collection on Ethereum. Created in March 2021, it became the first
          NFT project to be fully carried forward by its community after the original team stepped away.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2" asChild>
            <a href="https://discord.gg/kusari" target="_blank" rel="noopener noreferrer">
              Join the Community
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="https://opensea.io/collection/waifusion" target="_blank" rel="noopener noreferrer">
              View Collection
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-12 text-center">
          <div>
            <p className="font-mono text-3xl font-bold text-foreground">16,384</p>
            <p className="mt-1 text-sm text-muted-foreground">Unique Waifus</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div>
            <p className="font-mono text-3xl font-bold text-foreground">2021</p>
            <p className="mt-1 text-sm text-muted-foreground">Year Founded</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div>
            <p className="font-mono text-3xl font-bold text-foreground">Kusari</p>
            <p className="mt-1 text-sm text-muted-foreground">Stewardship</p>
          </div>
        </div>
      </div>
    </section>
  )
}
