"use client";
import React from "react";

export default function CenterImg2() {
  return (
    <div className="w-full mt-10 sm:mt-12 flex justify-center">
      <div
        className="relative w-full sm:w-[70%] md:w-[60%]"
        style={{ maxWidth: "960px" }}
      >
        <img
          src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Wedding couple"
          className="w-full block object-cover"
          style={{
            aspectRatio: "3/2",
            borderRadius: "0px",
            boxShadow: "0 16px 56px rgba(0,0,0,0.18)",
          }}
        />

        <div
          className="absolute top-0 left-0 h-full pointer-events-none"
          style={{
            width: "25%",
            background:
              "linear-gradient(to right, rgba(252,232,232,0.95), transparent)",
          }}
        />

        <div
          className="absolute top-0 right-0 h-full pointer-events-none"
          style={{
            width: "25%",
            background:
              "linear-gradient(to left, rgba(252,232,232,0.95), transparent)",
          }}
        />

        <div
          className="absolute left-0 right-0 top-0 pointer-events-none"
          style={{
            height: "30%",
            background:
              "linear-gradient(to bottom, rgba(252,232,232,0.85), transparent)",
          }}
        />

        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{
            height: "30%",
            background:
              "linear-gradient(to top, rgba(252,232,232,0.85), transparent)",
          }}
        />
      </div>
    </div>
  );
}
