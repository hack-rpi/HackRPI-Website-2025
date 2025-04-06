import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";

export const initializeSearch = () => {
	const availableTags = [
		"Home",
		"Events",
		"Schedule",
		"Announcements",
		"Prizes",
		"Resources",
		"HackRPI XI",
		"Sponsors",
		"Winners",
		"Join Us",
		"Mentoring",
		"Volunteer",
		"MLH",
		"Leaderboard",
		"Code of Conduct",
		"Homepage",
		"Board",
		"Join",
		"Help Us",
		"Main",
		"Mainpage",
		"Codes",
		"Plan",
		"Participants",
		"Awards",
	];

	$("#tags").autocomplete({
		source: availableTags,
		select: function (event: any, ui: any) {
			const selectedItem = ui.item.value;
			redirectUser(selectedItem);
		},
	});

	$("#tags").on("keydown", function (event) {
		if (event.key === "Enter") {
			const inputText = ($(this).val() as string).trim();
			redirectUser(inputText);
		}
	});

	function redirectUser(selectedItem: string) {
		selectedItem = selectedItem.trim().toLowerCase();
		const redirectUrls: { [key: string]: string } = {
			home: "/",
			events: "../event",
			schedule: "../event/schedule",
			announcements: "../announcements",
			prizes: "../event/prizes",
			resources: "../resources",
			"hackrpi xi": "/last-year",
			sponsors: "../sponsor-us",
			winners: "https://hackrpi2024.devpost.com/project-gallery",
			"join us": "https://discord.com/invite/Pzmdt7FYnu",
			mentoring: "https://docs.google.com/forms/d/e/1FAIpQLSfUMo98ZzGPBg23ZmAI5jiX1rahg-fTGFrpKb6pzq7VZXxPnA/viewform",
			volunteer: "https://docs.google.com/forms/d/e/1FAIpQLScVUkw_LbnzlVlGOWKVw-_pP9LtGI10WoImrik9XSflmSgS8g/viewform",
			mlh: "https://mlh.io/seasons/2025/events",
			leaderboard: "../2048/leaderboard",
			"code of conduct": "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
			homepage: "../app/page.tsx",
			board: "../2048/leaderboard",
			join: "https://discord.com/invite/Pzmdt7FYnu",
			"help us": "https://docs.google.com/forms/d/e/1FAIpQLSfUMo98ZzGPBg23ZmAI5jiX1rahg-fTGFrpKb6pzq7VZXxPnA/viewform",
			main: "/",
			mainpage: "/",
			codes: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
			plan: "../event/schedule",
			participants:
				"https://docs.google.com/forms/d/e/1FAIpQLScVUkw_LbnzlVlGOWKVw-_pP9LtGI10WoImrik9XSflmSgS8g/viewform",
			awards: "../event/prizes",
		};

		const url = redirectUrls[selectedItem];

		if (url) {
			window.location.href = url;
		} else {
			alert("No redirect URL found for '" + selectedItem + "'");
		}
	}
};
