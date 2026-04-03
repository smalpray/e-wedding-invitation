"use client";

import { useState } from "react";
import Carousel from "./_sections/Carousel";
import CenterImg from "./_sections/CenterImg";
import ClickLoad from "./_sections/ClickLoad";
import DressCode from "./_sections/DressCode";
import Entourage from "./_sections/Entourage";
import FAQs from "./_sections/Faqs";
import Gift from "./_sections/Gift";
import HeaderSection from "./_sections/Header";

import HomeSection from "./_sections/Home";
import OverlayImage from "./_sections/OverlayImage";
import Photo from "./_sections/Photo";
import Venue from "./_sections/Venue";
export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <ClickLoad onOpen={() => setOpened(true)} opened={opened} />
      <HeaderSection />
      <section id="home">
        <HomeSection opened={opened} />
      </section>
      {/* <OverlayImage /> */}
      <section id="photos">
        <Photo />
      </section>
      <section id="venue">
        <Venue />
      </section>
      <section id="entourage">
        <Entourage />
      </section>
      {/* <Carousel /> */}
      <section id="dresscode">
        <DressCode />
      </section>
      <section id="gift">
        <Gift />
      </section>
      <section id="faqs">
        <FAQs />
      </section>
    </div>
  );
}
