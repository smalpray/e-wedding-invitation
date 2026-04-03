import React from "react";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Jost:wght@200;300;400;500&display=swap');
      `}</style>

      {/* Reminders + Snap & Share Section */}
      <section
        className="w-full text-center py-12 sm:py-16 px-4"
        style={{ background: "#fdf6f0" }}
      >
        {/* Reminders */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-[#DE3163] mb-3"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Reminders
        </h2>
        <p
          className="text-[#DE3163] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-10 sm:mb-14"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          BE ON TIME &nbsp;|&nbsp; FINISH THE EVENT &nbsp;|&nbsp; ENJOY AND HAVE
          FUN
        </p>

        {/* Snap & Share */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-[#DE3163] mb-2"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Snap &amp; Share
        </h2>
        <p
          className="text-[#7a3a4a] text-sm sm:text-base leading-relaxed mb-1"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          Share the love, we want to see the day through your eyes!
        </p>
        <p
          className="text-[#7a3a4a] text-sm sm:text-base mb-4"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          Kindly tag your photos
        </p>
        <p
          className="text-[#1a1a1a] text-base sm:text-lg font-bold mb-5"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          #KennYouBeMineMitch
        </p>
      </section>

      {/* Bottom Credit Bar */}
      <footer
        className="w-full py-3 px-4 flex items-center justify-center gap-3"
        style={{
          background: "#fdf6f0",
          borderTop: "1px solid rgba(180,160,155,0.3)",
        }}
      >
        <p
          className="text-[#4a3a3a] text-[10px] sm:text-xs text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          Created by <span className="font-semibold">Wakin Dev</span>
        </p>
      </footer>
    </>
  );
}
