"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import JumpingWaifu from "./JumpingWaifu";

const DURATION_MS = 1500;
const LAND_AT_MS = 750; // 50% — image changes when they hit the ground

/**
 * 8 images, 4 slots. Each slot advances when *that* slot lands (50% of cycle).
 * Timers are synced to the CSS animation so the swap happens on impact.
 */
export default function GalleryWaifus({ images }: { images: readonly string[] }) {
  const n = images.length;
  const [imageIndices, setImageIndices] = useState([0, 2, 4, 6]);

  const handleBounce = useCallback(
    (slotIndex: number) => {
      setImageIndices((prev) => {
        const others = new Set(prev.filter((_, j) => j !== slotIndex));
        let next = (prev[slotIndex] + 1) % n;
        while (others.has(next)) next = (next + 1) % n;
        const nextIndices = [...prev];
        nextIndices[slotIndex] = next;
        return nextIndices;
      });
    },
    [n]
  );

  const intervalIds = useRef<(ReturnType<typeof setInterval> | undefined)[]>([]);

  useEffect(() => {
    const timeouts: number[] = [];
    for (let i = 0; i < 4; i++) {
      const firstLandMs = LAND_AT_MS + i * 250;
      timeouts.push(
        window.setTimeout(() => {
          handleBounce(i);
          intervalIds.current[i] = setInterval(() => handleBounce(i), DURATION_MS);
        }, firstLandMs)
      );
    }
    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      intervalIds.current.forEach((id) => id != null && clearInterval(id));
      intervalIds.current = [];
    };
  }, [handleBounce]);

  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`jumping-waifu-${i}`}
          className="aspect-square relative flex items-center justify-center overflow-visible"
        >
          <JumpingWaifu
            images={images}
            initialIndex={i}
            delay={`${i * 0.25}s`}
            className="w-full h-full object-contain relative z-10"
            currentIndex={imageIndices[i]}
          />
        </div>
      ))}
    </>
  );
}
