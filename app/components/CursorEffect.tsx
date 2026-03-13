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
      colors: ["#ffe3feff", "#ffddf9ff", "#ffade9ff", "#ff8df9ff", "#fdb9ffff"],
    })

    return () => cursor.destroy()
  }, [])

  return null
}
