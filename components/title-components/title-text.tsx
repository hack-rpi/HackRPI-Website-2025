"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PixelSideBar from "../pixel-sidebar/pixel-sidebar";

export default function TitleText() {
  const fullText = "HACK\u00A0\u00A0\u00A0RPI";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchCount, setGlitchCount] = useState(0);

  // Helper to make random glitch characters
  const randomChar = () => {
    const chars = "@#$%&*!?/";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const typingSpeed = isGlitching ? 50 : 120;

    if (!isGlitching) {
      // Normal typing phase
      timeout = setTimeout(() => {
        if (index < fullText.length) {
          // Randomly start a glitch
          if (Math.random() < 0.1 && index > 1) {
            setIsGlitching(true);
            setGlitchCount(0);
            return;
          }
          setDisplayedText((prev) => prev + fullText[index]);
          setIndex((prev) => prev + 1);
        }
      }, typingSpeed);
    } else {
      // Glitch phase — happens for a few cycles
      timeout = setTimeout(() => {
        if (glitchCount < 5) {
          // Replace last character(s) with random junk
          setDisplayedText((prev) => {
            const base = prev.slice(0, -1);
            return base + randomChar();
          });
          setGlitchCount((prev) => prev + 1);
        } else {
          // End glitch, fix the text, and resume typing
          setIsGlitching(false);
          setDisplayedText(fullText.slice(0, index));
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [index, isGlitching, glitchCount]);

  return (
    <div className="relative w-full h-full flex justify-start items-start font-sans">
      {/* Box with skyline image */}
      <div className="relative z-10 w-[900px] h-[600px] bg-black p-0 rounded-2xl shadow-lg overflow-hidden">
        <Image
          src="/cityscape_background_retro_modern.png"
          alt="Cityscape Retro Modern"
          fill
          className="object-cover"
        />

        {/* Typing + glitch text */}
        <h1
          className="absolute text-[95px] lg:text-[120px] font-modern font-extrabold drop-shadow-lg text-white"
          style={{ top: "100px", left: "38px" }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Colored glow layers */}
        <h1
          className="absolute text-[95px] lg:text-[120px] font-modern font-extrabold drop-shadow-lg text-retro-purple-medium"
          style={{ top: "100px", left: "40px" }}
        >
          {displayedText}
        </h1>

        {/* Subtitle */}
        <h1>
          <span
            className="absolute text-[20px] lg:text-[20px] font-modern font-extrabold drop-shadow-lg text-white"
            style={{ top: "50px", left: "20px" }}
          >
            November 15-16, 2025 • Troy, NY
          </span>
        </h1>
        <h1>
          <span
            className="absolute text-[20px] lg:text-[40px] font-modern font-extrabold drop-shadow-lg text-white"
            style={{ top: "250px", left: "268px" }}
          >
            Retro V. Modern
          </span>
        </h1>
      </div>

      {/* Sidebar */}
      <div className="absolute top-0 left-[800px] z-20 w-[500px]">
        <PixelSideBar />
      </div>
    </div>
  );
}
