"use client";
import React from "react";

export default function Divider() {
  return (
    <div
      className="flex justify-center mt-6 sm:mt-8 fade-up"
      style={{ animationDelay: "0.4s" }}
    >
      <img
        src="/images/flower_pink_garland.webp"
        alt="Pink floral divider"
        className="w-[200px] sm:w-[280px] md:w-full md:max-w-sm object-contain"
      />
    </div>
  );
}