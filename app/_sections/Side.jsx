"use client";
import React, { useEffect, useState } from "react";

export default function Side({ position = "left", enabled = true }) {
  const isRight = position === "right";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, [enabled]);

  return (
    <>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: translateX(-55%) rotate(0deg) translateY(0px); }
          30%       { transform: translateX(-55%) rotate(2deg) translateY(-5px); }
          70%       { transform: translateX(-55%) rotate(-1.5deg) translateY(4px); }
        } 
        @keyframes sway-reverse {
          0%, 100% { transform: translateX(55%) scaleX(-1) rotate(0deg) translateY(0px); }
          30%       { transform: translateX(55%) scaleX(-1) rotate(-2deg) translateY(-5px); }
          70%       { transform: translateX(55%) scaleX(-1) rotate(1.5deg) translateY(4px); }
        }

        .side-floral {
          transition: opacity 1.6s ease, transform 1.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* LEFT — half hidden off left edge */
        .side-floral.side-left {
          opacity: 0;
          transform: translateX(-120%) rotate(-6deg);
        }
        .side-floral.side-left.visible {
          opacity: 1;
          transform: translateX(-55%) rotate(0deg);
        }

        /* RIGHT — half hidden off right edge */
        .side-floral.side-right {
          opacity: 0;
          transform: translateX(120%) rotate(6deg) scaleX(-1);
        }
        .side-floral.side-right.visible {
          opacity: 1;
          transform: translateX(55%) scaleX(-1) rotate(0deg);
        }

        /* Sway after entrance */
        .side-floral.side-left.visible {
          animation: sway 7s ease-in-out infinite;
          animation-delay: 1.6s;
        }
        .side-floral.side-right.visible {
          animation: sway-reverse 7s ease-in-out infinite;
          animation-delay: 1.8s;
        }

        .side-floral.entering {
          animation: none !important;
        }
      `}</style>

      <div
      
        className={`fixed top-1/2 z-0 w-36 -translate-y-1/2 pointer-events-none sm:w-44 lg:w-56 ${
          isRight ? "right-0" : "left-0"
        }`}
      >
        <img
          src="/images/bohemian_flower_2.webp"
          alt={isRight ? "Right floral arrangement" : "Left floral arrangement"}
          className={`h-auto w-full side-floral ${isRight ? "side-right" : "side-left"} ${visible ? "visible" : "entering"}`}
        />
      </div>
    </>
  );
}
