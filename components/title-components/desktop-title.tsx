"use client";

import Timer from "./timer";
import TitleText from "./title-text";
import Image from "next/image";

export default function DesktopTitleComponent() {
  return (
    <div className="relative flex w-full h-screen">
      {/* Full background container with GIF */}
      <div
        className="flex flex-col w-full h-full bg-cover bg-no-repeat bg-center p-8 items-start justify-start"
        style={{ backgroundImage: "url('/star_gif.gif')" }}
      >
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
    </div>
  );
}



