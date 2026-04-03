import React, { useRef, useEffect, useState } from "react";
import Divider from "./Divider";
import Side from "./Side";
import CenterImg from "./CenterImg";

const brushStroke = (color, rotate = "0deg", opacity = 0.7) => ({
  display: "inline-block",
  width: "60px",
  height: "22px",
  background: color,
  borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
  transform: `rotate(${rotate})`,
  opacity,
});

export default function DressCode() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pinkBg = {
    minHeight: "100vh",
    background:
      "linear-gradient(160deg, #fce8e8 0%, #fdf0ef 40%, #fdf6f4 70%, #fce8e8 100%)",
    fontFamily: "'Georgia', serif",
    position: "relative",
    overflow: "hidden",
  };

  const pinkBlob = {
    position: "absolute",
    left: "-80px",
    top: "30%",
    width: "320px",
    height: "280px",
    background:
      "radial-gradient(ellipse, rgba(240,160,160,0.35) 0%, transparent 70%)",
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  };

  const pinkBlobRight = {
    position: "absolute",
    right: "-80px",
    top: "55%",
    width: "260px",
    height: "220px",
    background:
      "radial-gradient(ellipse, rgba(240,160,160,0.28) 0%, transparent 70%)",
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  };

  const flowerLeft = {
    position: "absolute",
    left: "12px",
    bottom: "30px",
    width: "110px",
    opacity: 0.85,
    zIndex: 1,
    pointerEvents: "none",
  };

  const flowerRight = {
    position: "absolute",
    right: "12px",
    bottom: "30px",
    width: "110px",
    opacity: 0.85,
    zIndex: 1,
    pointerEvents: "none",
  };

  const flowerTop = {
    position: "absolute",
    top: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90px",
    opacity: 0.75,
    zIndex: 1,
    pointerEvents: "none",
  };

  const pageContainer = {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
    paddingBottom: "60px",
    minHeight: "100vh",
  };

  const titleScript = {
    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
    fontSize: "2.8rem",
    color: "#b5294e",
    fontWeight: 700,
    lineHeight: 1.1,
    margin: 0,
  };

  const titleBlock = {
    fontFamily: "'Garamond', 'Georgia', serif",
    fontWeight: 900,
    fontSize: "2.2rem",
    color: "#7a1030",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: 0,
    lineHeight: 1.2,
  };

  const sectionLabel = {
    fontFamily: "'Garamond', 'Georgia', serif",
    fontWeight: 900,
    fontSize: "1.5rem",
    color: "#7a1030",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
    marginBottom: "14px",
  };

  const attireText = {
    fontFamily: "'Garamond', 'Georgia', serif",
    fontWeight: 700,
    fontSize: "1.35rem",
    color: "#5a2035",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    lineHeight: 1.7,
    textAlign: "center",
  };

  const figureArea = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "0px",
    width: "100%",
    maxWidth: "100%",
    padding: "0 40px",
    position: "relative",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const sideBox = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 30px",
  };

  const centerImgBox = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: "0px",
    flex: "2",
  };

  const imgStyle = {
    height: "420px",
    width: "auto",
    objectFit: "contain",
    display: "block",
  };

  const BrushGroup = () => (
    <div
      style={{
        display: "flex",
        gap: "6px",
        alignItems: "center",
        marginBottom: "2px",
      }}
    >
      <span style={brushStroke("rgba(205,140,150,0.55)", "-8deg")} />
      <span style={brushStroke("rgba(185,110,120,0.65)", "0deg")} />
      <span style={brushStroke("rgba(190,155,155,0.45)", "8deg")} />
    </div>
  );

  return (
    <div
      ref={sectionRef}
      style={pinkBg}
      className={`dc-section${visible ? " dc-visible" : ""}`}
    >
      <style>{`
        .dc-section .dc-item {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .dc-section.dc-visible .dc-item { opacity: 1; transform: translateY(0); }
        .dc-section.dc-visible .dc-item-1 { transition-delay: 0.05s; }
        .dc-section.dc-visible .dc-item-2 { transition-delay: 0.2s; }
        .dc-section.dc-visible .dc-item-3 { transition-delay: 0.38s; }
        .dc-section.dc-visible .dc-item-4 { transition-delay: 0.52s; }
        .dc-section.dc-visible .dc-item-5 { transition-delay: 0.66s; }

        @media (max-width: 768px) {
          .dc-figure-area {
            flex-wrap: wrap !important;
            padding: 0 16px !important;
          }
          .dc-center-imgs {
            order: 1;
            flex: 0 0 100% !important;
            width: 100%;
            justify-content: center;
          }
          .dc-side-left {
            order: 2;
            flex: 0 0 50% !important;
            width: 50%;
            padding: 12px 8px !important;
          }
          .dc-side-right {
            order: 3;
            flex: 0 0 50% !important;
            width: 50%;
            padding: 12px 8px !important;
          }
          .dc-img { height: 200px !important; }
          .dc-section-label { font-size: 1rem !important; }
          .dc-attire-text { font-size: 0.95rem !important; letter-spacing: 0.06em !important; }
          .dc-title-large { font-size: 1.6rem !important; }
          .dc-note { font-size: 0.82rem !important; max-width: 90vw !important; }
          .dc-heading-row span { font-size: 2.2rem !important; }
        }

        @media (max-width: 480px) {
          .dc-img { height: 150px !important; }
          .dc-title-large { font-size: 1.2rem !important; }
          .dc-attire-text { font-size: 0.82rem !important; }
          .dc-side-left, .dc-side-right { padding: 8px 4px !important; }
          .dc-heading-row span { font-size: 1.8rem !important; }
        }
      `}</style>

      {/* Pink blobs */}
      <div style={pinkBlob} />
      <div style={pinkBlobRight} />

      {/* Flower corners */}
      <FlowerCorner style={flowerLeft} flip={false} />
      <FlowerCorner style={flowerRight} flip={true} />
      <FloralTop style={flowerTop} />

      <div style={pageContainer}>
        {/* ── NINONG / NINANG SECTION ── */}
        <div className="dc-item dc-item-1 dc-heading-row mt-6 flex items-center justify-center gap-3 mb-12">
          <span className="font-great-vibes text-6xl text-[#DE3163]">
            attire
          </span>
          <span className="font-jost font-semibold text-6xl tracking-[0.3em] text-[#DE3163] uppercase dc-title-large">
            Guide
          </span>
        </div>

        <div style={figureArea} className="dc-figure-area dc-item dc-item-2">
          {/* Left: Ninong label + text */}
          <div style={sideBox} className="dc-side-left">
            <p style={sectionLabel} className="dc-section-label">
              NINONGS
            </p>
            <div
              style={{ ...attireText, marginTop: "8px" }}
              className="dc-attire-text"
            >
              BLACK SUIT
              <br />
              BLACK PANTS
            </div>
          </div>

          {/* Center: both images */}
          <div style={centerImgBox} className="dc-center-imgs">
            <img
              src="/images/man_ninong.webp"
              alt="Ninong"
              style={imgStyle}
              className="dc-img"
            />
            <img
              src="/images/woman_ninang.webp"
              alt="Ninang"
              style={imgStyle}
              className="dc-img"
            />
          </div>

          {/* Right: Ninang label + text */}
          <div style={sideBox} className="dc-side-right">
            <p style={sectionLabel} className="dc-section-label">
              NINANGS
            </p>
            <div
              style={{ ...attireText, marginTop: "8px" }}
              className="dc-attire-text"
            >
              FORMAL DRESS
            </div>
          </div>
        </div>

        {/* ── GUESTS SECTION ── */}
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "6px",
          }}
          className="dc-item dc-item-3"
        >
          <BrushGroup />
          <p style={titleScript}>Guests</p>
          <p
            style={{ ...titleBlock, fontSize: "2.8rem", marginBottom: "18px" }}
            className="dc-title-large"
          >
            FORMAL ATTIRE
          </p>
        </div>

        <div style={figureArea} className="dc-figure-area dc-item dc-item-4">
          {/* Left: Men attire text */}
          <div style={sideBox} className="dc-side-left">
            <div style={attireText} className="dc-attire-text">
              GRAY OR TAUPE
              <br />
              LONG-SLEEVES SHIRT/
              <br />
              POLO SHIRT/ PANTS/
              <br />
              SUIT
            </div>
          </div>

          {/* Center: both images */}
          <div style={centerImgBox} className="dc-center-imgs">
            <img
              src="/images/man_guest.webp"
              alt="Male guest"
              style={imgStyle}
              className="dc-img"
            />
            <img
              src="/images/woman_guest.webp"
              alt="Female guest"
              style={imgStyle}
              className="dc-img"
            />
          </div>

          {/* Right: Women attire text */}
          <div style={sideBox} className="dc-side-right">
            <div style={attireText} className="dc-attire-text">
              LONG DRESS OR
              <br />
              COCKTAIL DRESS
            </div>
          </div>
        </div>

        {/* Note */}
        <div
          className="dc-item dc-item-5 dc-note"
          style={{
            maxWidth: "700px",
            textAlign: "center",
            marginTop: "28px",
            fontFamily: "'Garamond', 'Georgia', serif",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#3a1020",
            letterSpacing: "0.06em",
            lineHeight: 1.7,
            textTransform: "uppercase",
          }}
        >
          WE KINDLY REQUEST YOU TO WEAR THESE COLORS
          <br />
          AND DRESS IN FORMAL ATTIRE TO OUR SPECIAL DAY.
          <br />
          STRICTLY NO T-SHIRTS, SHORTS, DENIMS, AND SLIPPERS
        </div>

        <Divider />
        <CenterImg/>
      </div>
    </div>
  );
}

function FlowerCorner({ style, flip }) {
  return <div></div>;
}

function FloralTop({ style }) {
  return <Divider />;
}
