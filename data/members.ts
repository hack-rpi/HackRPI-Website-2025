import xenia from "../public/team/photos/xenia.jpg";
import cj from "../public/team/photos/cj.jpg";
import matthew from "../public/team/photos/matthew.jpg";
import shankar from "../public/team/photos/shankar.jpg";
import aaryan from "../public/team/photos/aaryan.jpg";
import tobias from "../public/team/photos/tobias.jpg";
import jackson from "../public/team/photos/jackson.jpg";
import suyash from "../public/team/photos/suyash.jpg";
import ethan from "../public/team/photos/EthanJR.png";
import devan from "../public/team/photos/devanJR.jpg";
import caleb from "../public/team/photos/calebJR.jpg";
import jodie from "../public/team/photos/jodieJR.jpg";
import lala from "../public/team/photos/lalaJR.jpg";
import dakshesh from "../public/team/photos/daksheshJR.jpg";

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

export interface Director {
	name:
		| "Xenia Khusid"
		| "CJ Marino"
		| "Matthew Treanor"
		| "Dakshesh Amaram"
		| "Shankar Gowrisankar"
		| "Devan Patel"
		| "Aaryan Gautam"
		| "Ethan Kusse"
		| "Tobias Manayath"
		| "Lala Liu"
		| "Jackson Baimel"
		| "Caleb Liu"
		| "Suyash Amatya"
		| "Jodie Cho";
	role: string;
	image: string;
	"team-color": TeamColor;
	teamDescription: string;
}

export interface Organizer {
	name: string;
	team: "Technology" | "Logistics" | "Marketing" | "Outreach" | "Finance" | "Sponsorship";
}

export interface TeamColor {
	bg: string;
	text: string;
}

export interface Team {
	directors: Director[];
	organizers: Organizer[];
}

export const team: Team = {
	directors: [
		{
			name: "Xenia Khusid",
			role: "President",
			image: "xenia.JPG",
			"team-color": teamColors.president,
			teamDescription:
				"The President leads the overall planning and execution of the hackathon, coordinating with all teams to ensure a successful event.",
		},
		{
			name: "CJ Marino",
			role: "Vice President",
			image: "/team/photos/cj.JPG",
			"team-color": teamColors.vicePresident,
			teamDescription:
				"The Vice President supports the President's role, providing leadership and assistance in many aspects of the hackathon.",
		},
		{
			name: "Matthew Treanor",
			role: "Director of Outreach",
			image: "/team/photos/matthew.JPG",
			"team-color": teamColors.Outreach,
			teamDescription:
				"The Outreach team is responsible for engaging with the community and local students to promote the hackathon and encourage participation.",
		},
		{
			name: "Dakshesh Amaram",
			role: "Jr Director of Outreach",
			image: "/team/photos/daksheshJR.jpg",
			"team-color": teamColors.Outreach,
			teamDescription:
				"The Jr Outreach Director assists in engaging with the community and local students to promote the hackathon and encourage participation.",
		},
		{
			name: "Shankar Gowrisankar",
			role: "Director of Finance",
			image: "/team/photos/shankar.JPG",
			"team-color": teamColors.Finance,
			teamDescription:
				"The Finance team is responsible for managing the budget and purchasing necessary items for the hackathon.",
		},
		{
			name: "Devan Patel",
			role: "Jr Director of Finance",
			image: "/team/photos/devanJR.jpg",
			"team-color": teamColors.Finance,
			teamDescription:
				"The Jr Finance Director assists in managing the budget and purchasing necessary items for the hackathon.",
		},
		{
			name: "Aaryan Gautam",
			role: "Director of Sponsorship",
			image: "/team/photos/aaryan.JPG",
			"team-color": teamColors.Sponsorship,
			teamDescription:
				"The Sponsorship team is responsible for reaching out to companies and securing sponsorships to support the hackathon.",
		},
		{
			name: "Ethan Kusse",
			role: "Jr Director of Sponsorship",
			image: "/team/photos/EthanJR.png",
			"team-color": teamColors.Sponsorship,
			teamDescription:
				"The Jr Sponsorship Director assists in reaching out to companies and securing sponsorships to support the hackathon.",
		},
		{
			name: "Tobias Manayath",
			role: "Director of Logistics",
			image: "/team/photos/tobias.JPG",
			"team-color": teamColors.Logistics,
			teamDescription:
				"The Logistics team is responsible for planning and executing the physical aspects of the hackathon, such as food, swag, transportation, and more.",
		},
		{
			name: "Lala Liu",
			role: "Jr Director of Logistics",
			image: "/team/photos/lalaJR.jpg",
			"team-color": teamColors.Logistics,
			teamDescription:
				"The Jr Logistics Director assists in planning and executing the physical aspects of the hackathon, such as food, swag, transportation, and more.",
		},
		{
			name: "Jackson Baimel",
			role: "Director of Technology",
			image: "/team/photos/jackson.JPG",
			"team-color": teamColors.Technology,
			teamDescription:
				"The Technology team is responsible for developing and maintaining the hackathon website, discord server, and providing technical support during the event.",
		},
		{
			name: "Caleb Liu",
			role: "Jr Director of Technology",
			image: "/team/photos/calebJR.jpg",
			"team-color": teamColors.Technology,
			teamDescription:
				"The Jr Technology Director assists in developing and maintaining the hackathon website, discord server, and providing technical support during the event.",
		},
		{
			name: "Suyash Amatya",
			role: "Director of Marketing",
			image: "/team/photos/suyash.JPG",
			"team-color": teamColors.Marketing,
			teamDescription:
				"The Marketing team is responsible for promoting the hackathon and engaging with participants through social media, fliers, and other marketing materials.",
		},
		{
			name: "Jodie Cho",
			role: "Jr Director of Marketing",
			image: "/team/photos/jodieJR.jpg",
			"team-color": teamColors.Marketing,
			teamDescription:
				"The Jr Marketing Director assists in promoting the hackathon and engaging with participants through social media, fliers, and other marketing materials.",
		},
	],
	organizers: [
		{
			name: "Iain",
			team: "Sponsorship",
		},
		{
			name: "Brian Witanowski",
			team: "Sponsorship",
		},
		{
			name: "Jackson Baimel",
			team: "Sponsorship",
		},
		{
			name: "Christian Marinkovich",
			team: "Technology",
		},
		{
			name: "Peter Ermishkin",
			team: "Sponsorship",
		},
		{
			name: "Anthony Smith",
			team: "Technology",
		},
		{
			name: "Devan Patel",
			team: "Finance",
		},
		{
			name: "Tobias Manayath",
			team: "Logistics",
		},
		{
			name: "Matthew Treanor",
			team: "Technology",
		},
		{
			name: "Olivia Lee",
			team: "Marketing",
		},
		{
			name: "Mrunal Athaley",
			team: "Sponsorship",
		},
		{
			name: "Evan Chen",
			team: "Logistics",
		},
		{ name: "Amanda Ruan", team: "Marketing" },
	],
};
