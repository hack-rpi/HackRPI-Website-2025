"use client";

import { useState, useEffect } from "react";
import RegistrationButton from "@/components/themed-components/registration-link";
import InteractiveNavigationMap from "../interactive-map/interactive-map";
import Image from "next/image";

export default function TitleText() {
  const fullText = "HACK\u00A0\u00A0\u00A0RPI";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150;

    const handleTyping = setTimeout(() => {
      if (!isDeleting) {
        if (index < fullText.length) {
          setDisplayedText((prev) => prev + fullText[index]);
          setIndex((prev) => prev + 1);
        } else {
          // finished typing, stop blinking
          return;
        }
      } else {
        if (index > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(handleTyping);
  }, [index, isDeleting]);

  return (
    <div className="relative w-full h-full flex justify-start items-start font-sans">
      {/* Left side: Box with image */}
      <div className="relative z-10 w-[900px] h-[600px] bg-black p-0 rounded-2xl shadow-lg overflow-hidden">
        <Image
          src="/cityscape_background_retro_modern.png"
          alt="Cityscape Retro Modern"
          fill
          className="object-cover"
        />

        {/* Overlayed typing text */}
        <h1
          className="absolute text-[95px] lg:text-[120px] font-modern font-extrabold drop-shadow-lg text-white"
          style={{ top: "100px", left: "38px" }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>

		{/* Overlayed typing text */}
        <h1
          className="absolute text-[95px] lg:text-[120px] font-modern font-extrabold drop-shadow-lg text-white"
          style={{ top: "100px", left: "42px" }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>

		{/* Overlayed typing text */}
        <h1
          className="absolute text-[95px] lg:text-[120px] font-modern font-extrabold drop-shadow-lg text-retro-purple-medium"
          style={{ top: "100px", left: "40px" }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Registration button */}
        <div className="absolute bottom-8 left-8">
          <RegistrationButton className="text-3xl" />
        </div>
      </div>

      {/* Right side: Map overlapping the box */}
      <div className="absolute top-0 left-[800px] z-20 w-[500px]">
        <InteractiveNavigationMap />
      </div>
    </div>
  );
}
