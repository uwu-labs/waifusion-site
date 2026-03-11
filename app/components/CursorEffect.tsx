"use client"

import { useEffect } from "react"
import { fairyDustCursor } from "cursor-effects"

export function CursorEffect() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Respect user's reduced motion preference for accessibility
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const cursor = fairyDustCursor({
      colors: ["#FF008C", "#DFA7FF", "#0894FF", "#FE4EAF", "#B010FA"],
    })

    return () => cursor.destroy()
  }, [])

  return null
}
