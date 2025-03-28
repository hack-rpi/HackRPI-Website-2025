export type Event = {
	id: string;
	title: string;
	description: string;
	startTime: number;
	endTime: number;
	location: string;
	speaker: string;
	eventType: string;
	visible: boolean;
	column?: number;
};

export const SATURDAY_START = 1731160800000;
export const SATURDAY_END = 1731214800000 - 1;

export const SUNDAY_START = 1731214800000;
export const SUNDAY_END = 1731286800000;

export const saturdayTimes = [
	{ str: "9:00 AM", unix: SATURDAY_START },
	{ str: "10:00 AM", unix: SATURDAY_START + 3600000 * 1 },
	{ str: "11:00 AM", unix: SATURDAY_START + 3600000 * 2 },
	{ str: "12:00 PM", unix: SATURDAY_START + 3600000 * 3 },
	{ str: "1:00 PM", unix: SATURDAY_START + 3600000 * 4 },
	{ str: "2:00 PM", unix: SATURDAY_START + 3600000 * 5 },
	{ str: "3:00 PM", unix: SATURDAY_START + 3600000 * 6 },
	{ str: "4:00 PM", unix: SATURDAY_START + 3600000 * 7 },
	{ str: "5:00 PM", unix: SATURDAY_START + 3600000 * 8 },
	{ str: "6:00 PM", unix: SATURDAY_START + 3600000 * 9 },
	{ str: "7:00 PM", unix: SATURDAY_START + 3600000 * 10 },
	{ str: "8:00 PM", unix: SATURDAY_START + 3600000 * 11 },
	{ str: "9:00 PM", unix: SATURDAY_START + 3600000 * 12 },
	{ str: "10:00 PM", unix: SATURDAY_START + 3600000 * 13 },
	{ str: "11:00 PM", unix: SATURDAY_START + 3600000 * 14 },
];

export const sundayTimes = [
	{ str: "12:00 AM", unix: SUNDAY_START },
	{ str: "1:00 AM", unix: SUNDAY_START + 3600000 * 1 },
	{ str: "2:00 AM", unix: SUNDAY_START + 3600000 * 2 },
	{ str: "3:00 AM", unix: SUNDAY_START + 3600000 * 3 },
	{ str: "4:00 AM", unix: SUNDAY_START + 3600000 * 4 },
	{ str: "5:00 AM", unix: SUNDAY_START + 3600000 * 5 },
	{ str: "6:00 AM", unix: SUNDAY_START + 3600000 * 6 },
	{ str: "7:00 AM", unix: SUNDAY_START + 3600000 * 7 },
	{ str: "8:00 AM", unix: SUNDAY_START + 3600000 * 8 },
	{ str: "9:00 AM", unix: SUNDAY_START + 3600000 * 9 },
	{ str: "10:00 AM", unix: SUNDAY_START + 3600000 * 10 },
	{ str: "11:00 AM", unix: SUNDAY_START + 3600000 * 11 },
	{ str: "12:00 PM", unix: SUNDAY_START + 3600000 * 12 },
	{ str: "1:00 PM", unix: SUNDAY_START + 3600000 * 13 },
	{ str: "2:00 PM", unix: SUNDAY_START + 3600000 * 14 },
	{ str: "3:00 PM", unix: SUNDAY_START + 3600000 * 15 },
	{ str: "4:00 PM", unix: SUNDAY_START + 3600000 * 16 },
	{ str: "5:00 PM", unix: SUNDAY_START + 3600000 * 17 },
	{ str: "6:00 PM", unix: SUNDAY_START + 3600000 * 18 },
	{ str: "7:00 PM", unix: SUNDAY_START + 3600000 * 19 },
	{ str: "8:00 PM", unix: SUNDAY_START + 3600000 * 20 },
];
