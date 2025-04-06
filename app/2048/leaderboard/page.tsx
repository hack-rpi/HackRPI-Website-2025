"use client";

import { useState } from "react";
import { useEffect } from "react";
import NavBar from "@/components/nav-bar/nav-bar";
import "@/app/globals.css";
import HackRPIButton from "@/components/themed-components/hackrpi-button";
//Removing the backend for convenience
//import { get_leaderboard, LeaderboardEntry } from "@/app/actions";
//import * as Auth from "@aws-amplify/auth";
//import { Amplify } from "aws-amplify";
//import amplify_outputs from "@/amplify_outputs.json";
//import { generateClient } from "aws-amplify/api";
//import { Schema } from "@/amplify/data/resource";

//Amplify.configure(amplify_outputs);
//const client = generateClient<Schema>({ authMode: "userPool" });

//This is a csv downloaded from the database and translated into json
const fakeLeaderboard = [
	{
		id: "1444fc37-24b7-4176-839f-d9aadb25f33d",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T14:05:44.830Z",
		score: 3418,
		updatedAt: "2024-11-10T14:05:44.830Z",
		username: "DragoDan",
		year: 2024,
	},
	{
		id: "587b32e0-b20b-479b-8a65-186ea76dcf3b",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T18:31:46.918Z",
		score: 660,
		updatedAt: "2024-11-09T18:31:46.918Z",
		username: "DirTech",
		year: 2024,
	},
	{
		id: "fbd552e7-e40b-47c5-afff-e09f6d2bf854",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T21:09:03.733Z",
		score: 2968,
		updatedAt: "2024-11-09T21:09:03.733Z",
		username: "Marc",
		year: 2024,
	},
	{
		id: "c3b1625f-5d10-4c9d-983c-d96207e2befc",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:21:25.786Z",
		score: 854,
		updatedAt: "2024-11-10T20:21:25.786Z",
		username: "Iain",
		year: 2024,
	},
	{
		id: "57751831-698f-489c-8293-e72c9d89f496",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T14:25:26.440Z",
		score: 716,
		updatedAt: "2024-11-09T14:25:26.440Z",
		username: "45454",
		year: 2024,
	},
	{
		id: "3c640e04-f031-4493-8d55-cbd5b5f051e2",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T16:38:10.982Z",
		score: 1660,
		updatedAt: "2024-11-09T16:38:10.982Z",
		username: "no",
		year: 2024,
	},
	{
		id: "0ef760ad-7d28-4ed9-be3d-3e6249c24a91",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T23:06:39.456Z",
		score: 1368,
		updatedAt: "2024-11-10T23:06:39.456Z",
		username: "WesTurner",
		year: 2024,
	},
	{
		id: "dbbd0661-7703-422e-8590-211d6219c7a8",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:24:57.276Z",
		score: 498,
		updatedAt: "2024-11-10T20:24:57.276Z",
		username: "WesTurner",
		year: 2024,
	},
	{
		id: "340ac0a9-24f9-4d2f-a4bd-d7077eee7786",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T16:37:12.778Z",
		score: 212,
		updatedAt: "2024-11-09T16:37:12.778Z",
		username: "ChristianM",
		year: 2024,
	},
	{
		id: "88eff7ef-95e6-4f6b-a461-f4ff4b37a0b7",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:20:52.077Z",
		score: 714,
		updatedAt: "2024-11-10T20:20:52.077Z",
		username: "WesTurner",
		year: 2024,
	},
	{
		id: "53362dbf-3deb-4370-8ceb-caf9fdbf3020",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:20:22.861Z",
		score: 1332,
		updatedAt: "2024-11-10T20:20:22.861Z",
		username: "monster",
		year: 2024,
	},
	{
		id: "4d9860d3-0656-4aab-80ca-bee625e9417f",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T02:37:54.075Z",
		score: 1140,
		updatedAt: "2024-11-10T02:37:54.075Z",
		username: "Christian4",
		year: 2024,
	},
	{
		id: "ce278f45-7e09-4a90-9c00-2a94f3c5d26e",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T23:11:12.717Z",
		score: 3672,
		updatedAt: "2024-11-09T23:11:12.717Z",
		username: "sanyaj9",
		year: 2024,
	},
	{
		id: "e15092dd-2d00-45b8-bfe9-486765eab441",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T18:24:53.605Z",
		score: 3626,
		updatedAt: "2024-11-09T18:24:53.605Z",
		username: "Gavy3",
		year: 2024,
	},
	{
		id: "63e0f293-1d90-463d-b2b9-1e7ba4cb8088",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T17:30:24.198Z",
		score: 4448,
		updatedAt: "2024-11-09T17:30:24.198Z",
		username: "Meggaboo",
		year: 2024,
	},
	{
		id: "6ed8c554-764e-4477-9bf8-205239d125f7",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:20:06.509Z",
		score: 1430,
		updatedAt: "2024-11-10T20:20:06.509Z",
		username: "SHMR",
		year: 2024,
	},
	{
		id: "b161c436-439a-4e7a-b58a-f4dd9d6794eb",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T16:30:52.704Z",
		score: 2158,
		updatedAt: "2024-11-09T16:30:52.704Z",
		username: "Raven",
		year: 2024,
	},
	{
		id: "8974b011-1ab7-4943-aa8f-43db9a3da9bd",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:13:19.648Z",
		score: 268,
		updatedAt: "2024-11-10T20:13:19.648Z",
		username: "Mel",
		year: 2024,
	},
	{
		id: "31c9d7c1-9542-4ab2-b4fe-2f79d65a5385",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:21:41.577Z",
		score: 5782,
		updatedAt: "2024-11-10T20:21:41.577Z",
		username: "Sam",
		year: 2024,
	},
	{
		id: "42e84402-9f7a-4aa3-8bbd-ac550dcfa7cb",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T14:15:41.255Z",
		score: 1240,
		updatedAt: "2024-11-09T14:15:41.255Z",
		username: "Leftykap",
		year: 2024,
	},
	{
		id: "79b1c80d-46f2-47f8-9082-045971857f36",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:19:28.258Z",
		score: 2024,
		updatedAt: "2024-11-10T20:19:28.258Z",
		username: "mikehelper",
		year: 2024,
	},
	{
		id: "1f3d0284-8b05-4f59-bcb2-724c39ff7320",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:21:17.373Z",
		score: 7834,
		updatedAt: "2024-11-10T20:21:17.373Z",
		username: "PhuThai",
		year: 2024,
	},
	{
		id: "1243c453-db69-433c-a0e6-cfe9cd10e8a4",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:41:15.368Z",
		score: 686,
		updatedAt: "2024-11-10T20:41:15.368Z",
		username: "WesTurner",
		year: 2024,
	},
	{
		id: "60c6bb2a-2c8b-4363-a302-3a9fe1165ab9",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T10:56:54.312Z",
		score: 450,
		updatedAt: "2024-11-10T10:56:54.312Z",
		username: "vaib",
		year: 2024,
	},
	{
		id: "65e04c77-9d9b-4eb1-9a83-b023ed901912",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:18:36.488Z",
		score: 1192,
		updatedAt: "2024-11-10T20:18:36.488Z",
		username: "RyanThomas",
		year: 2024,
	},
	{
		id: "8c25d29a-0054-41c9-9641-df964771b886",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T13:19:40.669Z",
		score: 17262,
		updatedAt: "2024-11-10T13:19:40.669Z",
		username: "Jargonian",
		year: 2024,
	},
	{
		id: "ca6757ee-0090-4e02-b4cd-3712110506d2",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T18:22:01.415Z",
		score: 36942,
		updatedAt: "2024-11-09T18:22:01.415Z",
		username: "DevanPatel",
		year: 2024,
	},
	{
		id: "9572b340-600f-4e63-bc50-4b2097d6e422",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:15:06.500Z",
		score: 1214,
		updatedAt: "2024-11-10T20:15:06.500Z",
		username: "joshb",
		year: 2024,
	},
	{
		id: "b7473549-6ad2-45e1-8184-443136441c90",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T00:36:43.913Z",
		score: 3674,
		updatedAt: "2024-11-10T00:36:43.913Z",
		username: "Crampton",
		year: 2024,
	},
	{
		id: "10512f8f-1aaa-4389-80d1-15b962da359e",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T22:29:56.932Z",
		score: 1498,
		updatedAt: "2024-11-10T22:29:56.932Z",
		username: "v",
		year: 2024,
	},
	{
		id: "5d2bf8eb-8c88-4e82-b657-01cfb242f542",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:16:36.367Z",
		score: 1694,
		updatedAt: "2024-11-10T20:16:36.367Z",
		username: "RyanThomas",
		year: 2024,
	},
	{
		id: "c8c67419-80b9-45fb-bb43-924b78c5be73",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:19:10.194Z",
		score: 2198,
		updatedAt: "2024-11-10T20:19:10.194Z",
		username: "TrippLyons",
		year: 2024,
	},
	{
		id: "fcd91eff-4840-4b40-9284-25f4a47cba19",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T21:10:12.257Z",
		score: 102,
		updatedAt: "2024-11-09T21:10:12.257Z",
		username: "2048Lover",
		year: 2024,
	},
	{
		id: "aecf5286-c3f5-4782-9fb3-c41bb5662d36",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:52:52.171Z",
		score: 1896,
		updatedAt: "2024-11-10T20:52:52.171Z",
		username: "Michael",
		year: 2024,
	},
	{
		id: "4ea92d88-e993-467d-8005-3068db950ac2",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:20:43.571Z",
		score: 122,
		updatedAt: "2024-11-10T20:20:43.571Z",
		username: "1",
		year: 2024,
	},
	{
		id: "fa7acf40-3eb6-4bd3-bd1b-4f3d2e24fc1e",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T18:32:25.307Z",
		score: 13128,
		updatedAt: "2024-11-09T18:32:25.307Z",
		username: "ASiNTHE",
		year: 2024,
	},
	{
		id: "ac70fa2d-f1b7-44f1-8a25-e59a1f85f011",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T15:42:01.311Z",
		score: 18026,
		updatedAt: "2024-11-09T15:42:01.311Z",
		username: "JacksonBaimel",
		year: 2024,
	},
	{
		id: "b9576f8b-f356-4202-917e-41cc4c8babe7",
		__typename: "Leaderboard",
		createdAt: "2024-11-11T04:30:57.499Z",
		score: 1490,
		updatedAt: "2024-11-11T04:30:57.499Z",
		username: "Alvid",
		year: 2024,
	},
	{
		id: "40db24f6-3d39-48b3-a0ae-ca1337e59786",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:17:38.803Z",
		score: 1800,
		updatedAt: "2024-11-10T20:17:38.803Z",
		username: "k",
		year: 2024,
	},
	{
		id: "b6738fb0-6cd7-4a90-89c6-50570fba24c8",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:21:42.990Z",
		score: 3534,
		updatedAt: "2024-11-10T20:21:42.990Z",
		username: "Tripp",
		year: 2024,
	},
	{
		id: "b73cd6e8-f449-48a5-ba72-56af82ccf7b4",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:15:17.103Z",
		score: 872,
		updatedAt: "2024-11-10T20:15:17.103Z",
		username: "Jest",
		year: 2024,
	},
	{
		id: "094bcced-e109-45e5-9013-2c74f60c92e1",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:14:30.520Z",
		score: 142,
		updatedAt: "2024-11-10T20:14:30.520Z",
		username: "Trash",
		year: 2024,
	},
	{
		id: "f203b163-e01e-453c-b41d-82d30b4ce43f",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:23:51.481Z",
		score: 2186,
		updatedAt: "2024-11-10T20:23:51.481Z",
		username: "RyanThomas",
		year: 2024,
	},
	{
		id: "f1f1195f-be1f-4709-9f38-16d581d2f499",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:13:06.807Z",
		score: 698,
		updatedAt: "2024-11-10T20:13:06.807Z",
		username: "Mel",
		year: 2024,
	},
	{
		id: "07c2480d-a2f5-48b3-9756-3948e70643a5",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T19:13:14.286Z",
		score: 2620,
		updatedAt: "2024-11-09T19:13:14.286Z",
		username: "Cooper",
		year: 2024,
	},
	{
		id: "d802125e-e433-47a7-bfee-51e111dc46ea",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:21:36.531Z",
		score: 3160,
		updatedAt: "2024-11-10T20:21:36.531Z",
		username: "Rami",
		year: 2024,
	},
	{
		id: "6bc741fd-76b1-49e9-a624-d6aa790807c9",
		__typename: "Leaderboard",
		createdAt: "2024-11-09T20:52:31.715Z",
		score: 1612,
		updatedAt: "2024-11-09T20:52:31.715Z",
		username: "manayt",
		year: 2024,
	},
	{
		id: "7c025a7b-d2e5-41f1-843a-4f31215efffc",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:19:21.336Z",
		score: 1608,
		updatedAt: "2024-11-10T20:19:21.336Z",
		username: "monster",
		year: 2024,
	},
	{
		id: "c8fafc03-d0dd-41b0-9245-bde2e3d9a33f",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:14:00.394Z",
		score: 1534,
		updatedAt: "2024-11-10T20:14:00.394Z",
		username: "colindech",
		year: 2024,
	},
	{
		id: "0ae9c446-37f8-4436-bddf-6a6fc364f16e",
		__typename: "Leaderboard",
		createdAt: "2024-11-10T20:19:55.135Z",
		score: 1452,
		updatedAt: "2024-11-10T20:19:55.135Z",
		username: "RyanThomas",
		year: 2024,
	},
];

