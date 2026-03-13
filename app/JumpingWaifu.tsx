"use client";

import { useState } from "react";

export default function JumpingWaifu({
  images,
  initialIndex,
  delay = "0s",
  className = "",
}: {
  images: string[] | readonly string[];
  initialIndex: number;
  delay?: string;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleAnimationIteration = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <img
      src={images[currentIndex % images.length]}
      alt="Jumping Waifu"
      onAnimationIteration={handleAnimationIteration}
      className={`animate-waifu-jump ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}
