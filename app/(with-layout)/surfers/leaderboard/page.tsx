"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/nav-bar/nav-bar";
import "@/app/globals.css";
import HackRPIButton from "@/components/themed-components/hackrpi-button";

const isDirector = false; // Set to `true` to test the director functionality

interface Result {
  id: string;
  name: string;
  score: number;
}

export default function Page() {
  const [leaderboardEntries, setLeaderboardEntries] = useState<Result[]>([]);

  // Function to fetch leaderboard entries
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("https://hackrpi.com/api/scores");
      if (response.ok) {
        const data: Result[] = await response.json(); // Ensure the data is typed as Result[]
        setLeaderboardEntries(data); // Update state with the fetched leaderboard data
      } else {
        console.error("Failed to fetch leaderboard data");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard(); // Fetch leaderboard when the component mounts
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <div className="flex-grow flex-shrink basis-auto">
        <h1 className="mt-28 text-center text-4xl font-modern text-hackrpi-orange">2048 Leaderboard</h1>
        <table className="min-w-[80vw] mt-10 justify-inbetween table-auto w-full table table-zebra">
          <thead>
            <tr className="text-white bg-hackrpi-yellow">
              <th className="w-1/4 px-4 py-2 text-center font-retro text-white">Position</th>
              <th className="w-1/3 px-4 py-2 text-center font-retro text-white">Username</th>
              <th className="w-1/3 px-4 py-2 text-center font-retro text-white">Score</th>
              {isDirector ? (
                <th className="w-1/3 px-4 py-2 font-retro text-white bg-hackrpi-yellow">Delete</th>
              ) : null}
            </tr>
          </thead>

          <tbody className="text-center text-white font-retro bg-gradient-to-r from-hackrpi-dark-purple to-hackrpi-yellow">
            {leaderboardEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td className="px-y py-2">{index + 1}</td>
                <td className="px-4 py-2">{entry.name}</td>
                <td className="px-4 py-2">{entry.score}</td>
                {isDirector ? (
                  <td className="px-4 py-2 flex items-center justify-center">
                    <HackRPIButton
                      onClick={async () => {
                        alert("not implemented yet");
                      }}
                    >
                      Delete Item
                    </HackRPIButton>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-grow mt-24"></div>
      <div className="absolute-bottom-0 w-full"></div>
    </div>
  );
}
