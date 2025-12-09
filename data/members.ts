/* ===============================
   1. Import Team Images
================================ */

import matthew from "../public/team/photos/matthew.jpeg";
import tobias from "../public/team/photos/tobias.jpeg";
import jackson from "../public/team/photos/jackson.jpeg";
import ethan from "../public/team/photos/EthanJR.png";
import devan from "../public/team/photos/devanJR.jpg";
import caleb from "../public/team/photos/calebJR.jpg";
import jodie from "../public/team/photos/jodieJR.jpg";
import lala from "../public/team/photos/lalaJR.jpg";

/* ===============================
   2. Types
================================ */

export interface TeamColor {
  bg: string;
  text: string;
}

export interface Director {
  name: string;
  role: string;
  image: any; // image is filled from `executive[name]`
  "team-color": TeamColor;
  teamDescription: string;
}

export interface Organizer {
  name: string;
  team: "Technology" | "Logistics" | "Marketing" | "Outreach" | "Finance" | "Sponsorship";
}

export interface Team {
  directors: Director[];
  organizers: Organizer[];
}

/* ===============================
   3. Team Color Lookup Table
================================ */

export const teamColors: Record<string, TeamColor> = {
  president: { bg: "#9e40ee", text: "#ffffff" },
  vicePresident: { bg: "#733dbe", text: "#ffffff" },
  Technology: { bg: "#e9bc59", text: "#ffffff" },
  Logistics: { bg: "#9e40ee", text: "#ffffff" },
  Marketing: { bg: "#e39036", text: "#ffffff" },
  Outreach: { bg: "#292333", text: "#ffffff" },
  Finance: { bg: "#733dbe", text: "#ffffff" },
  Sponsorship: { bg: "#d5345d", text: "#ffffff" },
};

/* ===============================
   4. Auto Description Generator
================================ */

function autoDescription(role: string): string {
  if (role.includes("President"))
    return "Leads the overall planning and execution of the hackathon, coordinating all teams for success.";

  if (role.includes("Outreach"))
    return "Responsible for engaging with the community and promoting the hackathon to students.";

  if (role.includes("Finance"))
    return "Manages the budget and financial needs of the hackathon.";

  if (role.includes("Sponsorship"))
    return "Reaches out to companies and secures sponsorships to support the hackathon.";

  if (role.includes("Logistics"))
    return "Plans and executes the physical aspects of the event including food, swag, and venue operations.";

  if (role.includes("Technology"))
    return "Develops and maintains the website, Discord, and technical tools used during the hackathon.";

  if (role.includes("Marketing"))
    return "Promotes HackRPI through social media, graphics, fliers, and community engagement.";

  return "Contributes to the success of HackRPI through leadership and collaboration.";
}

/* ===============================
   5. Auto Team-Color Picker
================================ */

function findTeamColor(role: string): TeamColor {
  for (const key of Object.keys(teamColors)) {
    if (role.toLowerCase().includes(key.toLowerCase())) {
      return teamColors[key];
    }
  }
  return teamColors.Marketing; // fallback
}

/* ===============================
   6. Executive Photo Mapper
================================ */

export const executive: Record<string, any> = {
  "Matthew Treanor": matthew,
  "Devan Patel": devan,
  "Ethan Kusse": ethan,
  "Tobias Manayath": tobias,
  "Lala Liu": lala,
  "Caleb Liu": caleb,
  "Jackson Baimel": jackson,
  "Jodie Cho": jodie,
};

/* ===============================
   7. DIRECTOR TEMPLATE FUNCTION
================================ */

function makeDirector(name: string, role: string): Director {
  return {
    name,
    role,
    image: executive[name],         // still pulled from the map
    "team-color": findTeamColor(role),
    teamDescription: autoDescription(role),
  };
}

/* ===============================
   8. FULL TEAM OBJECT
================================ */

export const team: Team = {
  directors: [
    makeDirector("Tobias Manayath", "President"),
    makeDirector("Jackson Baimel", "Vice President"),
    makeDirector("Matthew Treanor", "Director of Outreach"),
    makeDirector("Devan Patel", "Director of Finance"),
    makeDirector("Ethan Kusse", "Director of Sponsorship"),
    makeDirector("Lala Liu", "Director of Logistics"),
    makeDirector("Caleb Liu", "Director of Technology"),
    makeDirector("Jodie Cho", "Director of Marketing"),
  ],

  organizers: [
    { name: "Anthony Santisho", team: "Sponsorship" },
    { name: "Matthew Radford", team: "Finance" },
    { name: "Liam Brown", team: "Logistics" },
    { name: "Collin Inciong", team: "Technology" },
    { name: "Gokul Sureshbabu", team: "Technology" },
    { name: "William Chen", team: "Technology" },
    { name: "Jordan Ye", team: "Technology" },
    { name: "Corbin Larson", team: "Logistics" },
  ],
};