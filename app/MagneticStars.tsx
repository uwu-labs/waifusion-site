"use client";

import { useEffect, useRef } from "react";

export default function MagneticStars({ 
  children,
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars = Array.from(container.querySelectorAll("img"));
    
    // Setup initial random float properties & desync GIFs
    stars.forEach((star, i) => {
      // Assign the float animation class
      star.classList.add("star-float");
      // Desynchronize the CSS floating animations randomly
      star.style.animationDelay = `${Math.random() * -10}s`;
      star.style.animationDuration = `${6 + Math.random() * 4}s`; 
      // Smooth transitions exclusively for the magnetic repelling!
      star.style.transition = "translate 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
      
      // Un-sync the internal GIF playbacks
      setTimeout(() => {
        const originalSrc = star.src.split('?')[0];
        star.src = `${originalSrc}?v=${Date.now()}_${i}`;
      }, Math.random() * 2000);
    });

    const handleMouseMove = (e: MouseEvent) => {
      // Get the bounding box of our container on every move so scrolling won't break coordinates
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      stars.forEach((star) => {
        // Calculate true center of the star based on pure layout offsets (ignoring its active float transform)
        const starX = containerRect.left + star.offsetLeft + star.offsetWidth / 2;
        const starY = containerRect.top + star.offsetTop + star.offsetHeight / 2;
        
        const dx = mouseX - starX;
        const dy = mouseY - starY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let moveX = 0;
        let moveY = 0;
        
        const pushRadius = 200; 
        if (distance < pushRadius) {
          // Exponential decay for a natural "magnet" feel
          const repelStrength = Math.pow((pushRadius - distance) / pushRadius, 1.3); 
          moveX = -(dx / distance) * repelStrength * 80; 
          moveY = -(dy / distance) * repelStrength * 80;
        }
        
        // Use setProperty for CSS "translate", which seamlessly layers with the CSS keyframe "transform"
        star.style.setProperty("translate", `${moveX}px ${moveY}px`);
      });
    };

    const handleMouseLeave = () => {
      stars.forEach((star) => {
        star.style.setProperty("translate", `0px 0px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes star-float-anim {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(8px); }
          66% { transform: translateY(10px) translateX(-6px); }
        }
        .star-float {
          animation: star-float-anim 8s ease-in-out infinite;
        }
      `}</style>
      <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
        {children}
      </div>
    </>
  );
}
