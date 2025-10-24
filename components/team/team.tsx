"use client";

import React, { useCallback, useEffect, useState } from "react";
import HackRPILink from "../themed-components/hackrpi-link";
import { Director, team, teamColors, executive } from "../../data/members";
import Image from "next/image";

export default function TeamComponent() {
  const [directorsAnim, setDirectorsAnim] = useState({
    directors: team.directors,
    offset: 0,
    hover: false,
    time: Date.now(),
  });
  const [organizersAnim, setOrganizersAnim] = useState({
    organizers: team.organizers,
    offset: 0,
    hover: false,
    time: Date.now(),
  });

  const DIRECTOR_DX_PERCENT = 0.03;
  const ORGANIZER_DX_PERCENT = 0.07;

  const animate_directors = useCallback(() => {
    setDirectorsAnim((prev) => {
      if (prev.hover) return prev;
      if (prev.offset <= -110) {
        return {
          directors: [...prev.directors.slice(1), prev.directors[0]],
          offset: 5,
          hover: prev.hover,
          time: Date.now(),
        };
      }
      return {
        directors: prev.directors,
        offset: prev.offset - (Date.now() - prev.time) * DIRECTOR_DX_PERCENT,
        hover: prev.hover,
        time: Date.now(),
      };
    });
    requestAnimationFrame(animate_directors);
  }, []);

  const animate_organizers = useCallback(() => {
    setOrganizersAnim((prev) => {
      if (prev.hover) return prev;
      if (prev.offset <= -111.5) {
        return {
          organizers: [...prev.organizers.slice(1), prev.organizers[0]],
          offset: 11.5,
          hover: prev.hover,
          time: Date.now(),
        };
      }
      return {
        organizers: prev.organizers,
        offset: prev.offset - (Date.now() - prev.time) * ORGANIZER_DX_PERCENT,
        hover: prev.hover,
        time: Date.now(),
      };
    });
    requestAnimationFrame(animate_organizers);
  }, []);

  useEffect(() => {
    const animID1 = requestAnimationFrame(animate_directors);
    const animID2 = requestAnimationFrame(animate_organizers);
    return () => {
      cancelAnimationFrame(animID1);
      cancelAnimationFrame(animID2);
    };
  }, [animate_directors, animate_organizers]);

return (
  <div className="relative w-full flex justify-center items-stretch mb-4 desktop:pl-0 z-0">
    {/* Main Container */}
    <div
      id="team"
      className="relative z-0 flex w-5/6 desktop:w-2/3 flex-col items-start justify-start bg-black/70 p-6 rounded-2xl shadow-lg"
    >
      	{/* Left Box (hidden on small & medium screens) */}
		<div className="hidden lg:flex absolute left-[-105px] top-0 h-full w-[120px] bg-hackrpi-dark-purple z-20 items-center justify-center rounded-r-xl">
		<div className="h-[98%] w-[90%] bg-black rounded-xl flex items-center justify-center shadow-lg">
			<span
			className="font-modern font-extrabold text-[70px] text-hackrpi-light-purple tracking-widest"
			style={{
				writingMode: "vertical-rl",
				textOrientation: "upright",
				transform: "rotate(180deg)",
			}}
			>
			HACKRPI
			</span>
		</div>
		</div>

		{/* Right Box (hidden on small & medium screens) */}
		<div className="hidden lg:flex absolute right-[-105px] top-0 h-full w-[120px] bg-hackrpi-dark-purple z-20 items-center justify-center rounded-l-xl">
		<div className="h-[98%] w-[90%] bg-black rounded-xl flex items-center justify-center shadow-lg">
			<span
			className="font-modern font-extrabold text-[70px] text-hackrpi-light-purple tracking-widest"
			style={{
				writingMode: "vertical-rl",
				textOrientation: "upright",
			}}
			>
			HACKRPI
			</span>
		</div>
		</div>



        {/* Content */}
        <h1 className="text-4xl text-white font-bold font-modern">Meet the Team</h1>
        <p className="w-11/12 desktop:w-full text-hackrpi-light-purple">
          We are a motivated team of RPI students who share a passion for exploring the bounds of Computer Science and
          a commitment to organizing a fantastic event. Our team of students from every grade and major work together to
          organize our Hackathon in the fall and many other smaller events throughout the year. We are always looking
          for more students to join our team and help us make the event a success. If you are interested in helping,
          please join our discord or fill out one of the forms below!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-start md:justify-center xl:justify-between w-full my-4">
          <HackRPILink
            className="w-72 h-12 flex items-center justify-center text-xl text-center my-1"
            href="https://discord.gg/Pzmdt7FYnu"
            target="_blank"
          >
            Join our Organizing Team!
          </HackRPILink>
          <HackRPILink
            className="w-72 h-12 flex items-center justify-center text-xl text-center my-1 sm:mx-2"
            href="https://forms.gle/2riKKB6H2ajsd1FM7"
            target="_blank"
          >
            Help Mentor!
          </HackRPILink>
          <HackRPILink
            className="w-72 h-12 flex items-center justify-center text-xl text-center my-1"
            href="https://forms.gle/3M6TZo7PRwgWSqqB8"
            target="_blank"
          >
            Volunteer!
          </HackRPILink>
        </div>

        {/* Executive Board Section */}
        <h2 className="text-2xl font-bold text-white mt-6">Our Executive Board</h2>
        <div
          className="w-full h-fit overflow-hidden flex text-nowrap py-4 text-white"
          onMouseEnter={() => setDirectorsAnim((p) => ({ ...p, hover: true, time: Date.now() }))}
          onMouseLeave={() => setDirectorsAnim((p) => ({ ...p, hover: false, time: Date.now() }))}
        >
          {directorsAnim.directors.map((director) => DirectorCard(director, directorsAnim.offset))}
        </div>

        {/* Organizers Section */}
        <h2 className="text-2xl font-bold text-white mt-6">Thank You to All of our Organizers</h2>
        <div
          className="w-full h-fit overflow-hidden flex text-nowrap py-4"
          onMouseEnter={() => setOrganizersAnim((p) => ({ ...p, hover: true, time: Date.now() }))}
          onMouseLeave={() => setOrganizersAnim((p) => ({ ...p, hover: false, time: Date.now() }))}
        >
          {organizersAnim.organizers.map((organizer, indx) => (
            <div
              key={indx}
              className="w-fit flex-shrink-0 mr-8 flex items-center justify-center flex-col"
              style={{ transform: `translate(${organizersAnim.offset}%, 0%)` }}
            >
              <div
                className="w-32 aspect-square rounded-full flex items-center justify-center px-8"
                style={{ backgroundColor: teamColors[organizer.team].bg }}
              >
                <div className="my-2 w-full rounded-full flex items-center justify-center flex-col text-white text-center">
                  <h3 className="text-lg font-bold whitespace-pre-wrap">{organizer.name}</h3>
                  <p>{organizer.team}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Director Card Component
----------------------------- */
function DirectorCard(director: Director, offset: number) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      key={director.name}
      className="w-[200px] flex-shrink-0 mr-8 flex items-center justify-center flex-col"
      style={{ transform: `translate(${offset}%, 0%)` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!hovered && (
        <Image
          src={executive[director.name]}
          alt={director.name}
          height={200}
          width={200}
          className="w-[200px] h-[200px] rounded-full object-cover"
          loading="eager"
          priority
        />
      )}

      {hovered && (
        <div
          className="w-[200px] h-[200px] rounded-full flex items-center justify-center whitespace-pre-wrap"
          style={{ backgroundColor: director["team-color"].bg }}
        >
          <p className="w-11/12 h-fit rounded-full text-sm text-center">{director.teamDescription}</p>
        </div>
      )}

      <div
        className="my-2 w-full rounded-full flex items-center justify-center flex-col"
        style={{
          backgroundColor: director["team-color"].bg,
          color: director["team-color"].text,
        }}
      >
        <h3 className="text-xl font-bold">{director.name}</h3>
        <p>{director.role}</p>
      </div>
    </div>
  );
}
