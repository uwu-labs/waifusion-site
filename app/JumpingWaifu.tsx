"use client";

import { useState } from "react";

export default function JumpingWaifu({
  images,
  initialIndex,
  delay = "0s",
  className = "",
  currentIndex: controlledIndex,
  onBounce,
}: {
  images: string[] | readonly string[];
  initialIndex: number;
  delay?: string;
  className?: string;
  /** When set with onBounce, parent controls which image is shown (no duplicates across slots). */
  currentIndex?: number;
  onBounce?: () => void;
}) {
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const index = controlledIndex !== undefined ? controlledIndex % images.length : internalIndex % images.length;

  const handleAnimationIteration = () => {
    if (onBounce) {
      onBounce();
      return;
    }
    setInternalIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <img
      src={images[index]}
      alt="Jumping Waifu"
      onAnimationIteration={handleAnimationIteration}
      className={`animate-waifu-jump no-hover ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}
