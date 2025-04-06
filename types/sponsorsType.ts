export type sponsorTiers = "OBSIDIAN" | "GOLD" | "SILVER" | "BRONZE" | "COLLABORATORS";

export interface SponsorsJSON {
	OBSIDIAN: Sponsor[];
	GOLD: Sponsor[];
	SILVER: Sponsor[];
	BRONZE: Sponsor[];
	COLLABORATORS: Sponsor[];
}

export interface Sponsor {
	name: string;
	logoPath: string;
	url: string;
}
