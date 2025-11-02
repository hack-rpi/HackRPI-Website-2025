// src/data/schedule.ts

export type Event = {
	id: string;
	title: string;
	description: string;
	startTime: number; // computed in page.tsx
	endTime: number;   // computed in page.tsx
	location: string;
	speaker: string;
	eventType: "workshop" | "constant" | "important" | "food" | "deadline";
	visible: boolean;
	column?: number; // 1-4
  width: number;
};

// ─────────────────────────────────────────────
// IMPORTANT: all math in the app keys off these
// ─────────────────────────────────────────────

// Saturday = SAT 11/15/2025 starting at 9:00 AM local
export const SATURDAY_START = new Date("2025-11-15T09:00:00-05:00").getTime();

// Saturday ends ~11 PM same night (we just need this for display ranges)
export const SATURDAY_END = new Date("2025-11-16T00:00:00-05:00").getTime() - 1;

// Sunday = SUN 11/16/2025 starting at 12:00 AM local (midnight)
export const SUNDAY_START = new Date("2025-11-16T00:00:00-05:00").getTime();

// Sunday ends 8:00 PM Sunday
export const SUNDAY_END = new Date("2025-11-16T20:00:00-05:00").getTime();

// timeline labels for Saturday (9 AM → 11 PM)
export const saturdayTimes = [
	{ str: "9:00 AM",  unix: SATURDAY_START + 0 * 3600000 },
	{ str: "10:00 AM", unix: SATURDAY_START + 1 * 3600000 },
	{ str: "11:00 AM", unix: SATURDAY_START + 2 * 3600000 },
	{ str: "12:00 PM", unix: SATURDAY_START + 3 * 3600000 },
	{ str: "1:00 PM",  unix: SATURDAY_START + 4 * 3600000 },
	{ str: "2:00 PM",  unix: SATURDAY_START + 5 * 3600000 },
	{ str: "3:00 PM",  unix: SATURDAY_START + 6 * 3600000 },
	{ str: "4:00 PM",  unix: SATURDAY_START + 7 * 3600000 },
	{ str: "5:00 PM",  unix: SATURDAY_START + 8 * 3600000 },
	{ str: "6:00 PM",  unix: SATURDAY_START + 9 * 3600000 },
	{ str: "7:00 PM",  unix: SATURDAY_START + 10 * 3600000 },
	{ str: "8:00 PM",  unix: SATURDAY_START + 11 * 3600000 },
	{ str: "9:00 PM",  unix: SATURDAY_START + 12 * 3600000 },
	{ str: "10:00 PM", unix: SATURDAY_START + 13 * 3600000 },
	{ str: "11:00 PM", unix: SATURDAY_START + 14 * 3600000 }
];

// timeline labels for Sunday (12 AM → 8 PM)
export const sundayTimes = [
	{ str: "12:00 AM", unix: SUNDAY_START + 0 * 3600000 },
	{ str: "1:00 AM",  unix: SUNDAY_START + 1 * 3600000 },
	{ str: "2:00 AM",  unix: SUNDAY_START + 2 * 3600000 },
	{ str: "3:00 AM",  unix: SUNDAY_START + 3 * 3600000 },
	{ str: "4:00 AM",  unix: SUNDAY_START + 4 * 3600000 },
	{ str: "5:00 AM",  unix: SUNDAY_START + 5 * 3600000 },
	{ str: "6:00 AM",  unix: SUNDAY_START + 6 * 3600000 },
	{ str: "7:00 AM",  unix: SUNDAY_START + 7 * 3600000 },
	{ str: "8:00 AM",  unix: SUNDAY_START + 8 * 3600000 },
	{ str: "9:00 AM",  unix: SUNDAY_START + 9 * 3600000 },
	{ str: "10:00 AM", unix: SUNDAY_START + 10 * 3600000 },
	{ str: "11:00 AM", unix: SUNDAY_START + 11 * 3600000 },
	{ str: "12:00 PM", unix: SUNDAY_START + 12 * 3600000 },
	{ str: "1:00 PM",  unix: SUNDAY_START + 13 * 3600000 },
	{ str: "2:00 PM",  unix: SUNDAY_START + 14 * 3600000 },
	{ str: "3:00 PM",  unix: SUNDAY_START + 15 * 3600000 },
	{ str: "4:00 PM",  unix: SUNDAY_START + 16 * 3600000 },
	{ str: "5:00 PM",  unix: SUNDAY_START + 17 * 3600000 },
	{ str: "6:00 PM",  unix: SUNDAY_START + 18 * 3600000 },
	{ str: "7:00 PM",  unix: SUNDAY_START + 19 * 3600000 },
	{ str: "8:00 PM",  unix: SUNDAY_START + 20 * 3600000 }
];
