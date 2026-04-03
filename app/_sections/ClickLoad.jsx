"use client";
import React, { useState, useEffect } from "react";

export default function ClickLoad({ onOpen, opened }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  // Lock body scroll while overlay is visible
  useEffect(() => {
    if (!gone) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [gone]);

  const handleClick = () => {
    setLeaving(true);
    // Scroll to top so Home is the first thing visible
    window.scrollTo(0, 0);
    // Tell parent to start revealing content
    setTimeout(() => onOpen(), 400);
    // Remove overlay from DOM after animation completes
    setTimeout(() => setGone(true), 1200);
  };

  if (gone) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Jost:wght@200;300;400;500&display=swap');

        .click-load-wrapper {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #fce8e8 0%, #fdf0ef 40%, #fdf6f4 70%, #fce8e8 100%);
          transition: opacity 1s ease, transform 1s ease;
        }

        .click-load-wrapper.leaving {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        .cl-title {
          font-family: 'Great Vibes', cursive;
          color: #DE3163;
          font-size: clamp(3rem, 8vw, 5.5rem);
          line-height: 1.2;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          animation: clFadeUp 1s ease forwards;
        }

        .cl-btn {
          margin-top: 2.5rem;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: clamp(11px, 1.4vw, 14px);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #7a3a4a;
          background: transparent;
          border: 1.5px solid #c4a0a0;
          border-radius: 6px;
          padding: 14px 40px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          animation: clFadeUp 0.8s ease 0.6s forwards;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .cl-btn:hover {
          background: #DE3163;
          color: #fff;
          border-color: #DE3163;
        }

        @keyframes clFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className={`click-load-wrapper ${leaving ? "leaving" : ""}`}>
        <p className="cl-title">
          You<br />are<br />cordially<br />invited!
        </p>
        <button className="cl-btn" onClick={handleClick}>
          Open Invitation
        </button>
      </div>
    </>
  );
}
