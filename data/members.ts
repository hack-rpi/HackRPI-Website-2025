/* ===============================
   1. Import Team Images
================================ */
import xenia from "../public/team/photos/xenia.jpeg";
import cj from "../public/team/photos/cj.jpeg";
import matthew from "../public/team/photos/matthew.jpeg";
import shankar from "../public/team/photos/shankar.jpeg";
import aaryan from "../public/team/photos/aaryan.jpeg";
import tobias from "../public/team/photos/tobias.jpeg";
import jackson from "../public/team/photos/jackson.jpeg";
import suyash from "../public/team/photos/suyash.jpeg";
import ethan from "../public/team/photos/EthanJR.png";
import devan from "../public/team/photos/devanJR.jpg";
import caleb from "../public/team/photos/calebJR.jpg";
import jodie from "../public/team/photos/jodieJR.jpg";
import lala from "../public/team/photos/lalaJR.jpg";
import dakshesh from "../public/team/photos/daksheshJR.jpg";

/* ===============================
   2. Team Color Lookup Table
================================ */
export const teamColors = {
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
   3. Auto Description Generator
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
   4. Auto Team-Color Picker
================================ */
function findTeamColor(role: string) {
  for (const key of Object.keys(teamColors)) {
    if (role.includes(key)) return teamColors[key];
  }
  return teamColors.Marketing; // fallback
}

/* ===============================
   5. Executive Photo Mapper
================================ */
export const executive = {
  "Xenia Khusid": xenia,
  "CJ Marino": cj,
  "Matthew Treanor": matthew,
  "Dakshesh Amaram": dakshesh,
  "Shankar Gowrisankar": shankar,
  "Devan Patel": devan,
  "Aaryan Gautam": aaryan,
  "Ethan Kusse": ethan,
  "Tobias Manayath": tobias,
  "Lala Liu": lala,
  "Caleb Liu": caleb,
  "Jackson Baimel": jackson,
  "Suyash Amatya": suyash,
  "Jodie Cho": jodie,
};

/* ===============================
   6. DIRECTOR TEMPLATE FUNCTION
================================ */
function makeDirector(name: string, role: string) {
  return {
    name,
    role,
    image: executive[name],
    "team-color": findTeamColor(role),
    teamDescription: autoDescription(role),
  };
}

/* ===============================
   7. FULL TEAM OBJECT
================================ */
export const team = {
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