"use client";

import type { ReactNode } from "react";
import TitleText from "./title-text";
import Image from "next/image";
import RegistrationLink from "@/components/themed-components/registration-link";

type SkylineConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  bottom?: number; // px
  right?: number;  // px
};

type DesktopTitleComponentProps = {
  /** Optional custom background wrapper class (defaults to .bg) */
  backgroundClassName?: string;
  /** Whether to show the starfield layers */
  showStarfield?: boolean;
  /** Main hero content (defaults to <TitleText />) */
  titleContent?: ReactNode;
  /** Whether to show the registration button */
  showRegistration?: boolean;
  /** Override the registration button (defaults to <RegistrationLink />) */
  registrationNode?: ReactNode;
  /** Skyline SVG config (set to null to hide) */
  skyline?: SkylineConfig | null;
};

export default function DesktopTitleComponent({
  backgroundClassName = "bg",
  showStarfield = true,
  titleContent = <TitleText />,
  showRegistration = true,
  registrationNode = <RegistrationLink className="text-[35px]" />,
  skyline = {
    src: "/skyline_tri.svg",
    alt: "Skyline Tri",
    width: 1000,
    height: 1000,
    bottom: 20,
    right: -450,
  },
}: DesktopTitleComponentProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background layer (templated via class) */}
      <div className={`${backgroundClassName} z-0`} />

      {/* Optional Starfield */}
      {showStarfield && (
        <div className="star-field z-0">
          <div className="layer" />
          <div className="layer" />
        </div>
      )}

      {/* Foreground content */}
      <div className="relative z-20 flex flex-col w-full h-full p-8 items-start justify-start">
        {titleContent}
      </div>

      {/* Optional Registration button */}
      {showRegistration && (
        <div className="absolute bottom-10 right-3 z-50">
          {registrationNode}
        </div>
      )}

      {/* Optional Skyline SVG */}
      {skyline && (
        <div
          className="absolute z-10"
          style={{
            bottom: `${skyline.bottom ?? 20}px`,
            right: `${skyline.right ?? -450}px`,
            width: `${skyline.width}px`,
            height: "auto",
          }}
        >
          <Image
            src={skyline.src}
            alt={skyline.alt}
            width={skyline.width}
            height={skyline.height}
          />
        </div>
      )}
    </div>
  );
}