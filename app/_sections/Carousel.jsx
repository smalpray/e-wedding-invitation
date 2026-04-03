"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=1200&q=85",
  },
];

const DURATION = 5500;
const TOTAL = slides.length;
const SWIPE_THRESHOLD = 40;

export default function WeddingCarousel() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const getIdx = (offset) => (current + offset + TOTAL) % TOTAL;

  const navigate = useCallback((dir) => {
    clearInterval(timerRef.current);
    setCurrent((p) => (p + dir + TOTAL) % TOTAL);
    setAnimKey((k) => k + 1);
  }, []);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setCurrent(i);
    setAnimKey((k) => k + 1);
  };

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % TOTAL);
      setAnimKey((k) => k + 1);
    }, DURATION);
    return () => clearInterval(timerRef.current);
  }, [current]);

  // Touch/swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      navigate(diff > 0 ? 1 : -1);
    }
  }, [navigate]);

  // Mouse drag handlers (for desktop swipe)
  const handleMouseDown = useCallback((e) => {
    touchStartX.current = e.clientX;
    touchEndX.current = e.clientX;
    isSwiping.current = true;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      navigate(diff > 0 ? 1 : -1);
    }
  }, [navigate]);

  const prevIdx = getIdx(-1);
  const nextIdx = getIdx(1);

  return (
    <div
      style={styles.root}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <style>{css}</style>

      <div className="carousel-stack">
        <div className="carousel-card carousel-card-left">
          <img
            src={slides[prevIdx].src}
            alt=""
            className="carousel-card-img"
            draggable={false}
          />
        </div>

        <div className="carousel-card carousel-card-center mb-8  ">
          <img
            key={animKey}
            src={slides[current].src}
            alt=""
            className="carousel-card-img carousel-center-img"
            draggable={false}
          />
        </div>

        <div className="carousel-card carousel-card-right">
          <img
            src={slides[nextIdx].src}
            alt=""
            className="carousel-card-img"
            draggable={false}
          />
        </div>
      </div>

      <div style={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              ...styles.dot,
              width: i === current ? 28 : 8,
              background: i === current ? "#b5294e" : "#d4a0a0",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const css = `
  @keyframes carouselFadeIn {
    from { opacity: 0.55; transform: scale(0.97); }
    to   { opacity: 1;    transform: scale(1); }
  }
  .carousel-center-img {
    animation: carouselFadeIn 0.5s ease forwards;
  }
  button { cursor: pointer; border: none; }
  button:focus-visible { outline: 2px solid #e8a0a0; outline-offset: 2px; }

  .carousel-stack {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: clamp(260px, 55vw, 540px);
  }

  .carousel-card {
    position: absolute;
    border-radius: 14px;
    overflow: hidden;
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  .carousel-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Center — front, largest */
  .carousel-card-center {
    width: 60%;
    aspect-ratio: 4/3;
    z-index: 3;
    rounded: 16px;
  }

  /* Left — behind, shifted left, slightly smaller & rotated */
  .carousel-card-left {
    width: 45%;
    aspect-ratio: 4/3;
    z-index: 1;
    opacity: 0.7;
    transform: translateX(-55%) scale(0.88) rotate(-3deg);
  }

  /* Right — behind, shifted right, slightly smaller & rotated */
  .carousel-card-right {
    width: 45%;
    aspect-ratio: 4/3;
    z-index: 1;
    opacity: 0.7;
    transform: translateX(55%) scale(0.88) rotate(3deg);
  }

  /* Tablet */
  @media (max-width: 768px) {
    .carousel-stack {
      height: clamp(240px, 58vw, 440px);
    }
    .carousel-card-center {
      width: 70%;
    }
    .carousel-card-left {
      width: 50%;
      transform: translateX(-48%) scale(0.85) rotate(-3deg);
    }
    .carousel-card-right {
      width: 50%;
      transform: translateX(48%) scale(0.85) rotate(3deg);
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    .carousel-stack {
      height: clamp(220px, 70vw, 340px);
    }
    .carousel-card-center {
      width: 72%;
      border-radius: 10px;
    }
    .carousel-card-left {
      width: 55%;
      border-radius: 10px;
      transform: translateX(-42%) scale(0.82) rotate(-2deg);
    }
    .carousel-card-right {
      width: 55%;
      border-radius: 10px;
      transform: translateX(42%) scale(0.82) rotate(2deg);
    }
  }
`;

const styles = {
  root: {
    width: "100%",
    padding: "48px 0 32px",
    position: "relative",
    overflow: "hidden",
    cursor: "grab",
    userSelect: "none",
    touchAction: "pan-y",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 0,
  },
};