export default function Page() {
	const [leaderboardEntries, setLeaderboardEntries] = useState(fakeLeaderboard);
	const [isDirector, setIsDirector] = useState(false); //Just change this to true to test the isDirector stuff

	const fetchLeaderboard = async () => {
		//const entries = await get_leaderboard();
		setLeaderboardEntries(fakeLeaderboard);
	};

	/*async function is_director() {
		let groups = undefined;
		try {
			const session = await Auth.fetchAuthSession();
			groups = session.tokens?.accessToken.payload["cognito:groups"];
		} catch (e) {
			console.error(e);
			groups = undefined;
		}

		return groups !== undefined;
	}*/
	/*
	useEffect(() => {
		//const setDirectorStatus = async () => {
		//	setIsDirector(await is_director());
		//};

		//setDirectorStatus();
		//fetchLeaderboard();
	}, []);*/

	return (
		<div className="flex flex-col items-center justify-start w-full h-screen">
			<NavBar showOnScroll={false}></NavBar>

			<div className="flex-grow flex-shrink basis-auto">
				<h1 className="mt-28 text-center text-4xl font-modern text-hackrpi-orange">2048 Leaderboard</h1>
				<table className="min-w-[80vw] mt-10 justify-inbetween table-auto w-full table table-zebra">
					<thead>
						<tr>
							<th className="w-1/4 px-4 py-2 text-center font-retro text-hackrpi-yellow">Position</th>
							<th className="w-1/3 px-4 py-2 text-center font-retro text-hackrpi-yellow">Username</th>
							<th className="w-1/3 px-4 py-2 text-center font-retro text-hackrpi-yellow">Score</th>
							{isDirector ? <th className="w-1/3 px-4 py-2 font-retro text-hackrpi-yellow">Delete</th> : null}
						</tr>
					</thead>

					<tbody className="text-center">
						{leaderboardEntries.map((entry, index) => (
							<tr key={entry.id}>
								<td className="px-y py-2">{index + 1}</td>
								<td className="px-4 py-2">{entry.username}</td>
								<td className="px-4 py-2">{entry.score}</td>
								{isDirector ? (
									<td className="px-4 py-2 flex items-center justify-center">
										<HackRPIButton
											onClick={async () => {
												//await deleteLeaderboardEntry(entry.id);
												//await fetchLeaderboard();
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

/*async function deleteLeaderboardEntry(id: string) {
	if (!confirm("Are you sure???")) {
		return;
	}

	const response = await client.models.Leaderboard.delete({ id });

	if (response.errors) {
		alert("Error deleting leaderboard entry");
	}
}*/
