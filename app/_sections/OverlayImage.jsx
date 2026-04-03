"use client";
import React, { useEffect, useRef, useState } from "react";

export default function OverlayImage() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (el) setOffsetTop(el.offsetTop);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade out as user scrolls down into this section
  // Starts fading when section enters view, fully gone after 400px scroll
  const relativeScroll = Math.max(0, scrollY - offsetTop + 300);
  const opacity = Math.max(0, 1 - relativeScroll / 400);
  const scale = 1 + relativeScroll * 0.0003; // very subtle zoom as it fades

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .overlay-image-wrap {
          animation: fadeSlideUp 1.2s ease both;
        }

        /* Faded edges — top and bottom melt into page bg */
        .image-fade-edges {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 75%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 75%,
            transparent 100%
          );
        }
      `}</style>

      <div
        ref={ref}
        className="relative w-full flex flex-col items-center overflow-hidden"
        style={{ background: "#fdf6f0" }}
      >
        {/* Main scrolling image */}
        <div
          className="overlay-image-wrap image-fade-edges w-full max-w-lg mx-auto relative z-0"
          style={{
            opacity,
            transform: `scale(${scale})`,
            transition: "transform 0.1s linear",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80"
            alt="Wedding couple on staircase"
            className="w-full object-cover"
            style={{ maxHeight: "80vh" }}
          />
        </div>
      </div>
    </>
  );
}
