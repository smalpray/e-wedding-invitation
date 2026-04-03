"use client";
import React, { useEffect, useRef, useState } from "react";
import Divider from "./Divider";
import WeddingCarousel from "./Carousel";

function useReveal(threshold = 0.1) {
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

// ✏️ EDIT THESE
const DATA = {
  groomSurname: "SAHULGA",
  brideSurname: "ROSELLO",

  parentsGroom: ["HELEN S. PILLOS"],
  parentsBride: ["BERNARDO N. ROSELLO", "MARILOU D. ROSELLO"],

  principalSponsors: [
    { mr: "MR. FELIPI Q. MABAO", mrs: "MRS. PACITA B. UY" },
    { mr: "MR. VERMAN C. SALVAÑA", mrs: "MRS. LILITA C. SALVAÑA" },
    { mr: "MR. HENRY JONES J. PAMBID", mrs: "MRS. CHRISTINE I. PAMBID" },
    { mr: "MR. DIONISIO G. COREA", mrs: "MRS. MARIFE S. COREA" },
    { mr: "MR. MIKE D. MANGUDA", mrs: "MRS. JUANITA D. PUNZALAN" },
    { mr: "MR. PEPITO S. MURAYAO", mrs: "MRS. MARIVIC D. MURAYAO" },
  ],

  bestMen: ["JERALD T. BUHIA"],
  maidOfHonor: ["MARJORIE S. EMMANUEL", "RONA LUZ C. DURAN"],

  groomsmen: [
    "GIAN S. PILLOS",
    "JAN RYAN S. PILLOS",
    "JUN MARK S. PILLOS",
    "MARK JAYSON S. LATONIO",
    "MARK RYAN D. MURAYAO",
  ],
  bridesmaids: [
    "DONA ROSE D. MURAYAO",
    "HEILEY L. LADIERO",
    "HARRIET L. LADIERO",
    "RAVEN JOY T. TADLAS",
    "JAMECAH M. AMPATUA",
  ],

  candleSponsors: ["MR. JUNMAR M. SAHULGA", "MRS. CAREEN O. SAHULGA"],
  veilSponsors: ["MR. RIGOR S. PEDROSA", "MRS. LUZ MARIE B. PEDROSA"],
  cordSponsors: ["MR. MALVIN P. TADLAS", "MRS. NILTHER T. TADLAS"],
};

function Section({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`anim-fade-up ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function RoleLabel({ children }) {
  return (
    <p className="font-great-vibes text-2xl text-[#DE3163] mt-6 mb-1 text-center">
      {children}
    </p>
  );
}

function NamePair({ left, right }) {
  return (
    <div className="flex justify-center gap-8 font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase text-center">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <p className="font-jost font-bold text-lg tracking-[0.25em] text-[#DE3163] uppercase text-center mt-8 mb-1">
      {children}
    </p>
  );
}

export default function Entourage() {
  const [titleRef, titleVisible] = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;600;700&display=swap');
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
          transform: translateY(32px);
        }
        .anim-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .thin-divider {
          width: 120px;
          height: 1px;
          background: linear-gradient(to right, transparent, #c4879a, transparent);
          margin: 12px auto;
        }
      `}</style>

      <div
        className="relative overflow-x-hidden"
        style={{ background: "#fdf6f0" }}
      >
        {/* Pink smoke blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="blob-a absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, #fbc8d8 0%, #f5a7be 40%, transparent 65%)",
            }}
          />
          <div
            className="blob-b absolute top-1/3 -right-20 w-96 h-96 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, #fdd5e1 0%, #f0a0bc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-a absolute bottom-1/4 -left-16 w-80 h-80 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #fcc8d8 0%, #f5b8cc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-b absolute -bottom-16 right-0 w-[420px] h-[420px] rounded-full opacity-35"
            style={{
              background:
                "radial-gradient(circle, #fbc8d8 0%, #f0a8c0 50%, transparent 65%)",
            }}
          />
        </div>

        <section className="relative z-10 py-16 px-5 max-w-3xl mx-auto">
          {/* Top divider floral */}
          <div
            ref={titleRef}
            className={`anim-fade-up ${titleVisible ? "visible" : ""}`}
          >
            <Divider />

            {/* Main title */}
            <div className="text-center mt-6 mb-2">
              <h1 className="font-jost font-bold text-5xl tracking-[0.15em] text-[#DE3163] uppercase">
                {DATA.groomSurname} - {DATA.brideSurname}
              </h1>
              <p className="font-jost font-semibold text-xl tracking-[0.4em] text-[#3a2028] uppercase mt-1">
                Nuptials
              </p>
            </div>
          </div>

          <div className="thin-divider mt-6" />

          {/* Parents */}
          <Section delay={0.1}>
            <div className="flex justify-center gap-16 mt-4">
              <div className="text-center">
                <RoleLabel>Parent of the Groom</RoleLabel>
                {DATA.parentsGroom.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>
              <div className="text-center">
                <RoleLabel>Parents of the Bride</RoleLabel>
                {DATA.parentsBride.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </Section>

          <div className="thin-divider mt-8" />

          {/* Principal Sponsors */}
          <Section delay={0.15}>
            <SectionTitle>Principal Sponsors</SectionTitle>
            <RoleLabel>To stand as witness to our vows</RoleLabel>
            <div className="mt-3 space-y-1">
              {DATA.principalSponsors.map((pair, i) => (
                <NamePair key={i} left={pair.mr} right={pair.mrs} />
              ))}
            </div>
          </Section>

          <div className="thin-divider mt-8" />

          {/* Best Man & Maid of Honor */}
          <Section delay={0.2}>
            <div className="flex justify-center gap-16 mt-2">
              <div className="text-center">
                <RoleLabel>Best Man</RoleLabel>
                {DATA.bestMen.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>
              <div className="text-center">
                <RoleLabel>Maid of Honor</RoleLabel>
                {DATA.maidOfHonor.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </Section>

          <div className="thin-divider mt-8" />

          {/* Secondary Sponsors */}
          <Section delay={0.25}>
            <SectionTitle>Secondary Sponsors</SectionTitle>
          </Section>

          {/* Groomsmen & Bridesmaids */}
          <Section delay={0.3}>
            <div className="flex justify-center gap-16 mt-2">
              <div className="text-center">
                <RoleLabel>Groomsmen</RoleLabel>
                {DATA.groomsmen.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>
              <div className="text-center">
                <RoleLabel>Bridesmaids</RoleLabel>
                {DATA.bridesmaids.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </Section>

          <div className="thin-divider mt-8" />

          {/* Candle / Veil / Cord — 3 column */}
          <Section delay={0.35}>
            <div className="flex justify-between mt-6 gap-4 flex-wrap">
              {/* Candle */}
              <div className="text-center flex-1 min-w-[140px]">
                <RoleLabel>To light our path</RoleLabel>
                {DATA.candleSponsors.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>

              {/* Cord */}
              <div className="text-center flex-1 min-w-[140px]">
                <RoleLabel>To bind us together</RoleLabel>
                {DATA.cordSponsors.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>

              {/* Veil */}
              <div className="text-center flex-1 min-w-[140px]">
                <RoleLabel>To clothe us as one</RoleLabel>
                {DATA.veilSponsors.map((n, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-sm tracking-widest text-[#3a2028] uppercase"
                  >
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </Section>

          {/* Bottom divider floral */}
          <Section delay={0.4}>
            <div className="mt-14">
              <Divider />
            </div>
          </Section>
        </section>
        <WeddingCarousel />
      </div>
    </>
  );
}
