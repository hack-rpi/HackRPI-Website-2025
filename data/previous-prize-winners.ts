import type { ProjectDisplayProps } from "@/components/prev-projects/project-display";
import type { ProjectCarouselProps } from "@/components/prev-projects/project-carousel";

export const podiumPrizes: ProjectDisplayProps[] = [
	{
		title: "1st Place",
		authors: [],
		description:
			"",
		imageUrl: "/projectImages/.png",
		prizeCategory: "First Place",
		imageOnLeft: false,
	},
	{
		title: "2nd Place",
		authors: [],
		description:
			"",
		imageUrl: "/projectImages/.png",
		imageOnLeft: true,
		prizeCategory: "Second Place",
	},
];

export const carouselPrizes: ProjectCarouselProps[] = [
	{
		title: "Project Name",
		authors: ["Name, Name, Name"],
		description:
			"",
		imageUrl: "/projectImages/.png",
		prizeCategory: "Prize Category",
	},
	{
		title: "Healthcare",
		authors: [""],
		description:
			"",
		imageUrl: "/projectImages/.png",
		prizeCategory: "Healthcare",
	},
	{
		title: "Best Use of AI",
		authors: [""],
		description:
			"",
		imageUrl: "/projectImages/.png",
		prizeCategory: "Best Use of AI",
	},
];
