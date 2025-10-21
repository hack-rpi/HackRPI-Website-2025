"use client";

import TitleText from "./title-text";
import Image from "next/image";
import RegistrationLink from "@/components/themed-components/registration-link";

export default function DesktopTitleComponent() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div className="bg z-0" />

      {/* Starfield */}
      <div className="star-field z-0">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 flex flex-col w-full h-full p-8 items-start justify-start">
        <TitleText />
      </div>
      
      {/* Registration button (clickable now) */}
      <div className="absolute bottom-10 right-3 z-50">
        <RegistrationLink className="text-[35px]" />
      </div>

      {/* Bottom-right SVG */}
      <div
        className="absolute z-10"
        style={{
          bottom: "20px", // adjust vertical position
          right: "-450px",  // adjust horizontal position
          width: "1000px",
          height: "auto",
        }}
      >
        <Image
          src="/skyline_tri.svg"
          alt="Skyline Tri"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
