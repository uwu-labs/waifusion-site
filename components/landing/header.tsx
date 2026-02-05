"use client"

import Link from "next/link"
import { Twitter, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-mono text-sm font-bold text-primary-foreground">W</span>
          </div>
          <span className="font-mono text-lg font-semibold tracking-tight text-foreground">WaiFusion</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#gallery"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Gallery
          </Link>
          <Link
            href="#story"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Story
          </Link>
          <Link
            href="#timeline"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Timeline
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="https://twitter.com/waikitoken" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="https://discord.gg/kusari" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <MessageCircle className="h-5 w-5" />
            </a>
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <a href="https://opensea.io/collection/waifusion" target="_blank" rel="noopener noreferrer">
              View on OpenSea
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
