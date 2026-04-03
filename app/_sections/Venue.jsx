"use client";
import React, { useEffect, useRef, useState } from "react";
import Divider from "./Divider";

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const CEREMONY = {
  label: "ceremony",
  time: "02:00 in the afternoon",
  venueName: "ST. JOSEPH THE WORKER PARISH",
  venueAddress: "P.N. Roa Subdivision, Calaanan, Canitoan, Cagayan de Oro City",
  venuePhoto:
    " https://plus.unsplash.com/premium_photo-1768759486730-96082311f998?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  qrCode: "/images/qrcode.png",
  googleMapsUrl:
    "https://maps.google.com/?q=St+Joseph+The+Worker+Parish+Cagayan+de+Oro",
};

const RECEPTION = {
  label: "reception",
  time: "reception to follow at",
  venueName: "Casa de Canitoan",
  venueAddress: "Macapagal Dr, Cagayan de Oro City, Misamis Oriental",
  venuePhoto:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80",
  qrCode: "/images/qrcode.png",
  googleMapsUrl: "https://maps.google.com/?q=Casa+de+Canitoan+Cagayan+de+Oro",
};

function VenueCard({ data, delay = 0 }) {
  const [cardRef, cardVisible] = useReveal(0.08);
  const [infoRef, infoVisible] = useReveal(0.05);
  const [qrRef, qrVisible] = useReveal(0.05);

  return (
    <div
      ref={cardRef}
      className={`relative mx-auto max-w-5xl rounded-sm overflow-hidden shadow-2xl anim-zoom ${cardVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <img
        src={data.venuePhoto}
        alt={data.venueName}
        className="w-full h-[360px] sm:h-[440px] md:h-[520px] object-cover"
        style={{ filter: "brightness(0.72)" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(253,246,240,0.1) 0%, rgba(253,246,240,0.5) 55%, rgba(253,246,240,0.78) 100%)",
        }}
      />

      <div
        ref={infoRef}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 anim-fade-up ${infoVisible ? "visible" : ""}`}
        style={{ transitionDelay: `${delay + 0.3}s` }}
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 sm:gap-3 text-center">
          <p
            className="font-cormorant italic text-[#3a2028]/90 text-sm sm:text-base md:text-lg"
            style={{ textShadow: "0 1px 8px rgba(253,246,240,0.9)" }}
          >
            {data.label === "ceremony"
              ? `the ceremony will commence at ${data.time}`
              : data.time}
          </p>

          <h2
            className="font-jost font-semibold text-lg sm:text-xl md:text-2xl tracking-widest text-[#9b2335]"
            style={{ textShadow: "0 1px 10px rgba(253,246,240,0.9)" }}
          >
            {data.venueName}
          </h2>

          <p
            className="font-jost font-light text-xs sm:text-sm text-[#3a2028]/80"
            style={{ textShadow: "0 1px 8px rgba(253,246,240,0.9)" }}
          >
            {data.venueAddress}
          </p>

          <div
            ref={qrRef}
            className={`mt-4 anim-fade ${qrVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${delay + 0.6}s` }}
          >
            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="rounded-sm bg-white/50 p-2 sm:p-3 shadow-lg backdrop-blur-sm qr-pulse">
                <img
                  src={data.qrCode}
                  alt="Scan for directions"
                  className="h-24 w-24 object-contain sm:h-36 sm:w-36 md:h-40 md:w-40 mx-auto"
                />
                <p className="mt-1.5 sm:mt-2 max-w-36 sm:max-w-40 md:max-w-44 text-center font-cormorant italic text-[11px] sm:text-[12px] md:text-[13px] text-[#9b2335]/80">
                  Let the QR code lead you. Tap it to view the
                  <br />
                  venue map.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Venue() {
  const [titleRef, titleVisible] = useReveal();
  const [dividerBottomRef, dividerBottomVisible] = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;600&display=swap');
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-cormorant   { font-family: 'Cormorant Garamond', serif; }
        .font-jost        { font-family: 'Jost', sans-serif; }

        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(30px,-40px) scale(1.08); }
          70%     { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          35%     { transform: translate(-40px,30px) scale(1.06); }
          65%     { transform: translate(25px,-25px) scale(0.97); }
        }
        .blob-a { animation: floatA 16s ease-in-out infinite; }
        .blob-b { animation: floatB 20s ease-in-out infinite; }

        .anim-fade-up {
          transition: opacity 0.9s ease, transform 0.9s ease;
          opacity: 0;
          transform: translateY(40px);
        }
        .anim-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .anim-zoom {
          transition: opacity 1.1s ease, transform 1.1s cubic-bezier(0.22,1,0.36,1);
          opacity: 0;
          transform: scale(0.94);
        }
        .anim-zoom.visible {
          opacity: 1;
          transform: scale(1);
        }

        .anim-fade {
          transition: opacity 1s ease;
          opacity: 0;
        }
        .anim-fade.visible {
          opacity: 1;
        }

        @keyframes qrPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(155,35,53,0.25); }
          50%     { box-shadow: 0 0 0 14px rgba(155,35,53,0); }
        }
        .qr-pulse { animation: qrPulse 2.5s ease-in-out infinite; }

        .section-sep {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, #c4879a, transparent);
          margin: 0 auto;
        }
      `}</style>

      <div
        className="relative overflow-x-hidden"
        style={{ background: "#fdf6f0" }}
      >
        {/* Smoke blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="blob-a absolute -top-16 -left-20 w-96 h-96 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #f9c4d2 0%, #f5a7be 40%, transparent 70%)",
            }}
          />
          <div
            className="blob-b absolute top-1/4 -right-24 w-80 h-80 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #fbc8d8 0%, #f0a0bc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-a absolute top-2/3 -left-16 w-72 h-72 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #fdd5e1 0%, #f5b8cc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-b absolute -bottom-10 -right-16 w-96 h-96 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #fcc8d8 0%, #f0a8c0 50%, transparent 70%)",
            }}
          />
        </div>

        <section className="relative z-10 py-10 sm:py-16 px-3 sm:px-5">
          {/* Title */}
          <div
            ref={titleRef}
            className={`text-center mb-10 anim-fade-up ${titleVisible ? "visible" : ""}`}
          >
            <Divider />
            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3">
              <span className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#DE3163]">
                the
              </span>
              <span className="font-jost font-semibold text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] text-[#DE3163] uppercase">
                Venue
              </span>
            </div>
          </div>

          {/* Ceremony */}
          <VenueCard data={CEREMONY} delay={0} />

          {/* Separator */}
          <div className="my-10 flex flex-col items-center gap-3">
            <div className="section-sep" />
            <span className="font-cormorant italic text-[#c4879a] text-base tracking-widest">
              &amp; then
            </span>
            <div className="section-sep" />
          </div>

          {/* Reception */}
          <VenueCard data={RECEPTION} delay={0.1} />

          {/* Bottom divider */}
          <div
            ref={dividerBottomRef}
            className={`mt-14 anim-fade-up ${dividerBottomVisible ? "visible" : ""}`}
          ></div>
        </section>
      </div>
    </>
  );
}
