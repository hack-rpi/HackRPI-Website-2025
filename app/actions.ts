"use server";

import { Amplify } from "aws-amplify";
import * as Auth from "@aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "@/amplify/data/resource";
// eslint-disable-next-line
// @ts-ignore
import amplify_outputs from "@/amplify_outputs.json";

import { Profanity } from "@2toad/profanity";
import { Event } from "@/data/schedule";

Amplify.configure(amplify_outputs);
const client = generateClient<Schema>({ authMode: "identityPool" });

const isAlphanumeric = (username: string) => {
	return /^[a-z0-9]+$/i.test(username);
};

export type LeaderboardEntry = {
	id: string;
	username: string;
	score: number;
	year: number;
};

export async function is_game_ready() {
	const now = new Date();
	const start = new Date(1731160800000); // November 9, 2024 10:00:00 AM
	const end = new Date(1731254400000 + 86400000); // November 10, 2024 11:00:00 AM

	return now >= start && now <= end;
}

export async function get_leaderboard() {
	let groups = undefined;
	try {
		const session = await Auth.fetchAuthSession();
		groups = session.tokens?.accessToken.payload["cognito:groups"];
	} catch (e) {
		console.error(e);
		groups = undefined;
	}

	const { data, errors } = await client.models.Leaderboard.listByScore(
		{
			year: 2024,
		},
		{
			limit: 50,
			sortDirection: "DESC",
			authMode: groups ? "userPool" : "identityPool",
		},
	);

	if (errors) {
		console.error(errors);
		return [];
	}

	return data.map((entry) => entry as LeaderboardEntry);
}

export async function create_leaderboard_entry({ username, score }: { username: string; score: number }) {
	const profanity = new Profanity({
		wholeWord: false,
		languages: ["en", "de", "es", "fr"],
	});

	profanity.addWords(["fvck", "shjt", "bjtch", "njgga", "njgger", "f4ck"]);

	if (profanity.exists(username) || username.length > 20 || !isAlphanumeric(username)) {
		return { status: 401, message: "Usernames must be alphanumeric and less than 20 characters." };
	}

	if (score < 0 || score > 200000 || isNaN(score) || score % 2 !== 0) {
		return { status: 401, message: "Invalid score." };
	}

	const { errors } = await client.models.Leaderboard.create(
		{
			username,
			score,
			year: new Date().getFullYear(),
		},
		{
			authMode: "identityPool",
		},
	);

	if (errors) {
		console.error(errors);
		return { status: 500, message: "Failed to create leaderboard entry. Please Try Again." };
	}

	return { status: 200, message: "Success" };
}

export async function fetchEvents(): Promise<{
	status: number;
	message: string;
	events: Event[];
}> {
	let groups = undefined;
	try {
		const session = await Auth.fetchAuthSession();
		groups = session.tokens?.accessToken.payload["cognito:groups"];
	} catch (e) {
		console.error(e);
		groups = undefined;
	}

	const { data, errors } = await client.models.event.list({
		authMode: groups ? "userPool" : "identityPool",
		limit: 200,
		filter: {
			visible: { eq: true },
		},
	});

	if (errors) {
		console.error(errors);
		return { status: 500, message: "Failed to fetch events.", events: [] };
	}

	return {
		status: 200,
		message: "Success",
		events: data.map((event) => ({
			id: event.id,
			title: event.title,
			description: event.description || "",
			startTime: event.startTime,
			endTime: event.endTime,
			location: event.location,
			speaker: event.speaker || "",
			eventType: event.eventType || "default",
			visible: event.visible,
			column: event.column || 0,
		})),
	};
}
