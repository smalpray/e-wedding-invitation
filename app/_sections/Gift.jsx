import React, { useEffect, useRef } from "react";
import Divider from "./Divider";

export default function Gift() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gift-visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    const animatedEls = sectionRef.current?.querySelectorAll(
      ".gift-animate, .gift-animate-card",
    );
    animatedEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=EB+Garamond:wght@400;700&display=swap');

        .gift-section {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #fce8e8 0%, #fdf0ef 40%, #fdf6f4 70%, #fce8e8 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 24px 80px;
          font-family: 'EB Garamond', Georgia, serif;
          box-sizing: border-box;
        }

        /* blobs */
        .gift-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .gift-blob-left {
          left: -100px; top: 25%;
          width: 380px; height: 340px;
          background: radial-gradient(ellipse, rgba(240,160,160,0.38) 0%, transparent 70%);
          animation: blobFloat 8s ease-in-out infinite alternate;
        }
        .gift-blob-right {
          right: -100px; top: 50%;
          width: 300px; height: 260px;
          background: radial-gradient(ellipse, rgba(240,160,160,0.3) 0%, transparent 70%);
          animation: blobFloat 10s ease-in-out infinite alternate-reverse;
        }
        .gift-blob-center {
          left: 50%; top: 40%;
          transform: translateX(-50%);
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(230,150,160,0.18) 0%, transparent 70%);
          animation: blobFloat 12s ease-in-out infinite alternate;
        }
        @keyframes blobFloat {
          from { transform: translateY(0px) scale(1); }
          to   { transform: translateY(20px) scale(1.04); }
        }
        .gift-blob-center {
          animation: blobFloatCenter 12s ease-in-out infinite alternate;
        }
        @keyframes blobFloatCenter {
          from { transform: translateX(-50%) translateY(0px) scale(1); }
          to   { transform: translateX(-50%) translateY(20px) scale(1.04); }
        }

        /* content */
        .gift-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 900px;
        }

        /* title */
        .gift-title {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 20px;
        }
        .gift-title-script {
          font-family: 'Dancing Script', 'Brush Script MT', cursive;
          font-size: clamp(2.2rem, 7vw, 3rem);
          color: #b5294e;
          font-weight: 700;
          line-height: 1;
        }
        .gift-title-block {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 6vw, 2.6rem);
          font-weight: 900;
          color: #7a1030;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1;
        }

        /* subtitle */
        .gift-subtitle {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(0.95rem, 3vw, 1.1rem);
          color: #5a2035;
          text-align: center;
          line-height: 1.8;
          max-width: 620px;
          margin-bottom: 48px;
          font-weight: 400;
        }

        /* cards row */
        .gift-cards {
          display: flex;
          flex-direction: row;
          gap: 32px;
          justify-content: center;
          width: 100%;
          flex-wrap: wrap;
        }

        /* single card */
        .gift-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          width: 280px;
          flex-shrink: 0;
          box-shadow: 0 4px 24px rgba(180,80,100,0.10);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gift-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(180,80,100,0.18);
        }

        .gift-card-qr {
          width: 100%;
          object-fit: contain;
          display: block;
        }

        /* animations */
        .gift-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .gift-animate.gift-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .gift-animate:nth-child(1) { transition-delay: 0.1s; }
        .gift-animate:nth-child(2) { transition-delay: 0.25s; }
        .gift-animate:nth-child(3) { transition-delay: 0.4s; }
        .gift-animate-card {
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease;
        }
        .gift-animate-card.gift-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .gift-animate-card:nth-child(1) { transition-delay: 0.2s; }
        .gift-animate-card:nth-child(2) { transition-delay: 0.45s; }

        /* mobile */
        @media (max-width: 640px) {
          .gift-section { padding: 48px 16px 64px; }
          .gift-cards { gap: 20px; }
          .gift-card { width: min(280px, 90vw); }
        }
      `}</style>

      <div className="gift-section" ref={sectionRef}>
        <div className="gift-blob gift-blob-left" />
        <div className="gift-blob gift-blob-right" />
        <div className="gift-blob gift-blob-center" />

        <div className="gift-content">
          <Divider />

          <div className="gift-title gift-animate">
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="font-great-vibes text-6xl text-[#DE3163]">
                gift
              </span>

              <span className="font-jost font-semibold text-6xl tracking-[0.3em] text-[#DE3163] uppercase">
                Guide
              </span>
            </div>
          </div>

          <p className="gift-subtitle gift-animate">
            The most important thing is to have you with us on our special day.
            No gifts are needed or expected in any way. However, if you wish to
            bless us with a gift, a monetary gift will help us as we plan for
            our future together.
          </p>

          <div className="gift-cards gap-8">
            {/* InstaPay Card */}
            <div className="gift-card gift-animate-card">
              <img
                src="/images/gcash-qr.jpg"
                alt="InstaPay QR Code"
                className="gift-card-qr"
              />
            </div>

            {/* BPI Card */}
            <div className="gift-card gift-animate-card">
              <img
                src="/images/gcash-qr.jpg"
                alt="BPI QR Code"
                className="gift-card-qr"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
