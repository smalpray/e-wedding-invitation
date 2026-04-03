"use client";
import React, { useEffect, useState, useRef } from "react";
import Divider from "./Divider";
import Side from "./Side";

// ✏️ EDIT THESE
const CONFIG = {
  groomName: "Dennis",
  brideName: "Shiela",
  day: "Wensday",
  month: "May",
  date: 20,
  year: 2026,
  time: "05:00 PM",
  hashtag: "#DennisAndShiela",
  weddingDateISO: "2026-05-20T17:00:00",
  heroPhoto:
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
  countdownBg:
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
};

// Scroll-triggered animation hook — only activates when `enabled` is true
function useReveal(threshold = 0.15, enabled = true) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
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
  }, [enabled]);

  return [ref, visible];
}

export default function Home({ opened = true }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef(null);

  // Stagger the reveal: wait for ClickLoad to fade, then enable animations
  useEffect(() => {
    if (opened) {
      const t = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(t);
    }
  }, [opened]);

  // Auto-play music when invitation is opened (requires user gesture from ClickLoad button)
  useEffect(() => {
    if (opened && audioRef.current) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setPlaying(false);
      });
    }
  }, [opened]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  // Individual section refs
  const [labelRef, labelVisible] = useReveal(0.15, ready);
  const [photoRef, photoVisible] = useReveal(0.1, ready);
  const [kenBurnsActive, setKenBurnsActive] = useState(false);

  // Start ken burns after the zoom-in transition finishes
  useEffect(() => {
    if (photoVisible) {
      const t = setTimeout(() => setKenBurnsActive(true), 1500);
      return () => clearTimeout(t);
    }
  }, [photoVisible]);
  const [dateRef, dateVisible] = useReveal(0.15, ready);
  const [dividerRef, dividerVisible] = useReveal(0.15, ready);
  const [textRef, textVisible] = useReveal(0.15, ready);
  const [rsvpRef, rsvpVisible] = useReveal(0.15, ready);
  const [hashtagRef, hashtagVisible] = useReveal(0.15, ready);
  const [countdownRef, countdownVisible] = useReveal(0.1, ready);

  useEffect(() => {
    const weddingDate = new Date(CONFIG.weddingDateISO);
    const tick = () => {
      const diff = weddingDate - new Date();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        mins: String(m).padStart(2, "0"),
        secs: String(s).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-jost { font-family: 'Jost', sans-serif; }

        /* === ANIMATION CLASSES === */

        /* Fade + slide up */
        .anim-fade-up {
          transition: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(50px);
        }
        .anim-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Fade + slide down */
        .anim-fade-down {
          transition: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(-50px);
        }
        .anim-fade-down.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Zoom in */
        .anim-zoom {
          transition: opacity 1.4s cubic-bezier(0.23, 1, 0.32, 1), transform 1.4s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: scale(0.9);
        }
        .anim-zoom.visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Fade in only */
        .anim-fade {
          transition: opacity 1.2s ease;
          opacity: 0;
        }
        .anim-fade.visible {
          opacity: 1;
        }

        /* Expand width (for divider) */
        .anim-expand {
          transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: scaleX(0.3);
          transform-origin: center;
        }
        .anim-expand.visible {
          opacity: 1;
          transform: scaleX(1);
        }

        /* Slide in from left */
        .anim-slide-left {
          transition: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateX(-60px);
        }
        .anim-slide-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Slide in from right */
        .anim-slide-right {
          transition: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateX(60px);
        }
        .anim-slide-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Stagger children */
        .stagger-children > *:nth-child(1) { transition-delay: 0s; }
        .stagger-children > *:nth-child(2) { transition-delay: 0.15s; }
        .stagger-children > *:nth-child(3) { transition-delay: 0.3s; }
        .stagger-children > *:nth-child(4) { transition-delay: 0.45s; }

        /* Photo ken burns on hover */
        .photo-wrap img {
          transition: transform 8s ease;
        }
        .photo-wrap:hover img {
          transform: scale(1.06);
        }

        /* Slow zoom on hero — GPU accelerated */
        @keyframes heroKenBurns {
          0%   { transform: scale(1) translateZ(0); }
          100% { transform: scale(1.08) translateZ(0); }
        }
        .hero-ken-burns {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .hero-ken-burns.active {
          animation: heroKenBurns 20s ease-in-out alternate infinite;
        }

        /* Countdown number flip feel */
        .countdown-num {
          transition: opacity 0.2s ease;
        }

        /* === FLOATING PETALS === */
        @keyframes petalFall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(80px);
            opacity: 0;
          }
        }
        @keyframes petalSway {
          0%, 100% { margin-left: 0; }
          50% { margin-left: 30px; }
        }
        .petal {
          position: fixed;
          top: -30px;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          animation: petalFall linear infinite, petalSway ease-in-out infinite;
        }

        /* === BACKGROUND TEXTURE === */
        .home-bg-texture {
          background-color: #f5ece8;
          background-image:
            radial-gradient(ellipse at 15% 20%, rgba(222,49,99,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 30%, rgba(155,35,53,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(222,49,99,0.03) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239b2335' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* === FLORAL CORNER ACCENTS === */
        @keyframes floralPulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.04); }
        }
        .floral-corner {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }
        .floral-corner svg {
          animation: floralPulse 6s ease-in-out infinite;
        }

        /* === ORNAMENTAL DIVIDER LINE === */
        .ornament-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 2rem auto;
          max-width: 280px;
        }
        .ornament-line::before,
        .ornament-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #9b2335, transparent);
          opacity: 0.3;
        }
      `}</style>

      <div className="min-h-screen home-bg-texture relative" style={{ overflowX: 'clip' }}>
        {/* Floating petals */}
        {ready && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="petal"
                style={{
                  left: `${5 + (i * 8) % 90}%`,
                  animationDuration: `${8 + (i % 5) * 2}s, ${3 + (i % 3)}s`,
                  animationDelay: `${i * 1.2}s, ${i * 0.5}s`,
                  fontSize: `${10 + (i % 4) * 4}px`,
                }}
              >
                {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🩷' : '✿'}
              </div>
            ))}
          </>
        )}

        {/* Top-left floral corner */}
        <div className="floral-corner" style={{ top: 0, left: 0 }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <path d="M0,0 Q40,60 20,120 Q60,80 120,100 Q80,40 0,0Z" fill="#de3163" fillOpacity="0.06" />
            <path d="M0,30 Q30,70 10,110" stroke="#de3163" strokeOpacity="0.1" strokeWidth="1" fill="none" />
            <circle cx="35" cy="50" r="3" fill="#de3163" fillOpacity="0.1" />
            <circle cx="60" cy="80" r="2" fill="#de3163" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Top-right floral corner */}
        <div className="floral-corner" style={{ top: 0, right: 0, transform: 'scaleX(-1)' }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <path d="M0,0 Q40,60 20,120 Q60,80 120,100 Q80,40 0,0Z" fill="#de3163" fillOpacity="0.06" />
            <path d="M0,30 Q30,70 10,110" stroke="#de3163" strokeOpacity="0.1" strokeWidth="1" fill="none" />
            <circle cx="35" cy="50" r="3" fill="#de3163" fillOpacity="0.1" />
            <circle cx="60" cy="80" r="2" fill="#de3163" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Bottom-left floral corner */}
        <div className="floral-corner" style={{ bottom: 0, left: 0, transform: 'scaleY(-1)' }}>
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <path d="M0,0 Q35,55 15,100 Q55,70 100,85 Q70,35 0,0Z" fill="#de3163" fillOpacity="0.05" />
            <circle cx="40" cy="55" r="2.5" fill="#de3163" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Bottom-right floral corner */}
        <div className="floral-corner" style={{ bottom: 0, right: 0, transform: 'scale(-1)' }}>
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <path d="M0,0 Q35,55 15,100 Q55,70 100,85 Q70,35 0,0Z" fill="#de3163" fillOpacity="0.05" />
            <circle cx="40" cy="55" r="2.5" fill="#de3163" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Floral sides */}
        <Side position="left" enabled={ready} />
        <Side position="right" enabled={ready} />
        <div
          ref={labelRef}
          className={`flex flex-col items-center pt-8 px-5 anim-fade-down ${labelVisible ? "visible" : ""}`}
        ></div>

        {/* Hero Photo - portrait style */}
        <div className="flex justify-center px-5">
          <div
            ref={photoRef}
            className={`photo-wrap w-full max-w-[520px] overflow-hidden relative anim-zoom ${photoVisible ? "visible" : ""}`}
            style={{ aspectRatio: "3/4", willChange: "transform", backfaceVisibility: "hidden" }}
          >
            <img
              src={CONFIG.heroPhoto}
              alt={`${CONFIG.groomName} & ${CONFIG.brideName}`}
              className={`w-full h-full object-cover hero-ken-burns ${kenBurnsActive ? "active" : ""}`}
            />
            {/* Gradient overlay for readability */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 35%, transparent 50%, rgba(245,236,232,0.85) 100%)",
              }}
            />
            {/* The Wedding of label */}
            <div
              className={`absolute top-[10%] inset-x-0 text-center anim-fade-down ${photoVisible ? "visible" : ""}`}
              style={{ transitionDelay: "0.3s" }}
            >
              <p
                className="font-jost font-light text-sm sm:text-base tracking-[0.35em] text-white uppercase"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
              >
                The Wedding of
              </p>
            </div>
            {/* Names animate in after photo */}
            <div
              className={`absolute bottom-[6%] inset-x-0 text-center anim-fade-up ${photoVisible ? "visible" : ""}`}
              style={{ transitionDelay: "0.6s" }}
            >
              <p
                className="font-great-vibes text-[48px] sm:text-[62px] md:text-[74px] text-white leading-[0.95] drop-shadow-lg"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.35)" }}
              >
                {CONFIG.groomName}
                <br />
                <span className="text-[40px] sm:text-[52px]">&amp;</span>
                <br />
                {CONFIG.brideName}
              </p>
            </div>
          </div>
        </div>
        <Side position="left" enabled={ready} />
        <Side position="right" enabled={ready} />

        {/* Ornamental divider after hero */}
        <div
          className={`ornament-line anim-expand ${dateVisible ? "visible" : ""}`}
        >
          <span className="font-great-vibes text-[#9b2335] text-xl" style={{ opacity: 0.5 }}>♥</span>
        </div>

        {/* Date - staggered slide */}
        <div
          ref={dateRef}
          className={`flex items-center justify-center mt-8 stagger-children ${dateVisible ? "visible" : ""}`}
        >
          <div
            className={`text-center px-7 font-jost anim-slide-left ${dateVisible ? "visible" : ""}`}
          >
            <div className="text-[10px] tracking-[0.2em] text-[#9b2335] uppercase font-light mb-1">
              Day
            </div>
            <div className="text-[13px] font-light text-[#9b2335] tracking-wide">
              {CONFIG.day}
            </div>
          </div>
          <div
            className={`w-px h-12 bg-[#9b2335]/40 anim-fade ${dateVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          />
          <div
            className={`text-center px-7 font-jost anim-fade-up ${dateVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="text-[10px] tracking-[0.2em] text-[#9b2335] uppercase font-light mb-1">
              {CONFIG.month}
            </div>
            <span className="font-cormorant text-5xl font-light text-[#9b2335] leading-none block">
              {CONFIG.date}
            </span>
            <div className="text-[13px] font-light text-[#9b2335] tracking-wide mt-1">
              {CONFIG.year}
            </div>
          </div>
          <div
            className={`w-px h-12 bg-[#9b2335]/40 anim-fade ${dateVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          />
          <div
            className={`text-center px-7 font-jost anim-slide-right ${dateVisible ? "visible" : ""}`}
          >
            <div className="text-[10px] tracking-[0.2em] text-[#9b2335] uppercase font-light mb-1">
              Time
            </div>
            <div className="text-[13px] font-light text-[#9b2335] tracking-wide">
              {CONFIG.time}
            </div>
          </div>
        </div>

        {/* Floral divider - expand from center */}
        <div
          ref={dividerRef}
          className={`flex justify-center mt-8 anim-expand ${dividerVisible ? "visible" : ""}`}
        >
          <Divider />
        </div>

        {/* Invite text - fade up */}
        <p
          ref={textRef}
          className={`font-cormorant italic text-base text-[#9b2335] text-center leading-relaxed max-w-md mx-auto px-10 mt-6 anim-fade-up ${textVisible ? "visible" : ""}`}
        >
          We request the honor of your presence for a celebration of love,
          friendship, laughter, and family as we unite ourselves in The
          Sacrament of Matrimony.
        </p>

        <div
          ref={rsvpRef}
          className={`flex justify-center mt-7 anim-zoom ${rsvpVisible ? "visible" : ""}`}
        >
          <button className="border border-[#9b2335] text-[#9b2335] font-jost font-light text-[10px] tracking-[0.3em] uppercase px-9 py-3 hover:bg-[#9b2335] hover:text-white transition-all duration-300">
            RSVP NOW
          </button>
        </div>

        {/* Hashtag - fade up */}
        <div
          ref={hashtagRef}
          className={`text-center mt-9 px-5 anim-fade-up ${hashtagVisible ? "visible" : ""}`}
        >
          <p className="font-jost font-light text-[13px] text-[#3a2028] leading-relaxed">
            Help us capture the love!
            <br />
            Please tag us and use our hashtags.
          </p>
          <p
            className={`font-cormorant italic text-lg text-[#9b2335] mt-1 anim-fade-up ${hashtagVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            {CONFIG.hashtag}
          </p>
        </div>

        {/* Ornamental divider before countdown */}
        <div
          className={`ornament-line anim-expand ${hashtagVisible ? "visible" : ""}`}
        >
          <span className="font-great-vibes text-[#9b2335] text-xl" style={{ opacity: 0.5 }}>♥</span>
        </div>

        {/* Countdown - zoom in with staggered boxes */}
        <div
          ref={countdownRef}
          className={`max-w-[720px] mx-auto mt-9 relative overflow-hidden anim-zoom ${countdownVisible ? "visible" : ""}`}
        >
          <div className="w-full aspect-square relative">
            <img
              src={CONFIG.countdownBg}
              alt="Countdown background"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-[#f5ece8]/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <p
                className={`font-cormorant italic text-base text-[#3a2028]/80 mb-3 anim-fade-down ${countdownVisible ? "visible" : ""}`}
                style={{ transitionDelay: "0.3s" }}
              >
                Countdown to forever!
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINUTES", val: timeLeft.mins },
                  { label: "SECONDS", val: timeLeft.secs },
                ].map(({ label, val }, i) => (
                  <div
                    key={label}
                    className={`border border-[#9b2335] w-24 py-2 text-center bg-white/50 anim-slide-left ${countdownVisible ? "visible" : ""}`}
                    style={{ transitionDelay: `${0.4 + i * 0.12}s` }}
                  >
                    <span className="countdown-num font-cormorant text-3xl font-light text-[#3a2028] block leading-none">
                      {val}
                    </span>
                    <span className="font-jost text-[8px] tracking-[0.2em] text-[#3a2028]/60 uppercase">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Divider />
        </div>

        <div className="h-16" />

        {/* Background music */}
        <audio ref={audioRef} src="/mp3/Palagi - Tj Monterde  Violin Cover by BOJO (mp3cut.net).mp3" loop preload="auto" />

        {/* Music button */}
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 border border-[#9b2335] bg-[#fdf8f5] text-[#9b2335] font-jost font-light text-[10px] tracking-[0.15em] px-4 py-2 flex items-center gap-1.5 shadow-lg z-50"
        >
          <span>♪</span>
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      </div>
    </>
  );
}
