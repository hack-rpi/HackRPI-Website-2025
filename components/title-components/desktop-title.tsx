"use client";

import TitleText from "./title-text";
import Image from "next/image";
import RegistrationButton from "@/components/themed-components/registration-link";

export default function DesktopTitleComponent() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div className="bg" />

      {/* Starfield */}
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col w-full h-full p-8 items-start justify-start">
        <TitleText />
      </div>
      
      {/* Bottom-right SVG */}
      <div
        className="absolute"
        style={{
          bottom: "20px", // adjust vertical position in pixels
          right: "-450px",  // adjust horizontal position in pixels
          width: "1000px", // adjust width in pixels
          height: "auto",
        }}
      >
        <Image
          src="/skyline_tri.svg"
          alt="Skyline Tri"
          width={1000}  // width of the SVG in pixels
          height={1000} // height of the SVG in pixels (adjust as needed)
        />
      </div>

      {/* Registration button */}
        <div className="absolute bottom-10 right-3">
          <RegistrationButton className="text-[35px]" />
        </div>
    </div>
  );
}




