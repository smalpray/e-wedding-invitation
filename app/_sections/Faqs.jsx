"use client";
import React, { useEffect, useRef, useState } from "react";
import Divider from "./Divider";
import CenterImg2 from "./CenterImg2";

function useReveal(threshold = 0.08) {
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

function FaqRow({
  question,
  paragraphs,
  imgSrc,
  imgAlt,
  imgRight = true,
  delay = 0,
}) {
  const [ref, visible] = useReveal(0.06);

  const textBlock = (
    <div className={`flex-1 min-w-0 ${!imgRight ? "text-right" : "text-left"}`}>
      <p className="font-cormorant italic text-[#9b2335] text-base sm:text-xl underline underline-offset-2 decoration-[#9b2335]/60 mb-2 sm:mb-4 cursor-default">
        {question}
      </p>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="font-jost font-light text-[12px] sm:text-[15px] text-[#3a2028] leading-relaxed mb-2 sm:mb-3"
        >
          {p}
        </p>
      ))}
    </div>
  );

  const imageBlock = (
    <div className="flex-shrink-0 flex items-center justify-center w-[110px] sm:w-[220px] md:w-[260px]">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-full object-contain drop-shadow-md img-float"
      />
    </div>
  );

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 sm:gap-6 mb-10 sm:mb-16 anim-fade-up ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {imgRight ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}

export default function FAQs() {
  const [titleRef, titleVisible] = useReveal();
  const [bottomRef, bottomVisible] = useReveal();

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
          transition: opacity 0.95s ease, transform 0.95s ease;
          opacity: 0;
          transform: translateY(36px);
        }
        .anim-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes imgFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
        }
        .img-float {
          animation: imgFloat 5s ease-in-out infinite;
        }
      `}</style>

      <div
        className="relative overflow-x-hidden"
        style={{ background: "#fdf6f0" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="blob-a absolute -top-20 -left-20 w-64 sm:w-[480px] h-64 sm:h-[480px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, #fbc8d8 0%, #f5a7be 40%, transparent 65%)",
            }}
          />
          <div
            className="blob-b absolute top-1/3 -right-20 w-56 sm:w-96 h-56 sm:h-96 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, #fdd5e1 0%, #f0a0bc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-a absolute top-2/3 -left-16 w-52 sm:w-80 h-52 sm:h-80 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #fcc8d8 0%, #f5b8cc 50%, transparent 70%)",
            }}
          />
          <div
            className="blob-b absolute -bottom-16 -right-16 w-64 sm:w-[420px] h-64 sm:h-[420px] rounded-full opacity-35"
            style={{
              background:
                "radial-gradient(circle, #fbc8d8 0%, #f0a8c0 50%, transparent 65%)",
            }}
          />
        </div>

        <section className="relative z-10 py-10 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
          
          <div
            ref={titleRef}
            className={`text-center mb-8 sm:mb-12 anim-fade-up ${titleVisible ? "visible" : ""}`}
          >
            <Divider />
            <div className="mt-4 sm:mt-6 flex flex-wrap items-baseline justify-center gap-1 sm:gap-3">
              <span className="font-great-vibes text-3xl sm:text-5xl text-[#DE3163]">
                Your Questions,
              </span>
              <span className="font-jost font-semibold text-xl sm:text-3xl tracking-[0.2em] text-[#3a2028] uppercase">
                ANSWERED
              </span>
            </div>
          </div>

          <FaqRow
            question="What time should I arrive?"
            paragraphs={[
              "Help us get the party started as scheduled! We recommend that you arrive an hour or 30 mins before the start of the ceremony to make sure everyone is seated on time. We encourage you to consider the travel time and traffic going to the venue.",
            ]}
            imgSrc="/images/time_slant.webp"
            imgAlt="Pocket watch"
            imgRight={true}
            delay={0.1}
          />

          <FaqRow
            question="Can I bring someone with me?"
            paragraphs={[
              "Unfortunately, due to space and seating constraints, our guest list is under strict limitations. As our event operates on an exclusive RSVP basis, we can only accommodate those who have formally confirmed their presence.",
              "We kindly ask for your understanding in adhering to our policy of not bringing uninvited guests. Your cooperation in this matter is greatly appreciated, as it ensures that every guest has a comfortable and enjoyable experience.",
            ]}
            imgSrc="/images/ring.webp"
            imgAlt="Wedding rings"
            imgRight={false}
            delay={0.1}
          />

          <FaqRow
            question="What happens during the ceremony?"
            paragraphs={[
              "UNPLUGGED CEREMONY",
              "We've hired the services of skilled photographers to capture the cherished moments of our day, allowing you to unwind, immerse yourself in the experience, and share it alongside us.",
              "Our photos will be available once the wedding is over.",
              "Please ensure the aisle remains unobstructed as the bridal entrance takes place.",
              "Rest assured, after the ceremony and throughout the entire reception, feel free to capture as many photos and videos as you'd like. Your memories are important to us, and we encourage you to preserve them.",
              "Kindly ensure that all children remain quiet and respectful throughout the wedding ceremony to maintain a serene and meaningful atmosphere.",
            ]}
            imgSrc="/images/no_camera.webp"
            imgAlt="No camera allowed"
            imgRight={true}
            delay={0.1}
          />

          <FaqRow
            question="What happens after the ceremony?"
            paragraphs={[
              "After the ceremony, the bridal party will be taking pictures nearby for around an hour.",
              "Guests can proceed directly to the reception venue, where they can share their memories with us by visiting the photobooth.",
            ]}
            imgSrc="/images/wine_toast.webp"
            imgAlt="Champagne toast"
            imgRight={false}
            delay={0.1}
          />

          <FaqRow
            question="When is the appropriate time to leave?"
            paragraphs={[
              "Having you here with us is the most precious gift of all. We kindly request your presence throughout the entirety of our reception program.",
              "Should you need to depart early, we'd greatly appreciate the opportunity to express our gratitude and bid you farewell. However, we kindly request that you consider staying until after our Thanksgiving Speech.",
            ]}
            imgSrc="/images/coffee.webp"
            imgAlt="Coffee cup with heart"
            imgRight={true}
            delay={0.1}
          />

          <div
            ref={bottomRef}
            className={`mt-4 anim-fade-up ${bottomVisible ? "visible" : ""}`}
          >
            <Divider />
          </div>
        </section>

        <CenterImg2 />

        <section className="w-full text-center py-12 sm:py-16 px-4">
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
            BE ON TIME &nbsp;|&nbsp; FINISH THE EVENT &nbsp;|&nbsp; ENJOY AND
            HAVE FUN
          </p>

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
            #DennisYouBeMineShiela
          </p>
        </section>

        <footer
          className="w-full py-3 px-4 flex items-center justify-center gap-3"
          style={{
            borderTop: "1px solid rgba(180,160,155,0.3)",
          }}
        >
          <p
            className="text-[#4a3a3a] text-[10px] sm:text-xs text-center"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
          >
            Created by{" "}
            <a
              href="https://wakindev-psi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Wakin Dev
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
