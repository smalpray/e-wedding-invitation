"use client";

import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Photos", href: "#photos" },
  { label: "Venue", href: "#venue" },
  { label: "Entourage", href: "#entourage" },
  { label: "Dress Code", href: "#dresscode" },
  { label: "Gift Guide", href: "#gift" },
  { label: "FAQs", href: "#faqs" },
];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 100;
      let current = "Home";
      for (const link of navLinks) {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= headerOffset) {
            current = link.label;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-jost { font-family: 'Jost', sans-serif; }

        /* Desktop nav underline effect */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1.5px;
          background: #b8956a;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after { width: 60%; }

        /* Mobile menu slide-in */
        .mobile-menu {
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu.open {
          transform: translateX(0);
        }

        /* Hamburger lines */
        .burger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #5c4a3a;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .burger-line.open:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .burger-line.open:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .burger-line.open:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile nav link */
        .mobile-nav-link {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5c4a3a;
          text-decoration: none;
          padding: 14px 0;
          display: block;
          border-bottom: 1px solid #b8956a18;
          transition: color 0.25s ease, padding-left 0.25s ease;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #b8956a;
          padding-left: 8px;
        }

        /* Overlay */
        .menu-overlay {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .menu-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
      `}</style>

      <header className="bg-[#fdf8f4] border-b border-[#b8956a]/20 relative overflow-visible z-50 sticky top-0">
        <div className="bg-[#3a2e28] text-center py-1.5 font-jost font-extralight text-[11px] tracking-[0.25em] text-[#d4b896] uppercase">
          ♡ &nbsp; We're getting married &nbsp; ♡
        </div>

        <svg
          className="absolute top-0 left-0 opacity-[0.07] pointer-events-none"
          width="120"
          height="100"
          viewBox="0 0 120 100"
        >
          <path
            d="M10,80 Q20,40 60,20 Q40,50 80,60 Q50,55 10,80Z"
            fill="#b8956a"
          />
          <path
            d="M5,60 Q30,30 70,10 Q45,45 90,40"
            stroke="#b8956a"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="70" cy="10" r="4" fill="#b8956a" />
          <circle cx="30" cy="30" r="3" fill="#b8956a" />
        </svg>
        <svg
          className="absolute top-0 right-0 opacity-[0.07] pointer-events-none scale-x-[-1]"
          width="120"
          height="100"
          viewBox="0 0 120 100"
        >
          <path
            d="M10,80 Q20,40 60,20 Q40,50 80,60 Q50,55 10,80Z"
            fill="#b8956a"
          />
          <path
            d="M5,60 Q30,30 70,10 Q45,45 90,40"
            stroke="#b8956a"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="70" cy="10" r="4" fill="#b8956a" />
          <circle cx="30" cy="30" r="3" fill="#b8956a" />
        </svg>

        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <nav className="hidden md:flex items-center justify-center border-t border-[#b8956a]/20 w-full flex-wrap">
            {navLinks.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && (
                  <span className="text-[#b8956a]/40 text-[10px] select-none">
                    ·
                  </span>
                )}
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(link.label);
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`nav-link font-jost font-light text-[10.5px] tracking-[0.2em] uppercase no-underline px-5 py-3.5 relative transition-colors duration-300 ${
                    active === link.label
                      ? "text-[#b8956a] active"
                      : "text-[#5c4a3a] hover:text-[#b8956a]"
                  }`}
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <div className="md:hidden flex items-center justify-between py-3.5 border-t border-[#b8956a]/20">
            <span className="font-jost font-light text-[10.5px] tracking-[0.2em] uppercase text-[#b8956a]">
              {active}
            </span>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5.5px] p-1 focus:outline-none z-[60] relative"
              aria-label="Toggle menu"
            >
              <span className={`burger-line ${menuOpen ? "open" : ""}`} />
              <span className={`burger-line ${menuOpen ? "open" : ""}`} />
              <span className={`burger-line ${menuOpen ? "open" : ""}`} />
            </button>
          </div>
        </div>

        <div
          className={`menu-overlay fixed inset-0 bg-[#3a2e28]/30 z-40 md:hidden ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`mobile-menu fixed top-0 right-0 h-full w-72 bg-[#fdf8f4] z-50 md:hidden shadow-xl px-8 pt-16 pb-10 overflow-y-auto ${menuOpen ? "open" : ""}`}
        >
          {/* Close area header */}
          <div className="mb-6">
            <p className="font-jost font-extralight text-[9px] tracking-[0.3em] uppercase text-[#b8956a]/60 mb-1">
              Menu
            </p>
            <div className="h-px w-8 bg-[#b8956a]/30" />
          </div>

          <nav>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(link.label);
                  setMenuOpen(false);
                  const el = document.querySelector(link.href);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`mobile-nav-link ${active === link.label ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-10 text-center">
            <p className="font-jost font-extralight text-[9px] tracking-[0.3em] uppercase text-[#b8956a]/50">
              ♡
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
