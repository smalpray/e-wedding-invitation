"use client";
import React, { useState, useEffect, useRef } from "react";

const PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200&q=80",
    alt: "Romantic wedding couple sunset",
    featured: true,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    alt: "Bride and groom walking together",
    featured: false,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Wedding ceremony outdoor",
    featured: false,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    alt: "Wedding rings close up",
    featured: false,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&q=80",
    alt: "Bride holding bouquet",
    featured: false,
  },
];

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

export default function Photo() {
  const [lightbox, setLightbox] = useState(null);
  const [titleRef, titleVisible] = useReveal();
  const [featuredRef, featuredVisible] = useReveal(0.08);
  const gridRefs = PHOTOS.filter((p) => !p.featured).map(() => useReveal(0.08));

  const featured = PHOTOS.find((p) => p.featured);
  const grid = PHOTOS.filter((p) => !p.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-cormorant   { font-family: 'Cormorant Garamond', serif; }
        .font-jost        { font-family: 'Jost', sans-serif; }

        /* ── Smoke blobs ── */
        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(30px,-40px) scale(1.08); }
          70%     { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          35%     { transform: translate(-40px, 30px) scale(1.06); }
          65%     { transform: translate(25px,-25px) scale(0.97); }
        }
        @keyframes floatC {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(20px, 40px) scale(1.05); }
        }
        .blob-a { animation: floatA 14s ease-in-out infinite; }
        .blob-b { animation: floatB 18s ease-in-out infinite; }
        .blob-c { animation: floatC 22s ease-in-out infinite; }

        /* ── Photo cards ── */
        .photo-card { overflow: hidden; cursor: pointer; }
        .photo-card img { transition: transform 0.8s ease; }
        .photo-card:hover img { transform: scale(1.06); }

        /* ── Scroll animations ── */
        .anim-fade-up {
          transition: opacity 0.9s ease, transform 0.9s ease;
          opacity: 0; transform: translateY(40px);
        }
        .anim-fade-up.visible { opacity: 1; transform: translateY(0); }

        .anim-zoom {
          transition: opacity 1s ease, transform 1s cubic-bezier(0.22,1,0.36,1);
          opacity: 0; transform: scale(0.92);
        }
        .anim-zoom.visible { opacity: 1; transform: scale(1); }

        .anim-slide-left {
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
          opacity: 0; transform: translateX(-50px);
        }
        .anim-slide-left.visible { opacity: 1; transform: translateX(0); }

        .anim-slide-right {
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
          opacity: 0; transform: translateX(50px);
        }
        .anim-slide-right.visible { opacity: 1; transform: translateX(0); }

        /* ── Lightbox ── */
        .lightbox-overlay {
          position: fixed; inset: 0;
          background: rgba(30,10,15,0.93);
          z-index: 1000; display: flex;
          align-items: center; justify-content: center;
          animation: fadeInOverlay 0.3s ease; padding: 20px;
        }
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }

        .lightbox-img {
          max-width: 90vw; max-height: 88vh;
          object-fit: contain; border-radius: 2px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6);
          animation: zoomInImg 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes zoomInImg {
          from{ opacity:0; transform:scale(0.88); }
          to  { opacity:1; transform:scale(1); }
        }

        .lightbox-close {
          position: fixed; top: 20px; right: 28px;
          color: white; font-size: 32px; cursor: pointer;
          z-index: 1001; line-height: 1; opacity: 0.8;
          transition: opacity 0.2s, transform 0.2s;
          background: none; border: none; font-family: sans-serif;
        }
        .lightbox-close:hover { opacity:1; transform: scale(1.15) rotate(90deg); }

        .lightbox-arrow {
          position: fixed; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: white; width: 44px; height: 44px;
          border-radius: 50%; display: flex;
          align-items: center; justify-content: center;
          cursor: pointer; font-size: 18px;
          z-index: 1001; transition: background 0.2s;
        }
        .lightbox-arrow:hover { background: rgba(255,255,255,0.25); }
        .lightbox-arrow.prev { left: 16px; }
        .lightbox-arrow.next { right: 16px; }
      `}</style>
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: "#fdf6f0" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="blob-a absolute -top-20 -left-24 w-96 h-96 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, #f9c4d2 0%, #f5a7be 40%, transparent 70%)",
            }}
          />
          <div
            className="blob-b absolute -top-10 -right-20 w-80 h-80 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #fbc8d8 0%, #f0a0bc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-c absolute top-1/3 -left-16 w-72 h-72 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #fdd5e1 0%, #f5b8cc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-a absolute top-1/2 -right-20 w-88 h-88 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #fac6d6 0%, #eda0bc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-b absolute bottom-0 -left-10 w-80 h-80 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #fbd0df 0%, #f4adc5 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-c absolute -bottom-16 -right-16 w-96 h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #fcc8d8 0%, #f0a8c0 50%, transparent 70%)",
            }}
          />
        </div>

        <section className="relative z-10 py-10 sm:py-16 px-2 sm:px-5">
          <div
            ref={titleRef}
            className={`text-center mb-6 sm:mb-10 anim-fade-up ${titleVisible ? "visible" : ""}`}
          >
            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3">
              <span className="font-great-vibes text-4xl sm:text-6xl text-[#DE3163]">
                the
              </span>
              <span className="font-jost font-semibold text-4xl sm:text-6xl tracking-[0.2em] sm:tracking-[0.3em] text-[#DE3163] uppercase">
                PRENUP
              </span>
            </div>
          </div>

          {/* Featured photo */}
          {featured && (
            <div
              ref={featuredRef}
              className={`photo-card mx-auto max-w-6xl mt-4 sm:mt-8 shadow-2xl rounded-sm anim-zoom ${featuredVisible ? "visible" : ""}`}
              onClick={() => setLightbox(featured)}
            >
              <img
                src={featured.src}
                alt={featured.alt}
                className="w-full h-[280px] sm:h-[450px] md:h-[580px] lg:h-[680px] object-cover"
              />
            </div>
          )}

          {grid.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-6xl mx-auto mt-2 sm:mt-3">
              {grid.map((photo, i) => {
                const [ref, visible] = gridRefs[i];
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={photo.id}
                    ref={ref}
                    className={`photo-card shadow-lg rounded-sm ${isEven ? "anim-slide-left" : "anim-slide-right"} ${visible ? "visible" : ""}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                    onClick={() => setLightbox(photo)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-40 sm:h-56 md:h-72 lg:h-80 object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            ×
          </button>

          <button
            className="lightbox-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              const idx = PHOTOS.findIndex((p) => p.id === lightbox.id);
              setLightbox(PHOTOS[(idx - 1 + PHOTOS.length) % PHOTOS.length]);
            }}
          >
            ‹
          </button>

          <img
            key={lightbox.id}
            src={lightbox.src}
            alt={lightbox.alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lightbox-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              const idx = PHOTOS.findIndex((p) => p.id === lightbox.id);
              setLightbox(PHOTOS[(idx + 1) % PHOTOS.length]);
            }}
          >
            ›
          </button>

          <div
            className="font-jost text-white/50 text-xs tracking-widest"
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {PHOTOS.findIndex((p) => p.id === lightbox.id) + 1} /{" "}
            {PHOTOS.length}
          </div>
        </div>
      )}
    </>
  );
}
