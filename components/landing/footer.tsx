import Link from "next/link"
import { Twitter, MessageCircle, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-mono text-sm font-bold text-primary-foreground">W</span>
            </div>
            <span className="font-mono text-lg font-semibold tracking-tight text-foreground">WaiFusion</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/waikitoken"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://discord.gg/kusari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Discord"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/uwu-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            WaiFusion is a community-owned project under Kusari stewardship. First minted March 2021.
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            Contract: 0x2216d47494e516d8206b70fca8585820ed3c4946
          </p>
        </div>
      </div>
    </footer>
  )
}
