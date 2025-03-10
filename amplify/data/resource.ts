import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	event: a
		.model({
			id: a.id().required(),
			title: a.string().required(),
			description: a.string(),
			startTime: a.timestamp().required(),
			endTime: a.timestamp().required(),
			location: a.string().required(),
			speaker: a.string().default(""),
			eventType: a.string(),
			visible: a.boolean().default(false).required(),
			column: a.integer().default(0),
		})
		.authorization((allow) => {
			return [
				allow.group("directors").to(["create", "update", "delete", "read"]),
				allow.authenticated("identityPool").to(["read"]),
				allow.guest().to(["read"]),
			];
		}),

	Leaderboard: a
		.model({
			id: a.id().required(),
			username: a.string().required(),
			score: a.integer().required().default(0),
			year: a.integer().required().default(2024),
		})
		.secondaryIndexes((index) => [index("year").sortKeys(["score"]).queryField("listByScore")])
		.authorization((allow) => {
			return [
				allow.group("directors").to(["create", "delete", "read"]),
				allow.authenticated("identityPool").to(["read", "create"]),
				allow.guest().to(["read", "create"]),
			];
		}),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "identityPool",
		apiKeyAuthorizationMode: {
			description: "Mobile App API Key",
			expiresInDays: 365,
		},
	},
	name: "HackRPI2024-Events",
});
